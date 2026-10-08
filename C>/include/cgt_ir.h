#ifndef CGT_IR_H
#define CGT_IR_H

#include "cgt_common.h"
#include "cgt_ast.h"

typedef enum {
    IR_VAL_NONE = 0,
    IR_VAL_CONST_INT,
    IR_VAL_CONST_FLOAT,
    IR_VAL_CONST_STR,
    IR_VAL_CONST_BOOL,
    IR_VAL_VREG,
    IR_VAL_GLOBAL,
    IR_VAL_BLOCK
} cgt_ir_val_kind_t;

typedef struct cgt_ir_value {
    cgt_ir_val_kind_t kind;
    cgt_type_t *type;
    union {
        int64_t int_val;
        double float_val;
        const char *str_val;
        bool bool_val;
        uint32_t vreg_id;
        const char *global_name;
        const char *block_name;
    } as;
} cgt_ir_value_t;

typedef enum {
    IR_OP_NOOP = 0,
    IR_OP_ALLOCA,
    IR_OP_LOAD,
    IR_OP_STORE,
    IR_OP_GEP,
    IR_OP_ADD,
    IR_OP_SUB,
    IR_OP_MUL,
    IR_OP_DIV,
    IR_OP_MOD,
    IR_OP_EQ,
    IR_OP_NE,
    IR_OP_LT,
    IR_OP_LE,
    IR_OP_GT,
    IR_OP_GE,
    IR_OP_AND,
    IR_OP_OR,
    IR_OP_XOR,
    IR_OP_SHL,
    IR_OP_SHR,
    IR_OP_BR,
    IR_OP_BR_COND,
    IR_OP_RET,
    IR_OP_CALL,
    IR_OP_CAST,
    IR_OP_CHECKED_ADD,
    IR_OP_CHECKED_SUB,
    IR_OP_CHECKED_MUL,
    IR_OP_BOUNDS_CHECK,
    IR_OP_PANIC,
    IR_OP_SIMD_OP,
    IR_OP_ATOMIC_OP,
    IR_OP_GPU_LAUNCH,
    IR_OP_INLINE_ASM
} cgt_ir_op_t;

typedef struct cgt_ir_inst {
    cgt_ir_op_t op;
    cgt_ir_value_t dest;
    cgt_ir_value_t src1;
    cgt_ir_value_t src2;
    cgt_ir_value_t *extra_args;
    size_t extra_arg_count;
    const char *aux_str;
    cgt_loc_t loc;
    struct cgt_ir_inst *next;
    struct cgt_ir_inst *prev;
} cgt_ir_inst_t;

typedef struct cgt_ir_block {
    const char *name;
    uint32_t id;
    cgt_ir_inst_t *first;
    cgt_ir_inst_t *last;
    size_t inst_count;
    struct cgt_ir_block *next;
} cgt_ir_block_t;

typedef struct cgt_ir_func {
    const char *name;
    cgt_type_t *return_type;
    cgt_param_t *params;
    size_t param_count;
    cgt_ir_block_t *first_block;
    cgt_ir_block_t *last_block;
    uint32_t next_vreg_id;
    uint32_t next_block_id;
    bool is_gpu_kernel;
    bool is_simd;
    bool is_unsafe;
    struct cgt_ir_func *next;
} cgt_ir_func_t;

typedef struct {
    const char *name;
    cgt_type_t *type;
    cgt_ir_value_t init_val;
} cgt_ir_global_t;

typedef struct {
    const char *module_name;
    cgt_ast_module_t *ast;
    cgt_ir_global_t *globals;
    size_t global_count;
    size_t global_capacity;
    cgt_ir_func_t *first_func;
    cgt_ir_func_t *last_func;
} cgt_ir_module_t;

void cgt_ir_module_init(cgt_ir_module_t *mod, const char *name);
void cgt_ir_module_free(cgt_ir_module_t *mod);

cgt_ir_func_t *cgt_ir_func_create(cgt_ir_module_t *mod, const char *name, cgt_type_t *ret_type);
cgt_ir_block_t *cgt_ir_block_create(cgt_ir_func_t *fn, const char *label_prefix);
cgt_ir_value_t cgt_ir_vreg_create(cgt_ir_func_t *fn, cgt_type_t *type);
cgt_ir_value_t cgt_ir_const_int(int64_t val, cgt_type_t *type);
cgt_ir_value_t cgt_ir_const_str(const char *val);

void cgt_ir_block_append_inst(cgt_ir_block_t *block, cgt_ir_inst_t *inst);
cgt_ir_inst_t *cgt_ir_inst_create(cgt_ir_op_t op, cgt_ir_value_t dest, cgt_ir_value_t src1, cgt_ir_value_t src2, cgt_loc_t loc);

/* AST -> IR Lowering */
bool cgt_ir_lower_module(cgt_ast_module_t *ast, cgt_ir_module_t *out_ir);

/* IR textual dump */
void cgt_ir_dump(cgt_ir_module_t *mod, FILE *out);

#endif /* CGT_IR_H */
