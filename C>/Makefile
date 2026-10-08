CC ?= gcc
CFLAGS ?= -std=c11 -Wall -Wextra -O2 -Iinclude -Iruntime
LDFLAGS ?= -lpthread

SRCS = \
	compiler/lexer/cgt_common.c \
	compiler/lexer/cgt_lexer.c \
	compiler/ast/cgt_ast.c \
	compiler/parser/cgt_parser.c \
	compiler/semantic/cgt_semantic.c \
	compiler/typechecker/cgt_typechecker.c \
	compiler/memory/cgt_memory_safety.c \
	compiler/security/cgt_security.c \
	compiler/ir/cgt_ir.c \
	compiler/optimizer/cgt_optimizer.c \
	compiler/codegen/cgt_codegen.c \
	compiler/backend/cgt_backend.c \
	compiler/driver/cgt_driver.c \
	extensions/cgt_extensions.c \
	extensions/ext_matrix.c

TEST_SRCS = \
	tests/test_lexer.c \
	tests/test_parser.c \
	tests/test_typechecker.c \
	tests/test_memory_safety.c \
	tests/test_ir.c \
	tests/test_runner.c

BIN_DIR = bin
BUILD_DIR = build

.PHONY: all clean test install

all: $(BIN_DIR)/cgt $(BIN_DIR)/cgt_test $(BIN_DIR)/libcgt_runtime.a

$(BIN_DIR):
	mkdir -p $(BIN_DIR)

$(BIN_DIR)/cgt: compiler/driver/main.c $(SRCS) | $(BIN_DIR)
	$(CC) $(CFLAGS) -o $@ $^ $(LDFLAGS)

$(BIN_DIR)/cgt_test: $(SRCS) $(TEST_SRCS) | $(BIN_DIR)
	$(CC) $(CFLAGS) -o $@ $^ $(LDFLAGS)

$(BIN_DIR)/libcgt_runtime.a: runtime/cgt_runtime.c | $(BIN_DIR)
	$(CC) $(CFLAGS) -c runtime/cgt_runtime.c -o $(BIN_DIR)/cgt_runtime.o
	ar rcs $@ $(BIN_DIR)/cgt_runtime.o

test: $(BIN_DIR)/cgt_test
	./$(BIN_DIR)/cgt_test

install: $(BIN_DIR)/cgt
	install -d /usr/local/bin
	install -m 755 $(BIN_DIR)/cgt /usr/local/bin/cgt

clean:
	rm -rf $(BIN_DIR) $(BUILD_DIR) *.o a.out
