#ifndef CGT_SEMANTIC_H
#define CGT_SEMANTIC_H

#include "cgt_common.h"
#include "cgt_ast.h"

typedef enum {
    SYM_VAR,
    SYM_FN,
    SYM_STRUCT,
    SYM_TRAIT,
    SYM_ENUM,
    SYM_MODULE,
    SYM_TYPE
} cgt_sym_kind_t;

typedef struct cgt_symbol {
    const char *name;
    cgt_sym_kind_t kind;
    cgt_type_t *type;
    cgt_loc_t loc;
    bool is_mut;
    bool is_pub;
    cgt_decl_t *decl;
    struct cgt_symbol *next; /* in hash bucket or scope chain */
} cgt_symbol_t;

typedef struct cgt_scope {
    struct cgt_scope *parent;
    cgt_symbol_t **buckets;
    size_t bucket_count;
    bool is_unsafe_context;
    bool is_gpu_kernel_context;
} cgt_scope_t;

typedef struct {
    cgt_scope_t *current_scope;
    cgt_scope_t *global_scope;
    cgt_ast_module_t *module;
    uint32_t error_count;
    uint32_t warning_count;
} cgt_analyzer_t;

void cgt_analyzer_init(cgt_analyzer_t *analyzer, cgt_ast_module_t *module);
cgt_scope_t *cgt_scope_enter(cgt_analyzer_t *analyzer, bool is_unsafe, bool is_gpu);
void cgt_scope_leave(cgt_analyzer_t *analyzer);
bool cgt_scope_insert(cgt_scope_t *scope, cgt_symbol_t *sym);
cgt_symbol_t *cgt_scope_lookup(cgt_scope_t *scope, const char *name);
cgt_symbol_t *cgt_scope_lookup_current(cgt_scope_t *scope, const char *name);

bool cgt_semantic_analyze_module(cgt_analyzer_t *analyzer, cgt_ast_module_t *module);

#endif /* CGT_SEMANTIC_H */
