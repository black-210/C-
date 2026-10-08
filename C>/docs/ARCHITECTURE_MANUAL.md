# C> Architecture & Low-Level CPU Control Manual

## 1. Multi-Target Support
C> provides first-class, architecture-aware compilation for Tier 1 native ISAs:
- **x86_64** (AMD64 / Intel 64) with AVX2, AVX-512, and BMI2
- **AArch64** (ARMv8-A / ARMv9-A) with NEON, SVE, and Cryptography extensions
- **RISC-V 64** (RV64GC) with RVV Vector extension and Zba/Zbb bitmanip

---

## 2. Direct Hardware & CPU Control

### 2.1 CPU Feature Detection
Features can be queried dynamically at runtime or statically guarded:
```cgt
use arch::x86_64;

if (x86_64::has_avx2()) {
    process_simd_avx2(data);
} else {
    process_scalar(data);
}
```

### 2.2 Memory Barriers and Fences
Hardware ordering instructions are provided as compiler primitives:
- `arch::mfence()` / `arch::dmb()`: Full memory barrier
- `arch::lfence()` / `arch::isb()`: Instruction / load barrier
- `arch::sfence()`: Store barrier

### 2.3 CPU Intrinsics & Cycle Counters
- High-precision timing: `arch::rdtsc()` / `arch::cntvct_el0()`
- Bit manipulation: `arch::clz()`, `arch::ctz()`, `arch::popcount()`
- Cache control: `arch::clflush()`, `arch::prefetch()`

### 2.4 Calling Conventions & ABI
Functions can explicitly specify foreign calling conventions:
```cgt
#[calling_convention("sysv64")]
extern "C" fn sys_entry(arg: i32) -> i32;

#[calling_convention("win64")]
extern "stdcall" fn win32_callback(hwnd: usize) -> u32;

#[calling_convention("naked")]
fn isr_timer_handler() {
    // Zero stack frame prologue/epilogue for interrupt servicing
}
```
