#ifndef CGT_MEMORY_SAFETY_H
#define CGT_MEMORY_SAFETY_H

#include "cgt_common.h"
#include "cgt_ast.h"
#include "cgt_semantic.h"

typedef enum {
    OWN_STATE_UNINITIALIZED,
    OWN_STATE_ACTIVE_OWNED,
    OWN_STATE_SHARED_BORROWED,
    OWN_STATE_MUT_BORROWED,
    OWN_STATE_MOVED,
    OWN_STATE_DROPPED
} cgt_ownership_state_t;

typedef struct {
    const char *var_name;
    cgt_ownership_state_t state;
    uint32_t shared_borrow_count;
    cgt_loc_t state_change_loc;
    cgt_loc_t declaration_loc;
    bool is_in_unsafe_block;
    uint32_t scope_depth;
} cgt_var_track_t;

typedef struct {
    cgt_var_track_t *vars;
    size_t count;
    size_t capacity;
    uint32_t current_depth;
    bool inside_unsafe;
    uint32_t safety_violations;
} cgt_borrow_checker_t;

void cgt_borrow_checker_init(cgt_borrow_checker_t *bc);
void cgt_borrow_checker_free(cgt_borrow_checker_t *bc);

bool cgt_borrow_checker_track_var(cgt_borrow_checker_t *bc, const char *name, cgt_loc_t loc, bool is_init);
bool cgt_borrow_checker_transfer_move(cgt_borrow_checker_t *bc, const char *name, cgt_loc_t loc);
bool cgt_borrow_checker_borrow_shared(cgt_borrow_checker_t *bc, const char *name, cgt_loc_t loc);
bool cgt_borrow_checker_borrow_mut(cgt_borrow_checker_t *bc, const char *name, cgt_loc_t loc);
bool cgt_borrow_checker_access(cgt_borrow_checker_t *bc, const char *name, cgt_loc_t loc, bool is_write);
bool cgt_borrow_checker_release_borrow(cgt_borrow_checker_t *bc, const char *name);

bool cgt_memory_safety_check_module(cgt_borrow_checker_t *bc, cgt_ast_module_t *module);

#endif /* CGT_MEMORY_SAFETY_H */
