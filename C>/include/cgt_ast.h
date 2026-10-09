#ifndef CGT_AST_H
#define CGT_AST_H

#include "cgt_common.h"
#include "cgt_lexer.h"

/* Forward declarations */
typedef struct cgt_type cgt_type_t;
typedef struct cgt_expr cgt_expr_t;
typedef struct cgt_stmt cgt_stmt_t;
typedef struct cgt_decl cgt_decl_t;

/* Type Categories */
typedef enum {
    TYPE_VOID,
    TYPE_BOOL,
    TYPE_I8, TYPE_I16, TYPE_I32, TYPE_I64,
    TYPE_U8, TYPE_U16, TYPE_U32, TYPE_U64,
    TYPE_F32, TYPE_F64,
    TYPE_CHAR,
    TYPE_STR,
    TYPE_RAW_PTR,      /* *raw T */
    TYPE_CONST_PTR,    /* *const T */
    TYPE_REF,          /* &T (shared borrow) */
    TYPE_REF_MUT,      /* &mut T (exclusive mutable borrow) */
    TYPE_OWNED,        /* own<T> (explicit unique ownership) */
    TYPE_ARRAY,        /* [T; N] */
    TYPE_SLICE,        /* &[T] */
    TYPE_SIMD,         /* SIMD vector: v128_f32, v128_i32, v256_f32, v256_i32 */
    TYPE_GPU_BUFFER,   /* gpu::Buffer<T> */
    TYPE_VECTOR,       /* v2+ hardware vector<T, N> */
    TYPE_DEVICE_SPAN,  /* v2+ unified CPU/GPU device_span<T> */
    TYPE_NEXUS,        /* v2+ concurrency nexus channel nexus<T> */
    TYPE_STRUCT,
    TYPE_ENUM,
    TYPE_TRAIT,
    TYPE_FN,
    TYPE_GENERIC_PARAM,
    TYPE_ALIAS,
    TYPE_CUSTOM
} cgt_type_kind_t;

struct cgt_type {
    cgt_type_kind_t kind;
    const char *name;
    cgt_loc_t loc;
    cgt_type_t *inner;          /* For ptr, ref, owned, array, slice, buffer */
    size_t array_size;          /* For fixed arrays */
    uint32_t simd_lanes;        /* For SIMD */
    cgt_type_t **type_args;     /* Generic type arguments */
    size_t type_arg_count;
    cgt_type_t **param_types;   /* For function types */
    size_t param_count;
    cgt_type_t *return_type;    /* For function types */
    bool is_mut;
};

/* Expression Kinds */
typedef enum {
    EXPR_INT_LIT,
    EXPR_FLOAT_LIT,
    EXPR_STRING_LIT,
    EXPR_CHAR_LIT,
    EXPR_BOOL_LIT,
    EXPR_NULL_LIT,
    EXPR_IDENT,
    EXPR_BINARY,
    EXPR_UNARY,
    EXPR_CALL,
    EXPR_MEMBER,       /* obj.field or module::symbol */
    EXPR_INDEX,        /* arr[idx] */
    EXPR_CAST,         /* val as T */
    EXPR_STRUCT_INIT,  /* Struct { field: val, ... } */
    EXPR_BLOCK,        /* { stmts... } */
    EXPR_IF,           /* if cond { ... } else { ... } */
    EXPR_MATCH,        /* match val { pat => expr, ... } */
    EXPR_UNSAFE,       /* unsafe { ... } */
    EXPR_MOVE,         /* move(var) */
    EXPR_BORROW,       /* &var */
    EXPR_BORROW_MUT,   /* &mut var */
    EXPR_DEREF,        /* *ptr or *ref */
    EXPR_SIZEOF,       /* sizeof(T) */
    EXPR_INLINE_ASM,   /* asm("...", inputs, outputs) */
    EXPR_SIMD_OP,      /* simd::add(a, b) */
    EXPR_GPU_DISPATCH, /* gpu::dispatch(...) */
    EXPR_ATOMIC_OP,    /* atomic_load, atomic_store, etc. */
    EXPR_MORPH,        /* morph(val, TargetType) */
    EXPR_CLAIM,        /* claim(hazard_ptr) */
    EXPR_PIN,          /* pin(expr) */
    EXPR_TRANSFER      /* transfer(val, isolate) */
} cgt_expr_kind_t;

