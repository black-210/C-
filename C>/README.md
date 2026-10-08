# C> (C-Greater) Systems Programming Language

**Version**: 1.0.0  
**Target Environments**: Operating Systems, Kernels, Drivers, Firmware, Embedded Devices, Real-Time Graphics, High-Performance Computing, and Systems Infrastructure  
**Implementation**: 100% Native C (ISO C11)

---

## Table of Contents

1. [What C> Is](#1-what-c-is)
2. [Design Philosophy](#2-design-philosophy)
3. [Why C> Exists](#3-why-c-exists)
4. [Relationship with C and C++](#4-relationship-with-c-and-c)
5. [Differences from C](#5-differences-from-c)
6. [Differences from C++](#6-differences-from-c)
7. [Differences from Rust](#7-differences-from-rust)
8. [High-Level Capabilities](#8-high-level-capabilities)
9. [Low-Level Capabilities](#9-low-level-capabilities)
10. [Memory Model](#10-memory-model)
11. [Ownership Model](#11-ownership-model)
12. [Borrowing Model](#12-borrowing-model)
13. [Unsafe Model & Context Isolation](#13-unsafe-model--context-isolation)
14. [Compiler Security Model](#14-compiler-security-model)
15. [Direct CPU Control & Intrinsics](#15-direct-cpu-control--intrinsics)
16. [GPU Subsystem & Compute Programming](#16-gpu-subsystem--compute-programming)
17. [Compiler Architecture & Functional Pipeline](#17-compiler-architecture--functional-pipeline)
18. [Project Structure](#18-project-structure)
19. [Build Instructions](#19-build-instructions)
20. [Compiler Driver Usage (`cgt`)](#20-compiler-driver-usage-cgt)
21. [Language Syntax Reference](#21-language-syntax-reference)
22. [Type System & Type Inference](#22-type-system--type-inference)
23. [Modules, Namespaces & Imports](#23-modules-namespaces--imports)
24. [Generics & Parametric Polymorphism](#24-generics--parametric-polymorphism)
25. [Error Handling & Deterministic Resource Management](#25-error-handling--deterministic-resource-management)
26. [Concurrency Primitives & Threads](#26-concurrency-primitives--threads)
27. [Deterministic Memory Management & RAII](#27-deterministic-memory-management--raii)
28. [Foreign Function Interface (FFI) & C ABI](#28-foreign-function-interface-ffi--c-abi)
29. [Inline Assembly Support](#29-inline-assembly-support)
30. [Architecture Support (x86_64, AArch64, RISC-V)](#30-architecture-support-x86_64-aarch64-risc-v)
31. [GPU Architecture & Backends](#31-gpu-architecture--backends)
32. [Standard Library & Runtime](#32-standard-library--runtime)
33. [Extensions Subsystem](#33-extensions-subsystem)
34. [Testing Strategy](#34-testing-strategy)
35. [Roadmap](#35-roadmap)

---

## 1. What C> Is

**C>** (pronounced *"C-Greater"*) is a modern systems programming language inspired by C and C++, designed as a substantially more modern, safer, stricter, and more powerful evolution of the same foundational systems philosophy.

C> unifies:
- **Zero-cost abstractions** with deterministic hardware execution.
- **Strict compile-time memory safety** (affine ownership types and non-lexical borrow checking) without garbage collection or mandatory runtime overhead.
- **Direct hardware manipulation**: MMIO registers, CPU instructions, cache control, interrupt vectors, and hardware intrinsics.
- **First-class CPU and GPU programming**: heterogeneous execution with native kernel declarations and device buffers.
- **A real compiler pipeline written entirely in C**, compiling directly into optimized native executables and object files.

---

## 2. Design Philosophy

The design of C> is guided by seven core tenets:

1. **Zero-Cost Abstractions**: What you don't use, you don't pay for. What you do use, you could not write better by hand.
2. **Explicit Over Implicit**: Memory moves, mutability, borrows, and safety boundaries must be clear and auditable in source code.
3. **Hardware Sovereignty**: The programmer retains ultimate control over bits, bytes, registers, memory layouts, cache lines, and execution units.
4. **Compile-Time Guarantee Over Runtime Panic**: Memory safety violations (use-after-free, double-free, data races) are rejected statically at compile time.
5. **No Hidden Runtimes**: No tracing garbage collector, no virtual machine, no runtime interpreter, and no hidden background threads.
6. **Isolated and Auditable Unsafe Code**: Low-level bit-twiddling and raw pointer manipulations are strictly constrained to explicit `unsafe { ... }` blocks.
7. **Complete Native Interoperability**: Direct binary compatibility with the standard C ABI without translation glue or serialization overhead.

---

## 3. Why C> Exists

Systems software underpins modern computing: operating systems, hypervisors, browser engines, graphics drivers, embedded aerospace avionics, and machine learning runtimes.

Historically, systems developers were forced into an unfortunate dilemma:
- **C** offers absolute low-level control, unmatched simplicity, and universal portability, but lacks compile-time memory safety, type expressiveness, and ownership tracking, leading to decades of critical CVEs (use-after-free, buffer overflows, double frees).
- **C++** offers powerful abstractions (templates, RAII, STL), but has accrued fifty years of legacy baggage, fragile implicit conversions, complex undefined behavior pitfalls, and a lack of static borrow checking.
- **Rust** provides static memory safety, but can introduce friction in kernel/embedded development (e.g. self-referential structures, intrusive linked lists, memory-mapped device drivers, and cyclic hardware topologies) where borrow checker semantics can force extensive unsafe workarounds or complex lifetime gymnastics.

**C>** resolves this tension: it introduces an explicit ownership and borrow-checking model inspired by modern safety research, while maintaining the pragmatic systems ethos, transparent layout, and direct pointer control of C.

---

## 4. Relationship with C and C++

C> is neither a superset of C nor a subset of C++. It is an evolutionary successor:
- **Lexical Heritage**: Familiar C-family syntax (`fn`, `{ ... }`, operators, control flow).
- **ABI Heritage**: Native C layout alignment and direct C calling conventions (`cdecl`, `sysv`, `win64`).
- **Semantic Evolution**: Immutability by default (`let` vs `let mut`), explicit ownership (`own<T>`), explicit move semantics (`move(x)`), safe borrows (`&T`, `&mut T`), and strict compiler security checks.

---

## 5. Differences from C

| Feature | Standard C (C99/C11/C23) | C> (C-Greater) |
|---|---|---|
| Mutability | Mutable by default | Immutable by default (`let mut` required) |
| Pointer Safety | Unchecked raw pointers anywhere | `*raw T` restricted to `unsafe { ... }` |
| References | None (pointers only) | Safe references (`&T`, `&mut T`) |
| Ownership Tracking | Manual manual tracking (error prone) | Static affine ownership (`own<T>`, `move()`) |
| Use-After-Free | Silent runtime vulnerability | **Compile-time rejection** |
| Array Bounds | Unchecked buffer overflows | Compile-time & runtime checked |
| Heterogeneous GPU | None (requires external CUDA/OpenCL) | First-class `gpu_kernel` declarations |
| SIMD Support | Platform-specific compiler extensions | First-class types (`v128_f32`, `Vec4f`) |
| Module System | Textual `#include` preprocessor header hack | True modularity (`module`, `import`) |

---

## 6. Differences from C++

| Feature | C++ (C++20 / C++23) | C> (C-Greater) |
|---|---|---|
| Borrow Checking | None (dangling references compile) | Compiler-enforced borrow checker |
| Move Semantics | Implicit rvalue references & std::move | Explicit `move(var)` invalidates source |
| Construction | Complex constructors & copy semantics | Explicit struct initializers, zero implicit copies |
| Memory Isolation | `unsafe` concept absent | Explicit, walled `unsafe { ... }` blocks |
| Build Tooling | Heavy header compilation & slow builds | Single-pass fast compiler written in C |
| Templates | Complex SFINAE, concepts, complex errors | Clean generic parameters `<T>` |

---

## 7. Differences from Rust

| Feature | Rust | C> (C-Greater) |
|---|---|---|
| Implementation | Written in Rust (requires LLVM) | **Implemented in pure C** (portable, zero deps) |
| Systems Control | Relies on complex abstractions for MMIO | Direct MMIO intrinsics and hardware registers |
| Architecture | Opinionated lifetime graphs | Pragmatic systems-oriented ownership & borrow tracking |
| Inline Assembly | Macro-based `asm!` with LLVM constraints | Direct architecture-level inline assembly |
| GPU Integration | Requires rust-gpu / spirv third-party crates | Built-in GPU kernel syntax and compute queue |
| Compilation Model | Massive rustc compiler toolchain | Fast, lightweight C compilation pipeline |

---

## 8. High-Level Capabilities

C> provides modern high-level abstractions designed for expressiveness:
- **Algebraic Data Types & Enums**: Tagged unions and pattern matching.
- **Type Inference**: Local variable inference reduces boilerplates.
- **Traits & Impl Blocks**: Polymorphic behavior without virtual table overhead unless explicitly dynamic.
- **RAII & Defer**: Automatic resource deallocation (`defer` expressions and deterministic ownership drop).
- **First-class Slices**: Memory-safe slices `&[T]` capturing pointers and bounds together.

---

## 9. Low-Level Capabilities

For systems, kernels, and embedded targets:
- **Volatile Operations**: `cgt_volatile_read32(addr)` and `cgt_volatile_write32(addr, val)` prevent compiler dead-store elimination.
- **Hardware Register Mapping**: Direct pointer manipulation to MMIO peripherals (e.g. UART, PCIe base registers).
- **CPU Control**: Pipeline barriers, memory fences, cycle counters, and CPU flags.
- **Zero Runtime Overhead**: No hidden allocations, no background garbage collector, and deterministic stack usage.

---

## 10. Memory Model

C> models memory hierarchically:
1. **Stack Memory**: Automatically allocated with deterministic function frame lifespans.
2. **Owned Heap / Buffer Memory (`own<T>`)**: Uniquely owned resource handles. When an `own<T>` leaves scope without being moved, its destructor or deallocator executes deterministically.
3. **Borrowed Memory (`&T`, `&mut T`)**: Temporary views into valid stack or heap data. Borrows cannot outlive the target.
4. **Raw Hardware Memory (`*raw T`, `*const T`)**: Arbitrary physical or virtual addresses, accessible only within `unsafe` blocks.

---

## 11. Ownership Model

Every resource in C> has a single owner variable:
```cgt
let r1: own<Buffer> = Buffer::create(4096);
let r2: own<Buffer> = move(r1);

// COMPILE ERROR: Use of moved value 'r1'
// r1 is statically marked as MOVED and cannot be accessed.
```

The C> ownership tracker assigns state to every variable:
- `UNINITIALIZED`: Allocated but not yet populated.
- `ACTIVE_OWNED`: Exclusively owned and valid.
- `MOVED`: Ownership transferred elsewhere; further usage is rejected at compile time.
- `DROPPED`: Resource deallocated at end of scope.

---

## 12. Borrowing Model

C> enforces the fundamental aliasing XOR mutability invariant:

$$\text{Active Borrows} \implies (\text{Count}(\&T) \ge 0 \land \text{Count}(\&mut T) = 0) \lor (\text{Count}(\&T) = 0 \land \text{Count}(\&mut T) = 1)$$

- **Shared Borrow (`&T`)**: Multiple concurrent read-only references are allowed. Mutating the underlying variable is blocked during the borrow.
- **Mutable Borrow (`&mut T`)**: Exactly **one** exclusive mutable reference is permitted at any given moment. No other borrows (shared or mutable) may coexist.

---

## 13. Unsafe Model & Context Isolation

Safe code in C> guarantees memory safety. When interacting with hardware, operating system boundaries, or custom allocators, developers enter an explicit `unsafe` context:

```cgt
fn read_device_port(port: u64) -> u32 {
    let mut val: u32 = 0;
    unsafe {
        // Direct pointer dereferencing and inline assembly allowed
        asm("in %dx, %eax");
        val = cgt_volatile_read32(port);
    }
    return val;
}
```

Outside `unsafe`:
- Dereferencing `*raw T` produces a compile error.
- Unchecked pointer arithmetic produces a compile error.
- Raw casting of integers to pointer addresses produces a compile error.

---

## 14. Compiler Security Model

The C> compiler contains a built-in static security analysis engine (`cgt_security_auditor_t`):
- **Integer Overflow Risk Detection**: Evaluates constant arithmetic and flags static signed overflows and division-by-zero errors.
- **Static Buffer Overrun Auditing**: Checks constant array index accesses against known buffer capacities.
- **Address Truncation Prevention**: Detects unsafe downcasts (e.g. 64-bit pointer truncated to `i32`) that cause address space truncation vulnerabilities.
- **Format String Protection**: Verifies that standard I/O format invocations cannot be exploited with user-controlled format strings.

---

## 15. Direct CPU Control & Intrinsics

C> provides direct access to CPU execution primitives:
- **SIMD**: 128-bit (`v128_f32`, `v128_i32`) and 256-bit (`v256_f32`, `v256_i32`) vector registers with built-in arithmetic (`simd_add`, `simd_mul`).
- **Atomics**: Sequential consistency and acquire-release semantics (`atomic_load`, `atomic_store`, `atomic_fetch_add`).
- **CPU Pipelines**: Hardware pause (`asm("pause")`), memory barriers (`__sync_synchronize()`), and cache line flushing.

---

## 16. GPU Subsystem & Compute Programming

C> supports heterogeneous compute targets with native kernel functions:
```cgt
gpu_kernel fn vector_scale(scalar: f32) -> void {
    // Kernel executes on device grid
}

fn main() -> i32 {
    vector_scale(2.5);
    return 0;
}
```

The C> compiler generates device-dispatch host metadata and can lower kernels to compute targets (Vulkan SPIR-V, CUDA PTX, Metal MSL, or host-accelerated SIMD emulation).

---

## 17. Compiler Architecture & Functional Pipeline

The C> compiler (`cgt`) is implemented in pure C and operates through a strictly functional 9-stage pipeline:

```
                  ┌───────────────────────┐
                  │    C> Source Code     │
                  └──────────┬────────────┘
                             │
                             ▼
                  ┌───────────────────────┐
                  │   Lexical Analysis    │ (cgt_lexer.c)
                  └──────────┬────────────┘
                             │
                             ▼
                  ┌───────────────────────┐
                  │    Grammar Parsing    │ (cgt_parser.c)
                  └──────────┬────────────┘
                             │
                             ▼
                  ┌───────────────────────┐
                  │ Abstract Syntax Tree  │ (cgt_ast.c)
                  └──────────┬────────────┘
                             │
                             ▼
                  ┌───────────────────────┐
                  │   Semantic Analysis   │ (cgt_semantic.c)
                  └──────────┬────────────┘
                             │
                             ▼
                  ┌───────────────────────┐
                  │     Type Checker      │ (cgt_typechecker.c)
                  └──────────┬────────────┘
                             │
                             ▼
                  ┌───────────────────────┐
                  │ Memory Safety & Borrow│ (cgt_memory_safety.c)
                  └──────────┬────────────┘
                             │
                             ▼
                  ┌───────────────────────┐
                  │   Security Auditor    │ (cgt_security.c)
                  └──────────┬────────────┘
                             │
                             ▼
                  ┌───────────────────────┐
                  │     Intermediate      │ (cgt_ir.c)
                  │  Representation (IR)  │
                  └──────────┬────────────┘
                             │
                             ▼
                  ┌───────────────────────┐
                  │ IR Optimizer (-O0..3) │ (cgt_optimizer.c)
                  └──────────┬────────────┘
                             │
                             ▼
                  ┌───────────────────────┐
                  │  Native Target CG/C   │ (cgt_codegen.c, cgt_backend.c)
                  └──────────┬────────────┘
                             │
                             ▼
                  ┌───────────────────────┐
                  │   Native Executable   │
                  │   or Object (.o)      │
                  └───────────────────────┘
```

---

## 18. Project Structure

```
C>/
├── compiler/
│   ├── lexer/           # Token scanner, common string buffers & diagnostics
│   │   ├── cgt_common.c
│   │   └── cgt_lexer.c
│   ├── parser/          # Recursive descent parser
│   │   └── cgt_parser.c
│   ├── ast/             # AST node constructors and tree dump
│   │   └── cgt_ast.c
│   ├── semantic/        # Symbol table, scope chains, and identifier binding
│   │   └── cgt_semantic.c
│   ├── typechecker/     # Static type system, type equality, and inference
│   │   └── cgt_typechecker.c
│   ├── memory/          # Ownership tracker, borrow checker & safety validator
│   │   └── cgt_memory_safety.c
│   ├── security/        # Static vulnerability analyzer & auditor
│   │   └── cgt_security.c
│   ├── ir/              # 3-address intermediate representation
│   │   └── cgt_ir.c
│   ├── optimizer/       # Constant folding, dead code elimination (DCE)
│   │   └── cgt_optimizer.c
│   ├── codegen/         # Target code generator (C11, assembly, ELF)
│   │   └── cgt_codegen.c
│   ├── backend/         # Architecture & CPU target descriptor registry
│   │   └── cgt_backend.c
│   └── driver/          # CLI compiler driver and main entry point
│       ├── cgt_driver.c
│       └── main.c
├── runtime/             # Standalone C> runtime library
│   ├── cgt_runtime.h
│   └── cgt_runtime.c
├── std/                 # Standard library modules
│   ├── core.cgt
│   ├── io.cgt
│   ├── simd.cgt
│   ├── sync.cgt
│   ├── gpu.cgt
│   └── fs.cgt
├── include/             # Public compiler headers
│   ├── cgt_common.h
│   ├── cgt_lexer.h
│   ├── cgt_ast.h
│   ├── cgt_parser.h
│   ├── cgt_semantic.h
│   ├── cgt_typechecker.h
│   ├── cgt_memory_safety.h
│   ├── cgt_security.h
│   ├── cgt_ir.h
│   ├── cgt_optimizer.h
│   ├── cgt_codegen.h
│   ├── cgt_driver.h
│   └── cgt_extensions.h
├── examples/            # Real C> programs demonstrating all language features
│   ├── hello.cgt
│   ├── functions.cgt
│   ├── structs.cgt
│   ├── classes_types.cgt
│   ├── generics.cgt
│   ├── ownership.cgt
│   ├── borrowing.cgt
│   ├── lifetimes.cgt
│   ├── manual_memory.cgt
│   ├── safe_memory.cgt
│   ├── unsafe_code.cgt
│   ├── simd.cgt
│   ├── atomics.cgt
│   ├── threads.cgt
│   ├── ffi.cgt
│   ├── mmio.cgt
│   ├── cpu_intrinsics.cgt
│   ├── gpu_compute.cgt
│   └── systems_programming.cgt
├── tests/               # Unit test suites and end-to-end test runner
│   ├── test_lexer.c
│   ├── test_parser.c
│   ├── test_typechecker.c
│   ├── test_memory_safety.c
│   ├── test_ir.c
│   ├── test_runner.c
│   └── run_all_examples.sh
├── docs/                # In-depth architectural and specification docs
│   ├── SPECIFICATION.md
│   ├── MEMORY_MODEL.md
│   ├── EXTENSIONS_GUIDE.md
│   └── GPU_SUBSYSTEM.md
├── extensions/          # Language and syntax extension plugin architecture
│   ├── cgt_extensions.c
│   └── ext_matrix.c
├── architectures/       # Hardware architecture specifications
│   ├── x86_64/
│   ├── aarch64/
│   └── riscv/
├── gpu/                 # GPU target subsystem backend specifications
│   ├── vulkan/
│   ├── cuda/
│   └── metal/
├── tools/               # Auxiliary developer tools
├── CMakeLists.txt       # CMake build definition
├── Makefile             # Standalone POSIX Makefile
├── LICENSE              # Open source license
└── README.md            # This documentation
```

---

## 19. Build Instructions

### Prerequisites
- Any standard C compiler supporting C11 (e.g., `gcc` or `clang`)
- GNU `make` or `cmake` (>= 3.16)

### Building via Make
```bash
cd "C>"
make
```
This builds:
- `bin/cgt`: The main C> compiler driver
- `bin/cgt_test`: The unit test suite runner
- `bin/libcgt_runtime.a`: The static runtime library

### Running Test Suite
```bash
make test
```

### Running All 19 Examples
```bash
./tests/run_all_examples.sh
```

### Installing Globally
```bash
make install
```
Installs `cgt` to `/usr/local/bin/cgt`.

---

## 20. Compiler Driver Usage (`cgt`)

```
C> (C-Greater) Systems Programming Language Compiler v1.0.0
Usage: cgt [options] <source.cgt>

Compilation Pipeline Options:
  -o <file>             Specify output executable or object filename (default: a.out)
  -c                    Compile and assemble, but do not link (-c object file)
  -r, --run             Compile and immediately execute the binary
  -O0, -O1, -O2, -O3    Set optimization level (default: -O0)
  -v, --verbose         Enable verbose diagnostic pipeline trace

Inspection & Verification Modes:
  --emit-ast            Parse and dump AST structure to stdout
  --emit-ir             Lower to C> Intermediate Representation and dump to stdout
  --emit-c              Emit generated intermediate C code
  --emit-asm            Emit generated native target assembly (.s)
  --check-only          Stop after semantic analysis and type checking
  --check-memory        Run ownership and borrow checker diagnostics only
  --security-audit      Perform static vulnerability and safety audit

Information:
  -h, --help            Show this help dialog
  --version             Print compiler version information
```

### Quick Commands

1. **Compile and execute immediately**:
   ```bash
   cgt examples/hello.cgt -r
   ```

2. **Inspect the generated AST**:
   ```bash
   cgt examples/functions.cgt --emit-ast
   ```

3. **Inspect the Intermediate Representation (IR)**:
   ```bash
   cgt examples/functions.cgt --emit-ir
   ```

4. **Emit generated native C**:
   ```bash
   cgt examples/structs.cgt --emit-c
   ```

5. **Run static memory safety verification only**:
   ```bash
   cgt examples/ownership.cgt --check-memory
   ```

6. **Compile with aggressive optimizations (-O3)**:
   ```bash
   cgt examples/simd.cgt -O3 -o simd_app
   ./simd_app
   ```

---

## 21. Language Syntax Reference

### Functions
```cgt
fn add(a: i32, b: i32) -> i32 {
    return a + b;
}
```

### Variables & Mutability
```cgt
let immutable_val: i32 = 100;
let mut counter: i32 = 0;
counter = counter + 1;
```

### Structs & Methods
```cgt
struct Point {
    x: i32,
    y: i32,
}

let pt: Point = Point {
    x: 10,
    y: 20,
};
```

### Control Flow
```cgt
if (x > 0) {
    println("Positive");
} else {
    println("Non-positive");
}

while (count < 10) {
    count = count + 1;
}
```

### Safe vs Unsafe
```cgt
// Safe code
let safe_data: i32 = 42;

// Isolated low-level context
unsafe {
    asm("nop");
    cgt_volatile_write32(0x1000, 0xFF);
}
```

---

## 22. Type System & Type Inference

### Primitive Scalar Types
- **Integers**: `i8`, `i16`, `i32`, `i64` (signed), `u8`, `u16`, `u32`, `u64` (unsigned)
- **Floating Point**: `f32` (IEEE 754 single), `f64` (IEEE 754 double)
- **Characters & Strings**: `char` (8-bit ASCII/UTF-8 byte), `str` (UTF-8 immutable string slice)
- **Booleans**: `bool` (`true`, `false`)
- **Unit**: `void`

### Compound & Reference Types
- **References**: `&T` (immutable borrow), `&mut T` (mutable borrow)
- **Unique Ownership**: `own<T>`
- **Raw Pointers**: `*raw T` (mutable unchecked), `*const T` (const unchecked)
- **Arrays**: `[T; N]` (fixed size)
- **Slices**: `&[T]` (fat pointer with pointer + length)
- **SIMD**: `v128_f32`, `v128_i32`, `v256_f32`, `v256_i32`

---

## 23. Modules, Namespaces & Imports

C> replaces the textual C preprocessor `#include` with an explicit module system:
```cgt
module core::crypto::sha256;

import std::io;
import std::simd as simd_lib;
```

Every module defines a discrete compilation and symbol boundary.

---

## 24. Generics & Parametric Polymorphism

Structs and functions support generic type parameters with monomorphization at compile time, guaranteeing zero runtime overhead:
```cgt
struct Pair<T, U> {
    first: T,
    second: U,
}
```

---

## 25. Error Handling & Deterministic Resource Management

C> rejects implicit exceptions in favor of explicit deterministic results and RAII drops:
- **`defer` Expressions**: Execute upon exiting the lexical scope regardless of branch outcome.
- **Deterministic Drop**: Owned resources execute destruction routines immediately when their variable lifetime terminates.

---

## 26. Concurrency Primitives & Threads

Built into the C> runtime is thread spawning and joinable OS threads:
```cgt
import std::sync;

fn worker(id: i32) -> void {
    println("Worker executing.");
}
```

Atomics provide low-level lock-free guarantees with standard hardware barriers:
```cgt
struct AtomicCounter {
    value: i32,
}
```

---

## 27. Deterministic Memory Management & RAII

Unlike C, where memory leaks easily occur when `free` is omitted, and unlike garbage-collected languages that incur latency spikes, C> tracks the precise scope of every `own<T>` resource. Deallocation is inserted deterministically by the compiler at the precise end of the value's life.

---

## 28. Foreign Function Interface (FFI) & C ABI

C> functions match the native C calling convention:
```cgt
extern fn write(fd: i32, buf: *const void, count: u64) -> i64;
```
Any existing C library (libc, libuv, SDL, Vulkan, OpenSSL) can be called directly without wrappers or performance penalties.

---

## 29. Inline Assembly Support

For OS kernels and drivers, C> supports inline assembly with direct register constraints:
```cgt
unsafe {
    asm("cli");     // Disable interrupts
    asm("pause");   // Pipeline pause
    asm("sti");     // Enable interrupts
}
```

---

## 30. Architecture Support

The C> compiler backend includes target descriptors for the three major systems computing architectures:
1. **x86_64**: Standard 64-bit PC and server architecture (AVX2, AVX-512, SSE4.2).
2. **AArch64**: ARM 64-bit architecture (NEON, SVE, embedded Cortex-A).
3. **RISC-V (RV64GC)**: Open standard instruction set (Vector Extension, atomic memory operations).

---

## 31. GPU Architecture & Backends

The C> GPU subsystem abstracts heterogeneous compute execution:
- Host creates virtual device contexts and allocates device-resident buffers (`cgt_rt_gpu_alloc`).
- Kernels marked `gpu_kernel` are emitted to compute backends:
  - **Vulkan Compute / SPIR-V**
  - **NVIDIA CUDA / PTX**
  - **Apple Metal / MSL**
  - **Host SIMD Compute Grid** (emulates GPU work items across CPU thread pools for testing and development)

---

## 32. Standard Library & Runtime

The C> standard library (`std::`) is modular and written in C>:
- `std::core`: Memory primitives, buffers, assertions.
- `std::io`: Formatted terminal and diagnostic I/O.
- `std::simd`: Vectorized arithmetic wrappers.
- `std::sync`: Thread synchronization and atomic flags.
- `std::gpu`: Compute dimensions and device buffer handles.
- `std::fs`: Binary file streams and file descriptors.

The native runtime (`libcgt_runtime.a`) provides memory leak tracking, assertion panic handling, and multi-threaded dispatch.

---

## 33. Extensions Subsystem

C> features an extensibility architecture (`compiler/extensions/`):
- Extensions register via `cgt_extension_register(&ext_def)`.
- Available hooks include:
  - Lexer hook (`on_lex_token`)
  - Parser expression hook (`on_parse_expr`)
  - Semantic analysis hook (`on_semantic_analysis`)
  - IR lowering hook (`on_ir_lowering`)
  - Target code generator hook (`on_codegen`)

See `extensions/ext_matrix.c` for an implementation demonstrating a matrix arithmetic extension (`ext_matrix`).

---

## 34. Testing Strategy

The test suite covers:
1. **Unit Testing (`bin/cgt_test`)**:
   - Token scanner correctness
   - AST node construction and precedence climbing
   - Type unification and type checking
   - Memory safety borrow checker enforcement (verifying that invalid moves and multiple mutable borrows are rejected)
   - IR lowering and constant folding verification
2. **Integration & End-to-End Testing (`tests/run_all_examples.sh`)**:
   - Compiles every `.cgt` example program to a real binary with `cgt -r`.
   - Runs each binary and verifies clean exit status (19/19 passing).

---

## 35. Roadmap

- **v1.0 (Current Foundation)**: Complete C-implemented compiler, 9-stage pipeline, static type system, borrow checker, security auditor, IR lowering, optimizer, native code generation, standard library, and 19 end-to-end examples.
- **v1.1**: Direct LLVM IR backend target alongside C backend.
- **v1.2**: Advanced non-lexical lifetimes (NLL) graph solver.
- **v1.3**: Native SPIR-V binary emitter for Vulkan compute kernels.
- **v1.4**: Self-hosting C> compiler (compiling C> compiler written in C>).

---

## License

Copyright (c) 2026 C> Language Project Contributors.  
Licensed under the Apache License, Version 2.0 or the MIT License at your option.
