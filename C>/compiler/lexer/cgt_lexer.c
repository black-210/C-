#include "cgt_lexer.h"

static struct {
    const char *word;
    cgt_token_kind_t kind;
} KEYWORDS[] = {
    {"fn", TOK_FN},
    {"let", TOK_LET},
    {"mut", TOK_MUT},
    {"own", TOK_OWN},
    {"borrow", TOK_BORROW},
    {"view", TOK_VIEW},
    {"struct", TOK_STRUCT},
    {"class", TOK_CLASS},
    {"trait", TOK_TRAIT},
    {"impl", TOK_IMPL},
    {"enum", TOK_ENUM},
    {"unsafe", TOK_UNSAFE},
    {"gpu_kernel", TOK_GPU_KERNEL},
    {"simd", TOK_SIMD},
    {"return", TOK_RETURN},
    {"if", TOK_IF},
    {"else", TOK_ELSE},
    {"while", TOK_WHILE},
    {"for", TOK_FOR},
    {"in", TOK_IN},
    {"match", TOK_MATCH},
    {"break", TOK_BREAK},
    {"continue", TOK_CONTINUE},
    {"module", TOK_MODULE},
    {"import", TOK_IMPORT},
    {"type", TOK_TYPE},
    {"const", TOK_CONST},
    {"defer", TOK_DEFER},
    {"asm", TOK_ASM},
    {"atomic", TOK_ATOMIC},
    {"move", TOK_MOVE},
    {"true", TOK_TRUE},
    {"false", TOK_FALSE},
    {"null", TOK_NULL},
    {"as", TOK_AS},
    {"pub", TOK_PUB},
    {"extern", TOK_EXTERN},
    {"sizeof", TOK_SIZEOF},
    {NULL, TOK_EOF}
};

const char *cgt_token_kind_name(cgt_token_kind_t kind) {
    switch (kind) {
        case TOK_EOF: return "EOF";
        case TOK_ERROR: return "ERROR";
        case TOK_IDENT: return "identifier";
        case TOK_INT_LIT: return "integer literal";
        case TOK_FLOAT_LIT: return "float literal";
        case TOK_STRING_LIT: return "string literal";
        case TOK_CHAR_LIT: return "char literal";
        case TOK_FN: return "fn";
        case TOK_LET: return "let";
        case TOK_MUT: return "mut";
        case TOK_OWN: return "own";
        case TOK_BORROW: return "borrow";
        case TOK_VIEW: return "view";
        case TOK_STRUCT: return "struct";
        case TOK_CLASS: return "class";
        case TOK_TRAIT: return "trait";
        case TOK_IMPL: return "impl";
        case TOK_ENUM: return "enum";
        case TOK_UNSAFE: return "unsafe";
        case TOK_GPU_KERNEL: return "gpu_kernel";
        case TOK_SIMD: return "simd";
        case TOK_RETURN: return "return";
        case TOK_IF: return "if";
        case TOK_ELSE: return "else";
        case TOK_WHILE: return "while";
        case TOK_FOR: return "for";
        case TOK_IN: return "in";
        case TOK_MATCH: return "match";
        case TOK_BREAK: return "break";
        case TOK_CONTINUE: return "continue";
        case TOK_MODULE: return "module";
        case TOK_IMPORT: return "import";
        case TOK_TYPE: return "type";
        case TOK_CONST: return "const";
        case TOK_DEFER: return "defer";
        case TOK_ASM: return "asm";
        case TOK_ATOMIC: return "atomic";
        case TOK_MOVE: return "move";
        case TOK_TRUE: return "true";
        case TOK_FALSE: return "false";
        case TOK_NULL: return "null";
        case TOK_AS: return "as";
        case TOK_PUB: return "pub";
        case TOK_EXTERN: return "extern";
        case TOK_SIZEOF: return "sizeof";
        case TOK_PLUS: return "+";
        case TOK_MINUS: return "-";
        case TOK_STAR: return "*";
        case TOK_SLASH: return "/";
        case TOK_PERCENT: return "%";
        case TOK_ASSIGN: return "=";
        case TOK_PLUS_ASSIGN: return "+=";
        case TOK_MINUS_ASSIGN: return "-=";
        case TOK_STAR_ASSIGN: return "*=";
        case TOK_SLASH_ASSIGN: return "/=";
        case TOK_PERCENT_ASSIGN: return "%=";
        case TOK_AMP_ASSIGN: return "&=";
        case TOK_PIPE_ASSIGN: return "|=";
        case TOK_CARET_ASSIGN: return "^=";
        case TOK_SHL_ASSIGN: return "<<=";
        case TOK_SHR_ASSIGN: return ">>=";
        case TOK_EQ: return "==";
        case TOK_NE: return "!=";
        case TOK_LT: return "<";
        case TOK_LE: return "<=";
        case TOK_GT: return ">";
        case TOK_GE: return ">=";
        case TOK_LOG_AND: return "&&";
        case TOK_LOG_OR: return "||";
        case TOK_BANG: return "!";
        case TOK_AMP: return "&";
        case TOK_PIPE: return "|";
        case TOK_CARET: return "^";
        case TOK_TILDE: return "~";
        case TOK_SHL: return "<<";
        case TOK_SHR: return ">>";
        case TOK_ARROW: return "->";
        case TOK_FAT_ARROW: return "=>";
        case TOK_DOUBLE_COLON: return "::";
        case TOK_DOT_DOT: return "..";
        case TOK_DOT: return ".";
        case TOK_COMMA: return ",";
        case TOK_COLON: return ":";
        case TOK_SEMICOLON: return ";";
        case TOK_QUESTION: return "?";
        case TOK_AT: return "@";
        case TOK_HASH: return "#";
        case TOK_LPAREN: return "(";
        case TOK_RPAREN: return ")";
        case TOK_LBRACE: return "{";
        case TOK_RBRACE: return "}";
        case TOK_LBRACKET: return "[";
        case TOK_RBRACKET: return "]";
        default: return "unknown token";
    }
}

