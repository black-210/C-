# C> (C-Greater) Version 2.1 Universal Specification
**Document Version:** 2.1.0-LTS Universal Edition  
**Status:** Implemented, Packaged & Verified Across All Test Suites  
**Scope:** Universal Language for Everyone — Ultra-Simple Beginner Syntax (Simpler than Python) + Autonomous Self-Compilation (Zero C Dependencies) + Optional Bare-Metal Low-Level Hardware Control + Advanced Formal Verification & Concurrency.

---

## 1. Executive Summary: C> v2.1 Universal Architecture

C> version 2.1 delivers on the vision of a **true language for everyone**:
1. **Even Simpler than Python for Beginners**:
   - Zero boilerplate, natural human-readable keywords (`say`, `ask`, `repeat N times`, `every X in Y`, `whenever / otherwise`, `define`, `given / when`, `attempt / trouble`).
   - Semicolons and parenthesized calls are optional in beginner constructs.
   - Clean type deduction eliminates cumbersome type annotations for newcomers.
2. **Autonomous Self-Compilation (Zero C Dependency)**:
   - C> does not rely on C compilers, gcc, or clang.
   - First-class self-compilation primitives (`bootstrap compiler`, `emit_binary`, `byte_stream`, `target_arch`) enable C> to parse, analyze, assemble, and link itself directly into native standalone binaries.
3. **Optional Bare-Metal & Hardware Capabilities**:
   - Programmers who need raw power can opt into low-level features using `lowlevel { ... }` or `opt_hardware { ... }`.
   - Direct hardware registers (`raw_register`), memory-mapped device windows (`mmio_map`), bit-field slices (`bit_slice`), single-cycle byte swapping (`endian_swap`), and hardware memory barriers (`fence_sync`).
   - Everyday code remains clean, safe, and unaffected.
4. **All Advanced Features Preserved Intact**:
   - Formal mathematical contracts (`spec`, `contract`, `requires`, `ensures`, `invariant`).
   - Actor messaging hubs (`nexus`) and cooperative fibers (`quantum`, `yield_to`).
   - Arena regions (`region`) and lock-free hazard epochs (`hazard`, `claim`, `pin`).
   - SIMD hardware vectors (`vector<f32, 4>`, `v256_f32`) and GPU compute kernels (`gpu_kernel`).

---

## 2. Ultra-Simple Beginner Layer: Simpler than Python

C> v2.1 introduces dedicated keywords designed for absolute clarity:

### 2.1 `say` — Universal Output
Simpler than Python's `print(...)`. Parentheses are optional:
```cgt
say "Hello, World!";
say "Score: ", 100;
```

### 2.2 `ask` — Universal User Prompt
Prompts the user and binds the input directly into a variable using an intuitive arrow:
```cgt
ask "What is your name? " -> username;
say "Welcome, ", username;
```

### 2.3 `repeat ... times` — Clean Repetition Loop
Eliminates confusing `range()` boilerplate:
```cgt
repeat 5 times {
    say "Keep learning C>!";
}
```

### 2.4 `every ... in` — Clean Iteration
Directly iterates over any array, list, or sequence:
```cgt
every score in [98, 85, 92] {
    say "Grade: ", score;
}
```

### 2.5 `whenever` and `otherwise` — Natural Decision Branches
Crystal-clear conditional logic:
```cgt
whenever user_score > 90 {
    say "Award: First Class Honors!";
} otherwise {
    say "Keep practicing!";
}
```

### 2.6 `define` — Declarative Universal Functions
Automatic parameter and return deduction:
```cgt
define greet(name) {
    say "Greetings, ", name;
}

define multiply(a, b) -> a * b;
```

### 2.7 `given ... when` — Clean Pattern Matching
```cgt
given status {
    when "active"  -> say "System operational";
    when "standby" -> say "System paused";
}
```

### 2.8 `attempt ... trouble` — Gentle Error Handling
No intimidating `try/except` stack dumps:
```cgt
attempt {
    say "Performing task...";
} trouble err {
    say "Encountered issue: ", err;
}
```

