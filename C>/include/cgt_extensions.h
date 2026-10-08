#ifndef CGT_EXTENSIONS_H
#define CGT_EXTENSIONS_H

#include "cgt_common.h"
#include "cgt_lexer.h"
#include "cgt_ast.h"
#include "cgt_ir.h"

typedef struct cgt_extension cgt_extension_t;

typedef bool (*cgt_ext_lexer_hook_fn)(cgt_lexer_t *lexer, cgt_token_t *out_tok);
typedef cgt_expr_t *(*cgt_ext_parser_expr_hook_fn)(void *parser_ptr);
typedef bool (*cgt_ext_semantic_hook_fn)(void *analyzer_ptr, cgt_ast_module_t *module);
typedef bool (*cgt_ext_ir_hook_fn)(cgt_ir_module_t *ir_mod, cgt_ast_module_t *ast);
typedef bool (*cgt_ext_codegen_hook_fn)(void *codegen_ptr, cgt_ir_module_t *ir_mod);

struct cgt_extension {
    const char *name;
    const char *version;
    const char *description;
    cgt_ext_lexer_hook_fn on_lex_token;
    cgt_ext_parser_expr_hook_fn on_parse_expr;
    cgt_ext_semantic_hook_fn on_semantic_analysis;
    cgt_ext_ir_hook_fn on_ir_lowering;
    cgt_ext_codegen_hook_fn on_codegen;
    struct cgt_extension *next;
};

void cgt_extension_registry_init(void);
bool cgt_extension_register(cgt_extension_t *ext);
cgt_extension_t *cgt_extension_lookup(const char *name);
void cgt_extension_registry_dump(FILE *out);

#endif /* CGT_EXTENSIONS_H */
