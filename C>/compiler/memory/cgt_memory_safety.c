#include "cgt_memory_safety.h"

void cgt_borrow_checker_init(cgt_borrow_checker_t *bc) {
    bc->vars = NULL;
    bc->count = 0;
    bc->capacity = 0;
    bc->current_depth = 0;
    bc->inside_unsafe = false;
    bc->safety_violations = 0;
}

void cgt_borrow_checker_free(cgt_borrow_checker_t *bc) {
    if (bc->vars) {
        free(bc->vars);
        bc->vars = NULL;
    }
    bc->count = 0;
    bc->capacity = 0;
}

static cgt_var_track_t *find_var(cgt_borrow_checker_t *bc, const char *name) {
    if (!name) return NULL;
    for (size_t i = bc->count; i > 0; i--) {
        if (strcmp(bc->vars[i - 1].var_name, name) == 0) {
            return &bc->vars[i - 1];
        }
    }
    return NULL;
}

bool cgt_borrow_checker_track_var(cgt_borrow_checker_t *bc, const char *name, cgt_loc_t loc, bool is_init) {
    if (bc->count >= bc->capacity) {
        bc->capacity = bc->capacity ? bc->capacity * 2 : 16;
        bc->vars = (cgt_var_track_t *)cgt_realloc(bc->vars, bc->capacity * sizeof(cgt_var_track_t));
    }
    cgt_var_track_t *vt = &bc->vars[bc->count++];
    vt->var_name = cgt_strdup(name);
    vt->state = is_init ? OWN_STATE_ACTIVE_OWNED : OWN_STATE_UNINITIALIZED;
    vt->shared_borrow_count = 0;
    vt->state_change_loc = loc;
    vt->declaration_loc = loc;
    vt->is_in_unsafe_block = bc->inside_unsafe;
    vt->scope_depth = bc->current_depth;
    return true;
}

bool cgt_borrow_checker_transfer_move(cgt_borrow_checker_t *bc, const char *name, cgt_loc_t loc) {
    cgt_var_track_t *vt = find_var(bc, name);
    if (!vt) return true; /* Unknown or global */

    if (vt->state == OWN_STATE_MOVED) {
        cgt_diag_report(CGT_DIAG_ERROR, loc,
                        "Memory Safety Violation: Use of moved value '%s' (previously moved at %s:%u)",
                        name, vt->state_change_loc.filename, vt->state_change_loc.line);
        bc->safety_violations++;
        return false;
    }

    if (vt->state == OWN_STATE_SHARED_BORROWED || vt->state == OWN_STATE_MUT_BORROWED) {
        cgt_diag_report(CGT_DIAG_ERROR, loc,
                        "Memory Safety Violation: Cannot move '%s' while active borrow exists",
                        name);
        bc->safety_violations++;
        return false;
    }

    vt->state = OWN_STATE_MOVED;
    vt->state_change_loc = loc;
    return true;
}

bool cgt_borrow_checker_borrow_shared(cgt_borrow_checker_t *bc, const char *name, cgt_loc_t loc) {
    cgt_var_track_t *vt = find_var(bc, name);
    if (!vt) return true;

    if (vt->state == OWN_STATE_MOVED) {
        cgt_diag_report(CGT_DIAG_ERROR, loc,
                        "Memory Safety Violation: Cannot borrow moved value '%s'", name);
        bc->safety_violations++;
        return false;
    }

    if (vt->state == OWN_STATE_MUT_BORROWED) {
        cgt_diag_report(CGT_DIAG_ERROR, loc,
                        "Memory Safety Violation: Cannot borrow '%s' as shared while already mutably borrowed at %s:%u",
                        name, vt->state_change_loc.filename, vt->state_change_loc.line);
        bc->safety_violations++;
        return false;
    }

    vt->state = OWN_STATE_SHARED_BORROWED;
    vt->shared_borrow_count++;
    vt->state_change_loc = loc;
    return true;
}

