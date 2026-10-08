#include "cgt_parser.h"
#include <assert.h>

void run_parser_tests(void) {
    printf("[Test]: Running Parser Tests...\n");

    const char *src = "fn compute(a: i32, b: i32) -> i32 { return a + b * 2; }";
    cgt_parser_t parser;
    cgt_parser_init(&parser, src, strlen(src), "test_parser.cgt");

    cgt_ast_module_t mod;
    cgt_ast_module_init(&mod, "test_mod", "test_parser.cgt");

    bool ok = cgt_parser_parse_module(&parser, &mod);
    assert(ok == true);
    assert(mod.decl_count == 1);
    assert(mod.declarations[0]->kind == DECL_FUNCTION);
    assert(strcmp(mod.declarations[0]->name, "compute") == 0);
    assert(mod.declarations[0]->as.func.param_count == 2);

    printf("  -> Parser test passed.\n");
}
