cmake_minimum_required(VERSION 3.16)
project(CGreaterLanguage VERSION 1.0.0 LANGUAGES C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_C_STANDARD_REQUIRED ON)

include_directories(
    ${CMAKE_CURRENT_SOURCE_DIR}/include
    ${CMAKE_CURRENT_SOURCE_DIR}/runtime
)

# Compiler sources
set(COMPILER_SRCS
    compiler/lexer/cgt_common.c
    compiler/lexer/cgt_lexer.c
    compiler/ast/cgt_ast.c
    compiler/parser/cgt_parser.c
    compiler/semantic/cgt_semantic.c
    compiler/typechecker/cgt_typechecker.c
    compiler/memory/cgt_memory_safety.c
    compiler/security/cgt_security.c
    compiler/ir/cgt_ir.c
    compiler/optimizer/cgt_optimizer.c
    compiler/codegen/cgt_codegen.c
    compiler/backend/cgt_backend.c
    compiler/driver/cgt_driver.c
    extensions/cgt_extensions.c
    extensions/ext_matrix.c
)

# Main compiler binary: cgt
add_executable(cgt
    ${COMPILER_SRCS}
    compiler/driver/main.c
)

target_link_libraries(cgt pthread)

# Runtime library: libcgt_runtime
add_library(cgt_runtime STATIC
    runtime/cgt_runtime.c
)
target_link_libraries(cgt_runtime pthread)

# Test runner binary
add_executable(cgt_test
    ${COMPILER_SRCS}
    tests/test_lexer.c
    tests/test_parser.c
    tests/test_typechecker.c
    tests/test_memory_safety.c
    tests/test_ir.c
    tests/test_runner.c
)
target_link_libraries(cgt_test pthread)

# Installation targets
install(TARGETS cgt DESTINATION bin)
install(DIRECTORY include/ DESTINATION include/cgt)
