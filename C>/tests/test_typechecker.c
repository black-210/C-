#include "cgt_typechecker.h"
#include "cgt_parser.h"
#include <assert.h>

void run_typechecker_tests(void) {
    printf("[Test]: Running Typechecker Tests...\n");

    const char *src = "fn test_math() -> i32 { let x: i32 = 10; let y: i32 = 20; return x + y; }";
    cgt_parser_t parser;
    cgt_parser_init(&parser, src, strlen(src), "test_tc.cgt");

    cgt_ast_module_t mod;
    cgt_ast_module_init(&mod, "test_tc", "test_tc.cgt");
    cgt_parser_parse_module(&parser, &mod);

    cgt_analyzer_t analyzer;
    cgt_analyzer_init(&analyzer, &mod);
    cgt_semantic_analyze_module(&analyzer, &mod);

    cgt_typechecker_t tc;
    cgt_typechecker_init(&tc, &analyzer);
    bool ok = cgt_typechecker_check_module(&tc, &mod);
    assert(ok == true);
    assert(tc.error_count == 0);

    printf("  -> Typechecker test passed.\n");
}
