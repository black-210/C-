#include "cgt_parser.h"

static cgt_token_t advance(cgt_parser_t *parser) {
    parser->prev = parser->current;
    parser->current = parser->peek;
    parser->peek = cgt_lexer_next_token(&parser->lexer);
    return parser->prev;
}

static bool check(cgt_parser_t *parser, cgt_token_kind_t kind) {
    return parser->current.kind == kind;
}

static bool match(cgt_parser_t *parser, cgt_token_kind_t kind) {
    if (check(parser, kind)) {
        advance(parser);
        return true;
    }
    return false;
}

static cgt_token_t expect(cgt_parser_t *parser, cgt_token_kind_t kind, const char *err_msg) {
    if (check(parser, kind)) {
        return advance(parser);
    }
    cgt_diag_report(CGT_DIAG_ERROR, parser->current.loc, "Expected %s, but got '%s': %s",
                    cgt_token_kind_name(kind), parser->current.lexeme ? parser->current.lexeme : "", err_msg);
    parser->has_error = true;
    parser->error_count++;
    cgt_token_t dummy;
    memset(&dummy, 0, sizeof(dummy));
    dummy.kind = TOK_ERROR;
    dummy.loc = parser->current.loc;
    return dummy;
}

/* Forward declarations */
static cgt_expr_t *parse_expression(cgt_parser_t *parser);
static cgt_expr_t *parse_assignment(cgt_parser_t *parser);
static cgt_expr_t *parse_logical_or(cgt_parser_t *parser);
static cgt_expr_t *parse_logical_and(cgt_parser_t *parser);
static cgt_expr_t *parse_bitwise_or(cgt_parser_t *parser);
static cgt_expr_t *parse_bitwise_xor(cgt_parser_t *parser);
static cgt_expr_t *parse_bitwise_and(cgt_parser_t *parser);
static cgt_expr_t *parse_equality(cgt_parser_t *parser);
static cgt_expr_t *parse_relational(cgt_parser_t *parser);
static cgt_expr_t *parse_shift(cgt_parser_t *parser);
static cgt_expr_t *parse_additive(cgt_parser_t *parser);
static cgt_expr_t *parse_multiplicative(cgt_parser_t *parser);
static cgt_expr_t *parse_unary(cgt_parser_t *parser);
static cgt_expr_t *parse_postfix(cgt_parser_t *parser);
static cgt_expr_t *parse_primary(cgt_parser_t *parser);
static cgt_type_t *parse_type(cgt_parser_t *parser);
static cgt_stmt_t *parse_statement(cgt_parser_t *parser);
static cgt_decl_t *parse_declaration(cgt_parser_t *parser);

void cgt_parser_init(cgt_parser_t *parser, const char *source, size_t length, const char *filename) {
    cgt_lexer_init(&parser->lexer, source, length, filename);
    parser->current = cgt_lexer_next_token(&parser->lexer);
    parser->peek = cgt_lexer_next_token(&parser->lexer);
    parser->has_error = false;
    parser->error_count = 0;
}

