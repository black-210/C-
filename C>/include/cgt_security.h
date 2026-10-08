#ifndef CGT_SECURITY_H
#define CGT_SECURITY_H

#include "cgt_common.h"
#include "cgt_ast.h"
#include "cgt_semantic.h"

typedef enum {
    SEC_RULE_INT_OVERFLOW_RISK,
    SEC_RULE_UNCHECKED_DEREF,
    SEC_RULE_UNSAFE_CAST,
    SEC_RULE_OUT_OF_BOUNDS_STATIC,
    SEC_RULE_FORMAT_STRING_RISK,
    SEC_RULE_RAW_POINTER_IN_SAFE_CODE,
    SEC_RULE_DANGLING_STACK_REF
} cgt_security_rule_t;

typedef struct {
    cgt_security_rule_t rule;
    const char *description;
    cgt_loc_t loc;
    bool is_fatal;
} cgt_security_finding_t;

typedef struct {
    cgt_security_finding_t *findings;
    size_t count;
    size_t capacity;
    bool strict_mode;
    uint32_t error_count;
    uint32_t warning_count;
} cgt_security_auditor_t;

void cgt_security_auditor_init(cgt_security_auditor_t *auditor, bool strict_mode);
void cgt_security_auditor_free(cgt_security_auditor_t *auditor);

void cgt_security_report_finding(cgt_security_auditor_t *auditor, cgt_security_rule_t rule, cgt_loc_t loc, bool is_fatal, const char *fmt, ...);
bool cgt_security_audit_module(cgt_security_auditor_t *auditor, cgt_ast_module_t *module);

#endif /* CGT_SECURITY_H */
