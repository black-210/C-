#include "cgt_ir.h"

void cgt_ir_module_init(cgt_ir_module_t *mod, const char *name) {
    mod->module_name = name ? cgt_strdup(name) : "main_module";
    mod->globals = NULL;
    mod->global_count = 0;
    mod->global_capacity = 0;
    mod->first_func = NULL;
    mod->last_func = NULL;
}

void cgt_ir_module_free(cgt_ir_module_t *mod) {
    cgt_ir_func_t *f = mod->first_func;
    while (f) {
        cgt_ir_func_t *fnxt = f->next;
        cgt_ir_block_t *b = f->first_block;
        while (b) {
            cgt_ir_block_t *bnxt = b->next;
            cgt_ir_inst_t *inst = b->first;
            while (inst) {
                cgt_ir_inst_t *inxt = inst->next;
                if (inst->extra_args) free(inst->extra_args);
                free(inst);
                inst = inxt;
            }
            free(b);
            b = bnxt;
        }
        free(f);
        f = fnxt;
    }
}

cgt_ir_func_t *cgt_ir_func_create(cgt_ir_module_t *mod, const char *name, cgt_type_t *ret_type) {
    cgt_ir_func_t *fn = (cgt_ir_func_t *)cgt_calloc(1, sizeof(cgt_ir_func_t));
    fn->name = cgt_strdup(name);
    fn->return_type = ret_type;
    fn->next_vreg_id = 0;
    fn->next_block_id = 0;

    if (!mod->first_func) {
        mod->first_func = fn;
    } else {
        mod->last_func->next = fn;
    }
    mod->last_func = fn;
    return fn;
}

cgt_ir_block_t *cgt_ir_block_create(cgt_ir_func_t *fn, const char *label_prefix) {
    cgt_ir_block_t *b = (cgt_ir_block_t *)cgt_calloc(1, sizeof(cgt_ir_block_t));
    b->id = fn->next_block_id++;
    char buf[64];
    snprintf(buf, sizeof(buf), "%s%u", label_prefix ? label_prefix : "bb", b->id);
    b->name = cgt_strdup(buf);

    if (!fn->first_block) {
        fn->first_block = b;
    } else {
        fn->last_block->next = b;
    }
    fn->last_block = b;
    return b;
}

cgt_ir_value_t cgt_ir_vreg_create(cgt_ir_func_t *fn, cgt_type_t *type) {
    cgt_ir_value_t v;
    v.kind = IR_VAL_VREG;
    v.type = type;
    v.as.vreg_id = fn->next_vreg_id++;
    return v;
}

cgt_ir_value_t cgt_ir_const_int(int64_t val, cgt_type_t *type) {
    cgt_ir_value_t v;
    v.kind = IR_VAL_CONST_INT;
    v.type = type;
    v.as.int_val = val;
    return v;
}

cgt_ir_value_t cgt_ir_const_str(const char *val) {
    cgt_ir_value_t v;
    v.kind = IR_VAL_CONST_STR;
    v.type = cgt_type_primitive(TYPE_STR, cgt_loc_make(NULL, 0, 0));
    v.as.str_val = cgt_strdup(val);
    return v;
}

void cgt_ir_block_append_inst(cgt_ir_block_t *block, cgt_ir_inst_t *inst) {
    if (!block->first) {
        block->first = inst;
    } else {
        block->last->next = inst;
        inst->prev = block->last;
    }
    block->last = inst;
    block->inst_count++;
}

cgt_ir_inst_t *cgt_ir_inst_create(cgt_ir_op_t op, cgt_ir_value_t dest, cgt_ir_value_t src1, cgt_ir_value_t src2, cgt_loc_t loc) {
    cgt_ir_inst_t *inst = (cgt_ir_inst_t *)cgt_calloc(1, sizeof(cgt_ir_inst_t));
    inst->op = op;
    inst->dest = dest;
    inst->src1 = src1;
    inst->src2 = src2;
    inst->loc = loc;
    return inst;
}

typedef struct {
    cgt_ir_module_t *mod;
    cgt_ir_func_t *curr_fn;
    cgt_ir_block_t *curr_block;
} ir_gen_ctx_t;

static cgt_ir_value_t lower_expr(ir_gen_ctx_t *ctx, cgt_expr_t *expr);

