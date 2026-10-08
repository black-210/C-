#include "cgt_optimizer.h"

void cgt_optimizer_init(cgt_optimizer_t *opt, int opt_level) {
    opt->opt_level = opt_level;
    opt->enable_const_fold = (opt_level >= 1);
    opt->enable_dce = (opt_level >= 1);
    opt->enable_inlining = (opt_level >= 2);
    opt->enable_cf_simplification = (opt_level >= 2);
    opt->optimizations_performed = 0;
}

bool cgt_opt_constant_folding(cgt_ir_func_t *fn, uint32_t *changes) {
    bool changed = false;
    cgt_ir_block_t *b = fn->first_block;
    while (b) {
        cgt_ir_inst_t *inst = b->first;
        while (inst) {
            if (inst->src1.kind == IR_VAL_CONST_INT && inst->src2.kind == IR_VAL_CONST_INT) {
                int64_t a = inst->src1.as.int_val;
                int64_t b_val = inst->src2.as.int_val;
                int64_t result = 0;
                bool foldable = true;

                switch (inst->op) {
                    case IR_OP_ADD: result = a + b_val; break;
                    case IR_OP_SUB: result = a - b_val; break;
                    case IR_OP_MUL: result = a * b_val; break;
                    case IR_OP_DIV:
                        if (b_val != 0) result = a / b_val;
                        else foldable = false;
                        break;
                    case IR_OP_MOD:
                        if (b_val != 0) result = a % b_val;
                        else foldable = false;
                        break;
                    case IR_OP_EQ: result = (a == b_val); break;
                    case IR_OP_NE: result = (a != b_val); break;
                    case IR_OP_LT: result = (a < b_val); break;
                    case IR_OP_LE: result = (a <= b_val); break;
                    case IR_OP_GT: result = (a > b_val); break;
                    case IR_OP_GE: result = (a >= b_val); break;
                    default: foldable = false; break;
                }

                if (foldable) {
                    inst->src1.as.int_val = result;
                    inst->src2.kind = 0;
                    inst->op = IR_OP_LOAD; /* replaced with direct constant */
                    if (changes) (*changes)++;
                    changed = true;
                }
            }
            inst = inst->next;
        }
        b = b->next;
    }
    return changed;
}

bool cgt_opt_dead_code_elimination(cgt_ir_func_t *fn, uint32_t *changes) {
    bool changed = false;
    cgt_ir_block_t *b = fn->first_block;
    while (b) {
        cgt_ir_inst_t *inst = b->first;
        bool seen_terminator = false;

        while (inst) {
            cgt_ir_inst_t *next = inst->next;
            if (seen_terminator) {
                /* Remove dead instruction after return or unconditional branch */
                if (inst->prev) inst->prev->next = inst->next;
                if (inst->next) inst->next->prev = inst->prev;
                if (b->first == inst) b->first = inst->next;
                if (b->last == inst) b->last = inst->prev;
                free(inst);
                if (changes) (*changes)++;
                changed = true;
            } else if (inst->op == IR_OP_RET || inst->op == IR_OP_BR) {
                seen_terminator = true;
            }
            inst = next;
        }
        b = b->next;
    }
    return changed;
}

bool cgt_opt_cfg_simplification(cgt_ir_func_t *fn, uint32_t *changes) {
    /* Merges empty blocks or cleans dead labels */
    (void)fn;
    (void)changes;
    return false;
}

bool cgt_optimizer_run(cgt_optimizer_t *opt, cgt_ir_module_t *ir_mod) {
    if (opt->opt_level == 0) return true;

    cgt_ir_func_t *fn = ir_mod->first_func;
    while (fn) {
        uint32_t round_changes = 0;
        int max_iters = 4;
        while (max_iters-- > 0) {
            uint32_t changes = 0;
            if (opt->enable_const_fold) {
                cgt_opt_constant_folding(fn, &changes);
            }
            if (opt->enable_dce) {
                cgt_opt_dead_code_elimination(fn, &changes);
            }
            round_changes += changes;
            if (changes == 0) break;
        }
        opt->optimizations_performed += round_changes;
        fn = fn->next;
    }
    return true;
}