/* Binary Operators */
typedef enum {
    BIN_ADD, BIN_SUB, BIN_MUL, BIN_DIV, BIN_MOD,
    BIN_EQ, BIN_NE, BIN_LT, BIN_LE, BIN_GT, BIN_GE,
    BIN_LOG_AND, BIN_LOG_OR,
    BIN_BIT_AND, BIN_BIT_OR, BIN_BIT_XOR,
    BIN_SHL, BIN_SHR
} cgt_bin_op_t;

/* Unary Operators */
typedef enum {
    UNARY_NEG,
    UNARY_NOT,
    UNARY_BIT_NOT,
    UNARY_DEREF,
    UNARY_ADDRESS_OF
} cgt_unary_op_t;

/* Struct field initializer */
typedef struct {
    const char *name;
    cgt_expr_t *value;
} cgt_field_init_t;

/* Match arm */
typedef struct {
    cgt_expr_t *pattern;
    cgt_expr_t *body;
} cgt_match_arm_t;

struct cgt_expr {
    cgt_expr_kind_t kind;
    cgt_loc_t loc;
    cgt_type_t *inferred_type;

    union {
        int64_t int_val;
        double float_val;
        const char *str_val;
        char char_val;
        bool bool_val;

        struct {
            const char *name;
        } ident;

        struct {
            cgt_bin_op_t op;
            cgt_expr_t *left;
            cgt_expr_t *right;
        } binary;

        struct {
            cgt_unary_op_t op;
            cgt_expr_t *operand;
        } unary;

        struct {
            cgt_expr_t *callee;
            cgt_expr_t **args;
            size_t arg_count;
        } call;

        struct {
            cgt_expr_t *target;
            const char *field_name;
            bool is_scope_resolution; /* true for ::, false for . */
        } member;

        struct {
            cgt_expr_t *target;
            cgt_expr_t *index;
        } index;

        struct {
            cgt_expr_t *expr;
            cgt_type_t *target_type;
        } cast;

        struct {
            const char *struct_name;
            cgt_field_init_t *fields;
            size_t field_count;
        } struct_init;

        struct {
            cgt_stmt_t **stmts;
            size_t stmt_count;
            cgt_expr_t *result_expr;
        } block;

        struct {
            cgt_expr_t *condition;
            cgt_expr_t *then_branch;
            cgt_expr_t *else_branch;
        } if_expr;

        struct {
            cgt_expr_t *target;
            cgt_match_arm_t *arms;
            size_t arm_count;
        } match_expr;

        struct {
            cgt_expr_t *block;
        } unsafe_expr;

        struct {
            cgt_expr_t *target;
        } move_expr;

        struct {
            cgt_expr_t *target;
            bool is_mut;
        } borrow_expr;

        struct {
            cgt_type_t *target_type;
        } sizeof_expr;

        struct {
            const char *assembly_text;
            const char *constraints;
            cgt_expr_t **args;
            size_t arg_count;
        } inline_asm;

        struct {
            const char *op_name;
            cgt_expr_t **args;
            size_t arg_count;
        } simd_op;

        struct {
            const char *kernel_name;
            cgt_expr_t *grid_dim;
            cgt_expr_t *block_dim;
            cgt_expr_t **args;
            size_t arg_count;
        } gpu_dispatch;

        struct {
            const char *op_name;
            cgt_expr_t **args;
            size_t arg_count;
        } atomic_op;

        struct {
            cgt_expr_t *value;
            cgt_type_t *target_type;
        } morph_expr;

        struct {
            cgt_expr_t *target;
        } claim_expr;