static void lower_stmt(ir_gen_ctx_t *ctx, cgt_stmt_t *stmt) {
    if (!stmt) return;

    switch (stmt->kind) {
        case STMT_LET: {
            /* Allocate variable storage on stack */
            cgt_ir_value_t var_ptr = cgt_ir_vreg_create(ctx->curr_fn, stmt->as.let_stmt.type);
            cgt_ir_inst_t *alloca_inst = cgt_ir_inst_create(IR_OP_ALLOCA, var_ptr, (cgt_ir_value_t){0}, (cgt_ir_value_t){0}, stmt->loc);
            alloca_inst->aux_str = stmt->as.let_stmt.name;
            cgt_ir_block_append_inst(ctx->curr_block, alloca_inst);

            if (stmt->as.let_stmt.init) {
                cgt_ir_value_t init_val = lower_expr(ctx, stmt->as.let_stmt.init);
                cgt_ir_inst_t *store = cgt_ir_inst_create(IR_OP_STORE, (cgt_ir_value_t){0}, init_val, var_ptr, stmt->loc);
                store->aux_str = stmt->as.let_stmt.name;
                cgt_ir_block_append_inst(ctx->curr_block, store);
            }
            break;
        }
        case STMT_ASSIGN: {
            cgt_ir_value_t rhs = lower_expr(ctx, stmt->as.assign_stmt.value);
            if (stmt->as.assign_stmt.target && stmt->as.assign_stmt.target->kind == EXPR_IDENT) {
                cgt_ir_inst_t *store = cgt_ir_inst_create(IR_OP_STORE, (cgt_ir_value_t){0}, rhs, (cgt_ir_value_t){0}, stmt->loc);
                store->aux_str = stmt->as.assign_stmt.target->as.ident.name;
                cgt_ir_block_append_inst(ctx->curr_block, store);
            } else if (stmt->as.assign_stmt.target && stmt->as.assign_stmt.target->kind == EXPR_MEMBER) {
                cgt_ir_inst_t *store = cgt_ir_inst_create(IR_OP_STORE, (cgt_ir_value_t){0}, rhs, (cgt_ir_value_t){0}, stmt->loc);
                char buf[128];
                const char *tgt = "obj";
                const char *op_sep = ".";
                if (stmt->as.assign_stmt.target->as.member.target && stmt->as.assign_stmt.target->as.member.target->kind == EXPR_IDENT) {
                    tgt = stmt->as.assign_stmt.target->as.member.target->as.ident.name;
                }
                if (stmt->as.assign_stmt.target->as.member.target && stmt->as.assign_stmt.target->as.member.target->inferred_type &&
                    (stmt->as.assign_stmt.target->as.member.target->inferred_type->kind == TYPE_REF ||
                     stmt->as.assign_stmt.target->as.member.target->inferred_type->kind == TYPE_REF_MUT)) {
                    op_sep = "->";
                }
                snprintf(buf, sizeof(buf), "%s%s%s", tgt, op_sep, stmt->as.assign_stmt.target->as.member.field_name);
                store->aux_str = cgt_strdup(buf);
                cgt_ir_block_append_inst(ctx->curr_block, store);
            }
            break;
        }
        case STMT_RETURN: {
            cgt_ir_value_t ret_val = {0};
            if (stmt->as.return_stmt.value) {
                ret_val = lower_expr(ctx, stmt->as.return_stmt.value);
            }
            cgt_ir_inst_t *ret_inst = cgt_ir_inst_create(IR_OP_RET, (cgt_ir_value_t){0}, ret_val, (cgt_ir_value_t){0}, stmt->loc);
            cgt_ir_block_append_inst(ctx->curr_block, ret_inst);
            break;
        }
        case STMT_EXPR:
            lower_expr(ctx, stmt->as.expr_stmt.expr);
            break;
        case STMT_WHILE: {
            cgt_ir_block_t *cond_bb = cgt_ir_block_create(ctx->curr_fn, "loop_cond");
            cgt_ir_block_t *body_bb = cgt_ir_block_create(ctx->curr_fn, "loop_body");
            cgt_ir_block_t *exit_bb = cgt_ir_block_create(ctx->curr_fn, "loop_exit");

            /* Jump to cond */
            cgt_ir_value_t cond_target = { .kind = IR_VAL_BLOCK, .as.block_name = cond_bb->name };
            cgt_ir_block_append_inst(ctx->curr_block, cgt_ir_inst_create(IR_OP_BR, (cgt_ir_value_t){0}, cond_target, (cgt_ir_value_t){0}, stmt->loc));

            /* Condition block */
            ctx->curr_block = cond_bb;
            cgt_ir_value_t cval = lower_expr(ctx, stmt->as.while_stmt.condition);
            cgt_ir_value_t b_target = { .kind = IR_VAL_BLOCK, .as.block_name = body_bb->name };
            cgt_ir_value_t e_target = { .kind = IR_VAL_BLOCK, .as.block_name = exit_bb->name };
            cgt_ir_inst_t *br_cond = cgt_ir_inst_create(IR_OP_BR_COND, (cgt_ir_value_t){0}, cval, b_target, stmt->loc);
            br_cond->aux_str = e_target.as.block_name;
            cgt_ir_block_append_inst(ctx->curr_block, br_cond);

            /* Body block */
            ctx->curr_block = body_bb;
            lower_expr(ctx, stmt->as.while_stmt.body);
            cgt_ir_block_append_inst(ctx->curr_block, cgt_ir_inst_create(IR_OP_BR, (cgt_ir_value_t){0}, cond_target, (cgt_ir_value_t){0}, stmt->loc));

            ctx->curr_block = exit_bb;
            break;
        }
        default:
            break;
    }
}

