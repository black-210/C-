#ifndef CGT_LEXER_H
#define CGT_LEXER_H

#include "cgt_common.h"

typedef enum {
    TOK_EOF = 0,
    TOK_ERROR,

    /* Literals */
    TOK_IDENT,
    TOK_INT_LIT,
    TOK_FLOAT_LIT,
    TOK_STRING_LIT,
    TOK_CHAR_LIT,

    /* Keywords */
    TOK_FN,
    TOK_LET,
    TOK_MUT,
    TOK_OWN,
    TOK_BORROW,
    TOK_VIEW,
    TOK_STRUCT,
    TOK_CLASS,
    TOK_TRAIT,
    TOK_IMPL,
    TOK_ENUM,
    TOK_UNSAFE,
    TOK_GPU_KERNEL,
    TOK_SIMD,
    TOK_RETURN,
    TOK_IF,
    TOK_ELSE,
    TOK_WHILE,
    TOK_FOR,
    TOK_IN,
    TOK_MATCH,
    TOK_BREAK,
    TOK_CONTINUE,
    TOK_MODULE,
    TOK_IMPORT,
    TOK_TYPE,
    TOK_CONST,
    TOK_DEFER,
    TOK_ASM,
    TOK_ATOMIC,
    TOK_MOVE,
    TOK_TRUE,
    TOK_FALSE,
    TOK_NULL,
    TOK_AS,
    TOK_PUB,
    TOK_EXTERN,
    TOK_SIZEOF,

    /* Operators & Punctuators */
    TOK_PLUS,          /* + */
    TOK_MINUS,         /* - */
    TOK_STAR,          /* * */
    TOK_SLASH,         /* / */
    TOK_PERCENT,       /* % */
    TOK_ASSIGN,        /* = */
    TOK_PLUS_ASSIGN,   /* += */
    TOK_MINUS_ASSIGN,  /* -= */
    TOK_STAR_ASSIGN,   /* *= */
    TOK_SLASH_ASSIGN,  /* /= */
    TOK_PERCENT_ASSIGN,/* %= */
    TOK_AMP_ASSIGN,    /* &= */
    TOK_PIPE_ASSIGN,   /* |= */
    TOK_CARET_ASSIGN,  /* ^= */
    TOK_SHL_ASSIGN,    /* <<= */
    TOK_SHR_ASSIGN,    /* >>= */

    TOK_EQ,            /* == */
    TOK_NE,            /* != */
    TOK_LT,            /* < */
    TOK_LE,            /* <= */
    TOK_GT,            /* > */
    TOK_GE,            /* >= */

    TOK_LOG_AND,       /* && */
    TOK_LOG_OR,        /* || */
    TOK_BANG,          /* ! */

    TOK_AMP,           /* & */
    TOK_PIPE,          /* | */
    TOK_CARET,         /* ^ */
    TOK_TILDE,         /* ~ */
    TOK_SHL,           /* << */
    TOK_SHR,           /* >> */

    TOK_ARROW,         /* -> */
    TOK_FAT_ARROW,     /* => */
    TOK_DOUBLE_COLON,  /* :: */
    TOK_DOT_DOT,       /* .. */

    TOK_DOT,           /* . */
    TOK_COMMA,         /* , */
    TOK_COLON,         /* : */
    TOK_SEMICOLON,     /* ; */
    TOK_QUESTION,      /* ? */
    TOK_AT,            /* @ */
    TOK_HASH,          /* # */

    TOK_LPAREN,        /* ( */
    TOK_RPAREN,        /* ) */
    TOK_LBRACE,        /* { */
    TOK_RBRACE,        /* } */
    TOK_LBRACKET,      /* [ */
    TOK_RBRACKET       /* ] */
} cgt_token_kind_t;

typedef struct {
    cgt_token_kind_t kind;
    const char *lexeme;
    size_t length;
    cgt_loc_t loc;

    union {
        int64_t int_val;
        double float_val;
        char *str_val;
        char char_val;
    } as;
} cgt_token_t;

typedef struct {
    const char *source;
    size_t source_len;
    size_t cursor;
    uint32_t line;
    uint32_t col;
    const char *filename;
    cgt_token_t current;
    cgt_token_t peek;
} cgt_lexer_t;

void cgt_lexer_init(cgt_lexer_t *lexer, const char *source, size_t length, const char *filename);
cgt_token_t cgt_lexer_next_token(cgt_lexer_t *lexer);
cgt_token_t cgt_lexer_peek_token(cgt_lexer_t *lexer);
const char *cgt_token_kind_name(cgt_token_kind_t kind);

#endif /* CGT_LEXER_H */