        struct {
            cgt_expr_t *target;
        } pin_expr;

        struct {
            cgt_expr_t *value;
            cgt_expr_t *isolate_dest;
        } transfer_expr;
    } as;
};

/* Statement Kinds */
typedef enum {
    STMT_LET,
    STMT_ASSIGN,
    STMT_RETURN,
    STMT_EXPR,
    STMT_WHILE,
    STMT_FOR,
    STMT_BREAK,
    STMT_CONTINUE,
    STMT_DEFER,
    STMT_REGION,       /* region(name) { ... } */
    STMT_ISOLATE,      /* isolate { ... } */
    STMT_QUANTUM,      /* quantum { ... } */
    STMT_YIELD_TO,     /* yield_to(target) */
    STMT_HAZARD,       /* hazard { ... } */
    STMT_CONTRACT      /* requires / ensures / invariant */
} cgt_stmt_kind_t;

struct cgt_stmt {
    cgt_stmt_kind_t kind;
    cgt_loc_t loc;

    union {
        struct {
            const char *name;
            cgt_type_t *type;
            cgt_expr_t *init;
            bool is_mut;
            bool is_owned;
        } let_stmt;

        struct {
            cgt_expr_t *target;
            cgt_expr_t *value;
            cgt_token_kind_t op; /* = or += etc. */
        } assign_stmt;

        struct {
            cgt_expr_t *value;
        } return_stmt;

        struct {
            cgt_expr_t *expr;
        } expr_stmt;

        struct {
            cgt_expr_t *condition;
            cgt_expr_t *body;
        } while_stmt;

        struct {
            const char *iter_var;
            cgt_expr_t *iterable;
            cgt_expr_t *body;
        } for_stmt;

        struct {
            cgt_expr_t *deferred_expr;
        } defer_stmt;

        struct {
            const char *region_name;
            cgt_expr_t *body;
        } region_stmt;

        struct {
            cgt_expr_t *body;
        } isolate_stmt;

        struct {
            cgt_expr_t *body;
        } quantum_stmt;

        struct {
            cgt_expr_t *target_task;
        } yield_stmt;

        struct {
            cgt_expr_t *body;
        } hazard_stmt;

        struct {
            cgt_token_kind_t contract_kind; /* TOK_REQUIRES, TOK_ENSURES, TOK_INVARIANT */
            cgt_expr_t *condition;
            const char *message;
        } contract_stmt;
    } as;
};

/* Function Parameter */
typedef struct {
    const char *name;
    cgt_type_t *type;
    bool is_mut;
    bool is_owned;
    cgt_loc_t loc;
} cgt_param_t;

/* Struct Field */
typedef struct {
    const char *name;
    cgt_type_t *type;
    bool is_pub;
    cgt_loc_t loc;
} cgt_struct_field_t;

/* Enum Variant */
typedef struct {
    const char *name;
    bool has_value;
    int64_t value;
    cgt_type_t *payload_type;
    cgt_loc_t loc;
} cgt_enum_variant_t;

/* Declaration Kinds */
typedef enum {
    DECL_FUNCTION,
    DECL_STRUCT,
    DECL_TRAIT,
    DECL_IMPL,
    DECL_ENUM,
    DECL_MODULE,
    DECL_IMPORT,
    DECL_CONST,
    DECL_TYPE_ALIAS,
    DECL_SPEC,         /* v2+ formal specification contract */
    DECL_NEXUS          /* v2+ concurrent communication nexus */
} cgt_decl_kind_t;

struct cgt_decl {
    cgt_decl_kind_t kind;
    const char *name;
    cgt_loc_t loc;
    bool is_pub;
    bool is_extern;

    union {
        struct {
            cgt_param_t *params;
            size_t param_count;
            cgt_type_t *return_type;
            cgt_expr_t *body;
            bool is_gpu_kernel;
            bool is_simd_vectorized;
            bool is_unsafe;
            const char **generic_params;
            size_t generic_param_count;
            cgt_stmt_t **contracts;
            size_t contract_count;
        } func;