static cgt_ir_value_t lower_expr(ir_gen_ctx_t *ctx, cgt_expr_t *expr) {
    if (!expr) {
        cgt_ir_value_t v = {0};
        return v;
    }

    switch (expr->kind) {
        case EXPR_INT_LIT:
            return cgt_ir_const_int(expr->as.int_val, expr->inferred_type);
        case EXPR_FLOAT_LIT: {
            cgt_ir_value_t v;
            v.kind = IR_VAL_CONST_FLOAT;
            v.type = expr->inferred_type;
            v.as.float_val = expr->as.float_val;
            return v;
        }
        case EXPR_STRING_LIT:
            return cgt_ir_const_str(expr->as.str_val);
        case EXPR_BOOL_LIT:
            return cgt_ir_const_int(expr->as.bool_val ? 1 : 0, cgt_type_primitive(TYPE_BOOL, expr->loc));
        case EXPR_IDENT: {
            cgt_ir_value_t dest = cgt_ir_vreg_create(ctx->curr_fn, expr->inferred_type);
            cgt_ir_inst_t *load = cgt_ir_inst_create(IR_OP_LOAD, dest, (cgt_ir_value_t){0}, (cgt_ir_value_t){0}, expr->loc);
            load->aux_str = expr->as.ident.name;
            cgt_ir_block_append_inst(ctx->curr_block, load);
            return dest;
        }
        case EXPR_BINARY: {
            cgt_ir_value_t lval = lower_expr(ctx, expr->as.binary.left);
            cgt_ir_value_t rval = lower_expr(ctx, expr->as.binary.right);
            cgt_ir_value_t dest = cgt_ir_vreg_create(ctx->curr_fn, expr->inferred_type);

            cgt_ir_op_t op = IR_OP_ADD;
            switch (expr->as.binary.op) {
                case BIN_ADD: op = IR_OP_ADD; break;
                case BIN_SUB: op = IR_OP_SUB; break;
                case BIN_MUL: op = IR_OP_MUL; break;
                case BIN_DIV: op = IR_OP_DIV; break;
                case BIN_MOD: op = IR_OP_MOD; break;
                case BIN_EQ:  op = IR_OP_EQ; break;
                case BIN_NE:  op = IR_OP_NE; break;
                case BIN_LT:  op = IR_OP_LT; break;
                case BIN_LE:  op = IR_OP_LE; break;
                case BIN_GT:  op = IR_OP_GT; break;
                case BIN_GE:  op = IR_OP_GE; break;
                case BIN_LOG_AND:
                case BIN_BIT_AND: op = IR_OP_AND; break;
                case BIN_LOG_OR:
                case BIN_BIT_OR:  op = IR_OP_OR; break;
                case BIN_BIT_XOR: op = IR_OP_XOR; break;
                case BIN_SHL:     op = IR_OP_SHL; break;
                case BIN_SHR:     op = IR_OP_SHR; break;
            }
            cgt_ir_inst_t *inst = cgt_ir_inst_create(op, dest, lval, rval, expr->loc);
            cgt_ir_block_append_inst(ctx->curr_block, inst);
            return dest;
        }
        case EXPR_CALL: {
            cgt_ir_value_t dest = cgt_ir_vreg_create(ctx->curr_fn, expr->inferred_type);
            cgt_ir_value_t *arg_vals = (cgt_ir_value_t *)cgt_malloc(sizeof(cgt_ir_value_t) * (expr->as.call.arg_count ? expr->as.call.arg_count : 1));
            for (size_t i = 0; i < expr->as.call.arg_count; i++) {
                arg_vals[i] = lower_expr(ctx, expr->as.call.args[i]);
            }
            cgt_ir_inst_t *call_inst = cgt_ir_inst_create(IR_OP_CALL, dest, (cgt_ir_value_t){0}, (cgt_ir_value_t){0}, expr->loc);
            if (expr->as.call.callee->kind == EXPR_IDENT) {
                call_inst->aux_str = expr->as.call.callee->as.ident.name;
            } else if (expr->as.call.callee->kind == EXPR_MEMBER) {
                call_inst->aux_str = expr->as.call.callee->as.member.field_name;
            }
            call_inst->extra_args = arg_vals;
            call_inst->extra_arg_count = expr->as.call.arg_count;
            cgt_ir_block_append_inst(ctx->curr_block, call_inst);
            return dest;
        }
        case EXPR_IF: {
            cgt_ir_block_t *then_bb = cgt_ir_block_create(ctx->curr_fn, "if_then");
            cgt_ir_block_t *else_bb = expr->as.if_expr.else_branch ? cgt_ir_block_create(ctx->curr_fn, "if_else") : NULL;
            cgt_ir_block_t *merge_bb = cgt_ir_block_create(ctx->curr_fn, "if_merge");

            cgt_ir_value_t cond_val = lower_expr(ctx, expr->as.if_expr.condition);
            cgt_ir_value_t then_target = { .kind = IR_VAL_BLOCK, .as.block_name = then_bb->name };
            cgt_ir_inst_t *br_cond = cgt_ir_inst_create(IR_OP_BR_COND, (cgt_ir_value_t){0}, cond_val, then_target, expr->loc);
            br_cond->aux_str = else_bb ? else_bb->name : merge_bb->name;
            cgt_ir_block_append_inst(ctx->curr_block, br_cond);

            /* Then block */
            ctx->curr_block = then_bb;
            lower_expr(ctx, expr->as.if_expr.then_branch);
            cgt_ir_value_t merge_target = { .kind = IR_VAL_BLOCK, .as.block_name = merge_bb->name };
            cgt_ir_block_append_inst(ctx->curr_block, cgt_ir_inst_create(IR_OP_BR, (cgt_ir_value_t){0}, merge_target, (cgt_ir_value_t){0}, expr->loc));

            /* Else block if present */
            if (else_bb) {
                ctx->curr_block = else_bb;
                lower_expr(ctx, expr->as.if_expr.else_branch);
                cgt_ir_block_append_inst(ctx->curr_block, cgt_ir_inst_create(IR_OP_BR, (cgt_ir_value_t){0}, merge_target, (cgt_ir_value_t){0}, expr->loc));
            }

            ctx->curr_block = merge_bb;
            return (cgt_ir_value_t){0};
        }
        case EXPR_BLOCK: {
            for (size_t i = 0; i < expr->as.block.stmt_count; i++) {
                lower_stmt(ctx, expr->as.block.stmts[i]);
            }
            if (expr->as.block.result_expr) {
                return lower_expr(ctx, expr->as.block.result_expr);
            }
            return (cgt_ir_value_t){0};
        }
        case EXPR_MEMBER: {
            cgt_ir_value_t dest = cgt_ir_vreg_create(ctx->curr_fn, expr->inferred_type);
            cgt_ir_inst_t *load = cgt_ir_inst_create(IR_OP_LOAD, dest, (cgt_ir_value_t){0}, (cgt_ir_value_t){0}, expr->loc);
            const char *op_sep = ".";
            if (expr->as.member.target && expr->as.member.target->inferred_type &&
                (expr->as.member.target->inferred_type->kind == TYPE_REF ||
                 expr->as.member.target->inferred_type->kind == TYPE_REF_MUT ||
                 expr->as.member.target->inferred_type->kind == TYPE_RAW_PTR)) {
                op_sep = "->";
            }
            if (expr->as.member.target && expr->as.member.target->kind == EXPR_IDENT) {
                char buf[128];
                snprintf(buf, sizeof(buf), "%s%s%s", expr->as.member.target->as.ident.name, op_sep, expr->as.member.field_name);
                load->aux_str = cgt_strdup(buf);
            } else {
                load->aux_str = expr->as.member.field_name;
            }
            cgt_ir_block_append_inst(ctx->curr_block, load);
            return dest;
        }
        case EXPR_STRUCT_INIT: {
            cgt_ir_value_t dest = cgt_ir_vreg_create(ctx->curr_fn, expr->inferred_type);
            cgt_ir_inst_t *inst = cgt_ir_inst_create(IR_OP_LOAD, dest, (cgt_ir_value_t){0}, (cgt_ir_value_t){0}, expr->loc);
            cgt_ir_block_append_inst(ctx->curr_block, inst);
            for (size_t i = 0; i < expr->as.struct_init.field_count; i++) {
                lower_expr(ctx, expr->as.struct_init.fields[i].value);
            }
            return dest;
        }
        case EXPR_UNSAFE:
            return lower_expr(ctx, expr->as.unsafe_expr.block);
        case EXPR_MOVE:
            return lower_expr(ctx, expr->as.move_expr.target);
        case EXPR_BORROW:
        case EXPR_BORROW_MUT: {
            cgt_ir_value_t dest = cgt_ir_vreg_create(ctx->curr_fn, expr->inferred_type);
            cgt_ir_inst_t *inst = cgt_ir_inst_create(IR_OP_LOAD, dest, (cgt_ir_value_t){0}, (cgt_ir_value_t){0}, expr->loc);
            if (expr->as.borrow_expr.target && expr->as.borrow_expr.target->kind == EXPR_IDENT) {
                char buf[128];
                snprintf(buf, sizeof(buf), "&%s", expr->as.borrow_expr.target->as.ident.name);
                inst->aux_str = cgt_strdup(buf);
            }
            cgt_ir_block_append_inst(ctx->curr_block, inst);
            return dest;
        }
        case EXPR_INLINE_ASM: {
            cgt_ir_inst_t *asm_inst = cgt_ir_inst_create(IR_OP_INLINE_ASM, (cgt_ir_value_t){0}, (cgt_ir_value_t){0}, (cgt_ir_value_t){0}, expr->loc);
            asm_inst->aux_str = expr->as.inline_asm.assembly_text;
            cgt_ir_block_append_inst(ctx->curr_block, asm_inst);
            return (cgt_ir_value_t){0};
        }
        default: {
            cgt_ir_value_t v = {0};
            return v;
        }
    }
}

