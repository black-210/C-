#include "cgt_lexer.h"
#include <assert.h>

void run_lexer_tests(void) {
    printf("[Test]: Running Lexer Tests...\n");

    const char *src = "fn main() -> i32 { let mut x = 42; return x; }";
    cgt_lexer_t lexer;
    cgt_lexer_init(&lexer, src, strlen(src), "test.cgt");

    cgt_token_t tok = cgt_lexer_next_token(&lexer);
    assert(tok.kind == TOK_FN);

    tok = cgt_lexer_next_token(&lexer);
    assert(tok.kind == TOK_IDENT);
    assert(strcmp(tok.lexeme, "main") == 0);

    tok = cgt_lexer_next_token(&lexer);
    assert(tok.kind == TOK_LPAREN);

    tok = cgt_lexer_next_token(&lexer);
    assert(tok.kind == TOK_RPAREN);

    tok = cgt_lexer_next_token(&lexer);
    assert(tok.kind == TOK_ARROW);

    tok = cgt_lexer_next_token(&lexer);
    assert(tok.kind == TOK_IDENT);
    assert(strcmp(tok.lexeme, "i32") == 0);

    printf("  -> Lexer test passed.\n");
}
