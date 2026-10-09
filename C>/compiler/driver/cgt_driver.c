#include "cgt_driver.h"
#include "cgt_parser.h"
#include "cgt_semantic.h"
#include "cgt_typechecker.h"
#include "cgt_memory_safety.h"
#include "cgt_security.h"
#include "cgt_optimizer.h"
#include "cgt_codegen.h"
#include <unistd.h>
#include <sys/wait.h>

void cgt_driver_options_init(cgt_driver_options_t *opts) {
    memset(opts, 0, sizeof(*opts));
    opts->opt_level = 0;
    opts->target_arch = TARGET_ARCH_X86_64;
    opts->output_path = "a.out";
}

void cgt_driver_print_help(const char *prog_name) {
    printf("C> (C-Greater) Systems Programming Language Compiler v%s\n", CGT_VERSION_STRING);
    printf("Usage: %s [options] <source.cgt>\n\n", prog_name);
    printf("Compilation Pipeline Options:\n");
    printf("  -o <file>             Specify output executable or object filename\n");
    printf("  -c                    Compile and assemble, but do not link (-c object file)\n");
    printf("  -r, --run             Compile and immediately execute the binary\n");
    printf("  -O0, -O1, -O2, -O3    Set optimization level (default: -O0)\n");
    printf("  -v, --verbose         Enable verbose diagnostic pipeline trace\n\n");
    printf("Inspection & Verification Modes:\n");
    printf("  --emit-ast            Parse and dump AST structure to stdout\n");
    printf("  --emit-ir             Lower to C> Intermediate Representation and dump to stdout\n");
    printf("  --emit-c              Emit generated intermediate C code\n");
    printf("  --emit-asm            Emit generated native target assembly (.s)\n");
    printf("  -t, --translate       Translate C> to independent, standalone portable native code\n");
    printf("  --standalone          Generate self-contained standalone translation unit\n");
    printf("  --v2                  Enforce C> v2+ language specification and features\n");
    printf("  --check-only          Stop after semantic analysis and type checking\n");
    printf("  --check-memory        Run ownership and borrow checker diagnostics only\n");
    printf("  --security-audit      Perform static vulnerability and safety audit\n\n");
    printf("Information:\n");
    printf("  -h, --help            Show this help dialog\n");
    printf("  --version             Print compiler version information\n");
}

void cgt_driver_print_version(void) {
    printf("C> Compiler (cgt) version %s (x86_64-pc-linux-gnu)\n", CGT_VERSION_STRING);
    printf("Target Architecture: x86_64, aarch64, riscv64\n");
    printf("GPU Backends: Vulkan Compute, CUDA PTX, Metal, Host Virtual SIMD\n");
    printf("Standard: C> Language Specification 2.0.0-LTS (v2+)\n");
}

int cgt_driver_parse_args(int argc, char **argv, cgt_driver_options_t *opts) {
    for (int i = 1; i < argc; i++) {
        const char *arg = argv[i];
        if (strcmp(arg, "-h") == 0 || strcmp(arg, "--help") == 0) {
            cgt_driver_print_help(argv[0]);
            return 1;
        } else if (strcmp(arg, "--version") == 0) {
            cgt_driver_print_version();
            return 1;
        } else if (strcmp(arg, "-o") == 0 && i + 1 < argc) {
            opts->output_path = argv[++i];
        } else if (strcmp(arg, "-c") == 0) {
            opts->compile_only = true;
        } else if (strcmp(arg, "-t") == 0 || strcmp(arg, "--translate") == 0 || strcmp(arg, "--standalone") == 0) {
            opts->translate_independent = true;
        } else if (strcmp(arg, "--v2") == 0) {
            opts->v2_mode = true;
        } else if (strcmp(arg, "-r") == 0 || strcmp(arg, "--run") == 0) {
            opts->run_after_build = true;
        } else if (strcmp(arg, "-v") == 0 || strcmp(arg, "--verbose") == 0) {
            opts->verbose = true;
        } else if (strcmp(arg, "--emit-ast") == 0) {
            opts->emit_ast = true;
        } else if (strcmp(arg, "--emit-ir") == 0) {
            opts->emit_ir = true;
        } else if (strcmp(arg, "--emit-c") == 0) {
            opts->emit_c = true;
        } else if (strcmp(arg, "--emit-asm") == 0) {
            opts->emit_asm = true;
        } else if (strcmp(arg, "--check-only") == 0) {
            opts->check_only = true;
        } else if (strcmp(arg, "--check-memory") == 0) {
            opts->memory_check_only = true;
        } else if (strcmp(arg, "--security-audit") == 0) {
            opts->security_audit = true;
        } else if (strcmp(arg, "-O0") == 0) {
            opts->opt_level = 0;
        } else if (strcmp(arg, "-O1") == 0) {
            opts->opt_level = 1;
        } else if (strcmp(arg, "-O2") == 0) {
            opts->opt_level = 2;
        } else if (strcmp(arg, "-O3") == 0) {
            opts->opt_level = 3;
        } else if (arg[0] == '-') {
            fprintf(stderr, "Unknown option: %s\n", arg);
            return -1;
        } else {
            opts->input_path = arg;
        }
    }

    if (!opts->input_path) {
        fprintf(stderr, "Error: No input file specified.\nTry '%s --help' for options.\n", argv[0]);
        return -1;
    }
    return 0;
}

