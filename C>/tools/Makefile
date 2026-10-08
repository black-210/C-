CC ?= gcc
CFLAGS ?= -O2 -Wall -Wextra -std=c11
BIN_DIR = ../bin

TOOLS = $(BIN_DIR)/cgt_fmt $(BIN_DIR)/cgt_lint $(BIN_DIR)/cgt_disasm

all: $(TOOLS)

$(BIN_DIR)/cgt_fmt: cgt_fmt.c
	@mkdir -p $(BIN_DIR)
	$(CC) $(CFLAGS) -o $@ $<

$(BIN_DIR)/cgt_lint: cgt_lint.c
	@mkdir -p $(BIN_DIR)
	$(CC) $(CFLAGS) -o $@ $<

$(BIN_DIR)/cgt_disasm: cgt_disasm.c
	@mkdir -p $(BIN_DIR)
	$(CC) $(CFLAGS) -o $@ $<

clean:
	rm -f $(TOOLS)

.PHONY: all clean