bool cgt_borrow_checker_borrow_mut(cgt_borrow_checker_t *bc, const char *name, cgt_loc_t loc) {
    cgt_var_track_t *vt = find_var(bc, name);
    if (!vt) return true;

    if (vt->state == OWN_STATE_MOVED) {
        cgt_diag_report(CGT_DIAG_ERROR, loc,
                        "Memory Safety Violation: Cannot mutably borrow moved value '%s'", name);
        bc->safety_violations++;
        return false;
    }

    if (vt->state == OWN_STATE_SHARED_BORROWED) {
        cgt_diag_report(CGT_DIAG_ERROR, loc,
                        "Memory Safety Violation: Cannot borrow '%s' as mutable while %u active shared borrow(s) exist",
                        name, vt->shared_borrow_count);
        bc->safety_violations++;
        return false;
    }

    if (vt->state == OWN_STATE_MUT_BORROWED) {
        cgt_diag_report(CGT_DIAG_ERROR, loc,
                        "Memory Safety Violation: Cannot borrow '%s' as mutable more than once simultaneously",
                        name);
        bc->safety_violations++;
        return false;
    }

    vt->state = OWN_STATE_MUT_BORROWED;
    vt->state_change_loc = loc;
    return true;
}

bool cgt_borrow_checker_access(cgt_borrow_checker_t *bc, const char *name, cgt_loc_t loc, bool is_write) {
    cgt_var_track_t *vt = find_var(bc, name);
    if (!vt) return true;

    if (vt->state == OWN_STATE_MOVED) {
        cgt_diag_report(CGT_DIAG_ERROR, loc,
                        "Memory Safety Violation: Use of moved value '%s' (moved at %s:%u)",
                        name, vt->state_change_loc.filename, vt->state_change_loc.line);
        bc->safety_violations++;
        return false;
    }

    if (is_write && vt->state == OWN_STATE_SHARED_BORROWED) {
        cgt_diag_report(CGT_DIAG_ERROR, loc,
                        "Memory Safety Violation: Cannot mutate '%s' while borrowed", name);
        bc->safety_violations++;
        return false;
    }

    return true;
}

bool cgt_borrow_checker_release_borrow(cgt_borrow_checker_t *bc, const char *name) {
    cgt_var_track_t *vt = find_var(bc, name);
    if (!vt) return true;
    if (vt->state == OWN_STATE_MUT_BORROWED) {
        vt->state = OWN_STATE_ACTIVE_OWNED;
    } else if (vt->state == OWN_STATE_SHARED_BORROWED) {
        if (vt->shared_borrow_count > 0) vt->shared_borrow_count--;
        if (vt->shared_borrow_count == 0) vt->state = OWN_STATE_ACTIVE_OWNED;
    }
    return true;
}

