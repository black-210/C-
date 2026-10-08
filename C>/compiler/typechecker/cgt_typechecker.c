#include "cgt_typechecker.h"

void cgt_typechecker_init(cgt_typechecker_t *tc, cgt_analyzer_t *analyzer) {
    tc->analyzer = analyzer;
    tc->expected_return_type = NULL;
    tc->error_count = 0;
}

bool cgt_type_equals(const cgt_type_t *a, const cgt_type_t *b) {
    if (a == b) return true;
    if (!a || !b) return false;
    if (a->kind != b->kind) return false;

    switch (a->kind) {
        case TYPE_CUSTOM:
            return a->name && b->name && strcmp(a->name, b->name) == 0;
        case TYPE_RAW_PTR:
        case TYPE_CONST_PTR:
        case TYPE_REF:
        case TYPE_REF_MUT:
        case TYPE_OWNED:
        case TYPE_ARRAY:
        case TYPE_SLICE:
        case TYPE_GPU_BUFFER:
            return cgt_type_equals(a->inner, b->inner);
        default:
            return true;
    }
}

bool cgt_type_is_numeric(const cgt_type_t *t) {
    if (!t) return false;
    return (t->kind >= TYPE_I8 && t->kind <= TYPE_F64);
}

bool cgt_type_is_integer(const cgt_type_t *t) {
    if (!t) return false;
    return (t->kind >= TYPE_I8 && t->kind <= TYPE_U64);
}

bool cgt_type_is_pointer_or_ref(const cgt_type_t *t) {
    if (!t) return false;
    return (t->kind == TYPE_RAW_PTR || t->kind == TYPE_CONST_PTR ||
            t->kind == TYPE_REF || t->kind == TYPE_REF_MUT || t->kind == TYPE_OWNED);
}

const char *cgt_type_to_string(const cgt_type_t *t) {
    if (!t) return "unknown";
    if (t->name) return t->name;
    switch (t->kind) {
        case TYPE_VOID: return "void";
        case TYPE_BOOL: return "bool";
        case TYPE_I8: return "i8";
        case TYPE_I16: return "i16";
        case TYPE_I32: return "i32";
        case TYPE_I64: return "i64";
        case TYPE_U8: return "u8";
        case TYPE_U16: return "u16";
        case TYPE_U32: return "u32";
        case TYPE_U64: return "u64";
        case TYPE_F32: return "f32";
        case TYPE_F64: return "f64";
        case TYPE_CHAR: return "char";
        case TYPE_STR: return "str";
        case TYPE_RAW_PTR: return "*raw";
        case TYPE_CONST_PTR: return "*const";
        case TYPE_REF: return "&";
        case TYPE_REF_MUT: return "&mut";
        case TYPE_OWNED: return "own";
        default: return "type";
    }
}

bool cgt_type_is_assignable(const cgt_type_t *target, const cgt_type_t *source) {
    if (!target || !source) return true;
    if (cgt_type_equals(target, source)) return true;

    /* Allow initializing or moving into own<T> from T or own<T> */
    if (target->kind == TYPE_OWNED && target->inner) {
        if (cgt_type_equals(target->inner, source) ||
            (source->kind == TYPE_OWNED && cgt_type_equals(target->inner, source->inner))) {
            return true;
        }
    }

    /* Allow int literals / compatible numeric coercion */
    if (cgt_type_is_integer(target) && cgt_type_is_integer(source)) {
        return true;
    }
    if (target->kind == TYPE_F64 && (source->kind == TYPE_F32 || cgt_type_is_integer(source))) {
        return true;
    }
    return false;
}

