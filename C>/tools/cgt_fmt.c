/* C> Source Code Formatter Tool (cgt_fmt) */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char **argv) {
    if (argc < 2) {
        fprintf(stderr, "Usage: cgt_fmt <source.cgt>\n");
        return 1;
    }

    FILE *f = fopen(argv[1], "r");
    if (!f) {
        fprintf(stderr, "Error opening file '%s'\n", argv[1]);
        return 1;
    }

    char line[1024];
    int indent = 0;
    while (fgets(line, sizeof(line), f)) {
        // Strip trailing newline and leading whitespace
        char *p = line;
        while (*p == ' ' || *p == '\t') p++;
        size_t len = strlen(p);
        while (len > 0 && (p[len - 1] == '\n' || p[len - 1] == '\r')) {
            p[--len] = '\0';
        }

        if (len == 0) {
            printf("\n");
            continue;
        }

        if (*p == '}') {
            if (indent > 0) indent--;
        }

        for (int i = 0; i < indent * 4; ++i) putchar(' ');
        printf("%s\n", p);

        if (p[len - 1] == '{') {
            indent++;
        }
    }

    fclose(f);
    return 0;
}