static char *read_entire_file(const char *path, size_t *out_size) {
    FILE *f = fopen(path, "rb");
    if (!f) return NULL;
    fseek(f, 0, SEEK_END);
    long sz = ftell(f);
    fseek(f, 0, SEEK_SET);
    if (sz < 0) { fclose(f); return NULL; }

    char *buf = (char *)cgt_malloc(sz + 1);
    size_t read_bytes = fread(buf, 1, sz, f);
    buf[read_bytes] = '\0';
    fclose(f);
    if (out_size) *out_size = read_bytes;
    return buf;
}

int cgt_driver_run(const cgt_driver_options_t *opts) {
    if (opts->verbose) {
        printf("[C> Driver]: Reading source file: %s\n", opts->input_path);
    }

    size_t src_len = 0;
    char *source = read_entire_file(opts->input_path, &src_len);
    if (!source) {
        fprintf(stderr, "[C> Error]: Failed to open source file '%s'\n", opts->input_path);
        return 1;
    }

    /* 1. Lexer & Parser -> AST */
    if (opts->verbose) printf("[C> Driver]: Stage 1: Lexing & Parsing...\n");
    cgt_parser_t parser;
    cgt_parser_init(&parser, source, src_len, opts->input_path);

    cgt_ast_module_t ast_mod;
    cgt_ast_module_init(&ast_mod, "main", opts->input_path);

    if (!cgt_parser_parse_module(&parser, &ast_mod)) {
        fprintf(stderr, "[C> Error]: Parsing failed with %u syntax error(s).\n", parser.error_count);
        free(source);
        return 1;
    }

    if (opts->emit_ast) {
        cgt_ast_dump(&ast_mod, stdout);
        free(source);
        return 0;
    }

    /* 2. Semantic Analysis */
    if (opts->verbose) printf("[C> Driver]: Stage 2: Semantic Analysis...\n");
    cgt_analyzer_t analyzer;
    cgt_analyzer_init(&analyzer, &ast_mod);
    if (!cgt_semantic_analyze_module(&analyzer, &ast_mod)) {
        fprintf(stderr, "[C> Error]: Semantic analysis failed.\n");
        free(source);
        return 1;
    }

    /* 3. Type Checking */
    if (opts->verbose) printf("[C> Driver]: Stage 3: Type Checking...\n");
    cgt_typechecker_t tc;
    cgt_typechecker_init(&tc, &analyzer);
    if (!cgt_typechecker_check_module(&tc, &ast_mod)) {
        fprintf(stderr, "[C> Error]: Type checking failed with %u error(s).\n", tc.error_count);
        free(source);
        return 1;
    }

    /* 4. Memory Safety Analysis (Borrow & Ownership Checker) */
    if (opts->verbose) printf("[C> Driver]: Stage 4: Memory Safety Analysis...\n");
    cgt_borrow_checker_t bc;
    cgt_borrow_checker_init(&bc);
    if (!cgt_memory_safety_check_module(&bc, &ast_mod)) {
        fprintf(stderr, "[C> Error]: Memory safety check failed with %u violation(s).\n", bc.safety_violations);
        cgt_borrow_checker_free(&bc);
        free(source);
        return 1;
    }
    cgt_borrow_checker_free(&bc);

    if (opts->memory_check_only) {
        printf("[C> Success]: Memory safety analysis passed cleanly. Zero violations detected.\n");
        free(source);
        return 0;
    }

    /* 5. Security Analysis (Auditor) */
    if (opts->verbose || opts->security_audit) printf("[C> Driver]: Stage 5: Security Analysis...\n");
    cgt_security_auditor_t auditor;
    cgt_security_auditor_init(&auditor, false);
    if (!cgt_security_audit_module(&auditor, &ast_mod)) {
        fprintf(stderr, "[C> Error]: Security audit failed with %u fatal vulnerability rule(s).\n", auditor.error_count);
        cgt_security_auditor_free(&auditor);
        free(source);
        return 1;
    }
    if (opts->security_audit) {
        printf("[C> Security Audit]: %u warning(s), %u error(s). Audit completed successfully.\n",
               auditor.warning_count, auditor.error_count);
        cgt_security_auditor_free(&auditor);
        free(source);
        return 0;
    }
    cgt_security_auditor_free(&auditor);

    if (opts->check_only) {
        printf("[C> Success]: Syntax, Types, Memory Safety, and Security validated successfully.\n");
        free(source);
        return 0;
    }

    /* 6. Intermediate Representation (IR Lowering) */
    if (opts->verbose) printf("[C> Driver]: Stage 6: IR Lowering...\n");
    cgt_ir_module_t ir_mod;
    cgt_ir_lower_module(&ast_mod, &ir_mod);

    /* 7. Optimization */
    if (opts->opt_level > 0) {
        if (opts->verbose) printf("[C> Driver]: Stage 7: Optimization Pass (-O%d)...\n", opts->opt_level);
        cgt_optimizer_t optimizer;
        cgt_optimizer_init(&optimizer, opts->opt_level);
        cgt_optimizer_run(&optimizer, &ir_mod);
        if (opts->verbose) {
            printf("[C> Optimizer]: Applied %u optimization transforms.\n", optimizer.optimizations_performed);
        }
    }

    if (opts->emit_ir) {
        cgt_ir_dump(&ir_mod, stdout);
        cgt_ir_module_free(&ir_mod);
        free(source);
        return 0;
    }

    /* 8. Code Generation */
    if (opts->verbose) printf("[C> Driver]: Stage 8: Code Generation...\n");
    cgt_codegen_options_t cg_opts;
    cg_opts.arch = opts->target_arch;
    cg_opts.opt_level = opts->opt_level;
    cg_opts.output_file = opts->output_path;

    if (opts->compile_only) {
        cg_opts.output_kind = CODEGEN_OUTPUT_OBJ;
    } else if (opts->emit_asm) {
        cg_opts.output_kind = CODEGEN_OUTPUT_ASM;
    } else if (opts->emit_c) {
        cg_opts.output_kind = CODEGEN_OUTPUT_C;
    } else {
        cg_opts.output_kind = CODEGEN_OUTPUT_EXE;
    }

    cgt_codegen_t codegen;
    cgt_codegen_init(&codegen, &ir_mod, cg_opts);

    if (opts->translate_independent) {
        cgt_codegen_generate_standalone_c(&codegen);
        if (opts->output_path && strcmp(opts->output_path, "a.out") != 0) {
            FILE *out_f = fopen(opts->output_path, "w");
            if (out_f) {
                fputs(codegen.output_buf.data, out_f);
                fclose(out_f);
                if (opts->verbose) printf("[C> Translator]: Standalone independent unit emitted -> %s\n", opts->output_path);
            } else {
                fprintf(stderr, "[C> Error]: Failed to write translated file '%s'\n", opts->output_path);
            }
        } else {
            printf("%s\n", codegen.output_buf.data);
        }
        cgt_codegen_free(&codegen);
        cgt_ir_module_free(&ir_mod);
        free(source);
        return 0;
    }

    cgt_codegen_generate_c(&codegen);

    if (opts->emit_c) {
        printf("%s\n", codegen.output_buf.data);
        cgt_codegen_free(&codegen);
        cgt_ir_module_free(&ir_mod);
        free(source);
        return 0;
    }

    /* Save generated C file to temp and invoke native compiler */
    char temp_c_file[256];
    snprintf(temp_c_file, sizeof(temp_c_file), "/tmp/cgt_%d.c", getpid());
    FILE *tmp_f = fopen(temp_c_file, "w");
    if (!tmp_f) {
        fprintf(stderr, "[C> Error]: Failed to create intermediate compilation file '%s'\n", temp_c_file);
        cgt_codegen_free(&codegen);
        cgt_ir_module_free(&ir_mod);
        free(source);
        return 1;
    }
    fputs(codegen.output_buf.data, tmp_f);
    fclose(tmp_f);

    if (opts->verbose) printf("[C> Driver]: Stage 9: Native Assembler & Linker...\n");
    bool build_ok = cgt_codegen_build_native(&codegen, temp_c_file);
    unlink(temp_c_file);

    cgt_codegen_free(&codegen);
    cgt_ir_module_free(&ir_mod);
    free(source);

    if (!build_ok) {
        fprintf(stderr, "[C> Error]: Native build execution failed.\n");
        return 1;
    }

    if (opts->verbose) {
        printf("[C> Driver]: Compilation succeeded -> %s\n", opts->output_path);
    }

    /* 9. Execution if -r / --run */
    if (opts->run_after_build) {
        if (opts->verbose) printf("[C> Driver]: Executing %s...\n\n", opts->output_path);
        char run_cmd[512];
        snprintf(run_cmd, sizeof(run_cmd), "./%s", opts->output_path);
        int run_ret = system(run_cmd);
        return WEXITSTATUS(run_ret);
    }

    return 0;
}
int64_t cgt_driver_main(int argc, char **argv) {
    cgt_driver_options_t opts;
    cgt_driver_options_init(&opts);
    if (!cgt_driver_parse_args(argc, argv, &opts)) {
        cgt_driver_print_help(argv[0]);
        return 1;
    }
    return cgt_driver_run(&opts);
}