bool cgt_ir_lower_module(cgt_ast_module_t *ast, cgt_ir_module_t *out_ir) {
    cgt_ir_module_init(out_ir, ast->module_name);
    out_ir->ast = ast;

    for (size_t i = 0; i < ast->decl_count; i++) {
        cgt_decl_t *d = ast->declarations[i];
        if (!d || d->kind != DECL_FUNCTION || !d->as.func.body) continue;

        cgt_ir_func_t *fn = cgt_ir_func_create(out_ir, d->name, d->as.func.return_type);
        fn->params = d->as.func.params;
        fn->param_count = d->as.func.param_count;
        fn->is_gpu_kernel = d->as.func.is_gpu_kernel;
        fn->is_simd = d->as.func.is_simd_vectorized;
        fn->is_unsafe = d->as.func.is_unsafe;

        ir_gen_ctx_t ctx;
        ctx.mod = out_ir;
        ctx.curr_fn = fn;
        ctx.curr_block = cgt_ir_block_create(fn, "entry");

        lower_expr(&ctx, d->as.func.body);

        /* Ensure trailing return in entry block if void */
        if (!ctx.curr_block->last || ctx.curr_block->last->op != IR_OP_RET) {
            cgt_ir_inst_t *ret = cgt_ir_inst_create(IR_OP_RET, (cgt_ir_value_t){0}, (cgt_ir_value_t){0}, (cgt_ir_value_t){0}, d->loc);
            cgt_ir_block_append_inst(ctx.curr_block, ret);
        }
    }

    return true;
}

