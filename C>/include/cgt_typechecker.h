#ifndef CGT_TYPECHECKER_H
#define CGT_TYPECHECKER_H

#include "cgt_common.h"
#include "cgt_ast.h"
#include "cgt_semantic.h"

typedef struct {
    cgt_analyzer_t *analyzer;
    cgt_type_t *expected_return_type;
    uint32_t error_count;
} cgt_typechecker_t;

void cgt_typechecker_init(cgt_typechecker_t *tc, cgt_analyzer_t *analyzer);
bool cgt_typechecker_check_module(cgt_typechecker_t *tc, cgt_ast_module_t *module);
cgt_type_t *cgt_typechecker_check_expr(cgt_typechecker_t *tc, cgt_expr_t *expr);
bool cgt_typechecker_check_stmt(cgt_typechecker_t *tc, cgt_stmt_t *stmt);

/* Type utilities */
bool cgt_type_equals(const cgt_type_t *a, const cgt_type_t *b);
bool cgt_type_is_assignable(const cgt_type_t *target, const cgt_type_t *source);
bool cgt_type_is_numeric(const cgt_type_t *t);
bool cgt_type_is_integer(const cgt_type_t *t);
bool cgt_type_is_pointer_or_ref(const cgt_type_t *t);
const char *cgt_type_to_string(const cgt_type_t *t);

#endif /* CGT_TYPECHECKER_H */
