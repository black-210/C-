#include "cgt_ast.h"

cgt_type_t *cgt_type_primitive(cgt_type_kind_t kind, cgt_loc_t loc) {
    cgt_type_t *t = (cgt_type_t *)cgt_calloc(1, sizeof(cgt_type_t));
    t->kind = kind;
    t->loc = loc;
    switch (kind) {
        case TYPE_VOID: t->name = "void"; break;
        case TYPE_BOOL: t->name = "bool"; break;
        case TYPE_I8: t->name = "i8"; break;
        case TYPE_I16: t->name = "i16"; break;
        case TYPE_I32: t->name = "i32"; break;
        case TYPE_I64: t->name = "i64"; break;
        case TYPE_U8: t->name = "u8"; break;
        case TYPE_U16: t->name = "u16"; break;
        case TYPE_U32: t->name = "u32"; break;
        case TYPE_U64: t->name = "u64"; break;
        case TYPE_F32: t->name = "f32"; break;
        case TYPE_F64: t->name = "f64"; break;
        case TYPE_CHAR: t->name = "char"; break;
        case TYPE_STR: t->name = "str"; break;
        default: t->name = "unknown"; break;
    }
    return t;
}

cgt_type_t *cgt_type_named(const char *name, cgt_loc_t loc) {
    cgt_type_t *t = (cgt_type_t *)cgt_calloc(1, sizeof(cgt_type_t));
    t->kind = TYPE_CUSTOM;
    t->name = cgt_strdup(name);
    t->loc = loc;
    return t;
}

cgt_type_t *cgt_type_ptr(cgt_type_t *inner, bool is_const, cgt_loc_t loc) {
    cgt_type_t *t = (cgt_type_t *)cgt_calloc(1, sizeof(cgt_type_t));
    t->kind = is_const ? TYPE_CONST_PTR : TYPE_RAW_PTR;
    t->inner = inner;
    t->loc = loc;
    return t;
}

cgt_type_t *cgt_type_ref(cgt_type_t *inner, bool is_mut, cgt_loc_t loc) {
    cgt_type_t *t = (cgt_type_t *)cgt_calloc(1, sizeof(cgt_type_t));
    t->kind = is_mut ? TYPE_REF_MUT : TYPE_REF;
    t->inner = inner;
    t->is_mut = is_mut;
    t->loc = loc;
    return t;
}

cgt_type_t *cgt_type_owned(cgt_type_t *inner, cgt_loc_t loc) {
    cgt_type_t *t = (cgt_type_t *)cgt_calloc(1, sizeof(cgt_type_t));
    t->kind = TYPE_OWNED;
    t->inner = inner;
    t->loc = loc;
    return t;
}

cgt_type_t *cgt_type_array(cgt_type_t *inner, size_t size, cgt_loc_t loc) {
    cgt_type_t *t = (cgt_type_t *)cgt_calloc(1, sizeof(cgt_type_t));
    t->kind = TYPE_ARRAY;
    t->inner = inner;
    t->array_size = size;
    t->loc = loc;
    return t;
}

cgt_type_t *cgt_type_slice(cgt_type_t *inner, cgt_loc_t loc) {
    cgt_type_t *t = (cgt_type_t *)cgt_calloc(1, sizeof(cgt_type_t));
    t->kind = TYPE_SLICE;
    t->inner = inner;
    t->loc = loc;
    return t;
}

cgt_type_t *cgt_type_simd(const char *name, uint32_t lanes, cgt_loc_t loc) {
    cgt_type_t *t = (cgt_type_t *)cgt_calloc(1, sizeof(cgt_type_t));
    t->kind = TYPE_SIMD;
    t->name = cgt_strdup(name);
    t->simd_lanes = lanes;
    t->loc = loc;
    return t;
}

cgt_type_t *cgt_type_gpu_buffer(cgt_type_t *inner, cgt_loc_t loc) {
    cgt_type_t *t = (cgt_type_t *)cgt_calloc(1, sizeof(cgt_type_t));
    t->kind = TYPE_GPU_BUFFER;
    t->inner = inner;
    t->loc = loc;
    return t;
}