static const char *ir_op_name(cgt_ir_op_t op) {
    switch (op) {
        case IR_OP_ALLOCA: return "alloca";
        case IR_OP_LOAD: return "load";
        case IR_OP_STORE: return "store";
        case IR_OP_GEP: return "gep";
        case IR_OP_ADD: return "add";
        case IR_OP_SUB: return "sub";
        case IR_OP_MUL: return "mul";
        case IR_OP_DIV: return "div";
        case IR_OP_MOD: return "mod";
        case IR_OP_EQ: return "eq";
        case IR_OP_NE: return "ne";
        case IR_OP_LT: return "lt";
        case IR_OP_LE: return "le";
        case IR_OP_GT: return "gt";
        case IR_OP_GE: return "ge";
        case IR_OP_AND: return "and";
        case IR_OP_OR: return "or";
        case IR_OP_XOR: return "xor";
        case IR_OP_SHL: return "shl";
        case IR_OP_SHR: return "shr";
        case IR_OP_BR: return "br";
        case IR_OP_BR_COND: return "br_cond";
        case IR_OP_RET: return "ret";
        case IR_OP_CALL: return "call";
        case IR_OP_INLINE_ASM: return "inline_asm";
        default: return "op";
    }
}

static void print_val(FILE *out, cgt_ir_value_t val) {
    switch (val.kind) {
        case IR_VAL_CONST_INT:
            fprintf(out, "%ld", val.as.int_val);
            break;
        case IR_VAL_CONST_FLOAT:
            fprintf(out, "%f", val.as.float_val);
            break;
        case IR_VAL_CONST_STR:
            fprintf(out, "\"%s\"", val.as.str_val ? val.as.str_val : "");
            break;
        case IR_VAL_VREG:
            fprintf(out, "%%v%u", val.as.vreg_id);
            break;
        case IR_VAL_BLOCK:
            fprintf(out, "@%s", val.as.block_name ? val.as.block_name : "");
            break;
        default:
            fprintf(out, "none");
            break;
    }
}

