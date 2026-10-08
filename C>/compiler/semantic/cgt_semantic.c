#include "cgt_semantic.h"

#define SCOPE_BUCKET_SIZE 64

static uint32_t hash_str(const char *str) {
    uint32_t hash = 5381;
    int c;
    while ((c = *str++)) {
        hash = ((hash << 5) + hash) + (uint32_t)c;
    }
    return hash;
}

static cgt_scope_t *scope_alloc(cgt_scope_t *parent, bool is_unsafe, bool is_gpu) {
    cgt_scope_t *scope = (cgt_scope_t *)cgt_calloc(1, sizeof(cgt_scope_t));
    scope->parent = parent;
    scope->bucket_count = SCOPE_BUCKET_SIZE;
    scope->buckets = (cgt_symbol_t **)cgt_calloc(SCOPE_BUCKET_SIZE, sizeof(cgt_symbol_t *));
    scope->is_unsafe_context = is_unsafe || (parent && parent->is_unsafe_context);
    scope->is_gpu_kernel_context = is_gpu || (parent && parent->is_gpu_kernel_context);
    return scope;
}

void cgt_analyzer_init(cgt_analyzer_t *analyzer, cgt_ast_module_t *module) {
    analyzer->module = module;
    analyzer->global_scope = scope_alloc(NULL, false, false);
    analyzer->current_scope = analyzer->global_scope;
    analyzer->error_count = 0;
    analyzer->warning_count = 0;
}

cgt_scope_t *cgt_scope_enter(cgt_analyzer_t *analyzer, bool is_unsafe, bool is_gpu) {
    cgt_scope_t *s = scope_alloc(analyzer->current_scope, is_unsafe, is_gpu);
    analyzer->current_scope = s;
    return s;
}

void cgt_scope_leave(cgt_analyzer_t *analyzer) {
    if (analyzer->current_scope && analyzer->current_scope->parent) {
        analyzer->current_scope = analyzer->current_scope->parent;
    }
}

bool cgt_scope_insert(cgt_scope_t *scope, cgt_symbol_t *sym) {
    if (!scope || !sym || !sym->name) return false;
    uint32_t idx = hash_str(sym->name) % scope->bucket_count;

    /* Check for duplicate in current scope */
    cgt_symbol_t *curr = scope->buckets[idx];
    while (curr) {
        if (strcmp(curr->name, sym->name) == 0) {
            return false; /* duplicate symbol in same scope */
        }
        curr = curr->next;
    }

    sym->next = scope->buckets[idx];
    scope->buckets[idx] = sym;
    return true;
}

cgt_symbol_t *cgt_scope_lookup_current(cgt_scope_t *scope, const char *name) {
    if (!scope || !name) return NULL;
    uint32_t idx = hash_str(name) % scope->bucket_count;
    cgt_symbol_t *curr = scope->buckets[idx];
    while (curr) {
        if (strcmp(curr->name, name) == 0) return curr;
        curr = curr->next;
    }
    return NULL;
}

cgt_symbol_t *cgt_scope_lookup(cgt_scope_t *scope, const char *name) {
    while (scope) {
        cgt_symbol_t *sym = cgt_scope_lookup_current(scope, name);
        if (sym) return sym;
        scope = scope->parent;
    }
    return NULL;
}

static void register_builtins(cgt_analyzer_t *analyzer) {
    const char *builtins[] = {
        "print", "println", "print_i64", "print_f64", "eprintln", "panic", "abort",
        "assert", "malloc", "free", "memcpy", "memset",
        "atomic_load", "atomic_store", "atomic_fetch_add",
        "simd_add", "simd_mul", "gpu_dispatch",
        "cgt_volatile_read32", "cgt_volatile_write32"
    };
    for (size_t i = 0; i < sizeof(builtins) / sizeof(builtins[0]); i++) {
        cgt_symbol_t *sym = (cgt_symbol_t *)cgt_calloc(1, sizeof(cgt_symbol_t));
        sym->name = builtins[i];
        sym->kind = SYM_FN;
        sym->type = cgt_type_primitive(TYPE_VOID, cgt_loc_make("<builtin>", 0, 0));
        cgt_scope_insert(analyzer->global_scope, sym);
    }
}

bool cgt_semantic_analyze_module(cgt_analyzer_t *analyzer, cgt_ast_module_t *module) {
    register_builtins(analyzer);

    /* First pass: Register all structs, types, and function prototypes */
    for (size_t i = 0; i < module->decl_count; i++) {
        cgt_decl_t *d = module->declarations[i];
        if (!d) continue;

        cgt_symbol_t *sym = (cgt_symbol_t *)cgt_calloc(1, sizeof(cgt_symbol_t));
        sym->name = d->name;
        sym->loc = d->loc;
        sym->decl = d;
        sym->is_pub = d->is_pub;

        switch (d->kind) {
            case DECL_STRUCT:
                sym->kind = SYM_STRUCT;
                sym->type = cgt_type_named(d->name, d->loc);
                break;
            case DECL_FUNCTION:
                sym->kind = SYM_FN;
                sym->type = d->as.func.return_type;
                break;
            case DECL_MODULE:
                sym->kind = SYM_MODULE;
                break;
            default:
                break;
        }

        if (d->name && !cgt_scope_insert(analyzer->global_scope, sym)) {
            cgt_diag_report(CGT_DIAG_ERROR, d->loc, "Redefinition of symbol '%s'", d->name);
            analyzer->error_count++;
        }
    }

    return analyzer->error_count == 0;
}