cgt_expr_t *cgt_expr_int(int64_t val, cgt_loc_t loc) {
    cgt_expr_t *e = (cgt_expr_t *)cgt_calloc(1, sizeof(cgt_expr_t));
    e->kind = EXPR_INT_LIT;
    e->loc = loc;
    e->as.int_val = val;
    return e;
}

cgt_expr_t *cgt_expr_float(double val, cgt_loc_t loc) {
    cgt_expr_t *e = (cgt_expr_t *)cgt_calloc(1, sizeof(cgt_expr_t));
    e->kind = EXPR_FLOAT_LIT;
    e->loc = loc;
    e->as.float_val = val;
    return e;
}

cgt_expr_t *cgt_expr_str(const char *val, cgt_loc_t loc) {
    cgt_expr_t *e = (cgt_expr_t *)cgt_calloc(1, sizeof(cgt_expr_t));
    e->kind = EXPR_STRING_LIT;
    e->loc = loc;
    e->as.str_val = cgt_strdup(val);
    return e;
}

cgt_expr_t *cgt_expr_char(char val, cgt_loc_t loc) {
    cgt_expr_t *e = (cgt_expr_t *)cgt_calloc(1, sizeof(cgt_expr_t));
    e->kind = EXPR_CHAR_LIT;
    e->loc = loc;
    e->as.char_val = val;
    return e;
}

cgt_expr_t *cgt_expr_bool(bool val, cgt_loc_t loc) {
    cgt_expr_t *e = (cgt_expr_t *)cgt_calloc(1, sizeof(cgt_expr_t));
    e->kind = EXPR_BOOL_LIT;
    e->loc = loc;
    e->as.bool_val = val;
    return e;
}

cgt_expr_t *cgt_expr_null(cgt_loc_t loc) {
    cgt_expr_t *e = (cgt_expr_t *)cgt_calloc(1, sizeof(cgt_expr_t));
    e->kind = EXPR_NULL_LIT;
    e->loc = loc;
    return e;
}

cgt_expr_t *cgt_expr_ident(const char *name, cgt_loc_t loc) {
    cgt_expr_t *e = (cgt_expr_t *)cgt_calloc(1, sizeof(cgt_expr_t));
    e->kind = EXPR_IDENT;
    e->loc = loc;
    e->as.ident.name = cgt_strdup(name);
    return e;
}

cgt_expr_t *cgt_expr_binary(cgt_bin_op_t op, cgt_expr_t *left, cgt_expr_t *right, cgt_loc_t loc) {
    cgt_expr_t *e = (cgt_expr_t *)cgt_calloc(1, sizeof(cgt_expr_t));
    e->kind = EXPR_BINARY;
    e->loc = loc;
    e->as.binary.op = op;
    e->as.binary.left = left;
    e->as.binary.right = right;
    return e;
}

cgt_expr_t *cgt_expr_unary(cgt_unary_op_t op, cgt_expr_t *operand, cgt_loc_t loc) {
    cgt_expr_t *e = (cgt_expr_t *)cgt_calloc(1, sizeof(cgt_expr_t));
    e->kind = EXPR_UNARY;
    e->loc = loc;
    e->as.unary.op = op;
    e->as.unary.operand = operand;
    return e;
}

cgt_expr_t *cgt_expr_call(cgt_expr_t *callee, cgt_expr_t **args, size_t arg_count, cgt_loc_t loc) {
    cgt_expr_t *e = (cgt_expr_t *)cgt_calloc(1, sizeof(cgt_expr_t));
    e->kind = EXPR_CALL;
    e->loc = loc;
    e->as.call.callee = callee;
    e->as.call.args = args;
    e->as.call.arg_count = arg_count;
    return e;
}

cgt_expr_t *cgt_expr_member(cgt_expr_t *target, const char *field, bool is_scope, cgt_loc_t loc) {
    cgt_expr_t *e = (cgt_expr_t *)cgt_calloc(1, sizeof(cgt_expr_t));
    e->kind = EXPR_MEMBER;
    e->loc = loc;
    e->as.member.target = target;
    e->as.member.field_name = cgt_strdup(field);
    e->as.member.is_scope_resolution = is_scope;
    return e;
}