        struct {
            cgt_struct_field_t *fields;
            size_t field_count;
            const char **generic_params;
            size_t generic_param_count;
        } struct_decl;

        struct {
            cgt_decl_t **methods;
            size_t method_count;
        } trait_decl;

        struct {
            const char *trait_name;
            const char *target_type;
            cgt_decl_t **methods;
            size_t method_count;
        } impl_decl;

        struct {
            cgt_enum_variant_t *variants;
            size_t variant_count;
        } enum_decl;

        struct {
            const char *module_path;
        } module_decl;

        struct {
            const char *import_path;
            const char *alias;
        } import_decl;

        struct {
            cgt_type_t *type;
            cgt_expr_t *value;
        } const_decl;

        struct {
            cgt_type_t *target_type;
        } type_alias;

        struct {
            cgt_stmt_t **contracts;
            size_t contract_count;
        } spec_decl;

        struct {
            cgt_type_t *payload_type;
            size_t buffer_capacity;
        } nexus_decl;
    } as;
};

/* Complete AST Module / Translation Unit */
typedef struct {
    const char *module_name;
    const char *filename;
    cgt_decl_t **declarations;
    size_t decl_count;
    size_t decl_capacity;
} cgt_ast_module_t;

/* AST Construction Helpers */
cgt_type_t *cgt_type_primitive(cgt_type_kind_t kind, cgt_loc_t loc);
cgt_type_t *cgt_type_named(const char *name, cgt_loc_t loc);
cgt_type_t *cgt_type_ptr(cgt_type_t *inner, bool is_const, cgt_loc_t loc);
cgt_type_t *cgt_type_ref(cgt_type_t *inner, bool is_mut, cgt_loc_t loc);
cgt_type_t *cgt_type_owned(cgt_type_t *inner, cgt_loc_t loc);
cgt_type_t *cgt_type_array(cgt_type_t *inner, size_t size, cgt_loc_t loc);
cgt_type_t *cgt_type_slice(cgt_type_t *inner, cgt_loc_t loc);
cgt_type_t *cgt_type_simd(const char *name, uint32_t lanes, cgt_loc_t loc);
cgt_type_t *cgt_type_gpu_buffer(cgt_type_t *inner, cgt_loc_t loc);

cgt_expr_t *cgt_expr_int(int64_t val, cgt_loc_t loc);
cgt_expr_t *cgt_expr_float(double val, cgt_loc_t loc);
cgt_expr_t *cgt_expr_str(const char *val, cgt_loc_t loc);
cgt_expr_t *cgt_expr_char(char val, cgt_loc_t loc);
cgt_expr_t *cgt_expr_bool(bool val, cgt_loc_t loc);
cgt_expr_t *cgt_expr_null(cgt_loc_t loc);
cgt_expr_t *cgt_expr_ident(const char *name, cgt_loc_t loc);
cgt_expr_t *cgt_expr_binary(cgt_bin_op_t op, cgt_expr_t *left, cgt_expr_t *right, cgt_loc_t loc);
cgt_expr_t *cgt_expr_unary(cgt_unary_op_t op, cgt_expr_t *operand, cgt_loc_t loc);
cgt_expr_t *cgt_expr_call(cgt_expr_t *callee, cgt_expr_t **args, size_t arg_count, cgt_loc_t loc);
cgt_expr_t *cgt_expr_member(cgt_expr_t *target, const char *field, bool is_scope, cgt_loc_t loc);
cgt_expr_t *cgt_expr_index(cgt_expr_t *target, cgt_expr_t *index, cgt_loc_t loc);
cgt_expr_t *cgt_expr_cast(cgt_expr_t *expr, cgt_type_t *target, cgt_loc_t loc);
cgt_expr_t *cgt_expr_block(cgt_stmt_t **stmts, size_t stmt_count, cgt_expr_t *result, cgt_loc_t loc);
cgt_expr_t *cgt_expr_if(cgt_expr_t *cond, cgt_expr_t *then_b, cgt_expr_t *else_b, cgt_loc_t loc);
cgt_expr_t *cgt_expr_unsafe(cgt_expr_t *block, cgt_loc_t loc);
cgt_expr_t *cgt_expr_move(cgt_expr_t *target, cgt_loc_t loc);
cgt_expr_t *cgt_expr_borrow(cgt_expr_t *target, bool is_mut, cgt_loc_t loc);

