#ifndef CGT_DRIVER_H
#define CGT_DRIVER_H

#include "cgt_common.h"
#include "cgt_ast.h"
#include "cgt_ir.h"
#include "cgt_codegen.h"

typedef struct {
    const char *input_path;
    const char *output_path;
    bool emit_ast;
    bool emit_ir;
    bool emit_c;
    bool emit_asm;
    bool compile_only;     /* -c */
    bool check_only;       /* --check-only */
    bool memory_check_only;/* --check-memory */
    bool security_audit;   /* --security-audit */
    bool run_after_build;  /* --run / -r */
    bool verbose;          /* -v */
    int opt_level;         /* -O0, -O1, -O2, -O3 */
    cgt_target_arch_t target_arch;
} cgt_driver_options_t;

void cgt_driver_options_init(cgt_driver_options_t *opts);
int cgt_driver_parse_args(int argc, char **argv, cgt_driver_options_t *opts);
int cgt_driver_run(const cgt_driver_options_t *opts);
void cgt_driver_print_help(const char *prog_name);
void cgt_driver_print_version(void);

#endif /* CGT_DRIVER_H */