cgt_expr_t *cgt_expr_index(cgt_expr_t *target, cgt_expr_t *index, cgt_loc_t loc) {
    cgt_expr_t *e = (cgt_expr_t *)cgt_calloc(1, sizeof(cgt_expr_t));
    e->kind = EXPR_INDEX;
    e->loc = loc;
    e->as.index.target = target;
    e->as.index.index = index;
    return e;
}

cgt_expr_t *cgt_expr_cast(cgt_expr_t *expr, cgt_type_t *target, cgt_loc_t loc) {
    cgt_expr_t *e = (cgt_expr_t *)cgt_calloc(1, sizeof(cgt_expr_t));
    e->kind = EXPR_CAST;
    e->loc = loc;
    e->as.cast.expr = expr;
    e->as.cast.target_type = target;
    return e;
}

cgt_expr_t *cgt_expr_block(cgt_stmt_t **stmts, size_t stmt_count, cgt_expr_t *result, cgt_loc_t loc) {
    cgt_expr_t *e = (cgt_expr_t *)cgt_calloc(1, sizeof(cgt_expr_t));
    e->kind = EXPR_BLOCK;
    e->loc = loc;
    e->as.block.stmts = stmts;
    e->as.block.stmt_count = stmt_count;
    e->as.block.result_expr = result;
    return e;
}

cgt_expr_t *cgt_expr_if(cgt_expr_t *cond, cgt_expr_t *then_b, cgt_expr_t *else_b, cgt_loc_t loc) {
    cgt_expr_t *e = (cgt_expr_t *)cgt_calloc(1, sizeof(cgt_expr_t));
    e->kind = EXPR_IF;
    e->loc = loc;
    e->as.if_expr.condition = cond;
    e->as.if_expr.then_branch = then_b;
    e->as.if_expr.else_branch = else_b;
    return e;
}

cgt_expr_t *cgt_expr_unsafe(cgt_expr_t *block, cgt_loc_t loc) {
    cgt_expr_t *e = (cgt_expr_t *)cgt_calloc(1, sizeof(cgt_expr_t));
    e->kind = EXPR_UNSAFE;
    e->loc = loc;
    e->as.unsafe_expr.block = block;
    return e;
}

cgt_expr_t *cgt_expr_move(cgt_expr_t *target, cgt_loc_t loc) {
    cgt_expr_t *e = (cgt_expr_t *)cgt_calloc(1, sizeof(cgt_expr_t));
    e->kind = EXPR_MOVE;
    e->loc = loc;
    e->as.move_expr.target = target;
    return e;
}

cgt_expr_t *cgt_expr_borrow(cgt_expr_t *target, bool is_mut, cgt_loc_t loc) {
    cgt_expr_t *e = (cgt_expr_t *)cgt_calloc(1, sizeof(cgt_expr_t));
    e->kind = is_mut ? EXPR_BORROW_MUT : EXPR_BORROW;
    e->loc = loc;
    e->as.borrow_expr.target = target;
    e->as.borrow_expr.is_mut = is_mut;
    return e;
}

cgt_stmt_t *cgt_stmt_let(const char *name, cgt_type_t *type, cgt_expr_t *init, bool is_mut, bool is_owned, cgt_loc_t loc) {
    cgt_stmt_t *s = (cgt_stmt_t *)cgt_calloc(1, sizeof(cgt_stmt_t));
    s->kind = STMT_LET;
    s->loc = loc;
    s->as.let_stmt.name = cgt_strdup(name);
    s->as.let_stmt.type = type;
    s->as.let_stmt.init = init;
    s->as.let_stmt.is_mut = is_mut;
    s->as.let_stmt.is_owned = is_owned;
    return s;
}

cgt_stmt_t *cgt_stmt_assign(cgt_expr_t *target, cgt_expr_t *value, cgt_token_kind_t op, cgt_loc_t loc) {
    cgt_stmt_t *s = (cgt_stmt_t *)cgt_calloc(1, sizeof(cgt_stmt_t));
    s->kind = STMT_ASSIGN;
    s->loc = loc;
    s->as.assign_stmt.target = target;
    s->as.assign_stmt.value = value;
    s->as.assign_stmt.op = op;
    return s;
}

cgt_stmt_t *cgt_stmt_return(cgt_expr_t *value, cgt_loc_t loc) {
    cgt_stmt_t *s = (cgt_stmt_t *)cgt_calloc(1, sizeof(cgt_stmt_t));
    s->kind = STMT_RETURN;
    s->loc = loc;
    s->as.return_stmt.value = value;
    return s;
}

