# C> Security Architecture and Hardening Model

## 1. Threat Model & Design Principles
C> treats systems software—such as hypervisors, kernel modules, cryptographic implementations, and network parsers—as high-value attack surfaces. The C> security model aims to mitigate native vulnerability classes by default through static analysis and defense-in-depth codegen instrumentation.

---

## 2. Compile-Time Security Passes

The compiler pipeline includes dedicated static vulnerability detection in `C>/compiler/security/cgt_security.c`:

### 2.1 Integer Safety
- **Signed Overflow**: In debug and hardened release builds, signed integer overflow results in an immediate trap rather than undefined behavior (UB).
- **Unchecked Truncations**: Narrowing conversions (e.g. `u64 -> u32` or `isize -> i8`) require explicit checked casting (`as_checked`) or static range verification proving the value fits in the destination range.

### 2.2 Pointer & Memory Boundaries
- **Null Dereference Prevention**: References (`&T` and `&mut T`) are guaranteed non-null by the type system. Nullable pointers must be typed as `Option<&T>` or checked before dereference.
- **Strict Pointer Casting**: Casts between incompatible pointer types (e.g., casting arbitrary integer pointers to struct references) are rejected outside `unsafe`.
- **Memory Initialization Guarantee**: All stack and heap variables must be initialized before read. Reading uninitialized memory is flagged as a static compilation error.

---

## 3. Runtime Defense Hardening

When targeting production environments (`--security-audit` or release flags), the backend emits:
1. **Stack Canaries**: Stack protector guards prevent return-address overwrite on stack frames.
2. **Shadow Call Stack / CFI**: Enforces control-flow integrity on indirect function calls.
3. **Data Execution Prevention (W^X)**: Runtime memory allocators enforce strict separation between executable pages and writable pages.
4. **ASLR & PIE Integration**: Position-Independent Executable code generation by default.
