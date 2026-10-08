# C> Compiler Internals & Architecture

## Pipeline Overview
The C> compiler (`cgt`) is implemented entirely in standard C (C99/C11) with zero third-party dependencies, guaranteeing rapid build times and bootstrap portability.

```
Source (.cgt)
     │
     ▼
Lexer (`cgt_lexer.c`)            ── Token stream with source locations
     │
     ▼
Parser (`cgt_parser.c`)          ── Recursive descent parser with operator precedence
     │
     ▼
AST (`cgt_ast.c`)                ── Complete abstract syntax tree nodes
     │
     ▼
Semantic (`cgt_semantic.c`)      ── Scoped symbol table, name resolution
     │
     ▼
Type Checker (`cgt_typechecker.c`)── Static type unification, conversions, inference
     │
     ▼
Memory Safety (`cgt_memory_safety.c`) ── Affine ownership tracking, borrow checking
     │
     ▼
Security (`cgt_security.c`)      ── Integer overflow audit, pointer casting verification
     │
     ▼
IR Generator (`cgt_ir.c`)        ── Three-address SSA intermediate representation
     │
     ▼
Optimizer (`cgt_optimizer.c`)    ── Constant folding, dead code elimination, CFG cleanup
     │
     ▼
Codegen (`cgt_codegen.c`)        ── High-efficiency C/native emission & assembly linking
     │
     ▼
Executable / Object File
```

---

## Key Data Structures

1. **`cgt_token_t`**: Tokens preserving exact line and column coordinates for diagnostic reporting.
2. **`cgt_ast_node_t` / `cgt_decl_t` / `cgt_stmt_t` / `cgt_expr_t`**: AST node graphs with source annotations.
3. **`cgt_scope_t` & `cgt_symbol_t`**: Lexical hierarchy for variables, functions, structs, and modules.
4. **`cgt_borrow_record_t` & `cgt_own_tracker_t`**: Active reference counts, move states, and borrow chains.
5. **`cgt_ir_inst_t` & `cgt_ir_func_t`**: Linearized instruction streams using virtual registers (`%v0`, `%v1`, ...).