cgt_stmt_t *cgt_stmt_expr(cgt_expr_t *expr, cgt_loc_t loc) {
    cgt_stmt_t *s = (cgt_stmt_t *)cgt_calloc(1, sizeof(cgt_stmt_t));
    s->kind = STMT_EXPR;
    s->loc = loc;
    s->as.expr_stmt.expr = expr;
    return s;
}

cgt_stmt_t *cgt_stmt_while(cgt_expr_t *cond, cgt_expr_t *body, cgt_loc_t loc) {
    cgt_stmt_t *s = (cgt_stmt_t *)cgt_calloc(1, sizeof(cgt_stmt_t));
    s->kind = STMT_WHILE;
    s->loc = loc;
    s->as.while_stmt.condition = cond;
    s->as.while_stmt.body = body;
    return s;
}

cgt_stmt_t *cgt_stmt_defer(cgt_expr_t *expr, cgt_loc_t loc) {
    cgt_stmt_t *s = (cgt_stmt_t *)cgt_calloc(1, sizeof(cgt_stmt_t));
    s->kind = STMT_DEFER;
    s->loc = loc;
    s->as.defer_stmt.deferred_expr = expr;
    return s;
}

cgt_stmt_t *cgt_stmt_region(const char *name, cgt_expr_t *body, cgt_loc_t loc) {
    cgt_stmt_t *s = (cgt_stmt_t *)cgt_calloc(1, sizeof(cgt_stmt_t));
    s->kind = STMT_REGION;
    s->loc = loc;
    s->as.region_stmt.region_name = cgt_strdup(name ? name : "arena");
    s->as.region_stmt.body = body;
    return s;
}

cgt_stmt_t *cgt_stmt_isolate(cgt_expr_t *body, cgt_loc_t loc) {
    cgt_stmt_t *s = (cgt_stmt_t *)cgt_calloc(1, sizeof(cgt_stmt_t));
    s->kind = STMT_ISOLATE;
    s->loc = loc;
    s->as.isolate_stmt.body = body;
    return s;
}

cgt_stmt_t *cgt_stmt_quantum(cgt_expr_t *body, cgt_loc_t loc) {
    cgt_stmt_t *s = (cgt_stmt_t *)cgt_calloc(1, sizeof(cgt_stmt_t));
    s->kind = STMT_QUANTUM;
    s->loc = loc;
    s->as.quantum_stmt.body = body;
    return s;
}

cgt_stmt_t *cgt_stmt_yield(cgt_expr_t *target, cgt_loc_t loc) {
    cgt_stmt_t *s = (cgt_stmt_t *)cgt_calloc(1, sizeof(cgt_stmt_t));
    s->kind = STMT_YIELD_TO;
    s->loc = loc;
    s->as.yield_stmt.target_task = target;
    return s;
}

cgt_stmt_t *cgt_stmt_hazard(cgt_expr_t *body, cgt_loc_t loc) {
    cgt_stmt_t *s = (cgt_stmt_t *)cgt_calloc(1, sizeof(cgt_stmt_t));
    s->kind = STMT_HAZARD;
    s->loc = loc;
    s->as.hazard_stmt.body = body;
    return s;
}

cgt_stmt_t *cgt_stmt_contract(cgt_token_kind_t kind, cgt_expr_t *cond, const char *msg, cgt_loc_t loc) {
    cgt_stmt_t *s = (cgt_stmt_t *)cgt_calloc(1, sizeof(cgt_stmt_t));
    s->kind = STMT_CONTRACT;
    s->loc = loc;
    s->as.contract_stmt.contract_kind = kind;
    s->as.contract_stmt.condition = cond;
    s->as.contract_stmt.message = msg ? cgt_strdup(msg) : NULL;
    return s;
}

cgt_expr_t *cgt_expr_morph(cgt_expr_t *val, cgt_type_t *target_type, cgt_loc_t loc) {
    cgt_expr_t *e = (cgt_expr_t *)cgt_calloc(1, sizeof(cgt_expr_t));
    e->kind = EXPR_MORPH;
    e->loc = loc;
    e->as.morph_expr.value = val;
    e->as.morph_expr.target_type = target_type;
    return e;
}

