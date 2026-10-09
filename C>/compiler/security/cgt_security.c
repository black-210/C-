#include "cgt_security.h"
#include "cgt_typechecker.h"

void cgt_security_auditor_init(cgt_security_auditor_t *auditor, bool strict_mode) {
    auditor->findings = NULL;
    auditor->count = 0;
    auditor->capacity = 0;
    auditor->strict_mode = strict_mode;
    auditor->error_count = 0;
    auditor->warning_count = 0;
}

void cgt_security_auditor_free(cgt_security_auditor_t *auditor) {
    if (auditor->findings) {
        free(auditor->findings);
        auditor->findings = NULL;
    }
    auditor->count = 0;
    auditor->capacity = 0;
}

void cgt_security_report_finding(cgt_security_auditor_t *auditor, cgt_security_rule_t rule, cgt_loc_t loc, bool is_fatal, const char *fmt, ...) {
    char buffer[512];
    va_list args;
    va_start(args, fmt);
    vsnprintf(buffer, sizeof(buffer), fmt, args);
    va_end(args);

    if (auditor->count >= auditor->capacity) {
        auditor->capacity = auditor->capacity ? auditor->capacity * 2 : 16;
        auditor->findings = (cgt_security_finding_t *)cgt_realloc(auditor->findings, auditor->capacity * sizeof(cgt_security_finding_t));
    }
    cgt_security_finding_t *f = &auditor->findings[auditor->count++];
    f->rule = rule;
    f->description = cgt_strdup(buffer);
    f->loc = loc;
    f->is_fatal = is_fatal || auditor->strict_mode;

    if (f->is_fatal) {
        auditor->error_count++;
        cgt_diag_report(CGT_DIAG_SECURITY_ALERT, loc, "[FATAL SECURITY RULE]: %s", buffer);
    } else {
        auditor->warning_count++;
        cgt_diag_report(CGT_DIAG_SECURITY_ALERT, loc, "[SECURITY WARNING]: %s", buffer);
    }
}

