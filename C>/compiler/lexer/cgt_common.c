#include "cgt_common.h"

void cgt_strbuf_init(cgt_strbuf_t *sb) {
    sb->data = (char *)cgt_malloc(64);
    sb->data[0] = '\0';
    sb->length = 0;
    sb->capacity = 64;
}

void cgt_strbuf_append(cgt_strbuf_t *sb, const char *str) {
    if (!str) return;
    size_t slen = strlen(str);
    while (sb->length + slen + 1 >= sb->capacity) {
        sb->capacity *= 2;
        sb->data = (char *)cgt_realloc(sb->data, sb->capacity);
    }
    memcpy(sb->data + sb->length, str, slen);
    sb->length += slen;
    sb->data[sb->length] = '\0';
}

void cgt_strbuf_appendf(cgt_strbuf_t *sb, const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    va_list args_copy;
    va_copy(args_copy, args);
    int needed = vsnprintf(NULL, 0, fmt, args_copy);
    va_end(args_copy);

    if (needed > 0) {
        while (sb->length + (size_t)needed + 1 >= sb->capacity) {
            sb->capacity *= 2;
            sb->data = (char *)cgt_realloc(sb->data, sb->capacity);
        }
        vsnprintf(sb->data + sb->length, (size_t)needed + 1, fmt, args);
        sb->length += (size_t)needed;
    }
    va_end(args);
}

void cgt_strbuf_appendc(cgt_strbuf_t *sb, char c) {
    if (sb->length + 2 >= sb->capacity) {
        sb->capacity *= 2;
        sb->data = (char *)cgt_realloc(sb->data, sb->capacity);
    }
    sb->data[sb->length++] = c;
    sb->data[sb->length] = '\0';
}

char *cgt_strbuf_detach(cgt_strbuf_t *sb) {
    char *res = sb->data;
    sb->data = NULL;
    sb->length = 0;
    sb->capacity = 0;
    return res;
}

void cgt_strbuf_free(cgt_strbuf_t *sb) {
    if (sb->data) {
        free(sb->data);
        sb->data = NULL;
    }
    sb->length = 0;
    sb->capacity = 0;
}

void cgt_diag_report(cgt_diag_level_t level, cgt_loc_t loc, const char *fmt, ...) {
    const char *prefix = "[C> Info]";

    switch (level) {
        case CGT_DIAG_NOTE:
            prefix = "[C> Note]";
            break;
        case CGT_DIAG_WARNING:
            prefix = "\033[1;33m[C> Warning]\033[0m";
            break;
        case CGT_DIAG_ERROR:
            prefix = "\033[1;31m[C> Compile Error]\033[0m";
            break;
        case CGT_DIAG_SECURITY_ALERT:
            prefix = "\033[1;35m[C> Security Alert]\033[0m";
            break;
    }

    fprintf(stderr, "%s %s:%u:%u: ", prefix, loc.filename, loc.line, loc.col);

    va_list args;
    va_start(args, fmt);
    vfprintf(stderr, fmt, args);
    va_end(args);

    fprintf(stderr, "\n");
}