cgt_expr_t *cgt_expr_claim(cgt_expr_t *target, cgt_loc_t loc) {
    cgt_expr_t *e = (cgt_expr_t *)cgt_calloc(1, sizeof(cgt_expr_t));
    e->kind = EXPR_CLAIM;
    e->loc = loc;
    e->as.claim_expr.target = target;
    return e;
}

cgt_expr_t *cgt_expr_pin(cgt_expr_t *target, cgt_loc_t loc) {
    cgt_expr_t *e = (cgt_expr_t *)cgt_calloc(1, sizeof(cgt_expr_t));
    e->kind = EXPR_PIN;
    e->loc = loc;
    e->as.pin_expr.target = target;
    return e;
}

cgt_expr_t *cgt_expr_transfer(cgt_expr_t *val, cgt_expr_t *dest, cgt_loc_t loc) {
    cgt_expr_t *e = (cgt_expr_t *)cgt_calloc(1, sizeof(cgt_expr_t));
    e->kind = EXPR_TRANSFER;
    e->loc = loc;
    e->as.transfer_expr.value = val;
    e->as.transfer_expr.isolate_dest = dest;
    return e;
}

cgt_decl_t *cgt_decl_spec(const char *name, cgt_stmt_t **contracts, size_t count, cgt_loc_t loc) {
    cgt_decl_t *d = (cgt_decl_t *)cgt_calloc(1, sizeof(cgt_decl_t));
    d->kind = DECL_SPEC;
    d->name = cgt_strdup(name);
    d->loc = loc;
    d->as.spec_decl.contracts = contracts;
    d->as.spec_decl.contract_count = count;
    return d;
}

cgt_decl_t *cgt_decl_nexus(const char *name, cgt_type_t *payload, size_t capacity, cgt_loc_t loc) {
    cgt_decl_t *d = (cgt_decl_t *)cgt_calloc(1, sizeof(cgt_decl_t));
    d->kind = DECL_NEXUS;
    d->name = cgt_strdup(name);
    d->loc = loc;
    d->as.nexus_decl.payload_type = payload;
    d->as.nexus_decl.buffer_capacity = capacity;
    return d;
}

cgt_type_t *cgt_type_vector(cgt_type_t *element, uint32_t lanes, cgt_loc_t loc) {
    cgt_type_t *t = (cgt_type_t *)cgt_calloc(1, sizeof(cgt_type_t));
    t->kind = TYPE_VECTOR;
    t->loc = loc;
    t->inner = element;
    t->simd_lanes = lanes;
    static char buf[64];
    snprintf(buf, sizeof(buf), "vector_%u", lanes);
    t->name = cgt_strdup(buf);
    return t;
}

cgt_type_t *cgt_type_device_span(cgt_type_t *element, cgt_loc_t loc) {
    cgt_type_t *t = (cgt_type_t *)cgt_calloc(1, sizeof(cgt_type_t));
    t->kind = TYPE_DEVICE_SPAN;
    t->loc = loc;
    t->inner = element;
    t->name = cgt_strdup("device_span");
    return t;
}

cgt_type_t *cgt_type_nexus(cgt_type_t *payload, cgt_loc_t loc) {
    cgt_type_t *t = (cgt_type_t *)cgt_calloc(1, sizeof(cgt_type_t));
    t->kind = TYPE_NEXUS;
    t->loc = loc;
    t->inner = payload;
    t->name = cgt_strdup("nexus");
    return t;
}

cgt_decl_t *cgt_decl_func(const char *name, cgt_param_t *params, size_t p_count, cgt_type_t *ret, cgt_expr_t *body, bool is_gpu, bool is_simd, bool is_unsafe, cgt_loc_t loc) {
    cgt_decl_t *d = (cgt_decl_t *)cgt_calloc(1, sizeof(cgt_decl_t));
    d->kind = DECL_FUNCTION;
    d->name = cgt_strdup(name);
    d->loc = loc;
    d->as.func.params = params;
    d->as.func.param_count = p_count;
    d->as.func.return_type = ret;
    d->as.func.body = body;
    d->as.func.is_gpu_kernel = is_gpu;
    d->as.func.is_simd_vectorized = is_simd;
    d->as.func.is_unsafe = is_unsafe;
    return d;
}

