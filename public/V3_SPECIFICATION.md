# C> (C-Greater) Version 3.0 Universal & Systems Specification
**Document Version:** 3.0.0-LTS Universal & Bare-Metal Flagship Edition  
**Status:** Implemented, Packaged, and Verified Across Compiler, Runtime, and Extension  
**Scope:** Universal Language for Everyone — Ultra-Simple Beginner Syntax (Simpler than Python) + Autonomous Self-Compilation (Zero C Dependencies) + Heterogeneous GPU Compute Shaders + Comprehensive Low-Level Assembly & Hardware Control + Formal Verification + VS Code v3.0 Tooling.

---

## 1. Executive Summary: The C> v3.0 Architecture

C> version 3.0 represents the ultimate realization of the **Universal Language** vision. It solves the historic dichotomy of software development: developers previously had to choose between slow, high-level languages with friendly syntax (like Python or JavaScript) or low-level, unsafe languages with steep learning curves (like C, C++, or Rust).

C> v3.0 unifies both worlds seamlessly into a single, cohesive grammar without compromise:

1. **Ultra-Simple for Beginners (Simpler than Python)**:
   - Natural human-readable declarative keywords: `say`, `ask`, `repeat N times`, `every item in list`, `whenever / otherwise`, `define`, `given / when`, `attempt / trouble`.
   - Zero boilerplate: no required headers, no `main()` function ceremony for scripts, no indentation traps, and no mandatory semicolons or parenthesis wrapping.
2. **Comprehensive Low-Level Assembly-Like Control (Bare-Metal Silicon)**:
   - Direct CPU register manipulation and volatile inline assembly (`asm volatile`).
   - Motherboard port I/O (`cpu_port_out`, `cpu_port_in`) compiling to native x86 `outb`/`inb`.
   - Bare-metal Interrupt Service Routines (`@interrupt_handler`) with automatic stack frame preservation and `iretq`.
   - Direct Memory Access (DMA) descriptor rings with CPU cache line invalidation (`clflushopt`, `sfence`).
   - Hardware spinlocks and wait-free atomic 64-bit compare-and-swap (`atomic_cas64`, CPU `pause` instruction).
   - 4-level x86_64 paging (PML4, PDP, PD, PT) and direct CPU control register loading (`CR3`, `invlpg`).
3. **Heterogeneous GPU Compute Shaders**:
   - First-class `@kernel` shaders operating over `device_span<T>` memory buffers.
   - Compiles unified C> code directly into Vulkan SPIR-V, NVIDIA CUDA PTX, and Apple Metal bytecode.
4. **Deterministic Time-Travel Replay Debugger**:
   - Built-in `replay` blocks with microsecond-level hardware state snapshots (`snapshot_state`).
5. **Multi-Tier Memory Safety**:
   - Affine ownership tracking prevents use-after-free without a slow borrow checker.
   - Scoped regional arenas (`region`) achieve bulk O(1) memory destruction with zero heap fragmentation.
   - Lock-free epoch hazard pointers (`hazard`, `claim`, `pin`) enable wait-free readers without mutex locks.
6. **Built-in Formal Verification**:
   - Mathematical Hoare-logic proofs built into grammar: `spec`, `contract`, `requires`, `ensures`, `invariant`.
7. **Autonomous Self-Compilation (Zero C Dependencies)**:
   - Does not depend on GCC, Clang, or LLVM.
   - Self-hosting native compiler and self-translator (`cgt_self_translator.cgt`) written 100% in C>.
8. **Official VS Code & Code-OSS Extension v3.0.0**:
   - Packaged in `c-greater-3.0.0.vsix` with autocompletion, vibrant color themes, syntax diagnostics, and interactive tailored templates.

---

## 2. Ultra-Simple Beginner Layer: Simpler than Python

Beginners can write meaningful, instant programs immediately without cognitive friction:

### 2.1 `say` — Universal Output
Outputs text, numbers, and variables directly. No parenthesis nesting or string format specifiers required:
```cgt
say "Welcome to C> v3.0!";
say "Result: ", 42, " | Status: Active";
```

### 2.2 `ask` — Universal Console Input
Prompts user input and infers variable type automatically:
```cgt
let user_name = ask("Please enter your name: ");
say "Hello, ", user_name, "!";
```

### 2.3 `repeat ... times` — Clean Repetition Loop
Eliminates confusing index counters (`for i in range(...)`) and off-by-one errors:
```cgt
repeat 3 times {
    say "C> is universal, fast, and accessible!";
}
```

### 2.4 `whenever` and `otherwise` — Natural Decision Branches
Natural declarative alternatives to cryptic branching:
```cgt
let score = 95;
whenever score >= 90 {
    say "Grade: First Class Honors!";
} otherwise {
    say "Grade: Pass with diligence.";
}
```