cgt_type_t *cgt_typechecker_check_expr(cgt_typechecker_t *tc, cgt_expr_t *expr) {
    if (!expr) return cgt_type_primitive(TYPE_VOID, cgt_loc_make(NULL, 0, 0));

    cgt_type_t *res_type = NULL;

    switch (expr->kind) {
        case EXPR_INT_LIT:
            res_type = cgt_type_primitive(TYPE_I32, expr->loc);
            break;
        case EXPR_FLOAT_LIT:
            res_type = cgt_type_primitive(TYPE_F64, expr->loc);
            break;
        case EXPR_STRING_LIT:
            res_type = cgt_type_primitive(TYPE_STR, expr->loc);
            break;
        case EXPR_CHAR_LIT:
            res_type = cgt_type_primitive(TYPE_CHAR, expr->loc);
            break;
        case EXPR_BOOL_LIT:
            res_type = cgt_type_primitive(TYPE_BOOL, expr->loc);
            break;
        case EXPR_NULL_LIT:
            res_type = cgt_type_ptr(cgt_type_primitive(TYPE_VOID, expr->loc), false, expr->loc);
            break;
        case EXPR_IDENT: {
            cgt_symbol_t *sym = cgt_scope_lookup(tc->analyzer->current_scope, expr->as.ident.name);
            if (!sym) {
                cgt_diag_report(CGT_DIAG_ERROR, expr->loc, "Undeclared identifier '%s'", expr->as.ident.name);
                tc->error_count++;
                res_type = cgt_type_primitive(TYPE_VOID, expr->loc);
            } else {
                res_type = sym->type ? sym->type : cgt_type_primitive(TYPE_I32, expr->loc);
            }
            break;
        }
        case EXPR_BINARY: {
            cgt_type_t *lt = cgt_typechecker_check_expr(tc, expr->as.binary.left);
            cgt_type_t *rt = cgt_typechecker_check_expr(tc, expr->as.binary.right);

            switch (expr->as.binary.op) {
                case BIN_EQ:
                case BIN_NE:
                case BIN_LT:
                case BIN_LE:
                case BIN_GT:
                case BIN_GE:
                case BIN_LOG_AND:
                case BIN_LOG_OR:
                    res_type = cgt_type_primitive(TYPE_BOOL, expr->loc);
                    break;
                default:
                    res_type = lt ? lt : rt;
                    break;
            }
            break;
        }
        case EXPR_UNARY: {
            cgt_type_t *op_type = cgt_typechecker_check_expr(tc, expr->as.unary.operand);
            if (expr->as.unary.op == UNARY_NOT) {
                res_type = cgt_type_primitive(TYPE_BOOL, expr->loc);
            } else if (expr->as.unary.op == UNARY_DEREF) {
                if (op_type && (op_type->kind == TYPE_RAW_PTR || op_type->kind == TYPE_REF ||
                                op_type->kind == TYPE_REF_MUT || op_type->kind == TYPE_OWNED)) {
                    res_type = op_type->inner;
                } else {
                    res_type = op_type;
                }
            } else {
                res_type = op_type;
            }
            break;
        }
        case EXPR_CALL: {
            cgt_type_t *fn_type = cgt_typechecker_check_expr(tc, expr->as.call.callee);
            for (size_t i = 0; i < expr->as.call.arg_count; i++) {
                cgt_typechecker_check_expr(tc, expr->as.call.args[i]);
            }
            if (fn_type && fn_type->kind == TYPE_FN && fn_type->return_type) {
                res_type = fn_type->return_type;
            } else if (fn_type) {
                res_type = fn_type;
            } else {
                res_type = cgt_type_primitive(TYPE_I32, expr->loc);
            }
            break;
        }
        case EXPR_MEMBER: {
            cgt_type_t *target_t = cgt_typechecker_check_expr(tc, expr->as.member.target);
            res_type = cgt_type_primitive(TYPE_I32, expr->loc);
            if (target_t) {
                const char *st_name = (target_t->kind == TYPE_CUSTOM) ? target_t->name :
                                      (target_t->inner && target_t->inner->kind == TYPE_CUSTOM) ? target_t->inner->name : NULL;
                if (st_name && tc->analyzer && tc->analyzer->module) {
                    for (size_t i = 0; i < tc->analyzer->module->decl_count; i++) {
                        cgt_decl_t *d = tc->analyzer->module->declarations[i];
                        if (d && d->kind == DECL_STRUCT && d->name && strcmp(d->name, st_name) == 0) {
                            for (size_t f = 0; f < d->as.struct_decl.field_count; f++) {
                                if (strcmp(d->as.struct_decl.fields[f].name, expr->as.member.field_name) == 0) {
                                    res_type = d->as.struct_decl.fields[f].type;
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }
            }
            break;
        }
        case EXPR_INDEX: {
            cgt_type_t *target_t = cgt_typechecker_check_expr(tc, expr->as.index.target);
            cgt_typechecker_check_expr(tc, expr->as.index.index);
            res_type = (target_t && target_t->inner) ? target_t->inner : cgt_type_primitive(TYPE_I32, expr->loc);
            break;
        }
        case EXPR_CAST: {
            cgt_typechecker_check_expr(tc, expr->as.cast.expr);
            res_type = expr->as.cast.target_type;
            break;
        }
        case EXPR_STRUCT_INIT: {
            for (size_t i = 0; i < expr->as.struct_init.field_count; i++) {
                cgt_typechecker_check_expr(tc, expr->as.struct_init.fields[i].value);
            }
            res_type = cgt_type_named(expr->as.struct_init.struct_name, expr->loc);
            break;
        }
        case EXPR_BLOCK: {
            cgt_scope_enter(tc->analyzer, false, false);
            for (size_t i = 0; i < expr->as.block.stmt_count; i++) {
                cgt_typechecker_check_stmt(tc, expr->as.block.stmts[i]);
            }
            if (expr->as.block.result_expr) {
                res_type = cgt_typechecker_check_expr(tc, expr->as.block.result_expr);
            } else {
                res_type = cgt_type_primitive(TYPE_VOID, expr->loc);
            }
            cgt_scope_leave(tc->analyzer);
            break;
        }
        case EXPR_IF: {
            cgt_typechecker_check_expr(tc, expr->as.if_expr.condition);
            res_type = cgt_typechecker_check_expr(tc, expr->as.if_expr.then_branch);
            if (expr->as.if_expr.else_branch) {
                cgt_typechecker_check_expr(tc, expr->as.if_expr.else_branch);
            }
            break;
        }
        case EXPR_UNSAFE: {
            cgt_scope_enter(tc->analyzer, true, false);
            res_type = cgt_typechecker_check_expr(tc, expr->as.unsafe_expr.block);
            cgt_scope_leave(tc->analyzer);
            break;
        }
        case EXPR_MOVE: {
            res_type = cgt_typechecker_check_expr(tc, expr->as.move_expr.target);
            break;
        }
        case EXPR_BORROW:
        case EXPR_BORROW_MUT: {
            cgt_type_t *inner = cgt_typechecker_check_expr(tc, expr->as.borrow_expr.target);
            res_type = cgt_type_ref(inner, expr->as.borrow_expr.is_mut, expr->loc);
            break;
        }
        case EXPR_SIZEOF: {
            res_type = cgt_type_primitive(TYPE_U64, expr->loc);
            break;
        }
        case EXPR_INLINE_ASM: {
            res_type = cgt_type_primitive(TYPE_VOID, expr->loc);
            break;
        }
        default:
            res_type = cgt_type_primitive(TYPE_VOID, expr->loc);
            break;
    }

    expr->inferred_type = res_type;
    return res_type;
}

bool cgt_typechecker_check_stmt(cgt_typechecker_t *tc, cgt_stmt_t *stmt) {
    if (!stmt) return true;

    switch (stmt->kind) {
        case STMT_LET: {
            cgt_type_t *init_type = NULL;
            if (stmt->as.let_stmt.init) {
                init_type = cgt_typechecker_check_expr(tc, stmt->as.let_stmt.init);
            }
            cgt_type_t *var_type = stmt->as.let_stmt.type;
            if (!var_type && init_type) {
                var_type = init_type;
                stmt->as.let_stmt.type = var_type;
            }
            if (var_type && init_type && !cgt_type_is_assignable(var_type, init_type)) {
                cgt_diag_report(CGT_DIAG_ERROR, stmt->loc,
                                "Type mismatch initializing variable '%s': expected %s, got %s",
                                stmt->as.let_stmt.name,
                                cgt_type_to_string(var_type),
                                cgt_type_to_string(init_type));
                tc->error_count++;
            }
            cgt_symbol_t *sym = (cgt_symbol_t *)cgt_calloc(1, sizeof(cgt_symbol_t));
            sym->name = stmt->as.let_stmt.name;
            sym->kind = SYM_VAR;
            sym->type = var_type ? var_type : cgt_type_primitive(TYPE_I32, stmt->loc);
            sym->is_mut = stmt->as.let_stmt.is_mut;
            sym->loc = stmt->loc;
            cgt_scope_insert(tc->analyzer->current_scope, sym);
            break;
        }
        case STMT_ASSIGN: {
            cgt_type_t *target_t = cgt_typechecker_check_expr(tc, stmt->as.assign_stmt.target);
            cgt_type_t *val_t = cgt_typechecker_check_expr(tc, stmt->as.assign_stmt.value);
            if (target_t && val_t && !cgt_type_is_assignable(target_t, val_t)) {
                cgt_diag_report(CGT_DIAG_ERROR, stmt->loc,
                                "Type mismatch in assignment: target is %s, assigned value is %s",
                                cgt_type_to_string(target_t), cgt_type_to_string(val_t));
                tc->error_count++;
            }
            break;
        }
        case STMT_RETURN: {
            cgt_type_t *val_t = NULL;
            if (stmt->as.return_stmt.value) {
                val_t = cgt_typechecker_check_expr(tc, stmt->as.return_stmt.value);
            } else {
                val_t = cgt_type_primitive(TYPE_VOID, stmt->loc);
            }
            if (tc->expected_return_type && val_t && !cgt_type_is_assignable(tc->expected_return_type, val_t)) {
                cgt_diag_report(CGT_DIAG_ERROR, stmt->loc,
                                "Return type mismatch: function expects %s, returning %s",
                                cgt_type_to_string(tc->expected_return_type),
                                cgt_type_to_string(val_t));
                tc->error_count++;
            }
            break;
        }
        case STMT_EXPR:
            cgt_typechecker_check_expr(tc, stmt->as.expr_stmt.expr);
            break;
        case STMT_WHILE:
            cgt_typechecker_check_expr(tc, stmt->as.while_stmt.condition);
            cgt_typechecker_check_expr(tc, stmt->as.while_stmt.body);
            break;
        case STMT_DEFER:
            cgt_typechecker_check_expr(tc, stmt->as.defer_stmt.deferred_expr);
            break;
        default:
            break;
    }
    return true;
}

bool cgt_typechecker_check_module(cgt_typechecker_t *tc, cgt_ast_module_t *module) {
    for (size_t i = 0; i < module->decl_count; i++) {
        cgt_decl_t *d = module->declarations[i];
        if (!d) continue;

        if (d->kind == DECL_FUNCTION && d->as.func.body) {
            cgt_scope_enter(tc->analyzer, d->as.func.is_unsafe, d->as.func.is_gpu_kernel);
            tc->expected_return_type = d->as.func.return_type;

            /* Register parameters into function scope */
            for (size_t p = 0; p < d->as.func.param_count; p++) {
                cgt_param_t *param = &d->as.func.params[p];
                cgt_symbol_t *sym = (cgt_symbol_t *)cgt_calloc(1, sizeof(cgt_symbol_t));
                sym->name = param->name;
                sym->kind = SYM_VAR;
                sym->type = param->type;
                sym->is_mut = param->is_mut;
                sym->loc = param->loc;
                cgt_scope_insert(tc->analyzer->current_scope, sym);
            }

            cgt_typechecker_check_expr(tc, d->as.func.body);
            cgt_scope_leave(tc->analyzer);
        }
    }
    return tc->error_count == 0;
}
