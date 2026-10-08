#ifndef CGT_CODEGEN_H
#define CGT_CODEGEN_H

#include "cgt_common.h"
#include "cgt_ir.h"

typedef enum {
    TARGET_ARCH_X86_64,
    TARGET_ARCH_AARCH64,
    TARGET_ARCH_RISCV64
} cgt_target_arch_t;

typedef enum {
    CODEGEN_OUTPUT_EXE,
    CODEGEN_OUTPUT_OBJ,
    CODEGEN_OUTPUT_ASM,
    CODEGEN_OUTPUT_C
} cgt_output_kind_t;

typedef struct {
    cgt_target_arch_t arch;
    cgt_output_kind_t output_kind;
    const char *output_file;
    bool debug_info;
    bool sanitize_memory;
    bool sanitize_ub;
    int opt_level;
} cgt_codegen_options_t;

typedef struct {
    cgt_ir_module_t *ir;
    cgt_codegen_options_t options;
    cgt_strbuf_t output_buf;
} cgt_codegen_t;

void cgt_codegen_init(cgt_codegen_t *cg, cgt_ir_module_t *ir, cgt_codegen_options_t options);
void cgt_codegen_free(cgt_codegen_t *cg);

/* Emits C code representing the lowered IR */
bool cgt_codegen_generate_c(cgt_codegen_t *cg);

/* Emits x86_64 assembly */
bool cgt_codegen_generate_asm(cgt_codegen_t *cg);

/* Compiles generated code to native object or binary using system assembler/linker */
bool cgt_codegen_build_native(cgt_codegen_t *cg, const char *c_source_path);

#endif /* CGT_CODEGEN_H */