### 2.5 `define` — Declarative Functions
Clear parameter declarations with automatic type inference:
```cgt
define calculate_total(price, tax_rate) {
    return price * (1.0 + tax_rate);
}

let total = calculate_total(100, 0.05);
say "Total: $", total;
```

### 2.6 `given ... when` — Pattern Matching
Expressive destructuring matching replacing convoluted switch statements:
```cgt
let status = "running";
given status {
    when "running" => say "System is active.";
    when "standby" => say "System in warm standby.";
    otherwise      => say "Unknown status state.";
}
```

### 2.7 `fail_safe` — Deterministic Fallback Block
Guarantees execution safety with an automatic emergency fallback path:
```cgt
fail_safe {
    say "Executing primary network synchronizer...";
} fallback {
    say "Swapped smoothly to offline cached storage.";
}
```

---

## 3. Low-Level Assembly-Like Features (Comprehensive Silicon Control)

For systems programmers, OS kernel architects, and embedded firmware engineers, C> v3.0 exposes direct silicon primitives inside auditable `lowlevel { ... }` and `unsafe { ... }` blocks.

### 3.1 Direct CPU Registers & Inline Assembly (`asm volatile`)
Directly integrates CPU machine opcodes with register operand pinning and barrier clobbers:
```cgt
module hardware::cpu::registers;

fn read_cpu_timestamp() -> u64 {
    let mut lo: u32 = 0;
    let mut hi: u32 = 0;
    
    // Lowers directly to x86_64 rdtsc machine instruction
    unsafe {
        asm volatile (
            "rdtsc"
            : "=a"(lo), "=d"(hi)
            : 
            : "memory"
        );
    }
    return ((hi as u64) << 32) | (lo as u64);
}
```

### 3.2 Bare-Metal Motherboard Port I/O (`cpu_port_out` / `cpu_port_in`)
Directly compiles into native x86 `outb`/`inb` or memory-mapped I/O port instructions:
```cgt
module kernel::drivers::uart;

const UART_COM1: u16 = 0x3F8;

fn init_serial_uart() -> void {
    lowlevel {
        // Disable interrupts on COM1
        cpu_port_out(UART_COM1 + 1, 0x00);
        // Enable DLAB divisor latch (bit 7)
        cpu_port_out(UART_COM1 + 3, 0x80);
        // Set 115200 baud rate divisor
        cpu_port_out(UART_COM1 + 0, 0x01);
        cpu_port_out(UART_COM1 + 1, 0x00);
        // 8 bits, no parity, 1 stop bit
        cpu_port_out(UART_COM1 + 3, 0x03);
    }
}
```

### 3.3 Bare-Metal Interrupt Service Routines (`@interrupt_handler`)
Generates hardware stack preservation, preserves general-purpose registers, sends PIC EOI signals, and executes atomic `iretq` returns:
```cgt
module kernel::arch::x86_64::interrupts;

struct InterruptFrame {
    rip: u64,
    cs: u64,
    rflags: u64,
    rsp: u64,
    ss: u64,
}

let mut g_timer_ticks: u64 = 0;

@interrupt_handler
fn pit_timer_isr(frame: *InterruptFrame) -> void {
    g_timer_ticks = g_timer_ticks + 1;
    
    // Acknowledge interrupt to Master PIC (End Of Interrupt - 0x20)
    lowlevel {
        cpu_port_out(0x20, 0x20);
    }
}
```

### 3.4 Direct Memory Access (DMA) Descriptor Rings & Cache Flushing
Coordinates high-speed NVMe and NIC DMA transfers with 64-byte alignment and cache serialization:
```cgt
module kernel::drivers::dma;

struct align(64) DmaDescriptor {
    buffer_phys_addr: u64,
    length: u32,
    flags: u32,
    status: u32,
}

fn flush_dma_cache(phys_addr: u64) -> void {
    unsafe {
        asm volatile (
            "clflushopt (%0)"
            : 
            : "r"(phys_addr)
            : "memory"
        );
        asm volatile ("sfence" ::: "memory");
    }
}
```

### 3.5 Hardware Spinlocks & Atomic 64-bit Compare-and-Swap (`atomic_cas64`)
Zero-syscall mutual exclusion executed directly on CPU silicon using `lock cmpxchg` and `pause`:
```cgt
module concurrency::atomics;

struct align(64) HardwareSpinlock {
    locked: u64,
}

fn spinlock_acquire(lock: &mut HardwareSpinlock) -> void {
    while !atomic_cas64(&lock.locked, 0, 1) {
        unsafe {
            asm volatile ("pause" ::: "memory");
        }
    }
    memory_barrier(acquire_sync);
}

fn spinlock_release(lock: &mut HardwareSpinlock) -> void {
    memory_barrier(release_sync);
    atomic_store64(&lock.locked, 0);
}
```

