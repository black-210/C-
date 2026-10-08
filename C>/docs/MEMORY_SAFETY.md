# C> Memory Safety Model

## 1. Overview
The memory model of C> eliminates entire classes of bugs (spatial, temporal, and race conditions) at compile time while retaining the raw machine performance expected of C and C++.

Unlike garbage-collected languages, C> requires zero runtime collector pauses or background threads. Unlike legacy C/C++, C> prohibits uncontrolled aliasing and invalid lifetime scopes.

---

## 2. The Core Safety Rules

### Rule 1: Affine Ownership (Single Owner)
- Every resource (heap block, file descriptor, lock guard, GPU buffer) has exactly one owner variable at any given line of execution.
- When an owned variable is assigned or passed to a function by value, ownership is transferred (**moved**).
- Subsequent access to the original symbol is rejected at compile-time:
  ```
  [C> Compile Error] Use of moved value 'buf' (moved at line 14)
  ```

### Rule 2: Alias-XOR-Mutability (Borrow Checking)
Aliasing bugs occur when memory is concurrently modified while other references assume it remains unchanged.
The C> compiler enforces:
$$\forall \text{ resource } R, \quad (\text{SharedCount}(R) \ge 0 \land \text{MutCount}(R) = 0) \lor (\text{SharedCount}(R) = 0 \land \text{MutCount}(R) = 1)$$
- Shared borrow (`&T`): Read-only view. Multiple shared borrows can coexist simultaneously.
- Mutable borrow (`&mut T`): Read-write view. Only one active mutable borrow is permitted; no shared borrows may coexist with it.

### Rule 3: Lexical Lifetime Scoping
References cannot outlive the referent:
- A borrow `&'a T` must have lifetime `'a` strictly bounded by the scope of the owning variable.
- Attempting to return a reference to a local stack variable causes compilation error:
  ```cgt
  fn bad_ref() -> &i32 {
      let x: i32 = 42;
      return &x; // COMPILE ERROR: Dangling stack reference returned
  }
  ```

---

## 3. Vulnerability Class Eliminations

| Vulnerability Class | C/C++ Behavior | C> Compile-Time Resolution |
| :--- | :--- | :--- |
| **Use-After-Free (UAF)** | Undefined Behavior, exploitable | Moved or dropped values cannot be dereferenced; static borrow checker rejects access |
| **Double-Free** | Heap corruption, memory abort | RAII destructor fires once when owning scope exits; moved values do not fire destructors |
| **Dangling Pointers** | Reading garbage / stale stack | Lifetimes guarantee reference cannot outlive owner |
| **Buffer Overflow** | Spatial boundary violation | Array and slice indexing undergo static range bounds checks or runtime panic traps |
| **Data Races** | Non-deterministic multithreaded corruption | Types passed across thread boundaries must implement `Send` and `Sync`; aliased mutable state is prohibited |

---

## 4. The `unsafe` Boundary

When hardware interfacing, OS development, or memory allocation requires raw pointers:
- Raw pointers (`*raw T`, `*const T`, `*mut T`) do not track ownership or lifetimes.
- Reading from or writing to a raw pointer requires an explicit `unsafe { ... }` block.
- Standard libraries wrap `unsafe` operations inside safe, sound zero-cost abstractions, isolating auditing surface to small, verified modules.