/* Parse Type Expressions */
static cgt_type_t *parse_type(cgt_parser_t *parser) {
    cgt_loc_t loc = parser->current.loc;

    if (match(parser, TOK_AMP)) {
        bool is_mut = match(parser, TOK_MUT);
        cgt_type_t *inner = parse_type(parser);
        return cgt_type_ref(inner, is_mut, loc);
    }

    if (match(parser, TOK_STAR)) {
        bool is_const = false;
        if (check(parser, TOK_CONST)) {
            advance(parser);
            is_const = true;
        } else if (check(parser, TOK_IDENT) && strcmp(parser->current.lexeme, "raw") == 0) {
            advance(parser);
            is_const = false;
        }
        cgt_type_t *inner = parse_type(parser);
        return cgt_type_ptr(inner, is_const, loc);
    }

    if (match(parser, TOK_OWN)) {
        expect(parser, TOK_LT, "expected '<' after own");
        cgt_type_t *inner = parse_type(parser);
        expect(parser, TOK_GT, "expected '>' after owned type");
        return cgt_type_owned(inner, loc);
    }

    if (match(parser, TOK_LBRACKET)) {
        cgt_type_t *inner = parse_type(parser);
        if (match(parser, TOK_SEMICOLON)) {
            cgt_token_t size_tok = expect(parser, TOK_INT_LIT, "expected integer array size");
            expect(parser, TOK_RBRACKET, "expected ']' after array size");
            return cgt_type_array(inner, (size_t)size_tok.as.int_val, loc);
        }
        expect(parser, TOK_RBRACKET, "expected ']' after slice element type");
        return cgt_type_slice(inner, loc);
    }

    if (check(parser, TOK_IDENT)) {
        cgt_token_t tok = advance(parser);
        const char *name = tok.lexeme;

        if (strcmp(name, "void") == 0) return cgt_type_primitive(TYPE_VOID, loc);
        if (strcmp(name, "bool") == 0) return cgt_type_primitive(TYPE_BOOL, loc);
        if (strcmp(name, "i8") == 0) return cgt_type_primitive(TYPE_I8, loc);
        if (strcmp(name, "i16") == 0) return cgt_type_primitive(TYPE_I16, loc);
        if (strcmp(name, "i32") == 0) return cgt_type_primitive(TYPE_I32, loc);
        if (strcmp(name, "i64") == 0) return cgt_type_primitive(TYPE_I64, loc);
        if (strcmp(name, "u8") == 0) return cgt_type_primitive(TYPE_U8, loc);
        if (strcmp(name, "u16") == 0) return cgt_type_primitive(TYPE_U16, loc);
        if (strcmp(name, "u32") == 0) return cgt_type_primitive(TYPE_U32, loc);
        if (strcmp(name, "u64") == 0) return cgt_type_primitive(TYPE_U64, loc);
        if (strcmp(name, "f32") == 0) return cgt_type_primitive(TYPE_F32, loc);
        if (strcmp(name, "f64") == 0) return cgt_type_primitive(TYPE_F64, loc);
        if (strcmp(name, "char") == 0) return cgt_type_primitive(TYPE_CHAR, loc);
        if (strcmp(name, "str") == 0) return cgt_type_primitive(TYPE_STR, loc);

        /* SIMD types */
        if (strcmp(name, "v128_f32") == 0) return cgt_type_simd("v128_f32", 4, loc);
        if (strcmp(name, "v128_i32") == 0) return cgt_type_simd("v128_i32", 4, loc);
        if (strcmp(name, "v256_f32") == 0) return cgt_type_simd("v256_f32", 8, loc);
        if (strcmp(name, "v256_i32") == 0) return cgt_type_simd("v256_i32", 8, loc);

        /* Named type, possibly with generics: Name<T> */
        cgt_type_t *t = cgt_type_named(name, loc);
        if (match(parser, TOK_LT)) {
            cgt_type_t **type_args = NULL;
            size_t arg_count = 0;
            size_t arg_cap = 0;
            do {
                cgt_type_t *arg = parse_type(parser);
                if (arg_count >= arg_cap) {
                    arg_cap = arg_cap ? arg_cap * 2 : 4;
                    type_args = (cgt_type_t **)cgt_realloc(type_args, arg_cap * sizeof(cgt_type_t *));
                }
                type_args[arg_count++] = arg;
            } while (match(parser, TOK_COMMA));
            expect(parser, TOK_GT, "expected '>' after generic type arguments");
            t->type_args = type_args;
            t->type_arg_count = arg_count;
        }
        return t;
    }

    cgt_diag_report(CGT_DIAG_ERROR, loc, "Unexpected token in type signature: %s", parser->current.lexeme ? parser->current.lexeme : "");
    parser->has_error = true;
    return cgt_type_primitive(TYPE_VOID, loc);
}

