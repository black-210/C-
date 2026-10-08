# C> (C-Greater) Language Specification
**Version:** 1.0.0-LTS  
**Target Domains:** Operating Systems, Kernels, Drivers, Embedded Firmware, High-Performance Native Systems, Real-Time Graphics, and Compilers.

---

## 1. Introduction and Design Philosophy

C> (pronounced *C-Greater*) is a modern systems programming language synthesized from the low-level efficiency and mechanical sympathy of C/C++ and the compile-time safety principles of modern formal type systems.

### Core Tenets:
1. **Zero-Cost Abstractions**: High-level idioms compile directly down to optimal machine instructions without hidden overhead, runtime dispatch indirection, or garbage collection.
2. **Deterministic Resource Management**: RAII with affine ownership types guarantees predictable cleanup down to the microsecond.
3. **Explicit Memory Safety Boundary**: Safe C> code statically guarantees absence of use-after-free, double-free, and data races. Low-level bit-twiddling and hardware memory mapping require explicit `unsafe { ... }` blocks.
4. **Hardware and CPU Direct Control**: First-class primitives for inline assembly, CPU register binding, architecture-specific intrinsics, and SIMD vector operations.
5. **Unified GPU Compute**: Express GPU compute kernels and buffer pipelines natively within the same compilation framework.

---

## 2. Lexical Structure

- **Character Set**: UTF-8 encoded source files.
- **Identifiers**: Match `[a-zA-Z_][a-zA-Z0-9_]*`.
- **Comments**:
  - Line comments: `// ...`
  - Block comments: `/* ... */`
- **Keywords**:
  - Declaration: `fn`, `let`, `mut`, `const`, `static`, `struct`, `class`, `trait`, `impl`, `enum`, `type`, `mod`, `use`
  - Ownership: `own`, `borrow`, `view`, `move`, `unsafe`, `ref`
  - Control Flow: `if`, `else`, `match`, `while`, `for`, `loop`, `return`, `break`, `continue`, `defer`
  - Concurrency & Hardware: `async`, `await`, `atomic`, `volatile`, `asm`
  - Target Attributes: `@inline`, `@simd`, `@kernel`, `@align`, `@no_mangle`, `@export`, `@naked`

---

## 3. Type System

### 3.1 Primitive Types
- **Integers**: `i8`, `i16`, `i32`, `i64`, `i128`, `u8`, `u16`, `u32`, `u64`, `u128`, `isize`, `usize`
- **Floating Point**: `f32`, `f64`
- **Boolean**: `bool` (`true`, `false`)
- **Character**: `char` (32-bit Unicode code point)
- **Void/Unit**: `void`

### 3.2 Pointer and Reference Types
- **Owned Pointers**: `own<T>` (unique ownership, freed upon scope exit)
- **Immutable Borrow**: `&T` (read-only reference, multiple aliases allowed)
- **Mutable Borrow**: `&mut T` (exclusive reference, zero aliases allowed)
- **Raw Pointers**: `*raw T`, `*const T`, `*mut T` (dereference permitted only inside `unsafe` blocks)
- **Volatile Pointer**: `volatile<T>` (memory-mapped register access; reads and writes not elided by optimizer)

### 3.3 Composite Types
- **Tuples**: `(T1, T2, ...)`
- **Slices**: `[T]` (fat pointer comprising pointer and length)
- **Fixed Arrays**: `[T; N]` (stack-allocated contiguous elements)
- **Structs**: `struct Name { field: Type }`
- **Tagged Enums**: `enum Name { VariantA(Type), VariantB }`

---

## 4. Ownership, Borrowing, and Lifetimes

Every allocated resource in C> has an owner. Passing an owned value by default invokes **Move Semantics**:
```cgt
let a: own<Buffer> = Buffer::create(4096);
let b: own<Buffer> = a; // Ownership moves to b. 'a' is invalidated!
// Accessing 'a' here triggers compile error E0382: Use of moved value.
```

### Borrowing Invariant
At any point in program execution:
- You may have any number of shared references (`&T`) to a resource, **OR**
- You may have exactly one exclusive mutable reference (`&mut T`), but never both simultaneously.

---

## 5. Control Flow and Pattern Matching

C> supports expressive pattern matching and standard control primitives:
```cgt
match status {
    Status::Success => return 0,
    Status::Error(code) => {
        log_error(code);
        return -1;
    },
    _ => return -2
}
```

The `defer` statement enables deterministic cleanup of resources in reverse lexical order:
```cgt
let fd = sys_open("/dev/tty0");
defer sys_close(fd);
// Critical section executes here...
```

---

## 6. Generics and Traits

Polymorphism in C> is monomorphized at compile time with zero runtime overhead:
```cgt
trait Hashable {
    fn hash(&self) -> u64;
}

struct Point<T> {
    x: T,
    y: T
}

impl<T: Hashable> Hashable for Point<T> {
    fn hash(&self) -> u64 {
        return self.x.hash() ^ (self.y.hash() << 1);
    }
}
```

---

## 7. Low-Level and Systems Features

### 7.1 Unsafe Blocks
Operations that cannot be proven safe statically by the borrow checker must be enclosed in `unsafe`:
- Dereferencing raw pointers (`*raw T`)
- Invoking FFI C functions
- Inline assembly execution
- Mutable static access

```cgt
unsafe {
    let ptr = 0x80000000 as *mut u32;
    *ptr = 0x01; // MMIO write
}
```

### 7.2 Inline Assembly
Direct instruction dispatch with input/output register constraints:
```cgt
unsafe {
    asm volatile(
        "outb %0, %1"
        : 
        : "a"(data), "Nd"(port)
    );
}
```
