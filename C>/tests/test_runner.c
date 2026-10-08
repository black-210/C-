#include <stdio.h>
#include <stdlib.h>

void run_lexer_tests(void);
void run_parser_tests(void);
void run_typechecker_tests(void);
void run_memory_safety_tests(void);
void run_ir_tests(void);

int main(void) {
    printf("=========================================\n");
    printf("   C> (C-Greater) Compiler Test Suite    \n");
    printf("=========================================\n");

    run_lexer_tests();
    run_parser_tests();
    run_typechecker_tests();
    run_memory_safety_tests();
    run_ir_tests();

    printf("\n\033[1;32mALL C> COMPILER TESTS PASSED SUCCESSFULLY!\033[0m\n");
    printf("=========================================\n");
    return 0;
}