/* Primary Expressions */
static cgt_expr_t *parse_primary(cgt_parser_t *parser) {
    cgt_loc_t loc = parser->current.loc;

    if (match(parser, TOK_INT_LIT)) {
        return cgt_expr_int(parser->prev.as.int_val, loc);
    }
    if (match(parser, TOK_FLOAT_LIT)) {
        return cgt_expr_float(parser->prev.as.float_val, loc);
    }
    if (match(parser, TOK_STRING_LIT)) {
        return cgt_expr_str(parser->prev.as.str_val, loc);
    }
    if (match(parser, TOK_CHAR_LIT)) {
        return cgt_expr_char(parser->prev.as.char_val, loc);
    }
    if (match(parser, TOK_TRUE)) {
        return cgt_expr_bool(true, loc);
    }
    if (match(parser, TOK_FALSE)) {
        return cgt_expr_bool(false, loc);
    }
    if (match(parser, TOK_NULL)) {
        return cgt_expr_null(loc);
    }

    if (match(parser, TOK_UNSAFE)) {
        expect(parser, TOK_LBRACE, "expected '{' after unsafe");
        cgt_stmt_t **stmts = NULL;
        size_t count = 0, cap = 0;
        while (!check(parser, TOK_RBRACE) && !check(parser, TOK_EOF)) {
            cgt_stmt_t *st = parse_statement(parser);
            if (st) {
                if (count >= cap) {
                    cap = cap ? cap * 2 : 8;
                    stmts = (cgt_stmt_t **)cgt_realloc(stmts, cap * sizeof(cgt_stmt_t *));
                }
                stmts[count++] = st;
            }
        }
        expect(parser, TOK_RBRACE, "expected '}' closing unsafe block");
        cgt_expr_t *block = cgt_expr_block(stmts, count, NULL, loc);
        return cgt_expr_unsafe(block, loc);
    }

    if (match(parser, TOK_MOVE)) {
        expect(parser, TOK_LPAREN, "expected '(' after move");
        cgt_expr_t *target = parse_expression(parser);
        expect(parser, TOK_RPAREN, "expected ')' after moved variable");
        return cgt_expr_move(target, loc);
    }

    if (match(parser, TOK_SIZEOF)) {
        expect(parser, TOK_LPAREN, "expected '(' after sizeof");
        cgt_type_t *target_type = parse_type(parser);
        expect(parser, TOK_RPAREN, "expected ')' after sizeof type");
        cgt_expr_t *sz = (cgt_expr_t *)cgt_calloc(1, sizeof(cgt_expr_t));
        sz->kind = EXPR_SIZEOF;
        sz->loc = loc;
        sz->as.sizeof_expr.target_type = target_type;
        return sz;
    }

    if (match(parser, TOK_ASM)) {
        expect(parser, TOK_LPAREN, "expected '(' after asm");
        cgt_token_t asm_tok = expect(parser, TOK_STRING_LIT, "expected inline assembly string");
        expect(parser, TOK_RPAREN, "expected ')' after asm string");
        cgt_expr_t *e = (cgt_expr_t *)cgt_calloc(1, sizeof(cgt_expr_t));
        e->kind = EXPR_INLINE_ASM;
        e->loc = loc;
        e->as.inline_asm.assembly_text = asm_tok.as.str_val;
        return e;
    }

    if (match(parser, TOK_IDENT)) {
        cgt_token_t id_tok = parser->prev;
        const char *name = id_tok.lexeme;

        /* Check for struct init: Name { field: val, ... } */
        if (check(parser, TOK_LBRACE)) {
            advance(parser);
            cgt_field_init_t *fields = NULL;
            size_t count = 0, cap = 0;
            while (!check(parser, TOK_RBRACE) && !check(parser, TOK_EOF)) {
                cgt_token_t f_tok = expect(parser, TOK_IDENT, "expected field name");
                expect(parser, TOK_COLON, "expected ':' after field name");
                cgt_expr_t *val = parse_expression(parser);
                if (count >= cap) {
                    cap = cap ? cap * 2 : 4;
                    fields = (cgt_field_init_t *)cgt_realloc(fields, cap * sizeof(cgt_field_init_t));
                }
                fields[count].name = f_tok.lexeme;
                fields[count].value = val;
                count++;
                if (!match(parser, TOK_COMMA)) break;
            }
            expect(parser, TOK_RBRACE, "expected '}' closing struct literal");
            cgt_expr_t *e = (cgt_expr_t *)cgt_calloc(1, sizeof(cgt_expr_t));
            e->kind = EXPR_STRUCT_INIT;
            e->loc = loc;
            e->as.struct_init.struct_name = name;
            e->as.struct_init.fields = fields;
            e->as.struct_init.field_count = count;
            return e;
        }

        return cgt_expr_ident(name, loc);
    }

    if (match(parser, TOK_LPAREN)) {
        cgt_expr_t *expr = parse_expression(parser);
        expect(parser, TOK_RPAREN, "expected ')'");
        return expr;
    }

    if (match(parser, TOK_LBRACE)) {
        cgt_stmt_t **stmts = NULL;
        size_t count = 0, cap = 0;
        cgt_expr_t *result = NULL;
        while (!check(parser, TOK_RBRACE) && !check(parser, TOK_EOF)) {
            cgt_stmt_t *st = parse_statement(parser);
            if (st) {
                if (count >= cap) {
                    cap = cap ? cap * 2 : 8;
                    stmts = (cgt_stmt_t **)cgt_realloc(stmts, cap * sizeof(cgt_stmt_t *));
                }
                stmts[count++] = st;
            }
        }
        expect(parser, TOK_RBRACE, "expected '}'");
        return cgt_expr_block(stmts, count, result, loc);
    }

    cgt_diag_report(CGT_DIAG_ERROR, loc, "Unexpected expression token '%s'", parser->current.lexeme ? parser->current.lexeme : "");
    parser->has_error = true;
    advance(parser);
    return cgt_expr_null(loc);
}