cgt_stmt_t *cgt_stmt_let(const char *name, cgt_type_t *type, cgt_expr_t *init, bool is_mut, bool is_owned, cgt_loc_t loc);
cgt_stmt_t *cgt_stmt_assign(cgt_expr_t *target, cgt_expr_t *value, cgt_token_kind_t op, cgt_loc_t loc);
cgt_stmt_t *cgt_stmt_return(cgt_expr_t *value, cgt_loc_t loc);
cgt_stmt_t *cgt_stmt_expr(cgt_expr_t *expr, cgt_loc_t loc);
cgt_stmt_t *cgt_stmt_while(cgt_expr_t *cond, cgt_expr_t *body, cgt_loc_t loc);
cgt_stmt_t *cgt_stmt_defer(cgt_expr_t *expr, cgt_loc_t loc);
cgt_stmt_t *cgt_stmt_region(const char *name, cgt_expr_t *body, cgt_loc_t loc);
cgt_stmt_t *cgt_stmt_isolate(cgt_expr_t *body, cgt_loc_t loc);
cgt_stmt_t *cgt_stmt_quantum(cgt_expr_t *body, cgt_loc_t loc);
cgt_stmt_t *cgt_stmt_yield(cgt_expr_t *target, cgt_loc_t loc);
cgt_stmt_t *cgt_stmt_hazard(cgt_expr_t *body, cgt_loc_t loc);
cgt_stmt_t *cgt_stmt_contract(cgt_token_kind_t kind, cgt_expr_t *cond, const char *msg, cgt_loc_t loc);

cgt_expr_t *cgt_expr_morph(cgt_expr_t *val, cgt_type_t *target_type, cgt_loc_t loc);
cgt_expr_t *cgt_expr_claim(cgt_expr_t *target, cgt_loc_t loc);
cgt_expr_t *cgt_expr_pin(cgt_expr_t *target, cgt_loc_t loc);
cgt_expr_t *cgt_expr_transfer(cgt_expr_t *val, cgt_expr_t *dest, cgt_loc_t loc);

cgt_decl_t *cgt_decl_spec(const char *name, cgt_stmt_t **contracts, size_t count, cgt_loc_t loc);
cgt_decl_t *cgt_decl_nexus(const char *name, cgt_type_t *payload, size_t capacity, cgt_loc_t loc);
cgt_type_t *cgt_type_vector(cgt_type_t *element, uint32_t lanes, cgt_loc_t loc);
cgt_type_t *cgt_type_device_span(cgt_type_t *element, cgt_loc_t loc);
cgt_type_t *cgt_type_nexus(cgt_type_t *payload, cgt_loc_t loc);

cgt_decl_t *cgt_decl_func(const char *name, cgt_param_t *params, size_t p_count, cgt_type_t *ret, cgt_expr_t *body, bool is_gpu, bool is_simd, bool is_unsafe, cgt_loc_t loc);
cgt_decl_t *cgt_decl_struct(const char *name, cgt_struct_field_t *fields, size_t f_count, cgt_loc_t loc);
cgt_decl_t *cgt_decl_module(const char *path, cgt_loc_t loc);
cgt_decl_t *cgt_decl_import(const char *path, const char *alias, cgt_loc_t loc);

void cgt_ast_module_init(cgt_ast_module_t *mod, const char *name, const char *filename);
void cgt_ast_module_add_decl(cgt_ast_module_t *mod, cgt_decl_t *decl);
void cgt_ast_dump(cgt_ast_module_t *mod, FILE *out);

#endif /* CGT_AST_H */