static void check_expr_safety(cgt_borrow_checker_t *bc, cgt_expr_t *expr) {
    if (!expr) return;

    switch (expr->kind) {
        case EXPR_IDENT:
            cgt_borrow_checker_access(bc, expr->as.ident.name, expr->loc, false);
            break;
        case EXPR_MOVE:
            if (expr->as.move_expr.target && expr->as.move_expr.target->kind == EXPR_IDENT) {
                cgt_borrow_checker_transfer_move(bc, expr->as.move_expr.target->as.ident.name, expr->loc);
            }
            break;
        case EXPR_BORROW:
            if (expr->as.borrow_expr.target && expr->as.borrow_expr.target->kind == EXPR_IDENT) {
                cgt_borrow_checker_borrow_shared(bc, expr->as.borrow_expr.target->as.ident.name, expr->loc);
            }
            break;
        case EXPR_BORROW_MUT:
            if (expr->as.borrow_expr.target && expr->as.borrow_expr.target->kind == EXPR_IDENT) {
                cgt_borrow_checker_borrow_mut(bc, expr->as.borrow_expr.target->as.ident.name, expr->loc);
            }
            break;
        case EXPR_UNSAFE: {
            bool prev_unsafe = bc->inside_unsafe;
            bc->inside_unsafe = true;
            check_expr_safety(bc, expr->as.unsafe_expr.block);
            bc->inside_unsafe = prev_unsafe;
            break;
        }
        case EXPR_BINARY:
            check_expr_safety(bc, expr->as.binary.left);
            check_expr_safety(bc, expr->as.binary.right);
            break;
        case EXPR_UNARY:
            if (expr->as.unary.op == UNARY_DEREF && !bc->inside_unsafe) {
                /* In C>, dereferencing raw pointers requires unsafe context */
                if (expr->as.unary.operand->inferred_type &&
                    (expr->as.unary.operand->inferred_type->kind == TYPE_RAW_PTR ||
                     expr->as.unary.operand->inferred_type->kind == TYPE_CONST_PTR)) {
                    cgt_diag_report(CGT_DIAG_ERROR, expr->loc,
                                    "Memory Safety Violation: Dereferencing raw pointer requires an 'unsafe' block");
                    bc->safety_violations++;
                }
            }
            check_expr_safety(bc, expr->as.unary.operand);
            break;
        case EXPR_CALL:
            check_expr_safety(bc, expr->as.call.callee);
            for (size_t i = 0; i < expr->as.call.arg_count; i++) {
                check_expr_safety(bc, expr->as.call.args[i]);
            }
            for (size_t i = 0; i < expr->as.call.arg_count; i++) {
                cgt_expr_t *arg = expr->as.call.args[i];
                if ((arg->kind == EXPR_BORROW || arg->kind == EXPR_BORROW_MUT) &&
                    arg->as.borrow_expr.target && arg->as.borrow_expr.target->kind == EXPR_IDENT) {
                    cgt_borrow_checker_release_borrow(bc, arg->as.borrow_expr.target->as.ident.name);
                }
            }
            break;
        case EXPR_BLOCK:
            bc->current_depth++;
            for (size_t i = 0; i < expr->as.block.stmt_count; i++) {
                cgt_stmt_t *st = expr->as.block.stmts[i];
                if (st->kind == STMT_LET) {
                    cgt_borrow_checker_track_var(bc, st->as.let_stmt.name, st->loc, st->as.let_stmt.init != NULL);
                    if (st->as.let_stmt.init) check_expr_safety(bc, st->as.let_stmt.init);
                } else if (st->kind == STMT_ASSIGN) {
                    if (st->as.assign_stmt.target && st->as.assign_stmt.target->kind == EXPR_IDENT) {
                        cgt_borrow_checker_access(bc, st->as.assign_stmt.target->as.ident.name, st->loc, true);
                    }
                    check_expr_safety(bc, st->as.assign_stmt.value);
                } else if (st->kind == STMT_RETURN) {
                    if (st->as.return_stmt.value) check_expr_safety(bc, st->as.return_stmt.value);
                } else if (st->kind == STMT_EXPR) {
                    check_expr_safety(bc, st->as.expr_stmt.expr);
                }
            }
            if (expr->as.block.result_expr) check_expr_safety(bc, expr->as.block.result_expr);
            bc->current_depth--;
            break;
        case EXPR_IF:
            check_expr_safety(bc, expr->as.if_expr.condition);
            check_expr_safety(bc, expr->as.if_expr.then_branch);
            if (expr->as.if_expr.else_branch) check_expr_safety(bc, expr->as.if_expr.else_branch);
            break;
        default:
            break;
    }
}

bool cgt_memory_safety_check_module(cgt_borrow_checker_t *bc, cgt_ast_module_t *module) {
    for (size_t i = 0; i < module->decl_count; i++) {
        cgt_decl_t *d = module->declarations[i];
        if (d && d->kind == DECL_FUNCTION && d->as.func.body) {
            bc->count = 0;
            bc->inside_unsafe = d->as.func.is_unsafe;
            for (size_t p = 0; p < d->as.func.param_count; p++) {
                cgt_borrow_checker_track_var(bc, d->as.func.params[p].name, d->as.func.params[p].loc, true);
            }
            check_expr_safety(bc, d->as.func.body);
        }
    }
    return bc->safety_violations == 0;
}