/* Postfix: Calls f(...), Member access ., ::, Indexing [i], Type cast as T */
static cgt_expr_t *parse_postfix(cgt_parser_t *parser) {
    cgt_expr_t *expr = parse_primary(parser);

    while (true) {
        cgt_loc_t loc = parser->current.loc;

        if (match(parser, TOK_LPAREN)) {
            /* Function call */
            cgt_expr_t **args = NULL;
            size_t count = 0, cap = 0;
            if (!check(parser, TOK_RPAREN)) {
                do {
                    cgt_expr_t *arg = parse_expression(parser);
                    if (count >= cap) {
                        cap = cap ? cap * 2 : 4;
                        args = (cgt_expr_t **)cgt_realloc(args, cap * sizeof(cgt_expr_t *));
                    }
                    args[count++] = arg;
                } while (match(parser, TOK_COMMA));
            }
            expect(parser, TOK_RPAREN, "expected ')' after arguments");
            expr = cgt_expr_call(expr, args, count, loc);
        } else if (match(parser, TOK_DOT)) {
            /* Field access: expr.field */
            cgt_token_t field_tok = expect(parser, TOK_IDENT, "expected field name after '.'");
            expr = cgt_expr_member(expr, field_tok.lexeme, false, loc);
        } else if (match(parser, TOK_DOUBLE_COLON)) {
            /* Scope resolution: expr::symbol */
            cgt_token_t field_tok = expect(parser, TOK_IDENT, "expected identifier after '::'");
            expr = cgt_expr_member(expr, field_tok.lexeme, true, loc);
        } else if (match(parser, TOK_LBRACKET)) {
            /* Indexing: expr[index] */
            cgt_expr_t *index = parse_expression(parser);
            expect(parser, TOK_RBRACKET, "expected ']' after index");
            expr = cgt_expr_index(expr, index, loc);
        } else if (match(parser, TOK_AS)) {
            /* Type cast: expr as TargetType */
            cgt_type_t *target_type = parse_type(parser);
            expr = cgt_expr_cast(expr, target_type, loc);
        } else {
            break;
        }
    }

    return expr;
}

/* Unary: -, !, ~, *, &, &mut */
static cgt_expr_t *parse_unary(cgt_parser_t *parser) {
    cgt_loc_t loc = parser->current.loc;

    if (match(parser, TOK_MINUS)) {
        cgt_expr_t *operand = parse_unary(parser);
        return cgt_expr_unary(UNARY_NEG, operand, loc);
    }
    if (match(parser, TOK_BANG)) {
        cgt_expr_t *operand = parse_unary(parser);
        return cgt_expr_unary(UNARY_NOT, operand, loc);
    }
    if (match(parser, TOK_TILDE)) {
        cgt_expr_t *operand = parse_unary(parser);
        return cgt_expr_unary(UNARY_BIT_NOT, operand, loc);
    }
    if (match(parser, TOK_STAR)) {
        cgt_expr_t *operand = parse_unary(parser);
        return cgt_expr_unary(UNARY_DEREF, operand, loc);
    }
    if (match(parser, TOK_AMP)) {
        bool is_mut = match(parser, TOK_MUT);
        cgt_expr_t *operand = parse_unary(parser);
        return cgt_expr_borrow(operand, is_mut, loc);
    }

    return parse_postfix(parser);
}