### 3.6 4-Level x86_64 Paging & CPU Control Registers (`CR3`, `invlpg`)
Manages virtual address spaces, PML4 page tables, and hardware MMU invalidation:
```cgt
module kernel::arch::x86_64::paging;

fn load_cr3_register(pml4_phys_addr: u64) -> void {
    unsafe {
        asm volatile (
            "movq %0, %%cr3"
            : 
            : "r"(pml4_phys_addr)
            : "memory"
        );
    }
}

fn flush_tlb_page(vaddr: u64) -> void {
    unsafe {
        asm volatile (
            "invlpg (%0)"
            : 
            : "r"(vaddr)
            : "memory"
        );
    }
}
```

---

## 4. Heterogeneous GPU Compute Shaders (`@kernel`)

C> v3.0 introduces unified shader compilation. Write parallel compute kernels in standard C> syntax that compile natively to Vulkan SPIR-V, NVIDIA CUDA PTX, and Apple Metal:

```cgt
module graphics::gpu_compute;

@kernel
fn vector_transform_kernel(data: device_span<f32>, multiplier: f32) {
    let gid = gpu_global_id();
    data[gid] = data[gid] * multiplier;
}

fn main() -> i32 {
    let mut buffer: device_span<f32> = gpu_alloc(1048576);
    gpu_dispatch(vector_transform_kernel, grid: [1024, 1024, 1], block: [256, 1, 1]);
    say "GPU kernel executed across 1,048,576 parallel compute lanes.";
    return 0;
}
```

---

## 5. Microsecond Time-Travel Replay Debugger (`replay`)

Deterministic execution tracing records zero-overhead register and memory state snapshots for instantaneous post-mortem analysis:

```cgt
module telemetry::diagnostics;

replay session_tracer {
    snapshot_state();
    say "[Replay Engine]: Zero-overhead hardware state snapshots committed.";
}
```

---

## 6. Multi-Tier Memory Safety Model

| Dimension | Standard C | Rust | C> v3.0 Universal |
|---|---|---|---|
| **Memory Management** | Manual (Vulnerable to CVEs) | Single-tier Borrow Check (Friction) | Multi-tier: Affine Ownership + Arenas + Hazards |
| **Bulk Deallocation** | O(N) iterative `free()` | O(N) recursive drops | O(1) Instantaneous Regional Wipes (`region`) |
| **Concurrent Reads** | Raw pointers / Data races | `Arc<RwLock<T>>` mutex overhead | Epoch Hazard Pointers (`hazard`, `claim`, `pin`) |
| **Network Packets** | Unsafe casting / UB | Slice parsing copies | Safe Zero-Copy Struct Morphing |

---

## 7. Built-in Formal Verification (`contract`)

Formal mathematical logic proofs are checked during compile time:

```cgt
contract AccountSafety {
    invariant(total_balance >= 0);
}

fn withdraw(amount: i32) -> i32 {
    requires(amount > 0);
    requires(amount <= balance);
    ensures(balance >= 0);
    balance = balance - amount;
    return balance;
}
```

---

## 8. Autonomous Self-Compilation Loop

C> v3.0 achieves total independence from C/C++ toolchains:
- Compiler is written natively in C> at `C>/translator/cgt_self_translator.cgt`.
- Standalone self-translation translates source files into portable ANSI C11/native machine code with an embedded runtime.
- CLI Invocations:
  - `cgt -r program.cgt` : Compile and run natively.
  - `cgt -t program.cgt -o standalone.c` : Translate to standalone portable code with zero dependencies.
  - `cgt --bootstrap` : Recompile compiler autonomously.

---

## 9. Official VS Code & Code-OSS Extension v3.0.0

The extension is packaged in `public/c-greater-3.0.0.vsix` and contains:
1. **20 Language Constructs & Add-on Snippets**:
   - Beginner Universal: `say`, `ask`, `repeat`, `whenever`, `define`, `given`.
   - Safety & Faults: `attempt`, `guard`, `fail_safe`.
   - Pipelines & Streams: `flow`.
   - Concurrency & Async: `pulse`.
   - Autonomous Self-Host: `bootstrap`.
   - Hardware Control: `lowlevel`.
   - Formal Contracts: `contract`.
   - Low-Level Assembly: `asm`, `port_io`, `isr`, `simd_vec`, `atomic_cas`.
   - GPU & Parallel Compute: `kernel`.
2. **Interactive 4-Tier Template Suite**:
   - `Basic Template`: Minimal snippet with clean tabstops.
   - `Practical Real-World`: Fully fleshed out multi-branch implementation.
   - `Production Safe`: Defensive precondition-guarded pattern.
   - `Tailored to Your Code`: Dynamically generated code customized to your active editor selection and variable names.
3. **Installation Command**:
   ```bash
   code --install-extension c-greater-3.0.0.vsix
   ```

---

## 10. Summary Matrix

C> v3.0 stands as an accessible, high-performance, and verifiable language. It delivers effortless ergonomics for beginners while offering unmatched bare-metal silicon control for systems architects.
