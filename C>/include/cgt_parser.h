#ifndef CGT_PARSER_H
#define CGT_PARSER_H

#include "cgt_common.h"
#include "cgt_lexer.h"
#include "cgt_ast.h"

typedef struct {
    cgt_lexer_t lexer;
    cgt_token_t current;
    cgt_token_t peek;
    cgt_token_t prev;
    bool has_error;
    uint32_t error_count;
} cgt_parser_t;

void cgt_parser_init(cgt_parser_t *parser, const char *source, size_t length, const char *filename);
bool cgt_parser_parse_module(cgt_parser_t *parser, cgt_ast_module_t *out_module);

/* Sub-parsers for testing and modularity */
cgt_decl_t *cgt_parser_parse_decl(cgt_parser_t *parser);
cgt_stmt_t *cgt_parser_parse_stmt(cgt_parser_t *parser);
cgt_expr_t *cgt_parser_parse_expr(cgt_parser_t *parser);
cgt_type_t *cgt_parser_parse_type(cgt_parser_t *parser);

#endif /* CGT_PARSER_H */