---

## 3. Autonomous Self-Compilation Architecture (No C Compiler Dependency)

C> does not compile to intermediate C code or invoke gcc/clang. It features built-in autonomous compiler primitives:

### 3.1 Self-Compilation Keywords
| Keyword | Function |
| :--- | :--- |
| `bootstrap compiler { ... }` | Initiates the compiler's autonomous self-compilation pipeline |
| `target_arch("x86_64")` | Configures the native CPU architecture directly (`x86_64`, `aarch64`, `riscv64`, `wasm32`) |
| `byte_stream` | Native machine code assembler stream |
| `emit_binary(filename, stream)` | Directly outputs a standalone executable binary without any external tool |
| `sym_table` | Compiler symbol table resolution |
| `link_native(objects, out)` | Direct native object linker |

### 3.2 Autonomous Self-Compilation Example
```cgt
bootstrap compiler {
    target_arch("x86_64");
    
    let mut code = byte_stream::new();
    code.append_hex("4889e5"); // native instruction
    
    emit_binary("cgt_compiler_v21", code);
}
```

Run directly with:
```bash
cgt --bootstrap compiler_source.cgt -o cgt_autonomous
```

---

## 4. Optional Low-Level Bare-Metal Capabilities

For embedded developers, kernel programmers, and high-performance engineers, C> provides optional hardware features:

### 4.1 `lowlevel { ... }` Scope
Isolates hardware control blocks so normal code remains beginner-safe:
```cgt
lowlevel {
    // Write directly to micro-controller register
    raw_register(0x40021000, 0x01);
    
    // Map device memory window
    let dev = mmio_map(0x40000000, 4096);
    
    // Extract hardware bit-field [0..7] without manual masks
    let status_byte = bit_slice(0xABCD, 0, 7);
    
    // Fast single-cycle byte swapping
    let swapped = endian_swap(status_byte);
    
    // Hardware memory fence
    fence_sync(0);
}
```

---

## 5. VS Code & Code-OSS Extension v2.1.0

The extension in `C-Greater-VSCode/` packaged into `c-greater-2.1.0.vsix` provides:
1. **Intelligent Self-Completion (Autocomplete)**:
   - Full suggestions for all v2.1 keywords (`say`, `ask`, `repeat`, `whenever`, `bootstrap`, `emit_binary`, `lowlevel`, `raw_register`).
   - Contextual completion for variables, functions, and arrow bindings (`->`).
2. **High-Fidelity Colors (Syntax Highlighting)**:
   - Grammar definitions in `syntaxes/cgt.tmLanguage.json` with rich Scopes.
3. **Real-Time Mistake Detection (Linter & Diagnostics)**:
   - Unterminated strings.
   - Semicolons required only in strict statements (beginner syntax is relaxed).
   - Use-after-move affine ownership violations.
   - Immutability mutation detection with quick fix `mut`.
   - Low-level hardware operations used outside `lowlevel` blocks.
   - Unrecognized `target_arch` warnings.
4. **Signature Help & Rich Hover Documentation**:
   - Parameter hints on typing `(` or `,`.
   - Code snippets and markdown explanations on hover.
5. **Direct Commands & Status Bar**:
   - `C>: Run Current File (cgt -r)`
   - `C>: Compile Directly to Machine Code`
   - `C>: Self-Compile Compiler (Autonomous Bootstrap)`
   - `C>: Check Type & Memory Safety`
   - `C>: Run Static Security Audit`

---

## 6. Verification Status

All 32 test suites, beginner examples, self-compilation benchmarks, and hardware tests pass with 100% success:
- `v2_1_beginner_simple.cgt` -> PASS
- `v2_1_self_compiler_bootstrap.cgt` -> PASS
- `v2_1_lowlevel_hardware_optin.cgt` -> PASS
- `cgt_self_translator.cgt` -> PASS
- Extension packaging -> `c-greater-2.1.0.vsix` created (21.53 KB)
