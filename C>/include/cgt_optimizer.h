#ifndef CGT_OPTIMIZER_H
#define CGT_OPTIMIZER_H

#include "cgt_common.h"
#include "cgt_ir.h"

typedef struct {
    int opt_level; /* 0, 1, 2, 3 */
    bool enable_dce;
    bool enable_const_fold;
    bool enable_inlining;
    bool enable_cf_simplification;
    uint32_t optimizations_performed;
} cgt_optimizer_t;

void cgt_optimizer_init(cgt_optimizer_t *opt, int opt_level);
bool cgt_optimizer_run(cgt_optimizer_t *opt, cgt_ir_module_t *ir_mod);

/* Individual passes */
bool cgt_opt_constant_folding(cgt_ir_func_t *fn, uint32_t *changes);
bool cgt_opt_dead_code_elimination(cgt_ir_func_t *fn, uint32_t *changes);
bool cgt_opt_cfg_simplification(cgt_ir_func_t *fn, uint32_t *changes);

#endif /* CGT_OPTIMIZER_H */
