#include "cgt_ir.h"
#include "cgt_optimizer.h"
#include <assert.h>

void run_ir_tests(void) {
    printf("[Test]: Running IR & Optimizer Tests...\n");

    cgt_ir_module_t mod;
    cgt_ir_module_init(&mod, "test_ir_mod");

    cgt_ir_func_t *fn = cgt_ir_func_create(&mod, "foo", cgt_type_primitive(TYPE_I32, cgt_loc_make(NULL, 0, 0)));
    cgt_ir_block_t *bb = cgt_ir_block_create(fn, "entry");

    /* Create inst: %v0 = add 10, 20 */
    cgt_ir_value_t dest = cgt_ir_vreg_create(fn, cgt_type_primitive(TYPE_I32, cgt_loc_make(NULL, 0, 0)));
    cgt_ir_value_t s1 = cgt_ir_const_int(10, cgt_type_primitive(TYPE_I32, cgt_loc_make(NULL, 0, 0)));
    cgt_ir_value_t s2 = cgt_ir_const_int(20, cgt_type_primitive(TYPE_I32, cgt_loc_make(NULL, 0, 0)));
    cgt_ir_inst_t *add_inst = cgt_ir_inst_create(IR_OP_ADD, dest, s1, s2, cgt_loc_make(NULL, 0, 0));
    cgt_ir_block_append_inst(bb, add_inst);

    /* Run constant folding */
    uint32_t changes = 0;
    bool folded = cgt_opt_constant_folding(fn, &changes);
    assert(folded == true);
    assert(changes == 1);
    assert(add_inst->src1.as.int_val == 30); /* 10 + 20 folded to 30! */

    cgt_ir_module_free(&mod);
    printf("  -> IR & Constant folding test passed.\n");
}