static cgt_expr_t *parse_multiplicative(cgt_parser_t *parser) {
    cgt_expr_t *left = parse_unary(parser);
    while (check(parser, TOK_STAR) || check(parser, TOK_SLASH) || check(parser, TOK_PERCENT)) {
        cgt_token_t op_tok = advance(parser);
        cgt_bin_op_t op = (op_tok.kind == TOK_STAR) ? BIN_MUL :
                          (op_tok.kind == TOK_SLASH) ? BIN_DIV : BIN_MOD;
        cgt_expr_t *right = parse_unary(parser);
        left = cgt_expr_binary(op, left, right, op_tok.loc);
    }
    return left;
}

static cgt_expr_t *parse_additive(cgt_parser_t *parser) {
    cgt_expr_t *left = parse_multiplicative(parser);
    while (check(parser, TOK_PLUS) || check(parser, TOK_MINUS)) {
        cgt_token_t op_tok = advance(parser);
        cgt_bin_op_t op = (op_tok.kind == TOK_PLUS) ? BIN_ADD : BIN_SUB;
        cgt_expr_t *right = parse_multiplicative(parser);
        left = cgt_expr_binary(op, left, right, op_tok.loc);
    }
    return left;
}

static cgt_expr_t *parse_shift(cgt_parser_t *parser) {
    cgt_expr_t *left = parse_additive(parser);
    while (check(parser, TOK_SHL) || check(parser, TOK_SHR)) {
        cgt_token_t op_tok = advance(parser);
        cgt_bin_op_t op = (op_tok.kind == TOK_SHL) ? BIN_SHL : BIN_SHR;
        cgt_expr_t *right = parse_additive(parser);
        left = cgt_expr_binary(op, left, right, op_tok.loc);
    }
    return left;
}

static cgt_expr_t *parse_relational(cgt_parser_t *parser) {
    cgt_expr_t *left = parse_shift(parser);
    while (check(parser, TOK_LT) || check(parser, TOK_LE) ||
           check(parser, TOK_GT) || check(parser, TOK_GE)) {
        cgt_token_t op_tok = advance(parser);
        cgt_bin_op_t op = (op_tok.kind == TOK_LT) ? BIN_LT :
                          (op_tok.kind == TOK_LE) ? BIN_LE :
                          (op_tok.kind == TOK_GT) ? BIN_GT : BIN_GE;
        cgt_expr_t *right = parse_shift(parser);
        left = cgt_expr_binary(op, left, right, op_tok.loc);
    }
    return left;
}

static cgt_expr_t *parse_equality(cgt_parser_t *parser) {
    cgt_expr_t *left = parse_relational(parser);
    while (check(parser, TOK_EQ) || check(parser, TOK_NE)) {
        cgt_token_t op_tok = advance(parser);
        cgt_bin_op_t op = (op_tok.kind == TOK_EQ) ? BIN_EQ : BIN_NE;
        cgt_expr_t *right = parse_relational(parser);
        left = cgt_expr_binary(op, left, right, op_tok.loc);
    }
    return left;
}

static cgt_expr_t *parse_bitwise_and(cgt_parser_t *parser) {
    cgt_expr_t *left = parse_equality(parser);
    while (match(parser, TOK_AMP)) {
        cgt_expr_t *right = parse_equality(parser);
        left = cgt_expr_binary(BIN_BIT_AND, left, right, left->loc);
    }
    return left;
}

static cgt_expr_t *parse_bitwise_xor(cgt_parser_t *parser) {
    cgt_expr_t *left = parse_bitwise_and(parser);
    while (match(parser, TOK_CARET)) {
        cgt_expr_t *right = parse_bitwise_and(parser);
        left = cgt_expr_binary(BIN_BIT_XOR, left, right, left->loc);
    }
    return left;
}

