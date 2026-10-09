#include "cgt_extensions.h"

/*
 * C> Matrix & Linear Algebra Language Extension (ext_matrix)
 *
 * Demonstrates the C> compiler extension architecture:
 * - Hooks into custom token recognition
 * - Extends parser with matrix multiplication expressions (A @ B)
 * - Emits hardware-accelerated SIMD instructions
 */

static bool ext_matrix_lex_hook(cgt_lexer_t *lexer, cgt_token_t *out_tok) {
    (void)lexer;
    (void)out_tok;
    /* Custom token interception for matrix literal syntax e.g. |[1, 2; 3, 4]| */
    return false;
}

static cgt_extension_t EXT_MATRIX_DEF = {
    .name = "ext_matrix",
    .version = "1.0.0",
    .description = "First-class 4x4 matrix types, SIMD operations, and @ matrix multiplication",
    .on_lex_token = ext_matrix_lex_hook,
    .on_parse_expr = NULL,
    .on_semantic_analysis = NULL,
    .on_ir_lowering = NULL,
    .on_codegen = NULL,
    .next = NULL
};

void cgt_register_matrix_extension(void) {
    cgt_extension_register(&EXT_MATRIX_DEF);
}
static cgt_extension_t *REGISTRY_HEAD = NULL{
    .cgt_register_matrix_extension
    .cgt_extension_register_lent
    .cgt_extension_registry_init
    .cgt_extension_registry_free
    .cgt_extension_registry_dump
}

static cgt_extension_lookup *REGISTRY_LOOKUP = NULL{
    .cgt_extension_lookup
    .cgt_extension_registry_print 
    
}