static char peek_char(cgt_lexer_t *lexer) {
    if (lexer->cursor >= lexer->source_len) return '\0';
    return lexer->source[lexer->cursor];
}

static char peek_next_char(cgt_lexer_t *lexer) {
    if (lexer->cursor + 1 >= lexer->source_len) return '\0';
    return lexer->source[lexer->cursor + 1];
}

static char advance_char(cgt_lexer_t *lexer) {
    if (lexer->cursor >= lexer->source_len) return '\0';
    char c = lexer->source[lexer->cursor++];
    if (c == '\n') {
        lexer->line++;
        lexer->col = 1;
    } else {
        lexer->col++;
    }
    return c;
}

static void skip_whitespace_and_comments(cgt_lexer_t *lexer) {
    while (lexer->cursor < lexer->source_len) {
        char c = peek_char(lexer);
        if (c == ' ' || c == '\t' || c == '\r' || c == '\n') {
            advance_char(lexer);
        } else if (c == '/' && peek_next_char(lexer) == '/') {
            /* Single-line comment */
            advance_char(lexer);
            advance_char(lexer);
            while (lexer->cursor < lexer->source_len && peek_char(lexer) != '\n') {
                advance_char(lexer);
            }
        } else if (c == '/' && peek_next_char(lexer) == '*') {
            /* Multi-line comment */
            advance_char(lexer);
            advance_char(lexer);
            while (lexer->cursor < lexer->source_len) {
                if (peek_char(lexer) == '*' && peek_next_char(lexer) == '/') {
                    advance_char(lexer);
                    advance_char(lexer);
                    break;
                }
                advance_char(lexer);
            }
        } else {
            break;
        }
    }
}

static cgt_token_t scan_token(cgt_lexer_t *lexer);

void cgt_lexer_init(cgt_lexer_t *lexer, const char *source, size_t length, const char *filename) {
    lexer->source = source;
    lexer->source_len = length;
    lexer->cursor = 0;
    lexer->line = 1;
    lexer->col = 1;
    lexer->filename = filename ? filename : "<source>";
    lexer->current = scan_token(lexer);
    lexer->peek = scan_token(lexer);
}