static cgt_expr_t *parse_bitwise_or(cgt_parser_t *parser) {
    cgt_expr_t *left = parse_bitwise_xor(parser);
    while (match(parser, TOK_PIPE)) {
        cgt_expr_t *right = parse_bitwise_xor(parser);
        left = cgt_expr_binary(BIN_BIT_OR, left, right, left->loc);
    }
    return left;
}

static cgt_expr_t *parse_logical_and(cgt_parser_t *parser) {
    cgt_expr_t *left = parse_bitwise_or(parser);
    while (match(parser, TOK_LOG_AND)) {
        cgt_expr_t *right = parse_bitwise_or(parser);
        left = cgt_expr_binary(BIN_LOG_AND, left, right, left->loc);
    }
    return left;
}

static cgt_expr_t *parse_logical_or(cgt_parser_t *parser) {
    cgt_expr_t *left = parse_logical_and(parser);
    while (match(parser, TOK_LOG_OR)) {
        cgt_expr_t *right = parse_logical_and(parser);
        left = cgt_expr_binary(BIN_LOG_OR, left, right, left->loc);
    }
    return left;
}

static cgt_expr_t *parse_assignment(cgt_parser_t *parser) {
    cgt_expr_t *left = parse_logical_or(parser);
    return left;
}

static cgt_expr_t *parse_expression(cgt_parser_t *parser) {
    return parse_assignment(parser);
}

/* Parse Statements */
static cgt_stmt_t *parse_statement(cgt_parser_t *parser) {
    cgt_loc_t loc = parser->current.loc;

    if (match(parser, TOK_LET)) {
        bool is_mut = match(parser, TOK_MUT);
        cgt_token_t id_tok = expect(parser, TOK_IDENT, "expected variable name after let");
        cgt_type_t *type = NULL;
        bool is_owned = false;

        if (match(parser, TOK_COLON)) {
            type = parse_type(parser);
            if (type && type->kind == TYPE_OWNED) {
                is_owned = true;
            }
        }

        cgt_expr_t *init = NULL;
        if (match(parser, TOK_ASSIGN)) {
            init = parse_expression(parser);
        }
        expect(parser, TOK_SEMICOLON, "expected ';' after variable declaration");
        return cgt_stmt_let(id_tok.lexeme, type, init, is_mut, is_owned, loc);
    }

    if (match(parser, TOK_IF)) {
        expect(parser, TOK_LPAREN, "expected '(' after if");
        cgt_expr_t *cond = parse_expression(parser);
        expect(parser, TOK_RPAREN, "expected ')' after if condition");
        cgt_expr_t *then_b = parse_primary(parser);
        cgt_expr_t *else_b = NULL;
        if (match(parser, TOK_ELSE)) {
            else_b = parse_primary(parser);
        }
        cgt_expr_t *if_expr = cgt_expr_if(cond, then_b, else_b, loc);
        return cgt_stmt_expr(if_expr, loc);
    }

    if (match(parser, TOK_UNSAFE)) {
        expect(parser, TOK_LBRACE, "expected '{' after unsafe");
        cgt_stmt_t **stmts = NULL;
        size_t count = 0, cap = 0;
        while (!check(parser, TOK_RBRACE) && !check(parser, TOK_EOF)) {
            cgt_stmt_t *st = parse_statement(parser);
            if (st) {
                if (count >= cap) {
                    cap = cap ? cap * 2 : 8;
                    stmts = (cgt_stmt_t **)cgt_realloc(stmts, cap * sizeof(cgt_stmt_t *));
                }
                stmts[count++] = st;
            }
        }
        expect(parser, TOK_RBRACE, "expected '}' closing unsafe block");
        cgt_expr_t *block = cgt_expr_block(stmts, count, NULL, loc);
        return cgt_stmt_expr(cgt_expr_unsafe(block, loc), loc);
    }

    if (match(parser, TOK_RETURN)) {
        cgt_expr_t *val = NULL;
        if (!check(parser, TOK_SEMICOLON)) {
            val = parse_expression(parser);
        }
        expect(parser, TOK_SEMICOLON, "expected ';' after return value");
        return cgt_stmt_return(val, loc);
    }

    if (match(parser, TOK_WHILE)) {
        expect(parser, TOK_LPAREN, "expected '(' after while");
        cgt_expr_t *cond = parse_expression(parser);
        expect(parser, TOK_RPAREN, "expected ')' after while condition");
        cgt_expr_t *body = parse_primary(parser);
        return cgt_stmt_while(cond, body, loc);
    }

    if (match(parser, TOK_DEFER)) {
        cgt_expr_t *def = parse_expression(parser);
        expect(parser, TOK_SEMICOLON, "expected ';' after defer expression");
        return cgt_stmt_defer(def, loc);
    }

    /* Check for assignment or expression statement */
    cgt_expr_t *expr = parse_expression(parser);
    if (check(parser, TOK_ASSIGN) || check(parser, TOK_PLUS_ASSIGN) ||
        check(parser, TOK_MINUS_ASSIGN) || check(parser, TOK_STAR_ASSIGN) ||
        check(parser, TOK_SLASH_ASSIGN) || check(parser, TOK_PERCENT_ASSIGN) ||
        check(parser, TOK_AMP_ASSIGN) || check(parser, TOK_PIPE_ASSIGN) ||
        check(parser, TOK_CARET_ASSIGN) || check(parser, TOK_SHL_ASSIGN) ||
        check(parser, TOK_SHR_ASSIGN)) {
        cgt_token_t op_tok = advance(parser);
        cgt_expr_t *val = parse_expression(parser);
        expect(parser, TOK_SEMICOLON, "expected ';' after assignment");
        return cgt_stmt_assign(expr, val, op_tok.kind, loc);
    }

    expect(parser, TOK_SEMICOLON, "expected ';' after statement");
    return cgt_stmt_expr(expr, loc);
}