static void audit_expr(cgt_security_auditor_t *auditor, cgt_expr_t *expr) {
    if (!expr) return;

    switch (expr->kind) {
        case EXPR_BINARY:
            /* Detect constant integer overflow: e.g. INT_MAX + 1 */
            if ((expr->as.binary.op == BIN_ADD || expr->as.binary.op == BIN_MUL) &&
                expr->as.binary.left->kind == EXPR_INT_LIT &&
                expr->as.binary.right->kind == EXPR_INT_LIT) {
                int64_t a = expr->as.binary.left->as.int_val;
                int64_t b = expr->as.binary.right->as.int_val;
                if (expr->as.binary.op == BIN_ADD && b > 0 && a > INT64_MAX - b) {
                    cgt_security_report_finding(auditor, SEC_RULE_INT_OVERFLOW_RISK, expr->loc, true,
                                                "Compile-time signed integer overflow detected in addition (%ld + %ld)", a, b);
                } else if (expr->as.binary.op == BIN_MUL && a > 0 && b > 0 && a > INT64_MAX / b) {
                    cgt_security_report_finding(auditor, SEC_RULE_INT_OVERFLOW_RISK, expr->loc, true,
                                                "Compile-time signed integer overflow detected in multiplication (%ld * %ld)", a, b);
                }
            }
            /* Detect division by zero */
            if ((expr->as.binary.op == BIN_DIV || expr->as.binary.op == BIN_MOD) &&
                expr->as.binary.right->kind == EXPR_INT_LIT &&
                expr->as.binary.right->as.int_val == 0) {
                cgt_security_report_finding(auditor, SEC_RULE_INT_OVERFLOW_RISK, expr->loc, true,
                                            "Static division or modulo by zero");
            }
            audit_expr(auditor, expr->as.binary.left);
            audit_expr(auditor, expr->as.binary.right);
            break;

        case EXPR_INDEX:
            /* Constant array out-of-bounds check */
            if (expr->as.index.target && expr->as.index.target->inferred_type &&
                expr->as.index.target->inferred_type->kind == TYPE_ARRAY &&
                expr->as.index.index->kind == EXPR_INT_LIT) {
                size_t arr_sz = expr->as.index.target->inferred_type->array_size;
                int64_t idx = expr->as.index.index->as.int_val;
                if (idx < 0 || (size_t)idx >= arr_sz) {
                    cgt_security_report_finding(auditor, SEC_RULE_OUT_OF_BOUNDS_STATIC, expr->loc, true,
                                                "Array out-of-bounds: index %ld is outside fixed array of size %zu",
                                                idx, arr_sz);
                }
            }
            audit_expr(auditor, expr->as.index.target);
            audit_expr(auditor, expr->as.index.index);
            break;

        case EXPR_CAST:
            /* Detect unsafe truncation or pointer reinterpretation */
            if (expr->as.cast.target_type && expr->as.cast.expr->inferred_type) {
                cgt_type_t *from = expr->as.cast.expr->inferred_type;
                cgt_type_t *to = expr->as.cast.target_type;
                if (cgt_type_is_pointer_or_ref(from) && to->kind == TYPE_I32) {
                    cgt_security_report_finding(auditor, SEC_RULE_UNSAFE_CAST, expr->loc, false,
                                                "Pointer truncated to 32-bit integer (%s as i32) poses address corruption risk",
                                                cgt_type_to_string(from));
                }
            }
            audit_expr(auditor, expr->as.cast.expr);
            break;

        case EXPR_BLOCK:
            for (size_t i = 0; i < expr->as.block.stmt_count; i++) {
                cgt_stmt_t *st = expr->as.block.stmts[i];
                if (st->kind == STMT_LET && st->as.let_stmt.init) {
                    audit_expr(auditor, st->as.let_stmt.init);
                } else if (st->kind == STMT_ASSIGN) {
                    audit_expr(auditor, st->as.assign_stmt.value);
                } else if (st->kind == STMT_EXPR) {
                    audit_expr(auditor, st->as.expr_stmt.expr);
                } else if (st->kind == STMT_RETURN && st->as.return_stmt.value) {
                    audit_expr(auditor, st->as.return_stmt.value);
                }
            }
            if (expr->as.block.result_expr) audit_expr(auditor, expr->as.block.result_expr);
            break;

        case EXPR_CALL:
            audit_expr(auditor, expr->as.call.callee);
            for (size_t i = 0; i < expr->as.call.arg_count; i++) {
                audit_expr(auditor, expr->as.call.args[i]);
            }
            break;

        default:
            break;
    }
}

bool cgt_security_audit_module(cgt_security_auditor_t *auditor, cgt_ast_module_t *module) {
    for (size_t i = 0; i < module->decl_count; i++) {
        cgt_decl_t *d = module->declarations[i];
        if (d && d->kind == DECL_FUNCTION && d->as.func.body) {
            audit_expr(auditor, d->as.func.body);
        }
    }
    return auditor->error_count == 0;
}

static void print_finding(const cgt_security_finding_t *finding) {
    printf("%s:%u:%u: %s\n", finding->loc.filename, (unsigned int)finding->loc.line, (unsigned int)finding->loc.col, finding->description);
}

static void print_summary(const cgt_security_auditor_t *auditor) {
    printf("Security audit summary:\n");
    printf("  %zu findings found\n", auditor->count);
    printf("  %u errors\n", auditor->error_count);
    printf("  %u warnings\n", auditor->warning_count);
}

bool cgt_security_print_findings(cgt_security_auditor_t *auditor) {
    if (auditor->count == 0) return true;
    print_summary(auditor);
    for (size_t i = 0; i < auditor->count; i++) {
        print_finding(&auditor->findings[i]);
    }
    return auditor->error_count == 0;
}