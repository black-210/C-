/* C> Bytecode and IR Inspector / Disassembler Tool */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char **argv) {
    if (argc < 2) {
        fprintf(stderr, "Usage: cgt_disasm <binary_or_ir_file>\n");
        return 1;
    }

    printf("=== C> Target Disassembly & Symbol Table: %s ===\n", argv[1]);
    char cmd[1024];
    snprintf(cmd, sizeof(cmd), "objdump -d -M intel '%s' 2>/dev/null || cat '%s'", argv[1], argv[1]);
    int ret = system(cmd);
    return ret;
}