/* Parse Declarations */
static cgt_decl_t *parse_declaration(cgt_parser_t *parser) {
    cgt_loc_t loc = parser->current.loc;
    bool is_pub = match(parser, TOK_PUB);
    bool is_extern = match(parser, TOK_EXTERN);

    if (match(parser, TOK_MODULE)) {
        cgt_strbuf_t path_sb;
        cgt_strbuf_init(&path_sb);
        cgt_token_t seg = advance(parser);
        cgt_strbuf_append(&path_sb, seg.lexeme ? seg.lexeme : "");
        while (match(parser, TOK_DOUBLE_COLON)) {
            cgt_strbuf_append(&path_sb, "::");
            seg = advance(parser);
            cgt_strbuf_append(&path_sb, seg.lexeme ? seg.lexeme : "");
        }
        expect(parser, TOK_SEMICOLON, "expected ';' after module declaration");
        char *path = cgt_strbuf_detach(&path_sb);
        return cgt_decl_module(path, loc);
    }

    if (match(parser, TOK_IMPORT)) {
        cgt_strbuf_t path_sb;
        cgt_strbuf_init(&path_sb);
        cgt_token_t seg = advance(parser);
        cgt_strbuf_append(&path_sb, seg.lexeme ? seg.lexeme : "");
        while (match(parser, TOK_DOUBLE_COLON)) {
            cgt_strbuf_append(&path_sb, "::");
            seg = advance(parser);
            cgt_strbuf_append(&path_sb, seg.lexeme ? seg.lexeme : "");
        }
        const char *alias = NULL;
        if (match(parser, TOK_AS)) {
            cgt_token_t al = advance(parser);
            alias = al.lexeme;
        }
        expect(parser, TOK_SEMICOLON, "expected ';' after import");
        char *path = cgt_strbuf_detach(&path_sb);
        return cgt_decl_import(path, alias, loc);
    }

    if (match(parser, TOK_STRUCT)) {
        cgt_token_t id_tok = expect(parser, TOK_IDENT, "expected struct name");
        expect(parser, TOK_LBRACE, "expected '{' after struct name");

        cgt_struct_field_t *fields = NULL;
        size_t count = 0, cap = 0;
        while (!check(parser, TOK_RBRACE) && !check(parser, TOK_EOF)) {
            bool f_pub = match(parser, TOK_PUB);
            cgt_token_t f_name = expect(parser, TOK_IDENT, "expected field name");
            expect(parser, TOK_COLON, "expected ':' after field name");
            cgt_type_t *f_type = parse_type(parser);

            if (count >= cap) {
                cap = cap ? cap * 2 : 4;
                fields = (cgt_struct_field_t *)cgt_realloc(fields, cap * sizeof(cgt_struct_field_t));
            }
            fields[count].name = f_name.lexeme;
            fields[count].type = f_type;
            fields[count].is_pub = f_pub;
            fields[count].loc = f_name.loc;
            count++;

            match(parser, TOK_COMMA);
        }
        expect(parser, TOK_RBRACE, "expected '}' closing struct");
        cgt_decl_t *d = cgt_decl_struct(id_tok.lexeme, fields, count, loc);
        d->is_pub = is_pub;
        return d;
    }

    bool is_gpu = match(parser, TOK_GPU_KERNEL);
    bool is_simd = match(parser, TOK_SIMD);
    bool is_unsafe = match(parser, TOK_UNSAFE);

    if (match(parser, TOK_FN)) {
        cgt_token_t id_tok = expect(parser, TOK_IDENT, "expected function name");

        expect(parser, TOK_LPAREN, "expected '(' after function name");
        cgt_param_t *params = NULL;
        size_t p_count = 0, p_cap = 0;

        if (!check(parser, TOK_RPAREN)) {
            do {
                bool p_mut = match(parser, TOK_MUT);
                cgt_token_t p_name = expect(parser, TOK_IDENT, "expected parameter name");
                expect(parser, TOK_COLON, "expected ':' after parameter name");
                cgt_type_t *p_type = parse_type(parser);

                if (p_count >= p_cap) {
                    p_cap = p_cap ? p_cap * 2 : 4;
                    params = (cgt_param_t *)cgt_realloc(params, p_cap * sizeof(cgt_param_t));
                }
                params[p_count].name = p_name.lexeme;
                params[p_count].type = p_type;
                params[p_count].is_mut = p_mut;
                params[p_count].is_owned = (p_type && p_type->kind == TYPE_OWNED);
                params[p_count].loc = p_name.loc;
                p_count++;
            } while (match(parser, TOK_COMMA));
        }
        expect(parser, TOK_RPAREN, "expected ')' after parameters");

        cgt_type_t *ret_type = NULL;
        if (match(parser, TOK_ARROW)) {
            ret_type = parse_type(parser);
        } else {
            ret_type = cgt_type_primitive(TYPE_VOID, loc);
        }

        cgt_expr_t *body = NULL;
        if (is_extern || match(parser, TOK_SEMICOLON)) {
            /* Forward / extern declaration */
            body = NULL;
        } else {
            body = parse_primary(parser);
        }

        cgt_decl_t *d = cgt_decl_func(id_tok.lexeme, params, p_count, ret_type, body, is_gpu, is_simd, is_unsafe, loc);
        d->is_pub = is_pub;
        d->is_extern = is_extern;
        return d;
    }

    cgt_diag_report(CGT_DIAG_ERROR, loc, "Unexpected token in declaration: %s", parser->current.lexeme ? parser->current.lexeme : "");
    parser->has_error = true;
    advance(parser);
    return NULL;
}

bool cgt_parser_parse_module(cgt_parser_t *parser, cgt_ast_module_t *out_module) {
    while (!check(parser, TOK_EOF)) {
        cgt_decl_t *decl = parse_declaration(parser);
        if (decl) {
            cgt_ast_module_add_decl(out_module, decl);
        } else {
            /* Error recovery: advance to next semicolon or brace */
            while (!check(parser, TOK_SEMICOLON) && !check(parser, TOK_RBRACE) && !check(parser, TOK_EOF)) {
                advance(parser);
            }
            if (!check(parser, TOK_EOF)) advance(parser);
        }
    }
    return !parser->has_error;
}

cgt_decl_t *cgt_parser_parse_decl(cgt_parser_t *parser) {
    return parse_declaration(parser);
}

cgt_stmt_t *cgt_parser_parse_stmt(cgt_parser_t *parser) {
    return parse_statement(parser);
}

cgt_expr_t *cgt_parser_parse_expr(cgt_parser_t *parser) {
    return parse_expression(parser);
}

cgt_type_t *cgt_parser_parse_type(cgt_parser_t *parser) {
    return parse_type(parser);
}