void cgt_ir_dump(cgt_ir_module_t *mod, FILE *out) {
    fprintf(out, "; === C> Intermediate Representation: %s ===\n\n", mod->module_name);
    cgt_ir_func_t *fn = mod->first_func;
    while (fn) {
        fprintf(out, "define %s%s@%s(",
                fn->is_gpu_kernel ? "gpu_kernel " : "",
                fn->is_unsafe ? "unsafe " : "",
                fn->name);
        for (size_t p = 0; p < fn->param_count; p++) {
            fprintf(out, "%%%s%s", fn->params[p].name, (p + 1 < fn->param_count) ? ", " : "");
        }
        fprintf(out, ") {\n");

        cgt_ir_block_t *b = fn->first_block;
        while (b) {
            fprintf(out, "%s:\n", b->name);
            cgt_ir_inst_t *inst = b->first;
            while (inst) {
                fprintf(out, "    ");
                if (inst->dest.kind == IR_VAL_VREG) {
                    print_val(out, inst->dest);
                    fprintf(out, " = ");
                }
                fprintf(out, "%s", ir_op_name(inst->op));
                if (inst->aux_str) {
                    fprintf(out, " \"%s\"", inst->aux_str);
                }
                if (inst->src1.kind != 0) {
                    fprintf(out, " ");
                    print_val(out, inst->src1);
                }
                if (inst->src2.kind != 0) {
                    fprintf(out, ", ");
                    print_val(out, inst->src2);
                }
                if (inst->extra_arg_count > 0) {
                    fprintf(out, " (");
                    for (size_t i = 0; i < inst->extra_arg_count; i++) {
                        print_val(out, inst->extra_args[i]);
                        if (i + 1 < inst->extra_arg_count) fprintf(out, ", ");
                    }
                    fprintf(out, ")");
                }
                fprintf(out, "\n");
                inst = inst->next;
            }
            b = b->next;
        }
        fprintf(out, "}\n\n");
        fn = fn->next;
    }
}