cgt_decl_t *cgt_decl_struct(const char *name, cgt_struct_field_t *fields, size_t f_count, cgt_loc_t loc) {
    cgt_decl_t *d = (cgt_decl_t *)cgt_calloc(1, sizeof(cgt_decl_t));
    d->kind = DECL_STRUCT;
    d->name = cgt_strdup(name);
    d->loc = loc;
    d->as.struct_decl.fields = fields;
    d->as.struct_decl.field_count = f_count;
    return d;
}

cgt_decl_t *cgt_decl_module(const char *path, cgt_loc_t loc) {
    cgt_decl_t *d = (cgt_decl_t *)cgt_calloc(1, sizeof(cgt_decl_t));
    d->kind = DECL_MODULE;
    d->name = cgt_strdup(path);
    d->loc = loc;
    d->as.module_decl.module_path = d->name;
    return d;
}

cgt_decl_t *cgt_decl_import(const char *path, const char *alias, cgt_loc_t loc) {
    cgt_decl_t *d = (cgt_decl_t *)cgt_calloc(1, sizeof(cgt_decl_t));
    d->kind = DECL_IMPORT;
    d->name = cgt_strdup(path);
    d->loc = loc;
    d->as.import_decl.import_path = d->name;
    d->as.import_decl.alias = alias ? cgt_strdup(alias) : NULL;
    return d;
}

void cgt_ast_module_init(cgt_ast_module_t *mod, const char *name, const char *filename) {
    mod->module_name = name ? cgt_strdup(name) : "main";
    mod->filename = filename ? cgt_strdup(filename) : "source.cgt";
    mod->declarations = NULL;
    mod->decl_count = 0;
    mod->decl_capacity = 0;
}

void cgt_ast_module_add_decl(cgt_ast_module_t *mod, cgt_decl_t *decl) {
    if (mod->decl_count >= mod->decl_capacity) {
        mod->decl_capacity = mod->decl_capacity ? mod->decl_capacity * 2 : 8;
        mod->declarations = (cgt_decl_t **)cgt_realloc(mod->declarations, mod->decl_capacity * sizeof(cgt_decl_t *));
    }
    mod->declarations[mod->decl_count++] = decl;
}

void cgt_ast_dump(cgt_ast_module_t *mod, FILE *out) {
    fprintf(out, "=== C> AST MODULE: %s (%s) ===\n", mod->module_name, mod->filename);
    for (size_t i = 0; i < mod->decl_count; i++) {
        cgt_decl_t *d = mod->declarations[i];
        switch (d->kind) {
            case DECL_MODULE:
                fprintf(out, "  module %s;\n", d->as.module_decl.module_path);
                break;
            case DECL_IMPORT:
                fprintf(out, "  import %s;\n", d->as.import_decl.import_path);
                break;
            case DECL_STRUCT:
                fprintf(out, "  struct %s {\n", d->name);
                for (size_t f = 0; f < d->as.struct_decl.field_count; f++) {
                    cgt_struct_field_t *field = &d->as.struct_decl.fields[f];
                    fprintf(out, "    %s: %s,\n", field->name, field->type->name ? field->type->name : "type");
                }
                fprintf(out, "  }\n");
                break;
            case DECL_FUNCTION:
                fprintf(out, "  %s%sfn %s(",
                        d->as.func.is_gpu_kernel ? "gpu_kernel " : "",
                        d->as.func.is_unsafe ? "unsafe " : "",
                        d->name);
                for (size_t p = 0; p < d->as.func.param_count; p++) {
                    cgt_param_t *param = &d->as.func.params[p];
                    fprintf(out, "%s%s: %s%s",
                            param->is_mut ? "mut " : "",
                            param->name,
                            param->type ? (param->type->name ? param->type->name : "type") : "auto",
                            p + 1 < d->as.func.param_count ? ", " : "");
                }
                fprintf(out, ") -> %s {\n", d->as.func.return_type ? (d->as.func.return_type->name ? d->as.func.return_type->name : "void") : "void");
                fprintf(out, "    [function body]\n  }\n");
                break;
            default:
                fprintf(out, "  [decl: %s]\n", d->name ? d->name : "<anon>");
                break;
        }
    }
}
