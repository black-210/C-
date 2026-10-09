#ifndef CGT_COMMON_H
#define CGT_COMMON_H

#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <stdbool.h>
#include <string.h>
#include <stdarg.h>
#include <ctype.h>

#define CGT_VERSION_MAJOR 2
#define CGT_VERSION_MINOR 0
#define CGT_VERSION_PATCH 0
#define CGT_VERSION_STRING "2.0.0"

/* Source location */
typedef struct {
    const char *filename;
    uint32_t line;
    uint32_t col;
} cgt_loc_t;

static inline cgt_loc_t cgt_loc_make(const char *filename, uint32_t line, uint32_t col) {
    cgt_loc_t loc;
    loc.filename = filename ? filename : "<unknown>";
    loc.line = line;
    loc.col = col;
    return loc;
}

/* Safe memory allocation helpers */
static inline void *cgt_malloc(size_t size) {
    void *ptr = malloc(size);
    if (!ptr && size > 0) {
        fprintf(stderr, "[C> Fatal Error]: Out of memory allocating %zu bytes\n", size);
        exit(1);
    }
    return ptr;
}

static inline void *cgt_calloc(size_t count, size_t size) {
    void *ptr = calloc(count, size);
    if (!ptr && count > 0 && size > 0) {
        fprintf(stderr, "[C> Fatal Error]: Out of memory calloc %zu items of %zu bytes\n", count, size);
        exit(1);
    }
    return ptr;
}

static inline void *cgt_realloc(void *old_ptr, size_t size) {
    void *ptr = realloc(old_ptr, size);
    if (!ptr && size > 0) {
        fprintf(stderr, "[C> Fatal Error]: Out of memory reallocating %zu bytes\n", size);
        exit(1);
    }
    return ptr;
}

static inline char *cgt_strdup(const char *str) {
    if (!str) return NULL;
    size_t len = strlen(str);
    char *dup = (char *)cgt_malloc(len + 1);
    memcpy(dup, str, len + 1);
    return dup;
}

static inline char *cgt_strndup(const char *str, size_t len) {
    if (!str) return NULL;
    char *dup = (char *)cgt_malloc(len + 1);
    memcpy(dup, str, len);
    dup[len] = '\0';
    return dup;
}

/* Dynamic array / vector */
#define CGT_DA_INIT_CAPACITY 8

#define cgt_da_init(da) do { \
    (da)->data = NULL; \
    (da)->count = 0; \
    (da)->capacity = 0; \
} while(0)

#define cgt_da_push(da, item) do { \
    if ((da)->count >= (da)->capacity) { \
        (da)->capacity = (da)->capacity ? (da)->capacity * 2 : CGT_DA_INIT_CAPACITY; \
        (da)->data = cgt_realloc((da)->data, (da)->capacity * sizeof(*(da)->data)); \
    } \
    (da)->data[(da)->count++] = (item); \
} while(0)

#define cgt_da_free(da) do { \
    if ((da)->data) { \
        free((da)->data); \
        (da)->data = NULL; \
    } \
    (da)->count = 0; \
    (da)->capacity = 0; \
} while(0)

/* Simple String Buffer */
typedef struct {
    char *data;
    size_t length;
    size_t capacity;
} cgt_strbuf_t;

void cgt_strbuf_init(cgt_strbuf_t *sb);
void cgt_strbuf_append(cgt_strbuf_t *sb, const char *str);
void cgt_strbuf_appendf(cgt_strbuf_t *sb, const char *fmt, ...);
void cgt_strbuf_appendc(cgt_strbuf_t *sb, char c);
char *cgt_strbuf_detach(cgt_strbuf_t *sb);
void cgt_strbuf_free(cgt_strbuf_t *sb);

/* Diagnostic & Error Reporting */
typedef enum {
    CGT_DIAG_NOTE,
    CGT_DIAG_WARNING,
    CGT_DIAG_ERROR,
    CGT_DIAG_SECURITY_ALERT
} cgt_diag_level_t;

void cgt_diag_report(cgt_diag_level_t level, cgt_loc_t loc, const char *fmt, ...);

#endif /* CGT_COMMON_H */
