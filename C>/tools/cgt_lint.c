/* C> Static Linter and Style Checker Tool (cgt_lint) */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char **argv) {
    if (argc < 2) {
        fprintf(stderr, "Usage: cgt_lint <source.cgt>\n");
        return 1;
    }

    FILE *f = fopen(argv[1], "r");
    if (!f) {
        fprintf(stderr, "Error opening file '%s'\n", argv[1]);
        return 1;
    }

    char line[1024];
    int line_num = 0;
    int warnings = 0;

    while (fgets(line, sizeof(line), f)) {
        line_num++;
        // Check for common code smells in C>
        if (strstr(line, "TODO") || strstr(line, "FIXME")) {
            printf("[LINT WARNING] %s:%d: Unresolved marker in source\n", argv[1], line_num);
            warnings++;
        }
        if (strstr(line, "unsafe") && !strstr(line, "// SAFETY:")) {
            printf("[LINT AUDIT] %s:%d: Unsafe block without explanatory safety comment\n", argv[1], line_num);
            warnings++;
        }
    }

    fclose(f);
    if (warnings == 0) {
        printf("[LINT] %s: No issues detected. Clean source.\n", argv[1]);
    }
    return 0;
}
