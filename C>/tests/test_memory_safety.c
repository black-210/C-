#include "cgt_memory_safety.h"
#include <assert.h>

void run_memory_safety_tests(void) {
    printf("[Test]: Running Memory Safety (Borrow & Ownership) Tests...\n");

    cgt_borrow_checker_t bc;
    cgt_borrow_checker_init(&bc);

    cgt_loc_t loc = cgt_loc_make("test.cgt", 10, 5);

    /* 1. Track variable */
    cgt_borrow_checker_track_var(&bc, "resource", loc, true);

    /* 2. Move variable */
    bool move_ok = cgt_borrow_checker_transfer_move(&bc, "resource", loc);
    assert(move_ok == true);

    /* 3. Try to use moved variable -> MUST FAIL! */
    bool access_ok = cgt_borrow_checker_access(&bc, "resource", loc, false);
    assert(access_ok == false);
    assert(bc.safety_violations == 1);

    /* 4. Reset and test borrow collision */
    cgt_borrow_checker_free(&bc);
    cgt_borrow_checker_init(&bc);

    cgt_borrow_checker_track_var(&bc, "data", loc, true);
    bool s_borrow = cgt_borrow_checker_borrow_shared(&bc, "data", loc);
    assert(s_borrow == true);

    /* Cannot mutably borrow while shared borrow is active -> MUST FAIL! */
    bool m_borrow = cgt_borrow_checker_borrow_mut(&bc, "data", loc);
    assert(m_borrow == false);
    assert(bc.safety_violations == 1);

    cgt_borrow_checker_free(&bc);
    printf("  -> Memory Safety checker passed (correctly prevented safety violations).\n");
}