static cgt_token_t scan_token(cgt_lexer_t *lexer) {
    skip_whitespace_and_comments(lexer);

    cgt_token_t tok;
    memset(&tok, 0, sizeof(tok));
    tok.loc = cgt_loc_make(lexer->filename, lexer->line, lexer->col);

    if (lexer->cursor >= lexer->source_len) {
        tok.kind = TOK_EOF;
        tok.lexeme = "";
        return tok;
    }

    size_t start_cursor = lexer->cursor;
    char c = advance_char(lexer);

    /* Identifier or keyword */
    if (isalpha(c) || c == '_') {
        while (isalnum(peek_char(lexer)) || peek_char(lexer) == '_') {
            advance_char(lexer);
        }
        size_t len = lexer->cursor - start_cursor;
        tok.length = len;
        tok.lexeme = cgt_strndup(lexer->source + start_cursor, len);

        /* Check keywords */
        for (int i = 0; KEYWORDS[i].word != NULL; i++) {
            if (strlen(KEYWORDS[i].word) == len && memcmp(KEYWORDS[i].word, tok.lexeme, len) == 0) {
                tok.kind = KEYWORDS[i].kind;
                return tok;
            }
        }
        tok.kind = TOK_IDENT;
        return tok;
    }

    /* Numbers: integers and floats */
    if (isdigit(c)) {
        bool is_float = false;
        if (c == '0' && (peek_char(lexer) == 'x' || peek_char(lexer) == 'X')) {
            /* Hexadecimal */
            advance_char(lexer);
            while (isxdigit(peek_char(lexer)) || peek_char(lexer) == '_') {
                advance_char(lexer);
            }
        } else if (c == '0' && (peek_char(lexer) == 'b' || peek_char(lexer) == 'B')) {
            /* Binary */
            advance_char(lexer);
            while (peek_char(lexer) == '0' || peek_char(lexer) == '1' || peek_char(lexer) == '_') {
                advance_char(lexer);
            }
        } else {
            while (isdigit(peek_char(lexer)) || peek_char(lexer) == '_') {
                advance_char(lexer);
            }
            if (peek_char(lexer) == '.' && isdigit(peek_next_char(lexer))) {
                is_float = true;
                advance_char(lexer); /* '.' */
                while (isdigit(peek_char(lexer)) || peek_char(lexer) == '_') {
                    advance_char(lexer);
                }
            }
            if (peek_char(lexer) == 'e' || peek_char(lexer) == 'E') {
                is_float = true;
                advance_char(lexer);
                if (peek_char(lexer) == '+' || peek_char(lexer) == '-') {
                    advance_char(lexer);
                }
                while (isdigit(peek_char(lexer))) {
                    advance_char(lexer);
                }
            }
        }
        size_t len = lexer->cursor - start_cursor;
        tok.length = len;
        char *num_str = cgt_strndup(lexer->source + start_cursor, len);
        tok.lexeme = num_str;

        if (is_float) {
            tok.kind = TOK_FLOAT_LIT;
            tok.as.float_val = strtod(num_str, NULL);
        } else {
            tok.kind = TOK_INT_LIT;
            if (num_str[0] == '0' && (num_str[1] == 'x' || num_str[1] == 'X')) {
                tok.as.int_val = (int64_t)strtoull(num_str, NULL, 16);
            } else if (num_str[0] == '0' && (num_str[1] == 'b' || num_str[1] == 'B')) {
                tok.as.int_val = (int64_t)strtoull(num_str + 2, NULL, 2);
            } else {
                tok.as.int_val = (int64_t)strtoll(num_str, NULL, 10);
            }
        }
        return tok;
    }

    /* String literal */
    if (c == '"') {
        cgt_strbuf_t sb;
        cgt_strbuf_init(&sb);
        while (lexer->cursor < lexer->source_len && peek_char(lexer) != '"') {
            char sc = advance_char(lexer);
            if (sc == '\\') {
                char esc = advance_char(lexer);
                switch (esc) {
                    case 'n': cgt_strbuf_appendc(&sb, '\n'); break;
                    case 't': cgt_strbuf_appendc(&sb, '\t'); break;
                    case 'r': cgt_strbuf_appendc(&sb, '\r'); break;
                    case '0': cgt_strbuf_appendc(&sb, '\0'); break;
                    case '\\': cgt_strbuf_appendc(&sb, '\\'); break;
                    case '"': cgt_strbuf_appendc(&sb, '"'); break;
                    default: cgt_strbuf_appendc(&sb, esc); break;
                }
            } else {
                cgt_strbuf_appendc(&sb, sc);
            }
        }
        if (peek_char(lexer) == '"') {
            advance_char(lexer); /* closing quote */
        }
        tok.kind = TOK_STRING_LIT;
        tok.as.str_val = cgt_strbuf_detach(&sb);
        tok.lexeme = tok.as.str_val;
        tok.length = strlen(tok.lexeme);
        return tok;
    }

    /* Char literal */
    if (c == '\'') {
        char ch = advance_char(lexer);
        if (ch == '\\') {
            char esc = advance_char(lexer);
            if (esc == 'n') ch = '\n';
            else if (esc == 't') ch = '\t';
            else if (esc == 'r') ch = '\r';
            else if (esc == '0') ch = '\0';
        }
        if (peek_char(lexer) == '\'') {
            advance_char(lexer);
        }
        tok.kind = TOK_CHAR_LIT;
        tok.as.char_val = ch;
        tok.lexeme = cgt_strndup(lexer->source + start_cursor, lexer->cursor - start_cursor);
        return tok;
    }

    /* Operators and punctuation */
    switch (c) {
        case '+':
            if (peek_char(lexer) == '=') { advance_char(lexer); tok.kind = TOK_PLUS_ASSIGN; tok.lexeme = "+="; }
            else { tok.kind = TOK_PLUS; tok.lexeme = "+"; }
            break;
        case '-':
            if (peek_char(lexer) == '>') { advance_char(lexer); tok.kind = TOK_ARROW; tok.lexeme = "->"; }
            else if (peek_char(lexer) == '=') { advance_char(lexer); tok.kind = TOK_MINUS_ASSIGN; tok.lexeme = "-="; }
            else { tok.kind = TOK_MINUS; tok.lexeme = "-"; }
            break;
        case '*':
            if (peek_char(lexer) == '=') { advance_char(lexer); tok.kind = TOK_STAR_ASSIGN; tok.lexeme = "*="; }
            else { tok.kind = TOK_STAR; tok.lexeme = "*"; }
            break;
        case '/':
            if (peek_char(lexer) == '=') { advance_char(lexer); tok.kind = TOK_SLASH_ASSIGN; tok.lexeme = "/="; }
            else { tok.kind = TOK_SLASH; tok.lexeme = "/"; }
            break;
        case '%':
            if (peek_char(lexer) == '=') { advance_char(lexer); tok.kind = TOK_PERCENT_ASSIGN; tok.lexeme = "%="; }
            else { tok.kind = TOK_PERCENT; tok.lexeme = "%"; }
            break;
        case '=':
            if (peek_char(lexer) == '=') { advance_char(lexer); tok.kind = TOK_EQ; tok.lexeme = "=="; }
            else if (peek_char(lexer) == '>') { advance_char(lexer); tok.kind = TOK_FAT_ARROW; tok.lexeme = "=>"; }
            else { tok.kind = TOK_ASSIGN; tok.lexeme = "="; }
            break;
        case '!':
            if (peek_char(lexer) == '=') { advance_char(lexer); tok.kind = TOK_NE; tok.lexeme = "!="; }
            else { tok.kind = TOK_BANG; tok.lexeme = "!"; }
            break;
        case '<':
            if (peek_char(lexer) == '<') {
                advance_char(lexer);
                if (peek_char(lexer) == '=') { advance_char(lexer); tok.kind = TOK_SHL_ASSIGN; tok.lexeme = "<<="; }
                else { tok.kind = TOK_SHL; tok.lexeme = "<<"; }
            } else if (peek_char(lexer) == '=') {
                advance_char(lexer); tok.kind = TOK_LE; tok.lexeme = "<=";
            } else {
                tok.kind = TOK_LT; tok.lexeme = "<";
            }
            break;
        case '>':
            if (peek_char(lexer) == '>') {
                advance_char(lexer);
                if (peek_char(lexer) == '=') { advance_char(lexer); tok.kind = TOK_SHR_ASSIGN; tok.lexeme = ">>="; }
                else { tok.kind = TOK_SHR; tok.lexeme = ">>"; }
            } else if (peek_char(lexer) == '=') {
                advance_char(lexer); tok.kind = TOK_GE; tok.lexeme = ">=";
            } else {
                tok.kind = TOK_GT; tok.lexeme = ">";
            }
            break;
        case '&':
            if (peek_char(lexer) == '&') { advance_char(lexer); tok.kind = TOK_LOG_AND; tok.lexeme = "&&"; }
            else if (peek_char(lexer) == '=') { advance_char(lexer); tok.kind = TOK_AMP_ASSIGN; tok.lexeme = "&="; }
            else { tok.kind = TOK_AMP; tok.lexeme = "&"; }
            break;
        case '|':
            if (peek_char(lexer) == '|') { advance_char(lexer); tok.kind = TOK_LOG_OR; tok.lexeme = "||"; }
            else if (peek_char(lexer) == '=') { advance_char(lexer); tok.kind = TOK_PIPE_ASSIGN; tok.lexeme = "|="; }
            else { tok.kind = TOK_PIPE; tok.lexeme = "|"; }
            break;
        case '^':
            if (peek_char(lexer) == '=') { advance_char(lexer); tok.kind = TOK_CARET_ASSIGN; tok.lexeme = "^="; }
            else { tok.kind = TOK_CARET; tok.lexeme = "^"; }
            break;
        case '~': tok.kind = TOK_TILDE; tok.lexeme = "~"; break;
        case ':':
            if (peek_char(lexer) == ':') { advance_char(lexer); tok.kind = TOK_DOUBLE_COLON; tok.lexeme = "::"; }
            else { tok.kind = TOK_COLON; tok.lexeme = ":"; }
            break;
        case ';': tok.kind = TOK_SEMICOLON; tok.lexeme = ";"; break;
        case ',': tok.kind = TOK_COMMA; tok.lexeme = ","; break;
        case '.':
            if (peek_char(lexer) == '.') { advance_char(lexer); tok.kind = TOK_DOT_DOT; tok.lexeme = ".."; }
            else { tok.kind = TOK_DOT; tok.lexeme = "."; }
            break;
        case '?': tok.kind = TOK_QUESTION; tok.lexeme = "?"; break;
        case '@': tok.kind = TOK_AT; tok.lexeme = "@"; break;
        case '#': tok.kind = TOK_HASH; tok.lexeme = "#"; break;
        case '(': tok.kind = TOK_LPAREN; tok.lexeme = "("; break;
        case ')': tok.kind = TOK_RPAREN; tok.lexeme = ")"; break;
        case '{': tok.kind = TOK_LBRACE; tok.lexeme = "{"; break;
        case '}': tok.kind = TOK_RBRACE; tok.lexeme = "}"; break;
        case '[': tok.kind = TOK_LBRACKET; tok.lexeme = "["; break;
        case ']': tok.kind = TOK_RBRACKET; tok.lexeme = "]"; break;
        default:
            tok.kind = TOK_ERROR;
            tok.lexeme = cgt_strndup(lexer->source + start_cursor, 1);
            break;
    }
    tok.length = strlen(tok.lexeme);
    return tok;
}

cgt_token_t cgt_lexer_next_token(cgt_lexer_t *lexer) {
    cgt_token_t current = lexer->current;
    lexer->current = lexer->peek;
    lexer->peek = scan_token(lexer);
    return current;
}

cgt_token_t cgt_lexer_peek_token(cgt_lexer_t *lexer) {
    return lexer->peek;
}
