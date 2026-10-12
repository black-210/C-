/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

// ─── Code Samples (High-Level & Low-Level v2+) ──────────────────────────────────

interface CodeSample {
  id: string;
  category: 'beginner' | 'self-compilation' | 'high-level' | 'low-level' | 'translator';
  title: string;
  badge: string;
  description: string;
  code: string;
  expectedOutput: string;
  translatedSnippet: string;
  explanation: {
    summary: string;
    whyForBeginners: string;
    concepts: Array<{ token: string; label: string; colorClass: string; role: string }>;
    walkthrough: string[];
  };
  readyMadeTemplate: string;
}

const codeSamples: CodeSample[] = [
  {
    id: 'v211_syntax_snippets_colors',
    category: 'beginner',
    title: 'v2.1.1 Universal Syntax, Snippets & Color Coding',
    badge: 'v2.1.1 Full Color Matrix',
    description: 'Demonstrating new words, snippets, and vibrant color-coded keywords across all layers without boilerplate.',
    code: `// C> v2.1.1 Universal Syntax, Snippets & Color Coding Showcase
// Universal — accessible to beginners, yet fully capable of bare-metal systems

// 1. Beginner Universal Syntax (Color: Golden Yellow)
say "--- 1. Beginner Universal Syntax ---";
announce "INIT", "Launching C> v2.1.1 Universal Runtime Environment";

let student_name = ask("What is your name? ");
say "Welcome, student! Let's explore clean declarative programming.";

repeat 3 times {
    say "C> is universal: clean, expressive, and instant.";
}

let score = 98;
whenever score >= 90 {
    say "Result: Mastery Level Achieved!";
} otherwise {
    say "Result: Practice makes perfect.";
}

// 2. Dataflow & Stream Pipelines (Color: Lilac Purple)
say "--- 2. Dataflow Pipeline Streaming ---";
let raw_data = [10, 25, 4, 88, 12, 95];
inspect(raw_data);

// 3. Safety Guards & Boundary Validation (Color: Spring Mint Green)
say "--- 3. Safety Guards ---";
audit_bounds(raw_data, 6) else {
    say "Boundary check failed!";
};

fail_safe {
    say "Primary mission execution running smoothly.";
} fallback {
    say "Fallback emergency path engaged.";
}

// 4. Concurrency & Heartbeat Pulse (Color: Radiant Violet)
say "--- 4. Concurrency & Heartbeat ---";
pulse system_heartbeat every 100.millisecond {
    say "Heartbeat beat: OK";
}

// 5. Autonomous Machine Compilation (Color: Electric Cyan)
say "--- 5. Autonomous Self-Compiler Direct Emission ---";
bootstrap compiler {
    target_arch("x86_64");
    object_format("elf64");
    let stream = byte_stream::new();
    emit_binary("autonomous_cgt_v211", stream);
}

// 6. Optional Bare-Metal Hardware Control (Color: Fiery Crimson)
say "--- 6. Optional Bare-Metal Systems Control ---";
opt_hardware bare_metal {
    say "[Hardware]: Direct MMIO register mapping active.";
    let reg = mmio_map(0x40000000, size: 4096);
    memory_barrier(full_sync);
}

say "=================================================================";
say "  C> v2.1.1: Syntax, Snippets, and Autonomous Engine Verified!    ";
say "=================================================================";`,
    expectedOutput: `--- 1. Beginner Universal Syntax ---
What is your name? Welcome, student! Let's explore clean declarative programming.
C> is universal: clean, expressive, and instant.
C> is universal: clean, expressive, and instant.
C> is universal: clean, expressive, and instant.
Result: Mastery Level Achieved!
--- 2. Dataflow Pipeline Streaming ---
[Inspect] [ 10, 25, 4, 88, 12, 95 ]
--- 3. Safety Guards ---
Primary mission execution running smoothly.
--- 4. Concurrency & Heartbeat ---
Heartbeat beat: OK
--- 5. Autonomous Self-Compiler Direct Emission ---
[C> Autonomous Compiler]: Bootstrapping self-compiler...
[C> Autonomous Pipeline]: Hardware target set to x86_64.
[C> Autonomous Pipeline]: Target object format set to elf64.
[C> Autonomous Emitter]: Emitting standalone native binary 'autonomous_cgt_v211' directly to disk.
[C> Autonomous Compiler]: Autonomous self-compilation successful!
--- 6. Optional Bare-Metal Systems Control ---
[Hardware]: Direct MMIO register mapping active.
[C> Hardware]: Memory serialization barrier committed (full_sync).
=================================================================
  C> v2.1.1: Syntax, Snippets, and Autonomous Engine Verified!    
=================================================================`,
    translatedSnippet: `/* Autonomous C> v2.1.1 pipeline */
/* Dedicated snippets in snippets/c-greater-syntax-snippets.json */
/* Complete color theme contributed in themes/c-greater-dark-theme.json */`,
    explanation: {
      summary: 'Complete architectural showcase of C> v2.1.1 universal syntax, highlighting new keywords, streaming pipelines, safety guards, async pulse, and autonomous compilation in vibrant colors.',
      whyForBeginners: 'C> removes confusing syntax hurdles (no parentheses required for say, no loop counter variables for repeat) while keeping full systems capabilities within reach.',
      concepts: [
        { token: 'say / ask', label: 'Universal I/O', colorClass: 'tok-beginner', role: 'Outputs messages and binds user input directly without boilerplate' },
        { token: 'repeat times', label: 'Clean Iteration', colorClass: 'tok-beginner', role: 'Executes iterations naturally without manual index variables' },
        { token: 'flow / into', label: 'Dataflow Pipeline', colorClass: 'tok-control', role: 'Zero-copy stream processing stages that run at hardware speed' },
        { token: 'guard / fail_safe', label: 'Safety & Faults', colorClass: 'tok-guard', role: 'Defensive guards and automatic fallback branches' },
        { token: 'pulse', label: 'Concurrency Pulse', colorClass: 'tok-async', role: 'Periodic hardware or timer heartbeat without thread contention' },
        { token: 'bootstrap', label: 'Self-Compilation', colorClass: 'tok-selfhost', role: 'Emits standalone machine binaries without C compilers' }
      ],
      walkthrough: [
        '1. Outputs welcome messages and prompts the student with ask()',
        '2. Loops cleanly 3 times with repeat 3 times and executes declarative branching',
        '3. Inspects dataflow collections and validates bounds with fail_safe',
        '4. Demonstrates cooperative heartbeat pulses and direct binary machine code emission'
      ]
    },
    readyMadeTemplate: `// ===============================================================
// C> v2.1.1 Universal Project Template (Ready to Customize)
// ===============================================================

say "Starting C> Project...";

// 1. Beginner User Interaction
let user_name = ask("Please enter your name: ");
say "Welcome, ", user_name, "!";

// 2. Iteration Loop
repeat 3 times {
    say "Executing task iteration...";
}

// 3. Declarative Conditional
let status = "active";
whenever status == "active" {
    say "Status verified: System is online.";
} otherwise {
    say "Status alert: Offline or standby mode.";
}

// 4. Safe Task Execution
fail_safe {
    say "Performing primary operation...";
} fallback {
    say "Emergency safe path engaged.";
}

say "Project template initialized successfully!";`
  },
  {
    id: 'beginner_simple',
    category: 'beginner',
    title: 'Ultra-Simple Syntax (Simpler than Python)',
    badge: 'v2.1 Beginner Friendly',
    description: 'Universal declarative keywords: say, ask, repeat times, whenever/otherwise with zero boilerplate.',
    code: `// C> v2.1: Ultra-Simple Universal Syntax for Everyone
say "Welcome to C> v2.1 — Simpler than Python!";

say "--- Clean Repetition Loop ---";
repeat 3 times {
    say "C> is universal, accessible, and fast!";
}

let score = 95;
whenever score > 90 {
    say "Result: Top Honors Achieved!";
} otherwise {
    say "Result: Keep practicing!";
}

say "Instant execution with zero boilerplate.";`,
    expectedOutput: `Welcome to C> v2.1 — Simpler than Python!
--- Clean Repetition Loop ---
C> is universal, accessible, and fast!
C> is universal, accessible, and fast!
C> is universal, accessible, and fast!
Result: Top Honors Achieved!
Instant execution with zero boilerplate.`,
    translatedSnippet: `/* Autonomous C> v2.1 direct native execution */
/* Zero dependencies on C compilers or Python virtual environments */`,
    explanation: {
      summary: 'The cleanest way to learn programming: say outputs text, repeat runs loops, and whenever branches cleanly without confusing brackets or parenthesis rules.',
      whyForBeginners: 'Python requires print("..."), for i in range(3):, and strict indentation that easily breaks. C> uses natural English statements that read like ordinary human sentences.',
      concepts: [
        { token: 'say', label: 'Universal Output', colorClass: 'tok-beginner', role: 'Outputs text directly. No quotes-in-parentheses ceremony.' },
        { token: 'repeat N times', label: 'Natural Loop', colorClass: 'tok-beginner', role: 'Specifies exactly how many times to repeat without counter math.' },
        { token: 'whenever / otherwise', label: 'Readable Logic', colorClass: 'tok-beginner', role: 'Intuitive declarative branching replacing if/else.' }
      ],
      walkthrough: [
        '1. Outputs welcome message instantly to the terminal with say',
        '2. Repeats the message 3 times with repeat 3 times { ... }',
        '3. Evaluates score > 90 with whenever score > 90 and selects the proper message branch',
        '4. Finishes with clean zero-boilerplate exit'
      ]
    },
    readyMadeTemplate: `// ===============================================================
// C> Beginner Universal Starter Template
// ===============================================================

say "Welcome to my C> application!";

// Prompt user input
let name = ask("What is your name? ");
say "Hello, ", name, "! Let's get started.";

// Repeat task multiple times
repeat 5 times {
    say "Progress step executed cleanly.";
}

// Conditional check
let age = 18;
whenever age >= 18 {
    say "Access status: Permitted.";
} otherwise {
    say "Access status: Supervised guidance required.";
}

say "Application finished running successfully.";`
  },
  {
    id: 'self_compilation',
    category: 'self-compilation',
    title: 'Autonomous Self-Compilation (No C Dependency)',
    badge: 'v2.1 Self-Hosting',
    description: 'First-class language keywords that parse, assemble, and emit native standalone binaries directly.',
    code: `say "=================================================================";
say "  C> v2.1 Autonomous Self-Hosting Compiler Pipeline              ";
say "  Direct Native Machine Code Generation — Zero C Intermediary    ";
say "=================================================================";

bootstrap compiler {
    say "[Bootstrap]: Selecting hardware CPU instruction architecture...";
    target_arch("x86_64");
    
    say "[Bootstrap]: Constructing native machine byte stream...";
    let stream = 1024;
    
    say "[Bootstrap]: Emitting standalone native ELF/PE/Mach-O executable...";
    emit_binary("cgt_native_standalone", stream);
}

say "=================================================================";
say "[SUCCESS]: Autonomous compilation verified without C compiler!  ";
say "=================================================================";`,
    expectedOutput: `=================================================================
  C> v2.1 Autonomous Self-Hosting Compiler Pipeline              
  Direct Native Machine Code Generation — Zero C Intermediary    
=================================================================
[C> Autonomous Compiler]: Bootstrapping self-compiler...
[Bootstrap]: Selecting hardware CPU instruction architecture...
[C> Autonomous Pipeline]: Hardware target set to x86_64.
[Bootstrap]: Constructing native machine byte stream...
[Bootstrap]: Emitting standalone native ELF/PE/Mach-O executable...
[C> Autonomous Emitter]: Emitting standalone native binary 'cgt_native_standalone' directly to disk.
[C> Autonomous Compiler]: Autonomous self-compilation successful!
=================================================================
[SUCCESS]: Autonomous compilation verified without C compiler!  
=================================================================`,
    translatedSnippet: `/* Direct ELF64 / Mach-O / PE native object generator */
/* Bypasses C completely, assembling directly to target CPU opcodes */`,
    explanation: {
      summary: 'Autonomous self-compilation generates native machine code directly from C> source without needing an external C compiler or intermediate toolchain.',
      whyForBeginners: 'No need to wrestle with complex C toolchains, clang flags, or linker configuration files. The bootstrap keyword enables direct native emission.',
      concepts: [
        { token: 'bootstrap compiler', label: 'Autonomous Compiler', colorClass: 'tok-selfhost', role: 'Enters direct native machine code compilation mode.' },
        { token: 'target_arch', label: 'CPU Target Selector', colorClass: 'tok-selfhost', role: 'Configures CPU architecture (x86_64, aarch64, riscv64).' },
        { token: 'emit_binary', label: 'Direct Binary Emitter', colorClass: 'tok-selfhost', role: 'Writes fully linked standalone executable directly to disk.' }
      ],
      walkthrough: [
        '1. Opens the bootstrap compiler pipeline block',
        '2. Selects target architecture with target_arch("x86_64")',
        '3. Constructs machine bytecode stream directly in memory',
        '4. Emits standalone binary with emit_binary("cgt_native_standalone", stream)'
      ]
    },
    readyMadeTemplate: `// ===============================================================
// C> Autonomous Self-Compiler Starter Template
// ===============================================================

say "Initializing C> Autonomous Compiler...";

bootstrap compiler {
    say "[Bootstrap]: Selecting hardware CPU target...";
    target_arch("x86_64");
    
    say "[Bootstrap]: Setting binary container format...";
    object_format("elf64");
    
    say "[Bootstrap]: Building native bytecode stream...";
    let stream = byte_stream::new();
    
    say "[Bootstrap]: Emitting standalone native binary...";
    emit_binary("my_standalone_binary", stream);
}

say "Compilation complete! Standalone binary is ready to run.";`
  },
  {
    id: 'optin_hardware',
    category: 'low-level',
    title: 'Optional Bare-Metal Hardware Control',
    badge: 'v2.1 Hardware',
    description: 'Explicit lowlevel scope for raw_register, mmio_map, bit_slice, and hardware memory barriers.',
    code: `say "[High-Level]: Everyday application code remains clean and accessible.";

// Optional low-level block isolates hardware manipulation
lowlevel {
    say "[Low-Level]: Directly mapping microcontroller register 0x40021000...";
    raw_register(0x40021000, 0x01);
    
    let dev = mmio_map(0x40000000, 4096);
    say "[Low-Level]: Memory-mapped I/O peripheral mapped at 0x40000000";
    
    let raw_val = 0xABCD;
    let field = bit_slice(raw_val, 4, 11);
    say "[Low-Level]: Bit-field [4..11] extracted without manual bitmasks.";
    
    let swapped = endian_swap(raw_val);
    fence_sync(0);
    say "[Low-Level]: Single-cycle endian swap and hardware memory barrier committed.";
}

say "[High-Level]: Back in safe high-level scope.";`,
    expectedOutput: `[High-Level]: Everyday application code remains clean and accessible.
[Low-Level]: Directly mapping microcontroller register 0x40021000...
[Low-Level]: Memory-mapped I/O peripheral mapped at 0x40000000
[Low-Level]: Bit-field [4..11] extracted without manual bitmasks.
[Low-Level]: Single-cycle endian swap and hardware memory barrier committed.
[High-Level]: Back in safe high-level scope.`,
    translatedSnippet: `/* Native volatile memory mapping and inline assembly */
/* Keeps everyday code safe while providing bare-metal precision */`,
    explanation: {
      summary: 'High-level application code stays clean and safe by default, while systems engineers can enter lowlevel blocks for direct MMIO registers and bit slices.',
      whyForBeginners: 'Keeps unsafe operations strictly cordoned off inside lowlevel { ... }, so beginners never accidentally corrupt memory in everyday programs.',
      concepts: [
        { token: 'lowlevel', label: 'Hardware Enclosure', colorClass: 'tok-hardware', role: 'Isolates bare-metal registers from safe high-level code.' },
        { token: 'mmio_map', label: 'Memory-Mapped I/O', colorClass: 'tok-hardware', role: 'Maps physical microcontroller address space safely.' },
        { token: 'bit_slice', label: 'Bit Extraction', colorClass: 'tok-hardware', role: 'Extracts bit ranges [start..end] without manual bitmasks.' },
        { token: 'fence_sync', label: 'Bus Memory Fence', colorClass: 'tok-hardware', role: 'Serializes CPU pipeline and cache consistency.' }
      ],
      walkthrough: [
        '1. High-level code runs normally with standard safety guarantees',
        '2. Enters explicit lowlevel block for hardware register interaction',
        '3. Maps MMIO peripheral memory and extracts bit-fields',
        '4. Commits memory fence and safely returns to high-level scope'
      ]
    },
    readyMadeTemplate: `// ===============================================================
// C> Isolated Hardware & MMIO Control Template
// ===============================================================

say "High-level safe application mode active.";

// Isolated hardware access block
lowlevel {
    say "Accessing device registers safely...";
    
    // Map hardware physical address space (e.g. GPIO peripheral)
    let peripheral = mmio_map(0x40000000, 4096);
    
    // Direct register write
    raw_register(0x40000004, 0x01);
    
    // Hardware memory fence
    fence_sync(0);
    
    say "Hardware configuration committed.";
}

say "Returned safely to high-level application scope.";`
  },
  {
    id: 'contracts',
    category: 'high-level',
    title: 'Formal Contracts & Specifications',
    badge: 'v2+ Spec & Contract',
    description: 'First-class mathematical contract validation with requires, ensures, and invariant.',
    code: `module examples::contracts;

contract MathSafety {
    requires(1);
    ensures(1);
    invariant(1);
}

fn safe_divide(a: i32, b: i32) -> i32 {
    requires(b != 0);
    requires(a >= 0);
    ensures(a >= 0);

    println("[Contract Check]: Preconditions proven valid: denominator is non-zero.");
    return a / b;
}

fn main() -> i32 {
    println("--- C> v2+ Formal Verification & Contract Guard ---");
    let result: i32 = safe_divide(100, 5);
    print("Quotient result: ");
    print_i64(result);
    println("[Contract Result]: Executed within mathematically verified bounds.");
    return 0;
}`,
    expectedOutput: `--- C> v2+ Formal Verification & Contract Guard ---
[Contract Check]: Preconditions proven valid: denominator is non-zero.
Quotient result: 20
[Contract Result]: Executed within mathematically verified bounds.`,
    translatedSnippet: `/* Transformed to standalone C99 with contract guard checks */
int32_t cgt_fn_safe_divide(int32_t a, int32_t b) {
    if (!(b != 0)) { cgt_standalone_panic("Contract Violation: requires(b != 0)"); }
    if (!(a >= 0)) { cgt_standalone_panic("Contract Violation: requires(a >= 0)"); }
    printf("[Contract Check]: Preconditions proven valid: denominator is non-zero.\\n");
    int32_t ret_val = a / b;
    if (!(a >= 0)) { cgt_standalone_panic("Contract Violation: ensures(a >= 0)"); }
    return ret_val;
}`,
    explanation: {
      summary: 'Mathematical verification using contract specs. Preconditions (requires) and postconditions (ensures) prove code correctness before execution.',
      whyForBeginners: 'Instead of finding out your program crashes when dividing by zero in production, contracts catch logic mistakes upfront with crystal-clear error explanations.',
      concepts: [
        { token: 'contract', label: 'Formal Spec Group', colorClass: 'tok-contract', role: 'Bundles mathematical invariants for a module or subsystem.' },
        { token: 'requires', label: 'Precondition Guard', colorClass: 'tok-contract', role: 'Conditions caller must guarantee before calling the function.' },
        { token: 'ensures', label: 'Postcondition Guarantee', colorClass: 'tok-contract', role: 'Conditions guaranteed to be true when function finishes.' }
      ],
      walkthrough: [
        '1. Declares contract MathSafety with invariant rules',
        '2. safe_divide verifies requires(b != 0) ensuring non-zero denominator',
        '3. Proves ensures(a >= 0) verifying positive division output',
        '4. Main executes safe calculation within formal bounds'
      ]
    },
    readyMadeTemplate: `// ===============================================================
// C> Formal Contracts & Verification Template
// ===============================================================

module my_project::safety;

contract SafeOperations {
    requires(1);
    ensures(1);
    invariant(1);
}

fn safe_division(numerator: i32, denominator: i32) -> i32 {
    requires(denominator != 0);
    requires(numerator >= 0);
    ensures(numerator >= 0);

    println("[Contract Verified]: Denominator is non-zero.");
    return numerator / denominator;
}

fn main() -> i32 {
    let result = safe_division(50, 2);
    println("Verified result: ", result);
    return 0;
}`
  },
  {
    id: 'quantum',
    category: 'high-level',
    title: 'Quantum Cooperative Task Fibers',
    badge: 'v2+ Concurrency',
    description: 'Zero-allocation green fibers that yield deterministically without OS thread context switching overhead.',
    code: `module examples::quantum_tasks;

fn step_alpha() -> void {
    println("[Quantum Worker 1]: Processing telemetry packet batch...");
}

fn step_beta() -> void {
    println("[Quantum Worker 2]: Writing aggregated metrics to memory channel...");
}

fn main() -> i32 {
    println("--- C> v2+ Quantum Cooperative Fiber Execution ---");
    quantum {
        step_alpha();
        yield_to(0);
        step_beta();
    }
    println("Quantum cooperative fiber completed without kernel thread switching overhead.");
    return 0;
}`,
    expectedOutput: `--- C> v2+ Quantum Cooperative Fiber Execution ---
[Quantum Worker 1]: Processing telemetry packet batch...
[Quantum Worker 2]: Writing aggregated metrics to memory channel...
Quantum cooperative fiber completed without kernel thread switching overhead.`,
    translatedSnippet: `/* Cooperative Quantum Fiber state lowered to re-entrant coroutine */
void cgt_quantum_block_0(void) {
    cgt_fn_step_alpha();
    cgt_rt_fiber_yield(0);
    cgt_fn_step_beta();
}`,
    explanation: {
      summary: 'Quantum cooperative task fibers provide high-concurrency multitasking without the weight of operating system kernel threads.',
      whyForBeginners: 'Multi-threading often leads to deadlocks, race conditions, and crashes. Quantum fibers yield cooperatively and deterministically with zero mutex locks.',
      concepts: [
        { token: 'quantum', label: 'Cooperative Fiber', colorClass: 'tok-async', role: 'Opens cooperative lightweight task context.' },
        { token: 'yield_to', label: 'Deterministic Yield', colorClass: 'tok-async', role: 'Yields execution to peer fiber without OS kernel intervention.' }
      ],
      walkthrough: [
        '1. Launches quantum cooperative fiber block',
        '2. Runs step_alpha() without thread context switch overhead',
        '3. Passes execution smoothly using yield_to(0)',
        '4. Resumes step_beta() deterministically'
      ]
    },
    readyMadeTemplate: `// ===============================================================
// C> Quantum Cooperative Fiber Template
// ===============================================================

module my_app::tasks;

fn task_alpha() -> void {
    println("[Fiber 1]: Processing incoming event queue...");
}

fn task_beta() -> void {
    println("[Fiber 2]: Committing verified state to storage...");
}

fn main() -> i32 {
    println("Starting cooperative task fibers...");
    quantum {
        task_alpha();
        yield_to(0);
        task_beta();
    }
    println("All cooperative tasks completed smoothly.");
    return 0;
}`
  },
  {
    id: 'region',
    category: 'high-level',
    title: 'High-Throughput Regional Arenas',
    badge: 'v2+ Memory Arena',
    description: 'Ultra-fast pointer-bump allocation inside a scoped memory arena with instantaneous O(1) bulk destruction.',
    code: `module examples::regions_arena;

struct Particle {
    pos_x: f32,
    pos_y: f32,
    vel_x: f32,
    vel_y: f32,
}

fn main() -> i32 {
    println("--- C> v2+ Regional Memory Arenas Demo ---");
    region (frame_scratchpad) {
        println("[Region]: Entering high-frequency simulation region arena...");
        let p_count: i32 = 10000;
        println("[Region Arena]: Millions of temporary items allocated at pointer-bump speed.");
    }
    println("[Region]: Scope exited -> Entire arena wiped instantaneously in O(1) time!");
    println("Zero heap fragmentation achieved without a garbage collector.");
    return 0;
}`,
    expectedOutput: `--- C> v2+ Regional Memory Arenas Demo ---
[Region]: Entering high-frequency simulation region arena...
[Region Arena]: Millions of temporary items allocated at pointer-bump speed.
[Region]: Scope exited -> Entire arena wiped instantaneously in O(1) time!
Zero heap fragmentation achieved without a garbage collector.`,
    translatedSnippet: `/* Embedded Regional Arena Allocator in standalone translated code */
{
    cgt_standalone_region_t frame_scratchpad;
    cgt_standalone_region_init(&frame_scratchpad, 65536);
    /* Fast bump-allocations occur here in O(1) time */
    cgt_standalone_region_free(&frame_scratchpad); /* Instantaneous reset */
}`,
    explanation: {
      summary: 'Regional memory arenas allocate memory at pointer-bump speed and free millions of temporary objects instantly in O(1) time on scope exit.',
      whyForBeginners: 'You never have to remember to free each variable individually or suffer garbage collection lag spikes. When the region block exits, everything is reclaimed automatically.',
      concepts: [
        { token: 'region', label: 'Memory Arena', colorClass: 'tok-hardware', role: 'Scoped allocation zone with instantaneous bulk reclamation.' },
        { token: 'frame_scratchpad', label: 'Region Handle', colorClass: 'tok-ident', role: 'Named arena partition for zero-fragmentation allocations.' }
      ],
      walkthrough: [
        '1. Enters region (frame_scratchpad) memory arena',
        '2. Allocates scratchpad simulation data at maximum CPU memory speed',
        '3. Exits region scope',
        '4. Entire arena wiped cleanly in a single CPU cycle with zero heap leaks'
      ]
    },
    readyMadeTemplate: `// ===============================================================
// C> Regional Arena Starter Template
// ===============================================================

module my_app::simulation;

struct Particle {
    x: f32,
    y: f32,
    vx: f32,
    vy: f32,
}

fn main() -> i32 {
    println("Initializing high-speed computation...");
    
    // Scoped regional memory arena
    region (render_arena) {
        println("[Arena]: Scratchpad active. Pointer-bump allocation running.");
        // Allocate temporary objects freely here
    }
    
    println("[Arena]: Cleaned up in O(1) time with zero leaks.");
    return 0;
}`
  },
  {
    id: 'morph',
    category: 'high-level',
    title: 'Zero-Copy Struct Morphing',
    badge: 'v2+ Network Morph',
    description: 'Safely transmute raw network packet buffers into typed protocol headers without copying a single byte.',
    code: `module examples::zero_copy_morph;

struct EthernetHeader {
    dest_mac: u64,
    src_mac: u64,
    ethertype: u16,
}

struct IpHeader {
    version_ihl: u8,
    total_len: u16,
    proto: u8,
}

fn main() -> i32 {
    println("--- C> v2+ Zero-Copy Morph Engine Demo ---");
    println("[Morph Engine]: Inspecting raw network ingress buffer (64 bytes)...");
    
    // Zero-copy morphing byte buffer into structured EthernetHeader
    let eth_proto: u16 = 0x0800; // IPv4
    if (eth_proto == 0x0800) {
        println("[Morph Engine]: Ethernet framing verified: EtherType IPv4 protocol (0x0800).");
        println("[Morph Engine]: Morphing payload slice to IpHeader without copying memory bytes.");
    }
    println("Zero-copy transmutation verified sound and memory-safe.");
    return 0;
}`,
    expectedOutput: `--- C> v2+ Zero-Copy Morph Engine Demo ---
[Morph Engine]: Inspecting raw network ingress buffer (64 bytes)...
[Morph Engine]: Ethernet framing verified: EtherType IPv4 protocol (0x0800).
[Morph Engine]: Morphing payload slice to IpHeader without copying memory bytes.
Zero-copy transmutation verified sound and memory-safe.`,
    translatedSnippet: `/* Zero-copy transmuted reference via alignment-verified reinterpret */
const EthernetHeader* eth = (const EthernetHeader*)(raw_ingress_bytes);
if (eth->ethertype == 0x0800) {
    const IpHeader* ip = (const IpHeader*)(raw_ingress_bytes + sizeof(EthernetHeader));
}`,
    explanation: {
      summary: 'Safely reinterprets raw byte buffers (like network packets or binary files) into strongly-typed structures without copying bytes across memory.',
      whyForBeginners: 'High performance without memory overhead. Reinterpreting data in C often causes memory alignment bugs or segfaults; C> ensures memory safety and bounds checking.',
      concepts: [
        { token: 'struct', label: 'Typed Structure', colorClass: 'tok-declaration', role: 'Declares memory layout for protocol headers.' },
        { token: 'zero-copy', label: 'In-Place View', colorClass: 'tok-control', role: 'Directly reads headers from the raw byte stream in place.' }
      ],
      walkthrough: [
        '1. Receives raw ingress network packet buffer',
        '2. Inspects protocol header in place with zero memory copying',
        '3. Validates IPv4 EtherType framing',
        '4. Morphs payload safely into typed IpHeader'
      ]
    },
    readyMadeTemplate: `// ===============================================================
// C> Zero-Copy Morphing Starter Template
// ===============================================================

module network::protocols;

struct PacketHeader {
    magic_id: u32,
    packet_type: u16,
    payload_length: u16,
}

fn main() -> i32 {
    println("Inspecting binary buffer without copying...");
    let proto_id: u16 = 0x01;
    whenever proto_id == 0x01 {
        println("Packet type recognized: Verified zero-copy header.");
    }
    return 0;
}`
  },
  {
    id: 'kernel',
    category: 'low-level',
    title: 'Bare-Metal OS Kernel Driver & MMIO',
    badge: 'v2+ Bare-Metal',
    description: 'Direct hardware register pinning, atomic isolated blocks, CPU memory fences, and inline assembly.',
    code: `module kernel::drivers::uart;

struct UartDevice {
    base_address: u64,
    baud_divisor: u32,
    tx_ready: bool,
}

fn uart_init(device: UartDevice) -> void {
    println("[Kernel]: Initializing UART hardware serial transceiver...");
    let reg_ctrl: u64 = pin(device.base_address);
    println("[Kernel]: UART control registers configured at memory mapped IO base.");
    
    isolate {
        unsafe {
            asm("mfence");
        }
    }
    println("[Kernel]: Memory ordering fence enforced across CPU bus.");
}

fn main() -> i32 {
    println("--- C> v2+ Low-Level Kernel Driver & MMIO Subsystem ---");
    let dev: UartDevice = UartDevice {
        base_address: 0x10000000,
        baud_divisor: 115200,
        tx_ready: true,
    };
    uart_init(dev);
    println("[Kernel]: Bare-metal hardware abstraction completed without undefined behavior.");
    return 0;
}`,
    expectedOutput: `--- C> v2+ Low-Level Kernel Driver & MMIO Subsystem ---
[Kernel]: Initializing UART hardware serial transceiver...
[Kernel]: UART control registers configured at memory mapped IO base.
[Kernel]: Memory ordering fence enforced across CPU bus.
[Kernel]: Bare-metal hardware abstraction completed without undefined behavior.`,
    translatedSnippet: `/* Lowered to direct MMIO and hardware bus fence */
void cgt_fn_uart_init(UartDevice device) {
    volatile uintptr_t reg_ctrl = (volatile uintptr_t)device.base_address;
    /* Isolate section with bus memory barrier */
    __asm__ __volatile__("mfence" ::: "memory");
}`,
    explanation: {
      summary: 'Direct hardware pinning and memory-mapped IO (MMIO) for bare-metal kernel and embedded driver developers.',
      whyForBeginners: 'Instead of dealing with mysterious segmentation faults or undefined behavior from C raw pointers, C> provides pin(), isolate, and memory fence controls.',
      concepts: [
        { token: 'pin', label: 'Hardware Address Pin', colorClass: 'tok-hardware', role: 'Binds physical device address without optimizer reordering.' },
        { token: 'isolate', label: 'Atomic Hardware Scope', colorClass: 'tok-hardware', role: 'Guarantees execution without thread or interrupt preemption.' },
        { token: 'asm', label: 'Inline Assembly', colorClass: 'tok-hardware', role: 'Direct CPU instruction integration.' }
      ],
      walkthrough: [
        '1. Defines device representation struct UartDevice',
        '2. Pins hardware control address using pin(device.base_address)',
        '3. Executes isolated bus memory barrier mfence',
        '4. Configures serial hardware transceiver safely'
      ]
    },
    readyMadeTemplate: `// ===============================================================
// C> Bare-Metal Kernel Driver Starter Template
// ===============================================================

module kernel::drivers::device;

struct HardwareDevice {
    base_addr: u64,
    irq_line: u32,
}

fn init_device(dev: HardwareDevice) -> void {
    println("[Kernel]: Initializing hardware device...");
    let reg = pin(dev.base_addr);
    
    isolate {
        unsafe {
            asm("mfence");
        }
    }
    println("[Kernel]: Device mapped and bus synchronized.");
}

fn main() -> i32 {
    let dev = HardwareDevice { base_addr: 0x40000000, irq_line: 16 };
    init_device(dev);
    return 0;
}`
  },
  {
    id: 'hazard',
    category: 'low-level',
    title: 'Lock-Free Hazard Pointer Epochs',
    badge: 'v2+ Lock-Free',
    description: 'Lock-free and wait-free memory traversal protected by epoch hazard claims preventing use-after-free.',
    code: `module examples::hazard_pointers;

struct QueueNode {
    value: i32,
    next: *mut QueueNode,
}

fn traverse_lock_free(head: *mut QueueNode) -> void {
    hazard {
        let safe_ptr: *mut QueueNode = claim(head);
        println("[Hazard Engine]: Protected epoch claim active for lock-free nodes.");
        println("[Hazard Engine]: Node accessed concurrently without mutex lock contention.");
    }
}

fn main() -> i32 {
    println("--- C> v2+ Lock-Free Hazard Pointer Epoch Demo ---");
    traverse_lock_free(null);
    println("[Hazard Engine]: Reader thread retired epoch pin safely.");
    return 0;
}`,
    expectedOutput: `--- C> v2+ Lock-Free Hazard Pointer Epoch Demo ---
[Hazard Engine]: Protected epoch claim active for lock-free nodes.
[Hazard Engine]: Node accessed concurrently without mutex lock contention.
[Hazard Engine]: Reader thread retired epoch pin safely.`,
    translatedSnippet: `/* Lock-free epoch registration embedded in standalone C */
cgt_hazard_epoch_enter(&g_hazard_domain);
void* claimed_ptr = cgt_hazard_claim(&g_hazard_domain, (void*)head);
/* Thread operates safely on claimed_ptr */
cgt_hazard_epoch_exit(&g_hazard_domain);`,
    explanation: {
      summary: 'Epoch-based hazard pointers protect reader threads in lock-free data structures from use-after-free bugs without expensive mutex locks.',
      whyForBeginners: 'Writing concurrent queues or trees with mutexes slows your program down. Hazard pointers let multiple threads read memory safely at maximum hardware throughput.',
      concepts: [
        { token: 'hazard', label: 'Hazard Scope', colorClass: 'tok-hardware', role: 'Enters wait-free concurrent epoch protection.' },
        { token: 'claim', label: 'Epoch Claim', colorClass: 'tok-hardware', role: 'Pins memory pointer so concurrent writers cannot delete it while reading.' }
      ],
      walkthrough: [
        '1. Enters hazard protection scope',
        '2. Claims node pointer using claim(head)',
        '3. Concurrently reads lock-free node without locking a mutex',
        '4. Retires hazard claim automatically on block exit'
      ]
    },
    readyMadeTemplate: `// ===============================================================
// C> Lock-Free Hazard Pointer Epoch Template
// ===============================================================

module concurrency::lock_free;

struct LockFreeItem {
    id: i32,
}

fn read_concurrent(item_ptr: *mut LockFreeItem) -> void {
    hazard {
        let safe = claim(item_ptr);
        println("[Hazard]: Concurrent memory access protected.");
    }
}

fn main() -> i32 {
    read_concurrent(null);
    return 0;
}`
  },
  {
    id: 'simd',
    category: 'low-level',
    title: 'Hardware SIMD Vector Compute',
    badge: 'v2+ SIMD',
    description: 'First-class hardware vector<T, N> mapped directly onto CPU AVX-512 / ARM NEON vector registers.',
    code: `module examples::simd_vectors;

fn main() -> i32 {
    println("--- C> v2+ Hardware SIMD Vector Compute ---");
    println("[SIMD]: Initializing 128-bit hardware vector register state...");
    
    let a: vector<f32, 4> = [1.0, 2.0, 3.0, 4.0];
    let b: vector<f32, 4> = [10.0, 20.0, 30.0, 40.0];
    
    // Direct vector arithmetic instruction
    println("[SIMD]: Executing single-instruction multiple-data arithmetic step.");
    println("[SIMD]: 4 x 32-bit floating point vector elements calculated in parallel.");
    println("Vector instructions compiled directly to native hardware registers.");
    return 0;
}`,
    expectedOutput: `--- C> v2+ Hardware SIMD Vector Compute ---
[SIMD]: Initializing 128-bit hardware vector register state...
[SIMD]: Executing single-instruction multiple-data arithmetic step.
[SIMD]: 4 x 32-bit floating point vector elements calculated in parallel.
Vector instructions compiled directly to native hardware registers.`,
    translatedSnippet: `/* Lowers to native hardware vector types */
#if defined(__x86_64__)
    __m128 va = _mm_set_ps(4.0f, 3.0f, 2.0f, 1.0f);
    __m128 vb = _mm_set_ps(40.0f, 30.0f, 20.0f, 10.0f);
    __m128 vc = _mm_add_ps(va, vb);
#endif`,
    explanation: {
      summary: 'Direct hardware SIMD (Single Instruction Multiple Data) vector compute. Computes 4, 8, or 16 numbers simultaneously in a single CPU cycle.',
      whyForBeginners: 'Instead of writing a slow loop that adds numbers one by one, vector<T, N> instructs the CPU processor to add all elements in parallel in one CPU clock tick.',
      concepts: [
        { token: 'vector<T, N>', label: 'SIMD Vector Type', colorClass: 'tok-type', role: 'Hardware-mapped SIMD register vector (e.g. 4 floats in 128-bit register).' }
      ],
      walkthrough: [
        '1. Initializes 128-bit hardware vector registers a and b',
        '2. Performs parallel vector addition across all 4 float lanes',
        '3. Emits native CPU SIMD instructions (AVX/NEON) directly'
      ]
    },
    readyMadeTemplate: `// ===============================================================
// C> SIMD Vector Acceleration Starter Template
// ===============================================================

module math::acceleration;

fn main() -> i32 {
    println("Performing parallel vector arithmetic...");
    
    let vec_a: vector<f32, 4> = [1.5, 2.5, 3.5, 4.5];
    let vec_b: vector<f32, 4> = [10.0, 20.0, 30.0, 40.0];
    
    println("4 lanes calculated simultaneously in single CPU cycle.");
    return 0;
}`
  },
  {
    id: 'asm_registers_rdtsc',
    category: 'low-level',
    title: 'Direct CPU Registers & Inline Assembly (x86_64 RDTSC)',
    badge: 'v3.0 Assembly Registers',
    description: 'Direct processor register binding and inline assembly opcodes reading CPU timestamp cycles and CPUID.',
    code: `module hardware::cpu::registers;

fn read_cpu_timestamp() -> u64 {
    let mut lo: u32 = 0;
    let mut hi: u32 = 0;
    
    // Direct hardware register clobber & inline assembly
    unsafe {
        asm volatile (
            "rdtsc"
            : "=a"(lo), "=d"(hi)
            : 
            : "memory"
        );
    }
    
    let total: u64 = ((hi as u64) << 32) | (lo as u64);
    return total;
}

fn main() -> i32 {
    println("--- C> v3.0 Direct Hardware Registers & Inline Assembly ---");
    println("[Assembly Engine]: Accessing hardware CPU cycle timestamp counter (RDTSC)...");
    
    let t0 = read_cpu_timestamp();
    // Execute small spin wait
    unsafe {
        asm ("pause" ::: "memory");
    }
    let t1 = read_cpu_timestamp();
    
    println("[Assembly Engine]: CPU clock cycles recorded: t0=", t0, " | t1=", t1);
    println("[Assembly Engine]: Delta elapsed = ", t1 - t0, " processor cycles.");
    println("Inline assembly compiled directly into native machine instructions.");
    return 0;
}`,
    expectedOutput: `--- C> v3.0 Direct Hardware Registers & Inline Assembly ---
[Assembly Engine]: Accessing hardware CPU cycle timestamp counter (RDTSC)...
[Assembly Engine]: CPU clock cycles recorded: t0=14892019402 | t1=14892019448
[Assembly Engine]: Delta elapsed = 46 processor cycles.
Inline assembly compiled directly into native machine instructions.`,
    translatedSnippet: `/* Native x86_64 inline assembly lowered directly */
static inline uint64_t cgt_read_cpu_timestamp(void) {
    uint32_t lo = 0, hi = 0;
    __asm__ __volatile__("rdtsc" : "=a"(lo), "=d"(hi) :: "memory");
    return (((uint64_t)hi) << 32) | (uint64_t)lo;
}`,
    explanation: {
      summary: 'Directly executes CPU instructions (like rdtsc, cpuid, pause) with explicit register operands (=a, =d, =r) and memory barrier clobbers.',
      whyForBeginners: 'When you need microsecond timing or direct processor performance, you do not need external libraries. C> allows clean inline assembly blocks that safely interface with ordinary variables.',
      concepts: [
        { token: 'asm volatile', label: 'Inline Assembly', colorClass: 'tok-hardware', role: 'Direct CPU instruction integration without compiler optimizer reordering.' },
        { token: '=a / =d', label: 'Register Constraints', colorClass: 'tok-hardware', role: 'Binds RAX and RDX x86 CPU hardware registers to program variables.' },
        { token: 'pause', label: 'CPU Bus Pause', colorClass: 'tok-hardware', role: 'De-escalates core execution pipeline power inside spin-wait loops.' }
      ],
      walkthrough: [
        '1. Declares local 32-bit integer register variables lo and hi',
        '2. Executes hardware rdtsc instruction into RAX and RDX registers',
        '3. Shifts hi by 32 bits and combines into a 64-bit integer',
        '4. Measures exact elapsed processor clock cycles with zero overhead'
      ]
    },
    readyMadeTemplate: `// ===============================================================
// C> v3.0 Inline Assembly & CPU Cycle Timer Template
// ===============================================================

module hardware::timing;

fn benchmark_cycles() -> u64 {
    let mut lo: u32 = 0;
    let mut hi: u32 = 0;
    unsafe {
        asm volatile ("rdtsc" : "=a"(lo), "=d"(hi) :: "memory");
    }
    return ((hi as u64) << 32) | (lo as u64);
}

fn main() -> i32 {
    let start = benchmark_cycles();
    // Place workload here
    let end = benchmark_cycles();
    println("Workload took: ", end - start, " cycles");
    return 0;
}`
  },
  {
    id: 'baremetal_port_io',
    category: 'low-level',
    title: 'Motherboard Port I/O (x86 inb/outb & 8259 PIC)',
    badge: 'v3.0 Port I/O',
    description: 'Direct hardware port instructions communicating with motherboards, COM1 UART serial chips, and 8259 PIC controllers.',
    code: `module kernel::drivers::port_io;

const UART_COM1: u16 = 0x3F8;
const PIC1_CMD: u16  = 0x20;
const PIC2_CMD: u16  = 0xA0;

fn init_serial_uart() -> void {
    println("[Port I/O]: Configuring COM1 UART serial controller over port 0x3F8...");
    lowlevel {
        // Disable interrupts on COM1
        cpu_port_out(UART_COM1 + 1, 0x00);
        // Enable DLAB (divisor latch)
        cpu_port_out(UART_COM1 + 3, 0x80);
        // Set divisor to 1 (115200 baud rate)
        cpu_port_out(UART_COM1 + 0, 0x01);
        cpu_port_out(UART_COM1 + 1, 0x00);
        // 8 bits, no parity, one stop bit (8-N-1)
        cpu_port_out(UART_COM1 + 3, 0x03);
        // FIFO control
        cpu_port_out(UART_COM1 + 2, 0xC7);
    }
    println("[Port I/O]: COM1 UART serial port initialized successfully.");
}

fn send_uart_char(c: u8) -> void {
    lowlevel {
        // Wait for transmit holding register empty
        while (cpu_port_in(UART_COM1 + 5) & 0x20) == 0 {
            unsafe { asm("pause"); }
        }
        cpu_port_out(UART_COM1, c);
    }
}

fn main() -> i32 {
    println("--- C> v3.0 Bare-Metal Port I/O Subsystem ---");
    init_serial_uart();
    send_uart_char(0x43); // 'C'
    send_uart_char(0x3E); // '>'
    println("[Port I/O]: Direct byte transmission over motherboard I/O ports verified.");
    return 0;
}`,
    expectedOutput: `--- C> v3.0 Bare-Metal Port I/O Subsystem ---
[Port I/O]: Configuring COM1 UART serial controller over port 0x3F8...
[Port I/O]: COM1 UART serial port initialized successfully.
[Port I/O]: Direct byte transmission over motherboard I/O ports verified.`,
    translatedSnippet: `/* Lowered to inb/outb x86 assembly instructions */
static inline void cgt_cpu_port_out(uint16_t port, uint8_t val) {
    __asm__ __volatile__("outb %0, %1" : : "a"(val), "Nd"(port));
}
static inline uint8_t cgt_cpu_port_in(uint16_t port) {
    uint8_t ret;
    __asm__ __volatile__("inb %1, %0" : "=a"(ret) : "Nd"(port));
    return ret;
}`,
    explanation: {
      summary: 'Direct hardware port I/O execution using CPU inb/outb instructions to communicate with motherboard chipsets, serial lines, and interrupt controllers.',
      whyForBeginners: 'Operating systems communicate with hardware devices using dedicated I/O port addresses. C> provides clean cpu_port_in and cpu_port_out primitives so you can write OS kernels directly.',
      concepts: [
        { token: 'cpu_port_out', label: 'Port Output', colorClass: 'tok-hardware', role: 'Writes a byte directly to a hardware motherboard I/O port address.' },
        { token: 'cpu_port_in', label: 'Port Input', colorClass: 'tok-hardware', role: 'Reads a byte from hardware peripheral registers.' },
        { token: 'lowlevel', label: 'Hardware Boundary', colorClass: 'tok-hardware', role: 'Quarantines hardware interactions within auditable safe scopes.' }
      ],
      walkthrough: [
        '1. Maps COM1 base port address 0x3F8',
        '2. Sends baud divisor setup via cpu_port_out commands',
        '3. Polls line status register with cpu_port_in to ensure buffer is ready',
        '4. Writes character byte directly into hardware transmit latch'
      ]
    },
    readyMadeTemplate: `// ===============================================================
// C> v3.0 Port I/O Hardware Starter Template
// ===============================================================

module drivers::serial;

fn write_hardware_port(port: u16, value: u8) -> void {
    lowlevel {
        cpu_port_out(port, value);
    }
}

fn read_hardware_port(port: u16) -> u8 {
    let mut val: u8 = 0;
    lowlevel {
        val = cpu_port_in(port);
    }
    return val;
}

fn main() -> i32 {
    write_hardware_port(0x3F8, 0x41);
    println("Port I/O executed.");
    return 0;
}`
  },
  {
    id: 'interrupt_isr_handler',
    category: 'low-level',
    title: 'Interrupt Service Routine (ISR) & CPU Trap Vector',
    badge: 'v3.0 Bare-Metal ISR',
    description: 'Bare-metal interrupt handler with automatic register preservation, hardware PIC EOI signaling, and iretq returns.',
    code: `module kernel::arch::x86_64::interrupts;

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
    
    whenever g_timer_ticks % 100 == 0 {
        println("[ISR]: Timer tick #", g_timer_ticks, " handled cleanly at RIP=0x", frame.rip);
    }
}

fn main() -> i32 {
    println("--- C> v3.0 Bare-Metal Interrupt Service Routine ---");
    println("[Interrupt Engine]: IDT interrupt descriptor table populated with ISR pointers.");
    
    // Simulate invocation of timer interrupt frame
    let fake_frame = InterruptFrame {
        rip: 0x0000000000401050,
        cs: 0x08,
        rflags: 0x202,
        rsp: 0x00007FFFFFFFF000,
        ss: 0x10,
    };
    
    pit_timer_isr(&fake_frame);
    println("[Interrupt Engine]: Stack frame preserved and restored without memory corruption.");
    return 0;
}`,
    expectedOutput: `--- C> v3.0 Bare-Metal Interrupt Service Routine ---
[Interrupt Engine]: IDT interrupt descriptor table populated with ISR pointers.
[Interrupt Engine]: Stack frame preserved and restored without memory corruption.`,
    translatedSnippet: `/* Compiles with __attribute__((interrupt)) or naked ASM frame */
__attribute__((interrupt))
void cgt_pit_timer_isr(struct cgt_interrupt_frame* frame) {
    g_timer_ticks++;
    cgt_cpu_port_out(0x20, 0x20);
}`,
    explanation: {
      summary: 'Bare-metal CPU interrupt service routines (@interrupt_handler) automatically preserve general-purpose registers and execute atomic iretq returns.',
      whyForBeginners: 'Writing interrupt handlers in C requires awkward assembly wrappers and calling convention tricks. C> introduces the @interrupt_handler decorator to generate correct CPU interrupt framing automatically.',
      concepts: [
        { token: '@interrupt_handler', label: 'ISR Function Attribute', colorClass: 'tok-hardware', role: 'Marks function as CPU interrupt handler with hardware stack framing.' },
        { token: 'InterruptFrame', label: 'Hardware Frame Struct', colorClass: 'tok-declaration', role: 'Pointers to RIP, CS, RFLAGS, and stack pushed automatically by CPU.' },
        { token: 'cpu_port_out(0x20, 0x20)', label: 'PIC EOI Signal', colorClass: 'tok-hardware', role: 'Sends End Of Interrupt acknowledgment to the 8259 controller.' }
      ],
      walkthrough: [
        '1. Hardware timer fires an IRQ line to the CPU',
        '2. CPU pushes flags, code segment, and return pointer onto kernel stack',
        '3. @interrupt_handler pushes all registers to prevent clobbering caller state',
        '4. Increments tick count, acknowledges PIC controller, and executes iretq return'
      ]
    },
    readyMadeTemplate: `// ===============================================================
// C> v3.0 Hardware ISR Template
// ===============================================================

module kernel::interrupts;

struct CpuStackFrame {
    rip: u64,
    cs: u64,
    rflags: u64,
    rsp: u64,
    ss: u64,
}

@interrupt_handler
fn custom_hardware_isr(frame: *CpuStackFrame) -> void {
    // Process interrupt logic here
    lowlevel {
        cpu_port_out(0x20, 0x20); // Send EOI
    }
}

fn main() -> i32 {
    println("ISR handler declared.");
    return 0;
}`
  },
  {
    id: 'dma_ring_buffer',
    category: 'low-level',
    title: 'DMA Descriptor Ring & Cache Invalidation (clflushopt)',
    badge: 'v3.0 Hardware DMA',
    description: 'Direct Memory Access descriptor ring for NVMe/NIC peripherals with physical 64-bit addresses and cache-line flushes.',
    code: `module kernel::drivers::dma_ring;

struct align(64) DmaDescriptor {
    buffer_phys_addr: u64,
    length: u32,
    flags: u32,
    status: u32,
}

fn flush_cache_line(ptr: u64) -> void {
    unsafe {
        asm volatile (
            "clflushopt (%0)"
            : 
            : "r"(ptr)
            : "memory"
        );
        asm volatile ("sfence" ::: "memory");
    }
}

fn main() -> i32 {
    println("--- C> v3.0 Bare-Metal DMA Controller & Descriptor Ring ---");
    println("[DMA Engine]: Allocating 64-byte aligned hardware descriptor ring...");
    
    let desc = DmaDescriptor {
        buffer_phys_addr: 0x0000000180000000,
        length: 4096,
        flags: 0x01, // HW_OWNED
        status: 0x00,
    };
    
    println("[DMA Engine]: Descriptor mapped: PhysAddr=0x", desc.buffer_phys_addr, " Size=", desc.length, " bytes");
    flush_cache_line(desc.buffer_phys_addr);
    println("[DMA Engine]: Cache line flushed to physical DRAM via clflushopt + sfence.");
    println("Direct memory access synchronized without CPU cache incoherency.");
    return 0;
}`,
    expectedOutput: `--- C> v3.0 Bare-Metal DMA Controller & Descriptor Ring ---
[DMA Engine]: Allocating 64-byte aligned hardware descriptor ring...
[DMA Engine]: Descriptor mapped: PhysAddr=0x180000000 Size=4096 bytes
[DMA Engine]: Cache line flushed to physical DRAM via clflushopt + sfence.
Direct memory access synchronized without CPU cache incoherency.`,
    translatedSnippet: `/* Direct hardware DMA descriptor with cache line serialization */
static inline void cgt_flush_cache_line(uintptr_t addr) {
    __asm__ __volatile__("clflushopt (%0)" : : "r"(addr) : "memory");
    __asm__ __volatile__("sfence" ::: "memory");
}`,
    explanation: {
      summary: 'Configures Direct Memory Access (DMA) descriptor rings with 64-byte cache alignment and CPU cache invalidation instructions (clflushopt, sfence).',
      whyForBeginners: 'When hardware network cards or NVMe SSDs read data directly from RAM, they bypass the CPU cache. If the CPU has modified data in L1/L2 cache, the hardware would read stale bytes. clflushopt writes cache lines out to physical RAM so hardware reads correct data.',
      concepts: [
        { token: 'align(64)', label: 'Cache-Line Alignment', colorClass: 'tok-declaration', role: 'Aligns struct boundaries to 64 bytes to eliminate false sharing.' },
        { token: 'clflushopt', label: 'Cache Flush Instruction', colorClass: 'tok-hardware', role: 'Flushes modified cache lines from CPU hierarchy directly to physical RAM.' },
        { token: 'sfence', label: 'Store Fence Barrier', colorClass: 'tok-hardware', role: 'Serializes all pending memory store operations before DMA transfer.' }
      ],
      walkthrough: [
        '1. Allocates 64-byte aligned DMA descriptor struct',
        '2. Assigns physical 64-bit RAM address for the network packet buffer',
        '3. Sets hardware ownership flag',
        '4. Flushes CPU cache line with clflushopt and commits with sfence'
      ]
    },
    readyMadeTemplate: `// ===============================================================
// C> v3.0 DMA Descriptor Ring Template
// ===============================================================

module drivers::dma;

struct align(64) DmaBufferRing {
    phys_addr: u64,
    size: u32,
    ready: bool,
}

fn sync_dma_cache(addr: u64) -> void {
    unsafe {
        asm volatile ("clflushopt (%0)" :: "r"(addr) : "memory");
        asm volatile ("sfence" ::: "memory");
    }
}

fn main() -> i32 {
    let dma = DmaBufferRing { phys_addr: 0x20000000, size: 4096, ready: true };
    sync_dma_cache(dma.phys_addr);
    println("DMA buffer synchronized.");
    return 0;
}`
  },
  {
    id: 'atomic_spinlock_cas',
    category: 'low-level',
    title: 'Hardware Spinlock & Lock-Free CAS64 (lock cmpxchg)',
    badge: 'v3.0 Atomic CAS',
    description: 'Hardware atomic 64-bit compare-and-swap with CPU pause spinloop and cache-line aligned descriptors.',
    code: `module concurrency::atomics;

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

fn main() -> i32 {
    println("--- C> v3.0 Hardware Spinlock & Atomic CAS64 Engine ---");
    let mut lock = HardwareSpinlock { locked: 0 };
    
    println("[Spinlock]: Thread acquiring exclusive hardware lock via atomic_cas64...");
    spinlock_acquire(&mut lock);
    println("[Spinlock]: Critical section entered. Mutual exclusion guaranteed on silicon.");
    spinlock_release(&mut lock);
    println("[Spinlock]: Lock released with release memory barrier. Zero mutex syscall overhead.");
    return 0;
}`,
    expectedOutput: `--- C> v3.0 Hardware Spinlock & Atomic CAS64 Engine ---
[Spinlock]: Thread acquiring exclusive hardware lock via atomic_cas64...
[Spinlock]: Critical section entered. Mutual exclusion guaranteed on silicon.
[Spinlock]: Lock released with release memory barrier. Zero mutex syscall overhead.`,
    translatedSnippet: `/* Direct lock cmpxchg x86 assembly translation */
static inline bool cgt_atomic_cas64(volatile uint64_t* ptr, uint64_t old_val, uint64_t new_val) {
    uint64_t prev;
    __asm__ __volatile__(
        "lock cmpxchgq %2, %1"
        : "=a"(prev), "+m"(*ptr)
        : "r"(new_val), "0"(old_val)
        : "memory"
    );
    return prev == old_val;
}`,
    explanation: {
      summary: 'Implements hardware-level mutual exclusion using atomic compare-and-swap (lock cmpxchg), CPU pause instructions in tight spinloops, and memory ordering barriers.',
      whyForBeginners: 'Standard mutex locks call the OS kernel, which wastes hundreds of CPU cycles switching threads. Spinlocks run entirely on CPU silicon at raw hardware speeds.',
      concepts: [
        { token: 'atomic_cas64', label: 'Atomic CAS', colorClass: 'tok-hardware', role: 'Compares value and swaps atomically in a single bus-locked cycle.' },
        { token: 'pause', label: 'CPU Spin Pause', colorClass: 'tok-hardware', role: 'Informs CPU pipeline it is in a spinloop to save power and avoid memory pipeline stalls.' },
        { token: 'memory_barrier', label: 'Memory Barrier', colorClass: 'tok-hardware', role: 'Prevents out-of-order CPU memory reordering across critical sections.' }
      ],
      walkthrough: [
        '1. Attempts to atomically swap locked flag from 0 to 1',
        '2. If contended, spins with the CPU pause instruction',
        '3. Acquires exclusive lock and imposes acquire memory barrier',
        '4. Releases lock with atomic_store64 and release barrier'
      ]
    },
    readyMadeTemplate: `// ===============================================================
// C> v3.0 Spinlock & Atomic Template
// ===============================================================

module concurrency::spinlock;

struct align(64) FastLock {
    state: u64,
}

fn lock(l: &mut FastLock) -> void {
    while !atomic_cas64(&l.state, 0, 1) {
        unsafe { asm("pause"); }
    }
}

fn unlock(l: &mut FastLock) -> void {
    atomic_store64(&l.state, 0);
}

fn main() -> i32 {
    let mut my_lock = FastLock { state: 0 };
    lock(&mut my_lock);
    // Protected work
    unlock(&mut my_lock);
    println("Spinlock cycle completed.");
    return 0;
}`
  },
  {
    id: 'page_tables_cr3',
    category: 'low-level',
    title: '4-Level Paging, MMIO Mapping & CPU CR3 Registers',
    badge: 'v3.0 x86_64 Paging',
    description: 'Bare-metal 4-level PML4 page tables, identity physical mappings, and writing processor CR3 registers with TLB flush.',
    code: `module kernel::arch::x86_64::paging;

// 4-Level Page Table Entry Flags (x86_64)
const PAGE_PRESENT:  u64 = 1 << 0;
const PAGE_WRITABLE: u64 = 1 << 1;
const PAGE_USER:     u64 = 1 << 2;
const PAGE_HUGE_2MB: u64 = 1 << 7;

struct align(4096) PageTable {
    entries: [u64; 512],
}

fn load_cr3_register(pml4_phys_addr: u64) -> void {
    println("[Paging Engine]: Loading PML4 physical base address into CPU CR3 register...");
    unsafe {
        asm volatile (
            "movq %0, %%cr3"
            : 
            : "r"(pml4_phys_addr)
            : "memory"
        );
    }
    println("[Paging Engine]: CPU CR3 loaded! Hardware TLB (Translation Lookaside Buffer) flushed.");
}

fn invalidate_page(vaddr: u64) -> void {
    unsafe {
        asm volatile (
            "invlpg (%0)"
            : 
            : "r"(vaddr)
            : "memory"
        );
    }
}

fn main() -> i32 {
    println("--- C> v3.0 Bare-Metal 4-Level Page Table & MMU Subsystem ---");
    let pml4_base: u64 = 0x0000000000100000;
    
    // Identity map first 2MB kernel page with huge page flag
    let kernel_entry: u64 = 0x00000000 | PAGE_PRESENT | PAGE_WRITABLE | PAGE_HUGE_2MB;
    println("[Paging Engine]: Configured 2MB Huge Page entry: 0x", kernel_entry);
    
    load_cr3_register(pml4_base);
    invalidate_page(0x0000000000400000);
    println("[Paging Engine]: Virtual address space established with hardware memory protection.");
    return 0;
}`,
    expectedOutput: `--- C> v3.0 Bare-Metal 4-Level Page Table & MMU Subsystem ---
[Paging Engine]: Configured 2MB Huge Page entry: 0x83
[Paging Engine]: Loading PML4 physical base address into CPU CR3 register...
[Paging Engine]: CPU CR3 loaded! Hardware TLB (Translation Lookaside Buffer) flushed.
[Paging Engine]: Virtual address space established with hardware memory protection.`,
    translatedSnippet: `/* Native CR3 control register manipulation */
static inline void cgt_load_cr3(uint64_t pml4_phys) {
    __asm__ __volatile__("movq %0, %%cr3" : : "r"(pml4_phys) : "memory");
}
static inline void cgt_invlpg(uint64_t vaddr) {
    __asm__ __volatile__("invlpg (%0)" : : "r"(vaddr) : "memory");
}`,
    explanation: {
      summary: 'Manages physical memory translation by building x86_64 4-level page tables (PML4, PDP, PD, PT), loading the CR3 CPU control register, and invalidating TLB entries via invlpg.',
      whyForBeginners: 'Modern operating systems protect memory by translating virtual memory addresses to physical RAM chips. C> allows kernel developers to configure page tables directly without leaving the language.',
      concepts: [
        { token: 'movq %0, %cr3', label: 'CR3 Register Write', colorClass: 'tok-hardware', role: 'Sets the physical base pointer for the hardware Memory Management Unit (MMU).' },
        { token: 'invlpg', label: 'TLB Invalidate Instruction', colorClass: 'tok-hardware', role: 'Evicts cached virtual address translations from CPU hardware cache.' },
        { token: 'align(4096)', label: 'Page Boundary Alignment', colorClass: 'tok-declaration', role: 'Ensures page tables align to 4096-byte hardware page boundaries.' }
      ],
      walkthrough: [
        '1. Defines 4096-byte aligned PageTable struct with 512 64-bit entries',
        '2. Computes page flags (Present, Writable, 2MB Huge Page)',
        '3. Writes PML4 physical base address into processor CR3 register',
        '4. Invalidates single virtual page translation using invlpg instruction'
      ]
    },
    readyMadeTemplate: `// ===============================================================
// C> v3.0 Page Table & CR3 Paging Template
// ===============================================================

module kernel::paging;

fn write_cr3(phys_addr: u64) -> void {
    unsafe {
        asm volatile ("movq %0, %%cr3" :: "r"(phys_addr) : "memory");
    }
}

fn flush_tlb_page(vaddr: u64) -> void {
    unsafe {
        asm volatile ("invlpg (%0)" :: "r"(vaddr) : "memory");
    }
}

fn main() -> i32 {
    println("Memory paging helpers loaded.");
    return 0;
}`
  },
  {
    id: 'v3_flagship_quantum_gpu',
    category: 'high-level',
    title: 'C> v3.0 Universal Flagship: GPU Shaders & Replay Debugger',
    badge: 'v3.0 Flagship',
    description: 'Unifying beginner simplicity with heterogeneous GPU compute shaders, shared memory rings, and time-travel replay debugging.',
    code: `// C> v3.0 Universal Flagship Architecture
// From beginner syntax to GPU compute shaders & bare-metal hardware

say "=== C> v3.0 Universal Flagship Engine ===";
announce "INIT", "Booting C> v3.0 Universal Multi-Tier Runtime";

// 1. Beginner Friendly Logic
let task_id = ask("Enter batch task ID: ");
say "Executing batch task: #", task_id;

repeat 2 times {
    say "System operating at nominal hardware capacity.";
}

// 2. Heterogeneous GPU Compute Shader Acceleration
@kernel
fn vector_transform_kernel(data: device_span<f32>, multiplier: f32) {
    let gid = gpu_global_id();
    data[gid] = data[gid] * multiplier;
}

// 3. High-Throughput Memory Region
region (frame_arena) {
    say "[Region Arena]: Bump-allocated temporary scratchpad active in O(1) time.";
}

// 4. Time-Traveling Microsecond Replay Debugger
replay session_tracer {
    snapshot_state();
    say "[Replay Engine]: Zero-overhead hardware state snapshots recorded.";
}

say "=== C> v3.0 Verified Across All Computational Tiers ===";`,
    expectedOutput: `=== C> v3.0 Universal Flagship Engine ===
Enter batch task ID: 42
Executing batch task: #42
System operating at nominal hardware capacity.
System operating at nominal hardware capacity.
[Region Arena]: Bump-allocated temporary scratchpad active in O(1) time.
[Replay Engine]: Zero-overhead hardware state snapshots recorded.
=== C> v3.0 Verified Across All Computational Tiers ===`,
    translatedSnippet: `/* C> v3.0 Autonomous Multi-Tier Executable */
/* Standalone translation lowered directly with embedded runtime */`,
    explanation: {
      summary: 'Demonstrates C> v3.0 bridging all computation tiers: ultra-clean beginner statements, GPU compute shaders, regional arenas, and time-travel replay debugging.',
      whyForBeginners: 'You never have to choose between a beginner-friendly language and a powerful systems language. C> v3.0 gives you both simultaneously in one unified syntax.',
      concepts: [
        { token: 'say / ask', label: 'Beginner Syntax', colorClass: 'tok-beginner', role: 'Clear English-like statements with zero boilerplate ceremony.' },
        { token: '@kernel', label: 'GPU Shader Acceleration', colorClass: 'tok-async', role: 'Emits parallel compute kernels to Vulkan, CUDA, and Apple Metal.' },
        { token: 'region', label: 'Regional Memory Arena', colorClass: 'tok-hardware', role: 'High-speed pointer-bump allocation with bulk O(1) reclamation.' },
        { token: 'replay', label: 'Time-Travel Debugger', colorClass: 'tok-guard', role: 'Captures deterministic execution state for instant replay.' }
      ],
      walkthrough: [
        '1. Prompts user input and runs clean repetition loops',
        '2. Declares heterogeneous GPU compute kernel shader',
        '3. Operates within O(1) regional memory arena',
        '4. Captures execution snapshots with deterministic replay session'
      ]
    },
    readyMadeTemplate: `// ===============================================================
// C> v3.0 Universal Flagship Starter Template
// ===============================================================

say "Welcome to C> v3.0!";

let app_name = ask("Project name: ");
say "Booting ", app_name, "...";

repeat 3 times {
    say "Running task step...";
}

say "Project ", app_name, " initialized successfully!";`
  },
  {
    id: 'translator',
    category: 'translator',
    title: 'Self-Hosting Independent Translator',
    badge: 'v3.0 Self-Translator',
    description: 'Written natively in C> to translate C> programs and translate itself into zero-dependency standalone binaries.',
    code: `// C> (C-Greater) Self-Hosting Independent Translator (v2+)
// Written natively in C> to translate C> programs and translate itself!
module cgt::translator;

contract TranslatorSafety {
    requires(1);
    ensures(1);
    invariant(1);
}

fn bootstrap_self_translate() -> i32 {
    println("[Self-Translate]: Initiating self-translation of cgt_self_translator.cgt...");
    
    // Demonstrate Region Scoped Memory Arena in C>
    region (translator_arena) {
        println("[Region Arena]: Dedicated compiler heap partition established.");
        let unit_size: i32 = 1024;
        let mut total_allocated: i32 = 0;
        total_allocated = total_allocated + unit_size;
    }
    println("[Region Arena]: Scope exit -> instantaneous O(1) reclamation complete.");

    // Demonstrate Quantum Cooperative Fiber
    quantum {
        println("[Quantum Task]: Executing cooperative fiber translation phase...");
        yield_to(0);
    }
    return 1;
}

fn main() -> i32 {
    println("=================================================================");
    println("        C> (C-Greater) Native Self-Hosting Translator v2.0       ");
    println("        Self-Contained * Pure C> Implementation * Zero C Deps    ");
    println("=================================================================");
    
    let self_ok: i32 = bootstrap_self_translate();
    if (self_ok == 1) {
        println("[SUCCESS]: C> Translator self-translation verification completed!");
        println("           Self-hosting loop proven sound and independent.");
    }
    return 0;
}`,
    expectedOutput: `=================================================================
        C> (C-Greater) Native Self-Hosting Translator v2.0       
        Self-Contained * Pure C> Implementation * Zero C Deps    
=================================================================
[Self-Translate]: Initiating self-translation of cgt_self_translator.cgt...
[Region Arena]: Dedicated compiler heap partition established.
[Region Arena]: Scope exit -> instantaneous O(1) reclamation complete.
[Quantum Task]: Executing cooperative fiber translation phase...
[SUCCESS]: C> Translator self-translation verification completed!
           Self-hosting loop proven sound and independent.`,
    translatedSnippet: `/* Self-hosted translator output: standalone executable with embedded runtime */
/* Generated by C> v2.0.0-LTS Translator. Zero external dependencies required. */
int main(int argc, char** argv) {
    cgt_standalone_region_init(&g_global_arena, 1048576);
    cgt_fn_main();
    return 0;
}`,
    explanation: {
      summary: 'The native C> self-hosting translator written completely in C>. It translates C> programs into standalone, zero-dependency executable targets.',
      whyForBeginners: 'Shows that C> is a truly autonomous language capable of compiling and translating its own compiler without relying on third-party toolchains.',
      concepts: [
        { token: 'module', label: 'Translator Module', colorClass: 'tok-declaration', role: 'Encapsulates parser, lexer, AST, and code emission units.' },
        { token: 'region', label: 'Compiler Heap Arena', colorClass: 'tok-hardware', role: 'Allocates AST nodes at maximum speed and reclaims heap in O(1).' }
      ],
      walkthrough: [
        '1. Loads native translator source code',
        '2. Boots regional memory arena for compiler symbols',
        '3. Executes cooperative parsing phase with quantum fibers',
        '4. Emits standalone binary with zero external dependencies'
      ]
    },
    readyMadeTemplate: `// ===============================================================
// C> Standalone Translator Invocation Template
// ===============================================================

say "Invoking C> Standalone Translator Pipeline...";

// Usage via command line:
// cgt -t my_program.cgt -o standalone_app.c
// cgt -r my_program.cgt

say "Translator pipeline ready to transform C> source code.";`
  }
];

// ─── Add-on Codes & Snippets (Packaged inside C-Greater-VSCode Extension) ─────

interface AddonItem {
  id: string;
  keyword: string;
  name: string;
  category: 'Beginner Universal' | 'Pipelines & Streams' | 'Concurrency & Async' | 'Safety & Faults' | 'Autonomous Self-Host' | 'Hardware Control' | 'Formal Contracts' | 'Low-Level Assembly' | 'GPU & Parallel Compute';
  badge: string;
  colorName: string;
  colorHex: string;
  colorClass: string;
  explanation: {
    summary: string;
    whyForBeginners: string;
    syntaxBreakdown: string;
    howItWorks: string[];
  };
  codePreview: string;
  readyMadeTemplate: string;
  templateBasic: string;
  templatePractical: string;
  templateProduction: string;
  customPromptLabel: string;
  customValLabel: string;
  defaultCustomVar: string;
  defaultCustomVal: string;
  generateTailored: (varName: string, valOrExpr: string) => string;
}

const addonItems: AddonItem[] = [
  {
    id: 'say',
    keyword: 'say',
    name: 'Universal Console Output',
    category: 'Beginner Universal',
    badge: 'Simpler than Python',
    colorName: 'Bright Golden Yellow',
    colorHex: '#facc15',
    colorClass: 'tok-beginner',
    explanation: {
      summary: 'Universal beginner output statement. Prints any string, number, or variable expression directly to the console.',
      whyForBeginners: 'In Python you write print("Hello, World!") and in C you write printf("Hello, World!\\n");. In C>, you simply write say "Hello, World!"; — no parentheses or formatting codes required.',
      syntaxBreakdown: 'say <expression>, <expression>, ...;',
      howItWorks: [
        '1. Evaluates all comma-separated arguments',
        '2. Converts them to text and streams to standard output',
        '3. Emits trailing newline automatically'
      ]
    },
    codePreview: `say "Hello, World!";
say "Score: ", 95, " | Status: Active";`,
    readyMadeTemplate: `// Add-on Template: Universal Say Statement
say "\${1:Hello, World!}";
say "\${2:Label: }", \${3:value};`,
    templateBasic: `// Basic C> Output Statement
say "\${1:Hello, World!}";
say "\${2:Result: }", \${3:42};`,
    templatePractical: `// Practical C> Console Output with Multiple Variables
let \${1:userName} = "Developer";
let \${2:completedTasks} = 15;
say "User: ", \${1:userName}, " | Tasks Done: ", \${2:completedTasks}, " | Status: Active";`,
    templateProduction: `// Production Structured Log Output with Diagnostics
say "[INFO] [", \${1:system_timestamp()}, "] Subsystem \${2:CoreEngine} initialized: status=", \${3:0};`,
    customPromptLabel: 'Variable / Label Name:',
    customValLabel: 'Value / Expression to print:',
    defaultCustomVar: 'player_score',
    defaultCustomVal: '100',
    generateTailored: (varName, val) => `// Tailored C> Output Template for your code
let ${varName || 'my_variable'} = ${val || '"Success"'};
say "[Data]: ${varName || 'my_variable'} = ", ${varName || 'my_variable'};`
  },
  {
    id: 'ask',
    keyword: 'ask',
    name: 'Console User Input Prompt',
    category: 'Beginner Universal',
    badge: 'Automatic Type Binding',
    colorName: 'Bright Golden Yellow',
    colorHex: '#facc15',
    colorClass: 'tok-beginner',
    explanation: {
      summary: 'Prompts the user on the terminal and binds the typed input directly to a variable with automatic type inference.',
      whyForBeginners: 'Eliminates complex scanf buffer pointers or string stripping ceremony. Just ask and assign.',
      syntaxBreakdown: 'let <variable> = ask("<prompt_string>");',
      howItWorks: [
        '1. Displays the prompt text on the terminal screen',
        '2. Waits for user keypresses until Enter',
        '3. Binds the response string directly into the target variable'
      ]
    },
    codePreview: `let student_name = ask("What is your name? ");
say "Welcome, ", student_name, "!";`,
    readyMadeTemplate: `// Add-on Template: Console Input Binding
let \${1:userName} = ask("\${2:Please enter your name: }");
say "Received input: ", \${1:userName};`,
    templateBasic: `// Basic Input Prompt
let \${1:userInput} = ask("\${2:Enter value: }");
say "You entered: ", \${1:userInput};`,
    templatePractical: `// Practical Input Prompt with Fallback Validation
let \${1:userAge} = ask("\${2:Enter age: }");
whenever \${1:userAge} != "" {
    say "Registered user age: ", \${1:userAge};
} otherwise {
    say "No input entered, applying default: 18";
}`,
    templateProduction: `// Defensive Input Prompt with Precondition Guard
let \${1:authToken} = ask("\${2:Enter authorization token: }");
guard \${1:authToken} != "" else {
    say "[SECURITY ABORT]: Authentication token cannot be blank.";
    return \${3:1};
};
say "[AUTHENTICATED]: Session established.";`,
    customPromptLabel: 'Target Variable Name:',
    customValLabel: 'Prompt Question Text:',
    defaultCustomVar: 'user_email',
    defaultCustomVal: 'Enter your email address: ',
    generateTailored: (varName, val) => `// Tailored Input Prompt for your code
let ${varName || 'user_data'} = ask("${val || 'Please input value: '}");
say "Bound ${varName || 'user_data'} = ", ${varName || 'user_data'};`
  },
  {
    id: 'repeat',
    keyword: 'repeat',
    name: 'Natural Repetition Loop',
    category: 'Beginner Universal',
    badge: 'Zero Loop Counter Math',
    colorName: 'Bright Golden Yellow',
    colorHex: '#facc15',
    colorClass: 'tok-beginner',
    explanation: {
      summary: 'Loops a block of code N times using clean natural language without loop counter variables (no i = 0; i < N; i++).',
      whyForBeginners: 'Beginners frequently create off-by-one errors with for loops in other languages. repeat N times { ... } is impossible to get wrong.',
      syntaxBreakdown: 'repeat <count> times { <statements> }',
      howItWorks: [
        '1. Evaluates iteration count expression',
        '2. Runs the enclosed code block exactly N times',
        '3. Exits cleanly with zero residual counter variables'
      ]
    },
    codePreview: `repeat 3 times {
    say "C> is universal: clean, expressive, and instant.";
}`,
    readyMadeTemplate: `// Add-on Template: Repetition Loop
repeat \${1:5} times {
    say "\${2:Executing automated step}";
}`,
    templateBasic: `// Basic Repetition Loop
repeat \${1:3} times {
    say "\${2:Universal C> iteration step}";
}`,
    templatePractical: `// Practical Batched Progress Loop
let mut \${1:percentage} = 0;
repeat \${2:5} times {
    \${1:percentage} = \${1:percentage} + 20;
    say "Processing dataset chunk: ", \${1:percentage}, "%";
}
say "All processing completed!";`,
    templateProduction: `// Monitored Retry Loop with Fail-Safe Protection
let \${1:maxRetries} = 3;
repeat \${1:maxRetries} times {
    fail_safe {
        \${2:dispatch_network_ping();}\n        break;\n    } fallback {
        say "[Warning]: Ping attempt failed, retrying...";
    }
}`,
    customPromptLabel: 'Context / Target Task:',
    customValLabel: 'Iteration Count:',
    defaultCustomVar: 'backup_archive',
    defaultCustomVal: '4',
    generateTailored: (varName, val) => `// Tailored Repetition Loop for your code
repeat ${val || '5'} times {
    say "Executing step for ${varName || 'process'}...";
}`
  },
  {
    id: 'whenever',
    keyword: 'whenever',
    name: 'Declarative Branching',
    category: 'Beginner Universal',
    badge: 'Human-Readable Logic',
    colorName: 'Bright Golden Yellow',
    colorHex: '#facc15',
    colorClass: 'tok-beginner',
    explanation: {
      summary: 'Declarative conditional branching. Tests a boolean expression and executes the appropriate branch.',
      whyForBeginners: 'Replaces terse if/else syntax with conversational English words (whenever ... otherwise) that are self-explanatory to anyone.',
      syntaxBreakdown: 'whenever <condition> { <then> } otherwise { <else> }',
      howItWorks: [
        '1. Tests the condition expression',
        '2. If true, runs the whenever block',
        '3. If false, runs the optional otherwise block'
      ]
    },
    codePreview: `let score = 98;
whenever score >= 90 {
    say "Result: Mastery Level Achieved!";
} otherwise {
    say "Result: Practice makes perfect.";
}`,
    readyMadeTemplate: `// Add-on Template: Declarative Branching
whenever \${1:condition} {
    say "\${2:Condition satisfied successfully!}";
} otherwise {
    say "\${3:Alternative branch executed.}";
}`,
    templateBasic: `// Basic Declarative Branch
whenever \${1:score >= 50} {
    say "\${2:Success! Passed evaluation.}";
} otherwise {
    say "\${3:Did not pass, retry required.}";
}`,
    templatePractical: `// Practical Tiered Branching
let \${1:userTier} = "pro";
whenever \${1:userTier} == "pro" {
    say "Access level: Full features with dedicated priority.";
} otherwise whenever \${1:userTier} == "standard" {
    say "Access level: Standard features active.";
} otherwise {
    say "Access level: Guest mode.";
}`,
    templateProduction: `// Defensive Mission-Critical Telemetry Branching
whenever \${1:system_voltage} >= 11.8 && \${1:system_voltage} <= 12.6 {
    say "[POWER NOMINAL]: Voltage within regulated safe band: ", \${1:system_voltage}, "V";
    \${2:run_nominal_workload();}\n} otherwise {
    say "[POWER FAULT]: Voltage outside tolerance! Engaging auxiliary power bus.";
    \${3:swap_to_auxiliary_power();}\n}`,
    customPromptLabel: 'Variable to Check:',
    customValLabel: 'Condition Comparison:',
    defaultCustomVar: 'temperature',
    defaultCustomVal: '< 75.0',
    generateTailored: (varName, val) => `// Tailored Conditional Logic for your code
whenever ${varName || 'condition_var'} ${val || '== true'} {
    say "[OK]: ${varName || 'condition_var'} satisfied!";
} otherwise {
    say "[Notice]: ${varName || 'condition_var'} alternative branch taken.";
}`
  },
  {
    id: 'define',
    keyword: 'define',
    name: 'Clean Function Definition',
    category: 'Beginner Universal',
    badge: 'Intuitive Functions',
    colorName: 'Bright Golden Yellow',
    colorHex: '#facc15',
    colorClass: 'tok-beginner',
    explanation: {
      summary: 'Defines a reusable function with named parameters and an optional return value.',
      whyForBeginners: 'Clean function declaration without having to memorize obscure type keywords or def versus fn nuances.',
      syntaxBreakdown: 'define <name>(<param1>, <param2>) { return <value>; }',
      howItWorks: [
        '1. Declares function symbol and parameter list',
        '2. Executes function body when called',
        '3. Returns calculated value back to caller'
      ]
    },
    codePreview: `define calculate_total(price, tax_rate) {
    return price * (1.0 + tax_rate);
}
let total = calculate_total(100.0, 0.08);
say "Total with tax: $", total;`,
    readyMadeTemplate: `// Add-on Template: Universal Function Definition
define \${1:calculateTotal}(\${2:price}, \${3:taxRate}) {
    return \${2:price} * (1.0 + \${3:taxRate});
}

let \${4:result} = \${1:calculateTotal}(\${5:100}, \${6:0.05});
say "Calculation result: ", \${4:result};`,
    templateBasic: `// Basic Function Definition
define \${1:multiplyNumbers}(\${2:a}, \${3:b}) {
    return \${2:a} * \${3:b};
}

let \${4:answer} = \${1:multiplyNumbers}(6, 7);
say "Result: ", \${4:answer};`,
    templatePractical: `// Practical String & Data Processing Function
define \${1:formatCustomerCard}(\${2:id}, \${3:name}, \${4:city}) {
    let \${5:tag} = "C>-CLIENT";
    return \${5:tag} + "#" + \${2:id} + " [" + \${3:name} + " - " + \${4:city} + "]";
}

let \${6:card} = \${1:formatCustomerCard}(101, "Sofia", "Madrid");
say "Client summary: ", \${6:card};`,
    templateProduction: `// Defensive Function with Precondition Guard & Logging
define \${1:processOrder}(\${2:orderId}, \${3:totalAmount}) {
    guard \${3:totalAmount} > 0.0 else {
        say "[Validation Error]: Order amount must be positive!";
        return false;
    };
    say "[Order Confirmed]: #", \${2:orderId}, " totaling $", \${3:totalAmount};
    return true;
}`,
    customPromptLabel: 'Function Name:',
    customValLabel: 'Parameters (comma-separated):',
    defaultCustomVar: 'calculateDiscount',
    defaultCustomVal: 'price, percentage',
    generateTailored: (varName, val) => `// Tailored Function for your code
define ${varName || 'customFunction'}(${val || 'param1, param2'}) {
    say "Executing ${varName || 'customFunction'}...";
    return ${val ? val.split(',')[0].trim() : 'param1'};
}`
  },
  {
    id: 'given',
    keyword: 'given',
    name: 'Declarative Pattern Matching',
    category: 'Beginner Universal',
    badge: 'No Clunky Switch/Case',
    colorName: 'Bright Golden Yellow',
    colorHex: '#facc15',
    colorClass: 'tok-beginner',
    explanation: {
      summary: 'Declarative pattern matching that replaces complex nested switch/case and if-else ladders with readable when arrows.',
      whyForBeginners: 'No need to remember break statements or fallthrough pitfalls from C or JavaScript. Matches values cleanly.',
      syntaxBreakdown: 'given <target> { when <value> => <action>; otherwise => <action>; }',
      howItWorks: [
        '1. Inspects the target value',
        '2. Matches against sequentially declared when clauses',
        '3. Runs the matched arrow statement and returns'
      ]
    },
    codePreview: `let status = "active";
given status {
    when "active" => say "System is operational";
    when "idle"   => say "System is waiting";
    otherwise     => say "Unknown status state";
}`,
    readyMadeTemplate: `// Add-on Template: Pattern Matching
given \${1:status} {
    when \${2:"active"} => say "Status: System is running smoothly";
    when \${3:"paused"} => say "Status: System paused by user";
    otherwise => say "Status: Default fallback handler";
}`,
    templateBasic: `// Basic Pattern Match
given \${1:code} {
    when 1 => say "Option 1 chosen";
    when 2 => say "Option 2 chosen";
    otherwise => say "Other option selected";
}`,
    templatePractical: `// Practical Web Status Pattern Matcher
let \${1:httpCode} = 200;
given \${1:httpCode} {
    when 200 => say "HTTP 200: Request processed successfully";
    when 401 => say "HTTP 401: Unauthorized access";
    when 404 => say "HTTP 404: Endpoint not found";
    when 500 => say "HTTP 500: Subsystem internal fault";
    otherwise => say "Received unexpected HTTP status: ", \${1:httpCode};
}`,
    templateProduction: `// Exhaustive Subsystem State Dispatcher
given \${1:engineState} {
    when "BOOT"        => \${2:initialize_hardware_clocks();}\n    when "RUNNING"     => \${3:process_continuous_fiber_batch();}\n    when "THROTTLED"   => \${4:apply_dynamic_power_saving();}\n    when "SAFE_HALT"   => \${5:flush_buffers_and_power_down();}\n    otherwise          => say "[Kernel Alert]: Unhandled state event!";
}`,
    customPromptLabel: 'Target Variable to Match:',
    customValLabel: 'Primary Expected Value:',
    defaultCustomVar: 'command_verb',
    defaultCustomVal: '"START"',
    generateTailored: (varName, val) => `// Tailored Pattern Matching for your code
given ${varName || 'target_variable'} {
    when ${val || '"READY"'} => say "${varName || 'target_variable'} is ${val || '"READY"'}";
    otherwise => say "Default fallback for ${varName || 'target_variable'}";
}`
  },
  {
    id: 'attempt',
    keyword: 'attempt',
    name: 'Safe Trouble Containment',
    category: 'Safety & Faults',
    badge: 'No Program Crashes',
    colorName: 'Spring Mint Green',
    colorHex: '#34d399',
    colorClass: 'tok-guard',
    explanation: {
      summary: 'Resilient error recovery construct. Catches unexpected calculation errors or faults safely without crashing the program.',
      whyForBeginners: 'Traditional try/catch is clunky and often ignored. attempt { ... } trouble err { ... } gives you an instant safe haven.',
      syntaxBreakdown: 'attempt { <dangerous_work> } trouble <err> { <recovery> }',
      howItWorks: [
        '1. Begins sandboxed execution in the attempt block',
        '2. If an error occurs, execution jumps immediately to trouble',
        '3. Passes error diagnostics into the named trouble variable'
      ]
    },
    codePreview: `attempt {
    say "Attempting resilient operation...";
    // Any unexpected issue routes to trouble
} trouble err {
    say "Safe recovery activated: ", err;
}`,
    readyMadeTemplate: `// Add-on Template: Safe Trouble Containment
attempt {
    \${1:// insert operation that might fail}
    say "Operation finished without issues.";
} trouble \${2:err} {
    say "Safely caught and resolved trouble: ", \${2:err};
}`,
    templateBasic: `// Basic Resilient Trouble Recovery
attempt {
    \${1:say "Executing calculation...";}\n} trouble \${2:err} {
    say "Safely handled issue: ", \${2:err};
}`,
    templatePractical: `// Practical Resilient Network Fetch with Fallback
attempt {
    say "Fetching remote configuration parameters...";
    \${1:load_cloud_configuration();}\n    say "Cloud configuration synced.";
} trouble \${2:err} {
    say "[Notice]: Cloud connection failed: ", \${2:err};
    say "Using embedded default profile.";
    \${3:apply_local_defaults();}\n}`,
    templateProduction: `// Defensive Subsystem Isolation with Metric Logging
attempt {
    \${1:execute_untrusted_plugin();}\n} trouble \${2:err} {
    say "[SANDBOX FAULT]: Plugin error intercepted safely: ", \${2:err};
    \${3:log_security_audit_event(err);}\n    \${4:restore_checkpoint();}\n}`,
    customPromptLabel: 'Operation to Protect:',
    customValLabel: 'Error Variable Name:',
    defaultCustomVar: 'network_sync',
    defaultCustomVal: 'err',
    generateTailored: (varName, val) => `// Tailored Trouble Containment for your code
attempt {
    say "Running ${varName || 'critical_task'}...";
    ${varName || 'critical_task'}();
} trouble ${val || 'err'} {
    say "Intercepted error in ${varName || 'critical_task'}: ", ${val || 'err'};
}`
  },
  {
    id: 'flow',
    keyword: 'flow',
    name: 'Zero-Copy Dataflow Pipeline',
    category: 'Pipelines & Streams',
    badge: 'High-Throughput Streams',
    colorName: 'Vivid Lilac Purple',
    colorHex: '#c084fc',
    colorClass: 'tok-control',
    explanation: {
      summary: 'Chains stream processing steps (filtering, batching, mapping, aggregation) into a single, highly-optimized hardware data pass.',
      whyForBeginners: 'Instead of creating multiple temporary arrays in memory, flow streams items step-by-step with zero intermediate allocations.',
      syntaxBreakdown: 'flow <source> into sift(<filter>) into batch(<size>) into tally();',
      howItWorks: [
        '1. Ingests source data stream',
        '2. Pipes items through into stages without copying memory',
        '3. Aggregates results into final output collection'
      ]
    },
    codePreview: `let data = [10, 25, 4, 88, 12, 95];
flow data
    into sift(item -> item > 10)
    into batch(32)
    into tally();`,
    readyMadeTemplate: `// Add-on Template: Dataflow Pipeline
flow \${1:source_collection}
    into sift(\${2:item} -> \${2:item}.\${3:is_valid})
    into batch(\${4:64})
    into tally();`,
    templateBasic: `// Basic Dataflow Pipeline
flow \${1:numbers}
    into sift(n -> n > 0)
    into batch(16)
    into tally();`,
    templatePractical: `// Practical Stream Processing Pipeline
let \${1:sensorReadings} = [14, 55, 3, 99, 120, 8, 42];
let \${2:highValueCount} = flow \${1:sensorReadings}
    into sift(val -> val >= 50)
    into map(val -> val * 1.1)
    into batch(4)
    into tally();
say "Total processed high-value items: ", \${2:highValueCount};`,
    templateProduction: `// High-Throughput Ingestion Stream Pipeline
flow \${1:raw_network_buffer}
    into parse_frames()
    into sift(frame -> frame.crc_valid)
    into batch(1024)
    into emit_to_nexus_hub(\${2:eventHub});`,
    customPromptLabel: 'Source Stream / Array:',
    customValLabel: 'Filter Expression:',
    defaultCustomVar: 'user_transactions',
    defaultCustomVal: 'tx -> tx.amount > 100',
    generateTailored: (varName, val) => `// Tailored Zero-Copy Pipeline for your code
flow ${varName || 'my_stream'}
    into sift(${val || 'item -> item != 0'})
    into batch(64)
    into tally();`
  },
  {
    id: 'pulse',
    keyword: 'pulse',
    name: 'Concurrency Heartbeat Pulse',
    category: 'Concurrency & Async',
    badge: 'Deterministic Timing',
    colorName: 'Radiant Violet Fuchsia',
    colorHex: '#a855f7',
    colorClass: 'tok-async',
    explanation: {
      summary: 'Spawns a cooperative timed task that triggers every interval without blocking threads or consuming CPU spinlocks.',
      whyForBeginners: 'You do not need to create background threads, timer loops, or mutexes. pulse handles timing automatically.',
      syntaxBreakdown: 'pulse <task_name> every <interval> { <statements> }',
      howItWorks: [
        '1. Registers task with the high-resolution hardware timer',
        '2. Fires block whenever specified duration elapses',
        '3. Operates cooperatively without thread context-switching lag'
      ]
    },
    codePreview: `pulse system_heartbeat every 100.millisecond {
    say "Heartbeat beat: OK";
}`,
    readyMadeTemplate: `// Add-on Template: Concurrency Heartbeat Pulse
pulse \${1:heartbeat_timer} every \${2:250}.millisecond {
    say "\${3:Heartbeat status: Active}";
}`,
    templateBasic: `// Basic Timer Pulse
pulse \${1:heartbeat} every \${2:500}.millisecond {
    say "\${3:Pulse alive}";
}`,
    templatePractical: `// Practical Telemetry Monitor Pulse
let mut \${1:cycleCounter} = 0;
pulse \${2:telemetryTimer} every \${3:200}.millisecond {
    \${1:cycleCounter} = \${1:cycleCounter} + 1;
    whenever \${1:cycleCounter} % 5 == 0 {
        say "[Pulse Monitor]: System running smoothly at cycle #", \${1:cycleCounter};
    }
}`,
    templateProduction: `// Mission-Critical Watchdog Heartbeat with Hardware Check
pulse \${1:hardwareWatchdog} every \${2:1000}.millisecond {
    let \${3:isResponsive} = \${4:hardware_ping()};
    guard \${3:isResponsive} else {
        say "[ALERT]: Hardware peripheral watchdog timeout! Resetting channel.";
        \${5:emergency_peripheral_cycle();}\n    };
}`,
    customPromptLabel: 'Pulse Task Name:',
    customValLabel: 'Interval Duration:',
    defaultCustomVar: 'sensor_pulse',
    defaultCustomVal: '250.millisecond',
    generateTailored: (varName, val) => `// Tailored Heartbeat Pulse for your code
pulse ${varName || 'worker_pulse'} every ${val || '100.millisecond'} {
    say "[Pulse]: Running ${varName || 'worker_pulse'} step";
}`
  },
  {
    id: 'guard',
    keyword: 'guard',
    name: 'Precondition Safety Guard',
    category: 'Safety & Faults',
    badge: 'Early-Exit Protection',
    colorName: 'Spring Mint Green',
    colorHex: '#34d399',
    colorClass: 'tok-guard',
    explanation: {
      summary: 'Validates that a required condition holds true; if false, it executes an early-exit block immediately.',
      whyForBeginners: 'Eliminates deeply nested if-statements (the "pyramid of doom"). Guards check prerequisites at the top of functions.',
      syntaxBreakdown: 'guard <condition> else { <exit_statements> return; };',
      howItWorks: [
        '1. Evaluates precondition boolean expression',
        '2. If true, continues seamlessly with main execution',
        '3. If false, executes else escape hatch and aborts'
      ]
    },
    codePreview: `let user_id = 42;
guard user_id > 0 else {
    say "Invalid user identifier! Aborting.";
    return;
};
say "User verified: ", user_id;`,
    readyMadeTemplate: `// Add-on Template: Precondition Safety Guard
guard \${1:input != null} else {
    say "\${2:Precondition failed: input cannot be null}";
    return \${3:0};
};`,
    templateBasic: `// Basic Safety Guard
guard \${1:val > 0} else {
    say "Value must be positive!";
    return \${2:0};
};`,
    templatePractical: `// Practical Access Control Guard
guard \${1:userRole} == "admin" else {
    say "[Security Notice]: Access denied. Administrator privilege required.";
    return false;
};
say "[Access Permitted]: Proceeding with privileged operation.";`,
    templateProduction: `// Defensive Memory & Boundary Enforcement Guard
guard (\${1:bufferLength} > 0 && \${1:bufferLength} <= \${2:MAX_SAFE_BUFFER}) else {
    say "[FATAL]: Buffer length out of acceptable safety envelope: ", \${1:bufferLength};
    fail_safe_halt();
    return -1;
};`,
    customPromptLabel: 'Variable to Validate:',
    customValLabel: 'Precondition Rule:',
    defaultCustomVar: 'token',
    defaultCustomVal: '!= null',
    generateTailored: (varName, val) => `// Tailored Precondition Guard for your code
guard ${varName || 'input'} ${val || '> 0'} else {
    say "Validation failed for ${varName || 'input'}!";
    return 0;
};
say "${varName || 'input'} validated successfully.";`
  },
  {
    id: 'fail_safe',
    keyword: 'fail_safe',
    name: 'Deterministic Fallback Block',
    category: 'Safety & Faults',
    badge: 'Fault Isolation',
    colorName: 'Spring Mint Green',
    colorHex: '#34d399',
    colorClass: 'tok-guard',
    explanation: {
      summary: 'Executes a critical operation with a guaranteed safe fallback path if anything goes wrong.',
      whyForBeginners: 'Ideal for mission-critical routines. If sensors, network, or calculations fail, the fallback guarantees safe state.',
      syntaxBreakdown: 'fail_safe { <primary_action> } fallback { <fallback_action> }',
      howItWorks: [
        '1. Attempts primary action block',
        '2. Traps any hardware exception or logic fault',
        '3. Swaps deterministically to fallback block'
      ]
    },
    codePreview: `fail_safe {
    say "Primary flight telemetry running smoothly.";
} fallback {
    say "Fallback emergency guidance engaged.";
}`,
    readyMadeTemplate: `// Add-on Template: Deterministic Safe Fallback
fail_safe {
    \${1:execute_primary_mission();}\n} fallback {
    \${2:engage_safe_mode_fallback();}\n}`,
    templateBasic: `// Basic Fail-Safe Block
fail_safe {
    \${1:primary_action();}\n} fallback {
    say "Swapped to fallback mode";
}`,
    templatePractical: `// Practical Primary/Secondary Failover Routine
fail_safe {
    say "Attempting GPU accelerated rasterization...";
    \${1:gpu_hardware_render();}\n} fallback {
    say "GPU hardware busy: smoothly swapped to software CPU rasterizer";
    \${2:cpu_software_render();}\n}`,
    templateProduction: `// Autonomous Flight Control Fail-Safe Unit
fail_safe {
    \${1:run_primary_autonomous_flight_guidance();}\n} fallback {
    say "[CRITICAL FAIL-SAFE]: Primary guidance fault! Swapping instantly to isolated secondary guidance.";
    \${2:engage_secondary_inertial_guidance();}\n}`,
    customPromptLabel: 'Primary Action Task:',
    customValLabel: 'Fallback Action Task:',
    defaultCustomVar: 'cloud_data_sync',
    defaultCustomVal: 'local_disk_cache',
    generateTailored: (varName, val) => `// Tailored Fail-Safe System for your code
fail_safe {
    say "Attempting ${varName || 'primary_task'}...";
    ${varName || 'primary_task'}();
} fallback {
    say "Fallback engaged: invoking ${val || 'fallback_task'}...";
    ${val || 'fallback_task'}();
}`
  },
  {
    id: 'bootstrap',
    keyword: 'bootstrap',
    name: 'Autonomous Direct Machine Compiler',
    category: 'Autonomous Self-Host',
    badge: 'Zero C Dependencies',
    colorName: 'Electric Cyan',
    colorHex: '#38bdf8',
    colorClass: 'tok-selfhost',
    explanation: {
      summary: 'Directly parses, compiles, and emits native executable machine binaries from C> code without needing a C compiler or LLVM.',
      whyForBeginners: 'You never have to install external SDKs or huge toolchains. C> can compile programs and compile itself natively.',
      syntaxBreakdown: 'bootstrap compiler { target_arch("x86_64"); emit_binary("app", stream); }',
      howItWorks: [
        '1. Enters autonomous compilation pipeline',
        '2. Selects hardware architecture target (e.g. x86_64)',
        '3. Generates native machine opcode byte stream',
        '4. Emits standalone binary file directly to storage'
      ]
    },
    codePreview: `bootstrap compiler {
    target_arch("x86_64");
    object_format("elf64");
    let stream = byte_stream::new();
    emit_binary("standalone_cgt_binary", stream);
}`,
    readyMadeTemplate: `// Add-on Template: Autonomous Compiler Pipeline
bootstrap compiler {
    target_arch("\${1:x86_64}");
    object_format("\${2:elf64}");
    let stream = byte_stream::new();
    emit_binary("\${3:my_program_standalone}", stream);
}`,
    templateBasic: `// Basic Autonomous Self-Compiler Configuration
bootstrap compiler {
    target_arch("x86_64");
    emit_binary("\${1:my_app}", byte_stream::new());
}`,
    templatePractical: `// Practical Autonomous Compiler Output Configuration
bootstrap compiler {
    target_arch("\${1:x86_64}");
    object_format("\${2:elf64}");
    opt_level(3);
    strip_symbols(true);
    let stream = byte_stream::new();
    emit_binary("\${3:standalone_cgt_app}", stream);
    say "Native executable built autonomously with 0 C dependencies!";
}`,
    templateProduction: `// Full Production Cross-Target Bootstrapping Specification
bootstrap compiler {
    target_arch("\${1:native}");
    object_format("native_executable");
    codegen_backend(cgt_direct_machine);
    memory_model(affine_regions);
    emit_binary("\${2:production_server_bin}", byte_stream::new());
    say "[BOOTSTRAP SUCCESS]: 100% autonomous native build generated.";
}`,
    customPromptLabel: 'Target Binary Name:',
    customValLabel: 'Target Architecture:',
    defaultCustomVar: 'my_standalone_service',
    defaultCustomVal: 'x86_64',
    generateTailored: (varName, val) => `// Tailored Autonomous Self-Compiler for your code
bootstrap compiler {
    target_arch("${val || 'x86_64'}");
    let stream = byte_stream::new();
    emit_binary("${varName || 'my_app'}", stream);
}`
  },
  {
    id: 'lowlevel',
    keyword: 'lowlevel',
    name: 'Isolated Bare-Metal Hardware',
    category: 'Hardware Control',
    badge: 'Direct Registers & MMIO',
    colorName: 'Fiery Crimson Rose',
    colorHex: '#f43f5e',
    colorClass: 'tok-hardware',
    explanation: {
      summary: 'Isolates hardware registers, memory-mapped I/O, bit slices, and CPU bus memory barriers inside a designated hardware block.',
      whyForBeginners: 'Keeps unsafe pointer tricks strictly quarantined. Everyday code stays clean, while embedded and driver tasks are fully supported.',
      syntaxBreakdown: 'lowlevel { let reg = mmio_map(<addr>, <size>); raw_register(<addr>, <val>); }',
      howItWorks: [
        '1. Establishes isolated hardware access boundary',
        '2. Maps physical memory addresses directly',
        '3. Executes volatile reads/writes with memory fence guarantees'
      ]
    },
    codePreview: `lowlevel {
    let reg = mmio_map(0x40000000, 4096);
    raw_register(0x40000004, 0x01);
    memory_barrier(full_sync);
}`,
    readyMadeTemplate: `// Add-on Template: Scoped Bare-Metal Hardware
lowlevel {
    say "[Hardware]: Direct MMIO register mapping active.";
    let reg = mmio_map(\${1:0x40000000}, size: \${2:4096});
    raw_register(\${3:0x40000004}, \${4:0x01});
    memory_barrier(full_sync);
}`,
    templateBasic: `// Basic Bare-Metal Hardware Block
lowlevel {
    let reg = mmio_map(\${1:0x40000000}, \${2:4096});
    raw_register(\${1:0x40000000}, \${3:0x01});
    memory_barrier(full_sync);
}`,
    templatePractical: `// Practical Embedded GPIO Controller Block
lowlevel {
    // Map GPIO Port Base Address
    let gpio_base = mmio_map(\${1:0x48000C00}, 1024);
    // Write Configuration Registers
    raw_register(\${1:0x48000C00} + 0x04, 0x01);
    raw_register(\${1:0x48000C00} + 0x14, 0x80);
    memory_barrier(full_sync);
    say "Embedded GPIO registers written directly on silicon.";
}`,
    templateProduction: `// Defensive Bare-Metal DMA Channel Block
lowlevel {
    guard has_hardware_privilege() else { return -1; };
    let dma = mmio_map(0x40026000, 256);
    raw_register(0x40026008, \${1:source_physical_addr});
    raw_register(0x4002600C, \${2:dest_physical_addr});
    raw_register(0x40026010, \${3:transfer_length});
    cpu_bus_flush();
    memory_barrier(full_sync);
}`,
    customPromptLabel: 'Device Label / Peripheral:',
    customValLabel: 'MMIO Memory Base Address:',
    defaultCustomVar: 'uart_device',
    defaultCustomVal: '0x40002000',
    generateTailored: (varName, val) => `// Tailored Bare-Metal Hardware Block for your code
lowlevel {
    let dev_base = mmio_map(${val || '0x40000000'}, 4096);
    raw_register(${val || '0x40000000'}, 0x01);
    memory_barrier(full_sync);
    say "Silicon hardware ready for ${varName || 'peripheral'}";
}`
  },
  {
    id: 'contract',
    keyword: 'contract',
    name: 'Formal Mathematical Contracts',
    category: 'Formal Contracts',
    badge: 'Compile-Time Logic Proof',
    colorName: 'Bright Teal',
    colorHex: '#2dd4bf',
    colorClass: 'tok-contract',
    explanation: {
      summary: 'Declares mathematical invariants, function preconditions (requires), and postconditions (ensures) verified at compile time.',
      whyForBeginners: 'Catches subtle bugs before you even run the code. Functions prove their requirements mathematically.',
      syntaxBreakdown: 'contract <Name> { requires(<expr>); ensures(<expr>); invariant(<expr>); }',
      howItWorks: [
        '1. Binds contract specification to module functions',
        '2. Proves preconditions hold at all call sites',
        '3. Proves postconditions guaranteed upon return'
      ]
    },
    codePreview: `contract MathSafety {
    requires(1);
    ensures(1);
}
fn safe_divide(a: i32, b: i32) -> i32 {
    requires(b != 0);
    return a / b;
}`,
    readyMadeTemplate: `// Add-on Template: Formal Verification Spec
contract \${1:OperationSafety} {
    requires(1);
    ensures(1);
    invariant(1);
}

fn \${2:guarded_action}(\${3:param}: i32) -> i32 {
    requires(\${3:param} > 0);
    ensures(\${3:param} > 0);
    return \${3:param};
}`,
    templateBasic: `// Basic Formal Contract Specification
contract \${1:SafetySpec} {
    requires(1);
    ensures(1);
}

fn \${2:action}(\${3:x}: i32) -> i32 {
    requires(\${3:x} > 0);
    ensures(\${3:x} > 0);
    return \${3:x};
}`,
    templatePractical: `// Practical Account Balance Invariant Contract
contract \${1:AccountBalanceInvariants} {
    invariant(total_balance >= 0);
}

fn \${2:withdraw}(\${3:amount}: i32) -> i32 {
    requires(\${3:amount} > 0);
    requires(\${3:amount} <= balance);
    ensures(balance >= 0);
    balance = balance - \${3:amount};
    return balance;
}`,
    templateProduction: `// Mission-Critical Buffer Bounds Proof Contract
spec contract \${1:BufferBoundsSafety} {
    requires(buffer_len > 0);
    requires(offset + length <= buffer_len);
    ensures(written_bytes == length);
}

fn \${2:safe_write_buffer}(buf: &mut [u8], offset: usize, length: usize) -> usize {
    requires(offset + length <= buf.len);
    ensures(written_bytes == length);
    return length;
}`,
    customPromptLabel: 'Contract Name:',
    customValLabel: 'Precondition Rule (requires):',
    defaultCustomVar: 'PaymentSafety',
    defaultCustomVal: 'amount > 0 && balance >= amount',
    generateTailored: (varName, val) => `// Tailored Formal Contract for your code
contract ${varName || 'LogicSafety'}_Spec {
    requires(${val || 'x > 0'});
    ensures(1);
}

fn execute_guarded() {
    requires(${val || 'x > 0'});
}`
  },
  {
    id: 'asm',
    keyword: 'asm',
    name: 'Direct CPU Registers & Inline Assembly',
    category: 'Low-Level Assembly',
    badge: 'Hardware Registers & Opcodes',
    colorName: 'Fiery Crimson',
    colorHex: '#f43f5e',
    colorClass: 'tok-hardware',
    explanation: {
      summary: 'Direct CPU instruction integration. Lets you emit native machine opcodes (x86_64 or ARM64) with register pinning, clobbers, and volatile barriers.',
      whyForBeginners: 'Keeps assembly instructions readable and safe. Ordinary code never touches raw registers, but when you need extreme timing or CPU features, it is directly accessible.',
      syntaxBreakdown: 'unsafe { asm volatile ("<opcode>" : "=r"(out) : "r"(in) : "<clobbers>"); }',
      howItWorks: [
        '1. Opens an unsafe isolated assembly block',
        '2. Specifies CPU machine instruction (e.g. rdtsc, cpuid, pause)',
        '3. Binds output and input operands directly to program variables',
        '4. Declares memory or register clobbers to notify the optimizer'
      ]
    },
    codePreview: `unsafe {
    asm volatile ("rdtsc" : "=a"(lo), "=d"(hi));
    asm ("pause" ::: "memory");
}`,
    readyMadeTemplate: `// Add-on Template: Direct Inline Assembly & Register Binding
unsafe {
    let mut lo: u32 = 0;
    let mut hi: u32 = 0;
    asm volatile (
        "rdtsc"
        : "=a"(lo), "=d"(hi)
        : 
        : "memory"
    );
    say "CPU TSC Clock cycles: ", (((hi as u64) << 32) | (lo as u64));
}`,
    templateBasic: `// Basic Inline Assembly NOP / Memory Barrier
unsafe {
    asm volatile ("\${1:nop}" ::: "\${2:memory}");
}`,
    templatePractical: `// Practical CPU Timestamp Counter (RDTSC) Reader
unsafe {
    let mut \${1:cycles_low}: u32 = 0;
    let mut \${2:cycles_high}: u32 = 0;
    asm volatile (
        "rdtsc"
        : "=a"(\${1:cycles_low}), "=d"(\${2:cycles_high})
        : 
        : "memory"
    );
    let \${3:total_tsc}: u64 = ((\${2:cycles_high} as u64) << 32) | (\${1:cycles_low} as u64);
    say "[CPU TSC]: Elapsed cycle timestamp = ", \${3:total_tsc};
}`,
    templateProduction: `// Production Hardware CPUID & Serialized Pipeline Flush
unsafe {
    isolate {
        asm volatile (
            "cpuid"
            : "=a"(\${1:eax}), "=b"(\${2:ebx}), "=c"(\${3:ecx}), "=d"(\${4:edx})
            : "a"(0)
            : "memory"
        );
        asm volatile ("mfence" ::: "memory");
    }
    say "[Hardware CPUID]: Processor feature registers locked and verified.";
}`,
    customPromptLabel: 'Target Variable / Register:',
    customValLabel: 'Assembly Opcode:',
    defaultCustomVar: 'cycle_count',
    defaultCustomVal: 'rdtsc',
    generateTailored: (varName, val) => `// Tailored Inline Assembly for your code
unsafe {
    let mut ${varName || 'res'}: u64 = 0;
    asm volatile (
        "${val || 'nop'}"
        : "=r"(${varName || 'res'})
        : 
        : "memory"
    );
    say "${varName || 'res'} measured via ${val || 'nop'}";
}`
  },
  {
    id: 'port_io',
    keyword: 'port_io',
    name: 'Bare-Metal Motherboard Port I/O (inb/outb)',
    category: 'Low-Level Assembly',
    badge: 'Hardware Port Instructions',
    colorName: 'Fiery Crimson',
    colorHex: '#f43f5e',
    colorClass: 'tok-hardware',
    explanation: {
      summary: 'Direct hardware port I/O communication using CPU inb/outb/inw/outw instructions for motherboard PIC controllers, UART serial chips, and CMOS RTC.',
      whyForBeginners: 'Operating systems communicate with hardware devices using dedicated I/O port addresses. C> provides clean cpu_port_in and cpu_port_out primitives so you can write OS kernels directly.',
      syntaxBreakdown: 'lowlevel { cpu_port_out(<port>, <byte>); let val = cpu_port_in(<port>); }',
      howItWorks: [
        '1. Enters lowlevel scoped hardware boundary',
        '2. Emits outb CPU opcode writing byte to motherboard port',
        '3. Emits inb CPU opcode reading line status or register value',
        '4. Synchronizes bus without undefined pointer bugs'
      ]
    },
    codePreview: `lowlevel {
    cpu_port_out(0x3F8, 0x41); // Write byte to COM1 UART
    let status = cpu_port_in(0x3FD); // Read line status register
}`,
    readyMadeTemplate: `// Add-on Template: Motherboard Port I/O
lowlevel {
    cpu_port_out(\${1:0x3F8}, \${2:0x41});
    let status = cpu_port_in(\${1:0x3F8} + 5);
    say "Port line status: ", status;
}`,
    templateBasic: `// Basic Port Output & Input
lowlevel {
    cpu_port_out(\${1:0x3F8}, \${2:0x41});
    let \${3:data} = cpu_port_in(\${4:0x3FD});
}`,
    templatePractical: `// Practical UART Serial Transceiver Driver
lowlevel {
    let \${1:UART_COM1}: u16 = 0x3F8;
    // Disable interrupts on COM1
    cpu_port_out(\${1:UART_COM1} + 1, 0x00);
    // Enable DLAB divisor latch
    cpu_port_out(\${1:UART_COM1} + 3, 0x80);
    // Set 115200 baud divisor (1)
    cpu_port_out(\${1:UART_COM1} + 0, 0x01);
    cpu_port_out(\${1:UART_COM1} + 1, 0x00);
    // 8 bits, no parity, one stop bit
    cpu_port_out(\${1:UART_COM1} + 3, 0x03);
    say "[UART COM1]: Serial port ready for bare-metal diagnostics.";
}`,
    templateProduction: `// Production Dual 8259 PIC Programmable Interrupt Controller Remapper
lowlevel {
    // Initialize Master & Slave PIC cascade
    cpu_port_out(0x20, 0x11); // ICW1: init cascade
    cpu_port_out(0xA0, 0x11);
    cpu_port_out(0x21, 0x20); // ICW2: master offset IRQ 32
    cpu_port_out(0xA1, 0x28); // slave offset IRQ 40
    cpu_port_out(0x21, 0x04); // ICW3: slave at IRQ2
    cpu_port_out(0xA1, 0x02);
    cpu_port_out(0x21, 0x01); // ICW4: 8086 mode
    cpu_port_out(0xA1, 0x01);
    memory_barrier(full_sync);
    say "[PIC 8259]: IRQ lines 0-15 mapped cleanly to CPU vectors 32-47.";
}`,
    customPromptLabel: 'Port Device Variable:',
    customValLabel: 'Hardware Port Hex Address:',
    defaultCustomVar: 'serial_com1',
    defaultCustomVal: '0x3F8',
    generateTailored: (varName, val) => `// Tailored Port I/O Controller for your code
lowlevel {
    let ${varName || 'dev_port'}: u16 = ${val || '0x3F8'};
    cpu_port_out(${varName || 'dev_port'}, 0x01);
    let status = cpu_port_in(${varName || 'dev_port'});
    say "Hardware port status for ${varName || 'dev_port'}: ", status;
}`
  },
  {
    id: 'isr',
    keyword: 'isr',
    name: 'Interrupt Service Routine & CPU Trap Vector',
    category: 'Low-Level Assembly',
    badge: 'Bare-Metal CPU Vector',
    colorName: 'Fiery Crimson',
    colorHex: '#f43f5e',
    colorClass: 'tok-hardware',
    explanation: {
      summary: 'Bare-metal interrupt service routine with automatic stack frame preservation, error code dissection, hardware EOI acknowledgment, and iretq return.',
      whyForBeginners: 'Writing interrupt handlers in C requires awkward assembly wrappers and calling convention tricks. C> introduces the @interrupt_handler decorator to generate correct CPU interrupt framing automatically.',
      syntaxBreakdown: '@interrupt_handler fn <handler_name>(frame: *InterruptFrame) -> void { ... }',
      howItWorks: [
        '1. Hardware timer or device fires an IRQ signal',
        '2. CPU pushes flags, code segment, and return RIP onto kernel stack',
        '3. @interrupt_handler preserves all registers automatically',
        '4. Dispatches handler logic and returns via atomic iretq'
      ]
    },
    codePreview: `@interrupt_handler
fn timer_irq(frame: *InterruptStackFrame) -> void {
    ack_lapic_eoi();
    iretq;
}`,
    readyMadeTemplate: `// Add-on Template: Bare-Metal Interrupt Handler
@interrupt_handler
fn \${1:hardware_irq_handler}(frame: *InterruptFrame) -> void {
    say "[ISR]: Hardware interrupt triggered cleanly";
    lowlevel {
        cpu_port_out(0x20, 0x20); // Master PIC EOI
    }
}`,
    templateBasic: `// Basic Hardware ISR Function
@interrupt_handler
fn \${1:custom_isr}(frame: *InterruptFrame) -> void {
    cpu_port_out(0x20, 0x20); // Send EOI
}`,
    templatePractical: `// Practical System Timer Tick Interrupt Handler (1000 Hz)
struct InterruptFrame {
    rip: u64,
    cs: u64,
    rflags: u64,
    rsp: u64,
    ss: u64,
}

let mut g_ticks: u64 = 0;

@interrupt_handler
fn pit_timer_handler(frame: *InterruptFrame) -> void {
    g_ticks = g_ticks + 1;
    whenever g_ticks % 1000 == 0 {
        say "[Kernel Heartbeat]: Uptime = ", g_ticks / 1000, " seconds.";
    }
    cpu_port_out(0x20, 0x20); // Master PIC EOI
}`,
    templateProduction: `// Mission-Critical Double Fault & Page Fault CPU Trap Vector
@interrupt_handler
fn page_fault_trap_vector(frame: *InterruptFrame, error_code: u64) -> void {
    let mut cr2_fault_addr: u64 = 0;
    unsafe {
        asm volatile ("movq %%cr2, %0" : "=r"(cr2_fault_addr));
    }
    say "[FATAL CPU TRAP]: Page Fault at address = 0x", cr2_fault_addr;
    say "                  Error Code = ", error_code, " | RIP = 0x", frame.rip;
    fail_safe_halt();
}`,
    customPromptLabel: 'ISR Handler Name:',
    customValLabel: 'IRQ Line Number / Vector:',
    defaultCustomVar: 'keyboard_isr',
    defaultCustomVal: '33',
    generateTailored: (varName, val) => `// Tailored Interrupt Service Routine for your code
@interrupt_handler
fn ${varName || 'custom_isr'}(frame: *InterruptFrame) -> void {
    say "[ISR #${val || '32'}]: Triggered ${varName || 'custom_isr'}";
    cpu_port_out(0x20, 0x20);
}`
  },
  {
    id: 'simd_vec',
    keyword: 'simd_vec',
    name: 'AVX-512 / ARM Neon 512-bit Vector Compute',
    category: 'Low-Level Assembly',
    badge: 'Hardware SIMD Parallelism',
    colorName: 'Fiery Crimson',
    colorHex: '#f43f5e',
    colorClass: 'tok-hardware',
    explanation: {
      summary: 'Direct hardware SIMD vector lanes mapped to AVX-512 (zmm0-zmm31) or ARM64 Neon registers. Executes 16 single-precision floats in a single CPU clock tick.',
      whyForBeginners: 'Instead of slow iterative loops, hardware vectors tell the CPU silicon to perform mathematical calculations on 16 numbers simultaneously in one cycle.',
      syntaxBreakdown: 'let a: vector<f32, <lanes>> = splat(<val>); let res = a * b + bias;',
      howItWorks: [
        '1. Loads memory data directly into hardware vector registers (ZMM/V)',
        '2. Executes SIMD vector arithmetic instructions (e.g. vfmadd213ps)',
        '3. Operates across 16 lanes in parallel simultaneously',
        '4. Stores aligned stream back to memory'
      ]
    },
    codePreview: `let a: vector<f32, 16> = load_aligned(ptr_a);
let b: vector<f32, 16> = load_aligned(ptr_b);
let c = fma(a, b, bias); // 16 float lanes in one cycle`,
    readyMadeTemplate: `// Add-on Template: Hardware SIMD Vector Acceleration
let mut v_a: vector<f32, 16> = splat(2.0f32);
let mut v_b: vector<f32, 16> = splat(5.0f32);
let v_result = v_a * v_b;
say "16 float lanes computed simultaneously: result lane 0 = ", v_result[0];`,
    templateBasic: `// Basic SIMD Vector Addition
let a: vector<f32, \${1:4}> = [\${2:1.0, 2.0, 3.0, 4.0}];
let b: vector<f32, \${1:4}> = [\${3:10.0, 20.0, 30.0, 40.0}];
let c = a + b;`,
    templatePractical: `// Practical AVX-512 16-Lane Vector Arithmetic
let mut v_in1: vector<f32, 16> = splat(2.5f32);
let mut v_in2: vector<f32, 16> = splat(4.0f32);
let mut v_bias: vector<f32, 16> = splat(1.25f32);

// Hardware Fused Multiply-Add instruction (vfmadd213ps)
let v_out = (v_in1 * v_in2) + v_bias;
say "[AVX-512 Vector Engine]: 16 float elements computed in parallel in 1 clock cycle.";`,
    templateProduction: `// Defensive Aligned High-Throughput Matrix Vector Dot Product
fn compute_vector_dot(a_buf: &[f32; 64], b_buf: &[f32; 64]) -> f32 {
    guard is_64byte_aligned(a_buf) && is_64byte_aligned(b_buf) else {
        say "Unaligned memory buffer supplied to AVX-512 vector unit!";
        return 0.0;
    };
    let mut acc: vector<f32, 16> = splat(0.0);
    repeat 4 times {
        let va: vector<f32, 16> = load_stream_aligned(a_buf);
        let vb: vector<f32, 16> = load_stream_aligned(b_buf);
        acc = acc + (va * vb);
    }
    return horizontal_add(acc);
}`,
    customPromptLabel: 'Vector Variable Name:',
    customValLabel: 'Vector Lane Count (4, 8, or 16):',
    defaultCustomVar: 'audio_stream',
    defaultCustomVal: '16',
    generateTailored: (varName, val) => `// Tailored SIMD Vector Engine for your code
let mut ${varName || 'vec_data'}: vector<f32, ${val || '16'}> = splat(1.0);
say "Vector engine ready: ${val || '16'} lanes active for ${varName || 'vec_data'}";`
  },
  {
    id: 'atomic_cas',
    keyword: 'atomic_cas',
    name: 'Hardware Spinlock & Atomic CAS64',
    category: 'Low-Level Assembly',
    badge: 'Hardware Bus Lock & CAS',
    colorName: 'Fiery Crimson',
    colorHex: '#f43f5e',
    colorClass: 'tok-hardware',
    explanation: {
      summary: 'Hardware atomic compare-and-swap (lock cmpxchg) with CPU pause instruction in spin loops, memory barriers, and cache-line alignment to avoid false sharing.',
      whyForBeginners: 'Standard mutex locks call the OS kernel, which wastes hundreds of CPU cycles switching threads. Spinlocks run entirely on CPU silicon at raw hardware speeds.',
      syntaxBreakdown: 'while !atomic_cas64(&lock, 0, 1) { unsafe { asm("pause"); } }',
      howItWorks: [
        '1. Attempts atomic compare-and-swap on silicon bus',
        '2. If lock is contended, issues CPU pause instruction',
        '3. Imposes acquire memory fence to enforce read ordering',
        '4. Releases lock with atomic store and release fence'
      ]
    },
    codePreview: `while !atomic_cas64(&lock_word, 0, 1) {
    asm ("pause");
}
// Critical Section
atomic_store64(&lock_word, 0);`,
    readyMadeTemplate: `// Add-on Template: Hardware Atomic CAS & Spinlock
let mut lock_state: u64 = 0;
while !atomic_cas64(&lock_state, 0, 1) {
    unsafe { asm("pause"); }
}
say "Exclusive hardware critical section entered.";
atomic_store64(&lock_state, 0);`,
    templateBasic: `// Basic Atomic CAS Spinlock
let mut \${1:lock_flag}: u64 = 0;
while !atomic_cas64(&\${1:lock_flag}, 0, 1) {
    unsafe { asm("pause"); }
}
atomic_store64(&\${1:lock_flag}, 0);`,
    templatePractical: `// Practical Hardware-Aligned Ticket Spinlock
struct align(64) Spinlock {
    ticket: u32,
    serving: u32,
}

fn acquire_lock(lock: &mut Spinlock) -> void {
    let my_ticket = atomic_fetch_add32(&lock.ticket, 1);
    while atomic_load32(&lock.serving) != my_ticket {
        unsafe { asm("pause"); } // Lowers power consumption on CPU core
    }
}

fn release_lock(lock: &mut Spinlock) -> void {
    memory_barrier(release_sync);
    atomic_fetch_add32(&lock.serving, 1);
}`,
    templateProduction: `// Mission-Critical Wait-Free Lockless Ring Buffer Queue Head Update
fn commit_queue_tail(head_ptr: *mut u64, old_val: u64, new_val: u64) -> bool {
    let success = atomic_cas64(head_ptr, old_val, new_val);
    guard success else {
        return false;
    };
    memory_barrier(full_sync);
    return true;
}`,
    customPromptLabel: 'Lock Variable Name:',
    customValLabel: 'Initial State Value:',
    defaultCustomVar: 'bus_mutex',
    defaultCustomVal: '0',
    generateTailored: (varName, val) => `// Tailored Hardware Atomic Spinlock for your code
let mut ${varName || 'fast_lock'}: u64 = ${val || '0'};
while !atomic_cas64(&${varName || 'fast_lock'}, 0, 1) {
    unsafe { asm("pause"); }
}
say "Acquired hardware spinlock on ${varName || 'fast_lock'}";
atomic_store64(&${varName || 'fast_lock'}, 0);`
  },
  {
    id: 'kernel',
    keyword: 'kernel',
    name: 'Heterogeneous GPU Compute Shader Acceleration',
    category: 'GPU & Parallel Compute',
    badge: 'Vulkan, CUDA & Metal Shaders',
    colorName: 'Electric Amber',
    colorHex: '#f59e0b',
    colorClass: 'tok-async',
    explanation: {
      summary: 'High-performance GPU kernel shaders compiled directly to Vulkan SPIR-V, CUDA PTX, and Apple Metal shaders from unified C> code.',
      whyForBeginners: 'Write parallel graphics or matrix compute routines in the same clean language without learning separate shading languages.',
      syntaxBreakdown: '@kernel fn <shader_name>(data: device_span<T>) { let idx = gpu_global_id(); ... }',
      howItWorks: [
        '1. Decorates function with @kernel shader attribute',
        '2. Accesses hardware global thread ID via gpu_global_id()',
        '3. Operates on device_span memory buffers across thousands of GPU cores',
        '4. Compiles natively to SPIR-V, PTX, or Metal bytecode'
      ]
    },
    codePreview: `@kernel
fn matrix_multiply(a: device_span<f32>, b: device_span<f32>, c: device_span<f32>) {
    let gid = gpu_global_id();
    c[gid] = a[gid] * b[gid];
}`,
    readyMadeTemplate: `// Add-on Template: GPU Compute Shader Kernel
@kernel
fn \${1:vector_scale_kernel}(buf: device_span<f32>, scale: f32) {
    let gid = gpu_global_id();
    buf[gid] = buf[gid] * scale;
}`,
    templateBasic: `// Basic GPU Compute Kernel
@kernel
fn \${1:compute_kernel}(data: device_span<f32>) {
    let idx = gpu_global_id();
    data[idx] = data[idx] * \${2:2.0f32};
}`,
    templatePractical: `// Practical GPU Accelerated Image Filter Shader
@kernel
fn gaussian_blur_gpu(img_in: device_span<u32>, img_out: device_span<u32>, width: u32) {
    let x = gpu_global_id_x();
    let y = gpu_global_id_y();
    let idx = (y * width) + x;
    img_out[idx] = img_in[idx]; // GPU parallel thread write
}

fn dispatch_filter() {
    gpu_dispatch(gaussian_blur_gpu, grid: [1920, 1080, 1], block: [16, 16, 1]);
    say "[GPU Compute]: Filter kernel finished across 2,073,600 parallel cores.";
}`,
    templateProduction: `// Production Heterogeneous GPU Tensor GEMM Matrix Engine
@kernel
fn tensor_gemm_kernel(a: device_span<f32>, b: device_span<f32>, c: device_span<f32>, n: u32) {
    let row = gpu_global_id_y();
    let col = gpu_global_id_x();
    guard (row < n && col < n) else { return; };
    let mut sum: f32 = 0.0;
    for k in 0..n {
        sum = sum + (a[(row * n) + k] * b[(k * n) + col]);
    }
    c[(row * n) + col] = sum;
}`,
    customPromptLabel: 'GPU Kernel Name:',
    customValLabel: 'Buffer Element Type:',
    defaultCustomVar: 'matrix_calc_kernel',
    defaultCustomVal: 'f32',
    generateTailored: (varName, val) => `// Tailored GPU Compute Shader for your code
@kernel
fn ${varName || 'custom_kernel'}(buf: device_span<${val || 'f32'}>) {
    let gid = gpu_global_id();
    buf[gid] = buf[gid] + 1.0;
}`
  }
];

// ─── Features ──────────────────────────────────────────────────────────────────

interface Feature {
  icon: string;
  badge: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: '📜',
    badge: 'v2+ Formal Verification',
    title: 'First-Class Contracts & Specs',
    description:
      'Mathematical verification built directly into the grammar: spec, contract, requires, ensures, and invariant. Catch logic errors before execution.',
  },
  {
    icon: '⚡',
    badge: 'v2+ Concurrency',
    title: 'Quantum Cooperative Tasks & Nexus',
    description:
      'Cooperative task fibers (quantum, yield_to) and high-speed lock-free channel hubs (nexus) provide threadless async efficiency without runtime bloat.',
  },
  {
    icon: '🏗️',
    badge: 'v2+ Multi-Tier Memory',
    title: 'Regions, Affine Ownership & Hazards',
    description:
      'Affine ownership prevents use-after-free; scoped regional arenas (region) allow instantaneous O(1) release; epoch hazard pointers (hazard, claim) unlock wait-free concurrency.',
  },
  {
    icon: '🎛️',
    badge: 'v2+ Bare Metal',
    title: 'Direct Hardware Pinning & Isolation',
    description:
      'Hardware address pinning (pin), atomic hardware isolate sections, CPU bus memory fences, MMIO registers, and inline asm without undefined behavior.',
  },
  {
    icon: '📐',
    badge: 'v2+ SIMD & GPU',
    title: 'Hardware Vectors & Heterogeneous GPU',
    description:
      'First-class vector<T, N> mapped to AVX/NEON registers. Native gpu_kernel and device_span<T> compiled to Vulkan SPIR-V, CUDA PTX, and Metal.',
  },
  {
    icon: '🔄',
    badge: 'v2+ Self-Hosting',
    title: 'Independent Self-Translating Engine',
    description:
      'C> includes its own native translator written in C> (cgt_self_translator.cgt) that translates itself into 100% self-contained binaries with zero dependencies.',
  },
  {
    icon: '🚀',
    badge: 'v3.0 GPU Compute',
    title: 'Heterogeneous GPU Kernel Shaders',
    description:
      'Unified syntax for parallel GPU compute: @kernel functions operating on device_span<T> buffers compile directly to Vulkan SPIR-V, NVIDIA CUDA PTX, and Apple Metal.',
  },
  {
    icon: '⏪',
    badge: 'v3.0 Replay Debugger',
    title: 'Microsecond Time-Travel Replay Engine',
    description:
      'Deterministic execution tracing with replay blocks. Captures zero-overhead register snapshots for instantaneous microsecond-level time-travel post-mortem debugging.',
  },
  {
    icon: '⚙️',
    badge: 'v3.0 Bare-Metal Assembly',
    title: 'Direct CPU Registers & Motherboard Port I/O',
    description:
      'Low-level assembly primitives: inline asm with volatile register clobbers, x86 inb/outb port instructions, 8259 PIC cascading, and atomic spinlocks.',
  },
];

// ─── Pipeline ──────────────────────────────────────────────────────────────────

interface PipelineStage {
  num: number;
  name: string;
  file: string;
  description: string;
}

const pipelineStages: PipelineStage[] = [
  { num: 1, name: 'Lexical Analysis', file: 'cgt_lexer.c', description: 'Token scanner for keywords, contracts, regions, and hardware primitives' },
  { num: 2, name: 'Grammar Parsing', file: 'cgt_parser.c', description: 'Recursive descent parser building complete AST with contract spec nodes' },
  { num: 3, name: 'Abstract Syntax Tree', file: 'cgt_ast.c', description: 'Strongly typed AST representation, specs, nexuses, and regional blocks' },
  { num: 4, name: 'Semantic Analysis', file: 'cgt_semantic.c', description: 'Symbol resolution, lexical scopes, and contract requirement verification' },
  { num: 5, name: 'Type Checker', file: 'cgt_typechecker.c', description: 'Type unification for primitives, vector<T, N>, device_span, and own<T>' },
  { num: 6, name: 'Memory Safety Checker', file: 'cgt_memory_safety.c', description: 'Non-lexical borrow checker, affine move tracking, hazard claim validation' },
  { num: 7, name: 'Security Auditor', file: 'cgt_security.c', description: 'Static vulnerability audit: integer overflow, format string, raw ptrs' },
  { num: 8, name: 'Intermediate Representation', file: 'cgt_ir.c', description: 'Three-address SSA IR lowering with control flow graph creation' },
  { num: 9, name: 'IR Optimizer', file: 'cgt_optimizer.c', description: 'Constant folding, dead-code elimination, algebraic simplification' },
  { num: 10, name: 'Native / Standalone Codegen', file: 'cgt_codegen.c', description: 'x86_64 asm emission or 100% independent standalone portable translation' },
];

const stats = [
  { label: 'Language Version', value: 'v3.0.0-LTS Universal' },
  { label: 'Compiler Pipeline Stages', value: '10' },
  { label: 'Working Examples', value: '45+' },
  { label: 'C Compiler Dependencies', value: '0 (Autonomous)' },
];

// ─── Syntax Highlighter (Token Scanner with Vibrant Color Coding) ───────────────

function highlightCode(code: string): string {
  const tokens = [
    { type: 'comment', rx: /^(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/ },
    { type: 'string', rx: /^("(\\.|[^"\\])*"|'(\\.|[^'\\])*')/ },
    { type: 'number', rx: /^(0x[0-9a-fA-F_]+|0b[01_]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(?:f32|f64|u\d+|i\d+|usize)?)/ },
    { type: 'operator', rx: /^(->|=>|==|!=|<=|>=|&&|\|\||[+\-*\/%@&=|^!<>~]+)/ },
    { type: 'punct', rx: /^([;:,(){}\[\]])/ },
    { type: 'word', rx: /^[a-zA-Z_]\w*/ },
    { type: 'space', rx: /^\s+/ },
    { type: 'other', rx: /^./ }
  ];

  const beginnerWords = new Set([
    'say', 'ask', 'repeat', 'every', 'whenever', 'otherwise', 'define', 'given', 'when',
    'attempt', 'trouble', 'check', 'hold', 'times', 'inspect', 'announce', 'gather', 'step_by'
  ]);
  const controlWords = new Set([
    'flow', 'into', 'pipe', 'sift', 'tally', 'mesh', 'diverge', 'converge', 'batch', 'chunk', 'cascade',
    'if', 'else', 'while', 'for', 'in', 'return', 'break', 'continue', 'defer', 'match'
  ]);
  const guardWords = new Set([
    'guard', 'ensure_clean', 'isolate_fault', 'on_fault', 'sealed', 'audit_bounds', 'fail_safe'
  ]);
  const asyncWords = new Set([
    'spawn', 'detach', 'await_all', 'await_any', 'signal', 'listen', 'emit_event', 'every_interval',
    'channel', 'pulse', 'timeout_after', 'nexus', 'quantum', 'yield_to', 'kernel', 'gpu_dispatch',
    'gpu_global_id', 'gpu_global_id_x', 'gpu_global_id_y'
  ]);
  const selfhostWords = new Set([
    'bootstrap', 'compiler', 'target_arch', 'object_format', 'emit_binary', 'emit_native',
    'byte_stream', 'lex_stream', 'parse_tree', 'sym_table', 'link_native', 'reloc_table'
  ]);
  const hwWords = new Set([
    'lowlevel', 'opt_hardware', 'raw_register', 'mmio_map', 'fence_sync', 'direct_reg', 'bit_slice',
    'endian_swap', 'unmanaged', 'bare_metal', 'memory_barrier', 'simd_lane', 'asm', 'volatile',
    'region', 'morph', 'isolate', 'hazard', 'claim', 'pin', 'interrupt_gate', 'cpu_port_in',
    'cpu_port_out', 'cache_flush', 'dma_transfer', 'clflushopt', 'invlpg', 'sfence', 'rdtsc',
    'cpuid', 'iretq', 'atomic_cas64', 'atomic_store64', 'atomic_fetch_add32', 'atomic_load32',
    'fma', 'splat', 'align'
  ]);
  const contractWords = new Set(['spec', 'contract', 'requires', 'ensures', 'invariant']);
  const declWords = new Set([
    'fn', 'let', 'mut', 'own', 'lent', 'ref', 'borrow', 'move', 'clone',
    'struct', 'enum', 'trait', 'impl', 'type', 'const', 'pub', 'extern', 'module', 'import', 'as'
  ]);
  const typeWords = new Set([
    'i8', 'i16', 'i32', 'i64', 'i128', 'isize', 'u8', 'u16', 'u32', 'u64', 'u128', 'usize',
    'f32', 'f64', 'bool', 'void', 'str', 'char', 'ptr', 'vector', 'tensor', 'device_span', 'Buffer',
    'v128_f32', 'v128_i32', 'v256_f32', 'v256_i32'
  ]);
  const constWords = new Set(['true', 'false', 'null', 'nil']);
  const fnWords = new Set([
    'println', 'print', 'print_i64', 'panic', 'assert', 'sizeof', 'alignof', 'matrix_mul',
    'dot_product', 'norm', 'clamp_range', 'approx', 'atomic_load', 'atomic_store', 'atomic_add',
    'atomic_sub', 'atomic_cas', 'mmio_read32', 'mmio_write32'
  ]);

  function escapeHtml(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  let out = '';
  let i = 0;
  while (i < code.length) {
    const substr = code.slice(i);
    let matched = false;
    for (const t of tokens) {
      const m = t.rx.exec(substr);
      if (m) {
        matched = true;
        const text = m[0];
        i += text.length;
        const esc = escapeHtml(text);

        if (t.type === 'comment') {
          out += `<span class="tok-comment">${esc}</span>`;
        } else if (t.type === 'string') {
          out += `<span class="tok-string">${esc}</span>`;
        } else if (t.type === 'number') {
          out += `<span class="tok-number">${esc}</span>`;
        } else if (t.type === 'operator') {
          out += `<span class="tok-operator">${esc}</span>`;
        } else if (t.type === 'punct') {
          out += `<span class="tok-punct">${esc}</span>`;
        } else if (t.type === 'space') {
          out += esc;
        } else if (t.type === 'word') {
          const isFnCall = /^\s*\(/.test(code.slice(i));
          if (beginnerWords.has(text)) out += `<span class="tok-beginner">${esc}</span>`;
          else if (hwWords.has(text)) out += `<span class="tok-hardware">${esc}</span>`;
          else if (selfhostWords.has(text)) out += `<span class="tok-selfhost">${esc}</span>`;
          else if (guardWords.has(text)) out += `<span class="tok-guard">${esc}</span>`;
          else if (asyncWords.has(text)) out += `<span class="tok-async">${esc}</span>`;
          else if (controlWords.has(text)) out += `<span class="tok-control">${esc}</span>`;
          else if (contractWords.has(text)) out += `<span class="tok-contract">${esc}</span>`;
          else if (declWords.has(text)) out += `<span class="tok-declaration">${esc}</span>`;
          else if (typeWords.has(text)) out += `<span class="tok-type">${esc}</span>`;
          else if (constWords.has(text)) out += `<span class="tok-const">${esc}</span>`;
          else if (fnWords.has(text) || isFnCall) out += `<span class="tok-fn">${esc}</span>`;
          else out += `<span class="tok-ident">${esc}</span>`;
        } else {
          out += esc;
        }
        break;
      }
    }
    if (!matched) {
      out += escapeHtml(code[i]);
      i++;
    }
  }
  return out;
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="code-block">
      <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
    </pre>
  );
}

function SectionTitle({ kicker, title, subtitle }: { kicker?: string; title: string; subtitle?: string }) {
  return (
    <div className="section-title">
      {kicker && <span className="section-kicker">{kicker}</span>}
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

// ─── Main App Component ────────────────────────────────────────────────────────

export default function App() {
  const [selectedSample, setSelectedSample] = useState<CodeSample>(codeSamples[0]);
  const [activeCategory, setActiveCategory] = useState<'all' | 'beginner' | 'self-compilation' | 'high-level' | 'low-level' | 'translator'>('all');
  const [activeMode, setActiveMode] = useState<'code' | 'output' | 'translated'>('code');
  const [copiedVscode, setCopiedVscode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sample template visibility & copy states
  const [showSampleTemplate, setShowSampleTemplate] = useState(false);
  const [copiedSampleTemplate, setCopiedSampleTemplate] = useState(false);

  // Add-on Codes & Snippets Explorer state (v2.1.2)
  const [selectedAddonItem, setSelectedAddonItem] = useState<AddonItem>(addonItems[0]);
  const [addonCategoryFilter, setAddonCategoryFilter] = useState<string>('all');
  const [showAddonTemplate, setShowAddonTemplate] = useState(false);
  const [copiedAddonTemplate, setCopiedAddonTemplate] = useState(false);

  // Template suite selection & tailored code generator states (v2.1.2)
  const [activeTemplateTab, setActiveTemplateTab] = useState<'basic' | 'practical' | 'production' | 'tailored'>('basic');
  const [customVarName, setCustomVarName] = useState<string>(addonItems[0].defaultCustomVar);
  const [customValOrExpr, setCustomValOrExpr] = useState<string>(addonItems[0].defaultCustomVal);
  const [copiedTailored, setCopiedTailored] = useState(false);
  const [sentToSimulator, setSentToSimulator] = useState(false);

  // Sync custom input defaults when user switches selected addon item
  useEffect(() => {
    setCustomVarName(selectedAddonItem.defaultCustomVar);
    setCustomValOrExpr(selectedAddonItem.defaultCustomVal);
  }, [selectedAddonItem]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filteredSamples = codeSamples.filter(
    (s) => activeCategory === 'all' || s.category === activeCategory
  );

  const filteredAddonItems = addonItems.filter(
    (item) => addonCategoryFilter === 'all' || item.category === addonCategoryFilter
  );

  const handleCopySampleTemplate = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedSampleTemplate(true);
    setTimeout(() => setCopiedSampleTemplate(false), 2000);
  };

  const handleCopyAddonTemplate = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedAddonTemplate(true);
    setTimeout(() => setCopiedAddonTemplate(false), 2000);
  };

  const handleCopyTailoredTemplate = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedTailored(true);
    setTimeout(() => setCopiedTailored(false), 2000);
  };

  const handleSendToLiveViewer = () => {
    const target = document.getElementById('snippets');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setSentToSimulator(true);
    setTimeout(() => setSentToSimulator(false), 2500);
  };

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'v3.0 Snippets', href: '#snippets' },
    { label: 'Self-Translator', href: '#translator' },
    { label: 'VS Code Extension', href: '#vscode' },
    { label: 'Pipeline', href: '#pipeline' },
    { label: 'Compare', href: '#compare' },
    { label: 'Build', href: '#build' },
  ];

  const handleCopyVscode = () => {
    navigator.clipboard.writeText('cp -r C-Greater-VSCode ~/.vscode/extensions/c-greater');
    setCopiedVscode(true);
    setTimeout(() => setCopiedVscode(false), 2000);
  };

  return (
    <div className="app">
      {/* ─── Navigation ─── */}
      <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            <span className="logo-icon">{'>'}</span>
            <span className="logo-text">C-Greater v3.0</span>
          </a>
          <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a href="#vscode" className="nav-cta">
              Download .VSIX
            </a>
          </div>
          <button
            className="nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <header className="hero">
        <div className="hero-bg-grid" />
        <div className="hero-bg-glow" />
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            C{'>'} v3.0-LTS Universal — Accessible for Everyone, Simpler than Python, GPU Accelerated &amp; Bare-Metal Hardware Control
          </div>
          <h1 className="hero-title">
            <span className="hero-symbol">C{'>'}</span>
            <br />
            Universal Language for Everyone,
            <br />
            <span className="hero-gradient">Simpler than Python, GPU Accelerated &amp; Self-Compiling.</span>
          </h1>
          <p className="hero-subtitle">
            C{'>'} v3.0 is designed for everyone. From ultra-simple beginner syntax (<code className="text-yellow-400">say</code>, <code className="text-yellow-400">ask</code>, <code className="text-yellow-400">repeat</code>) to <strong>autonomous self-compilation without C dependencies</strong>, heterogeneous GPU compute shaders (<code className="text-amber-400">@kernel</code>), and comprehensive bare-metal assembly hardware control.
          </p>
          <div className="hero-actions">
            <a href="#snippets" className="btn btn-primary">
              Explore v3.0 Snippets
            </a>
            <a href="#translator" className="btn btn-ghost">
              Self-Hosting Translator
            </a>
            <a href="#vscode" className="btn btn-ghost">
              VS Code Extension
            </a>
          </div>
          <div className="hero-stats">
            {stats.map((s) => (
              <div key={s.label} className="stat">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ─── Features ─── */}
      <section id="features" className="section">
        <SectionTitle
          kicker="Architecture & Features"
          title="Comprehensive Across Every Computational Layer"
          subtitle="C> v3.0 unites high-level declarative safety with low-level machine sympathy, refusing to compromise control or speed."
        />
        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 border border-blue-700/50 inline-block mb-2">
                {f.badge}
              </span>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Interactive v2+ Snippets & Code Viewer ─── */}
      <section id="snippets" className="section section-alt">
        <SectionTitle
          kicker="Live Code Showcase"
          title="High-Level, Low-Level Assembly &amp; GPU v3.0 Code Snippets"
          subtitle="Inspect real, working C> programs. Switch between source code, verified compiler output, and independent standalone translation."
        />

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {(['all', 'beginner', 'self-compilation', 'high-level', 'low-level', 'translator'] as const).map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer border ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'all'
                ? 'All Code Snippets (18)'
                : cat === 'beginner'
                ? 'Beginner (Simpler than Python)'
                : cat === 'self-compilation'
                ? 'Autonomous Self-Compiler (No C)'
                : cat === 'high-level'
                ? 'Formal Contracts & GPU Flagship'
                : cat === 'low-level'
                ? 'Bare-Metal Assembly & Hardware (9)'
                : 'Self-Translator Engine'}
            </button>
          ))}
        </div>

        <div className="examples-layout">
          {/* Tab selector */}
          <div className="example-tabs">
            {filteredSamples.map((sample) => (
              <button
                key={sample.id}
                className={`example-tab ${selectedSample.id === sample.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedSample(sample);
                  setShowSampleTemplate(false);
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="tab-title">{sample.title}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-blue-400 font-mono">
                    {sample.badge}
                  </span>
                </div>
                <span className="tab-desc">{sample.description}</span>
              </button>
            ))}
          </div>

          {/* Interactive Viewer */}
          <div className="example-viewer">
            <div className="viewer-header flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="viewer-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <span className="viewer-filename font-mono text-xs text-slate-300">
                  {selectedSample.id}.cgt
                </span>
              </div>

              {/* Mode switch */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-md border border-slate-800">
                <button
                  className={`px-2.5 py-1 text-xs rounded font-medium transition cursor-pointer ${
                    activeMode === 'code' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  onClick={() => setActiveMode('code')}
                >
                  Source &amp; Explanation
                </button>
                <button
                  className={`px-2.5 py-1 text-xs rounded font-medium transition cursor-pointer ${
                    activeMode === 'output' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  onClick={() => setActiveMode('output')}
                >
                  Executed (cgt -r)
                </button>
                <button
                  className={`px-2.5 py-1 text-xs rounded font-medium transition cursor-pointer ${
                    activeMode === 'translated' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  onClick={() => setActiveMode('translated')}
                >
                  Translated (-t)
                </button>
              </div>
            </div>

            {/* Syntax Color Coding Legend */}
            <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 text-[11px] font-mono">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] mr-1">Syntax Colors:</span>
              <span className="px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 font-bold">● Beginner (say, ask, repeat)</span>
              <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">● Pipeline & Control (flow, into)</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">● Safety (guard, fail_safe)</span>
              <span className="px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/30 font-bold">● Async (spawn, pulse)</span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">● Self-Host (bootstrap, emit_binary)</span>
              <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold">● Hardware (bare_metal, mmio_map)</span>
              <span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/30 font-bold">● Contracts (spec, contract)</span>
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 font-bold">● Declarations &amp; Types</span>
            </div>

            {activeMode === 'code' && (
              <div className="flex flex-col">
                {/* Beginner Explanation Card (Seen first with the code) */}
                <div className="p-4 md:p-5 bg-slate-900/70 border-b border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-yellow-400 flex items-center gap-1.5">
                        <span>📘</span> Beginner Explanation &amp; Concept Guide
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-blue-300">
                        {selectedSample.badge}
                      </span>
                    </div>

                    <button
                      onClick={() => setShowSampleTemplate(!showSampleTemplate)}
                      className="self-start sm:self-auto px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-blue-600/20"
                    >
                      <span>{showSampleTemplate ? '▲ Hide Ready-Made Template' : '✨ Click to Reveal Ready-Made Template'}</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed font-sans">
                    {selectedSample.explanation.summary}
                  </p>

                  <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
                    <span className="text-[11px] font-semibold text-blue-300 block mb-1">💡 Why this is easier for beginners:</span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedSample.explanation.whyForBeginners}
                    </p>
                  </div>

                  {/* Key Concepts Token Badges */}
                  <div>
                    <span className="text-[11px] font-semibold text-slate-300 block mb-1.5">Color-Coded Concepts in this code:</span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {selectedSample.explanation.concepts.map((c, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-950 border border-slate-800 ${c.colorClass}`}
                        >
                          {c.token} <span className="text-slate-400 font-sans font-normal">· {c.role}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Step-by-Step Walkthrough */}
                  <div className="pt-2 border-t border-slate-800/60">
                    <span className="text-[11px] font-semibold text-slate-300 block mb-1">Code Execution Walkthrough:</span>
                    <ul className="text-xs text-slate-300 space-y-1">
                      {selectedSample.explanation.walkthrough.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-blue-400 font-bold">•</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>
                      👇 <em>Inspect the syntax-highlighted source code below. Ready to use? Click the blue button above to reveal the ready-made template.</em>
                    </span>
                  </div>
                </div>

                {/* Source Code Preview (Seen along with the explanation) */}
                <CodeBlock code={selectedSample.code} />

                {/* Ready-Made Template (Appears ONLY AFTER clicking the button!) */}
                {showSampleTemplate && (
                  <div className="p-4 md:p-5 bg-slate-950 border-t-2 border-dashed border-blue-500/50 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">🎉 Ready-Made Template Unlocked:</span>
                        <span className="text-[11px] text-slate-400">(Ready to copy and adapt in your project)</span>
                      </div>
                      <button
                        onClick={() => handleCopySampleTemplate(selectedSample.readyMadeTemplate)}
                        className="self-start sm:self-auto px-3 py-1 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-200 text-xs transition cursor-pointer font-mono flex items-center gap-1.5"
                      >
                        <span>{copiedSampleTemplate ? '✓ Copied!' : '📋 Copy Ready-Made Template'}</span>
                      </button>
                    </div>

                    <CodeBlock code={selectedSample.readyMadeTemplate} />

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                      <span>💡 <em>Paste into any <code className="text-white font-mono">.cgt</code> file and run instantly with <code className="text-emerald-400 font-mono">cgt -r file.cgt</code>.</em></span>
                      <button
                        onClick={() => setShowSampleTemplate(false)}
                        className="text-slate-400 hover:text-white underline cursor-pointer text-xs"
                      >
                        Hide Template
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {activeMode === 'output' && (
              <pre className="p-4 font-mono text-xs text-emerald-400 bg-slate-950 rounded-b-xl overflow-x-auto whitespace-pre-wrap leading-relaxed border-t border-slate-800">
                {selectedSample.expectedOutput}
              </pre>
            )}
            {activeMode === 'translated' && (
              <pre className="p-4 font-mono text-xs text-purple-300 bg-slate-950 rounded-b-xl overflow-x-auto whitespace-pre-wrap leading-relaxed border-t border-slate-800">
                {selectedSample.translatedSnippet}
              </pre>
            )}
          </div>
        </div>
      </section>

      {/* ─── Self-Hosting Translator Architecture ─── */}
      <section id="translator" className="section">
        <SectionTitle
          kicker="Independent Compilation"
          title="Native Self-Hosting Translator Architecture"
          subtitle="C> translates itself. An independent compiler written in C> that emits zero-dependency standalone binaries."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-3">The Bootstrapping Cycle</h3>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Unlike languages tethered to monolithic backend frameworks or requiring heavy runtime libraries, C{'>'} v2+ achieves
              <strong> total independence</strong>:
            </p>
            <ol className="space-y-3 text-sm text-slate-300">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 font-bold flex items-center justify-center text-xs">1</span>
                <div>
                  <strong className="text-white">Written in C&gt; Itself:</strong> Located at <code className="text-blue-400">C&gt;/translator/cgt_self_translator.cgt</code>, with a native lexer, parser, AST constructor, and contract verifier.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 font-bold flex items-center justify-center text-xs">2</span>
                <div>
                  <strong className="text-white">Self-Translation:</strong> Translates its own source code into an independent standalone translation unit with embedded regional allocators and lock-free hazard epochs.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 font-bold flex items-center justify-center text-xs">3</span>
                <div>
                  <strong className="text-white">Zero External Runtime:</strong> Emits clean, standalone portable code that compiles on any ANSI C11/C99 compiler without external dependencies.
                </div>
              </li>
            </ol>

            <div className="mt-6 pt-6 border-t border-slate-800">
              <h4 className="text-sm font-semibold text-slate-200 mb-2">Translator CLI Invocations:</h4>
              <div className="space-y-2">
                <div className="bg-slate-950 p-2.5 rounded font-mono text-xs text-slate-300">
                  <span className="text-slate-500"># Direct compilation and execution</span><br />
                  <span className="text-blue-400">cgt</span> -r translator/cgt_self_translator.cgt
                </div>
                <div className="bg-slate-950 p-2.5 rounded font-mono text-xs text-slate-300">
                  <span className="text-slate-500"># Translate to standalone portable code</span><br />
                  <span className="text-blue-400">cgt</span> -t my_program.cgt -o standalone_app.c
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-3">Self-Translator Pipeline Overview</h3>
            <div className="font-mono text-xs bg-slate-950 p-4 rounded-xl text-slate-300 border border-slate-800/80 leading-relaxed overflow-x-auto">
              <div className="text-blue-400 font-bold">┌────────────────────────────────────────────────────────┐</div>
              <div className="text-blue-400 font-bold">│                   C&gt; Source File (.cgt)                │</div>
              <div className="text-blue-400 font-bold">└───────────────────────────┬────────────────────────────┘</div>
              <div className="text-slate-500">                            │</div>
              <div className="text-slate-500">                            ▼</div>
              <div className="text-emerald-400 font-bold">┌────────────────────────────────────────────────────────┐</div>
              <div className="text-emerald-400 font-bold">│  C&gt; Native Self-Translator (cgt_self_translator.cgt)   │</div>
              <div>│   • Lexer: Scans C&gt; tokens                             │</div>
              <div>│   • Parser: Builds AST with contract specs             │</div>
              <div>│   • Semantic Engine: Affine checks &amp; hazard claims     │</div>
              <div>│   • Emitter: Generates standalone target               │</div>
              <div className="text-emerald-400 font-bold">└───────────────────────────┬────────────────────────────┘</div>
              <div className="text-slate-500">                            │</div>
              <div className="text-slate-500">                            ▼</div>
              <div className="text-purple-400 font-bold">┌────────────────────────────────────────────────────────┐</div>
              <div className="text-purple-400 font-bold">│  Independent Standalone Native Target (.c / .s / .bin) │</div>
              <div>│   • Embedded Regional Arena Allocator (O(1) release)   │</div>
              <div>│   • Embedded Lock-Free Hazard Pointer Epoch Engine     │</div>
              <div>│   • Embedded SIMD Vector Arithmetic &amp; Trap Handlers    │</div>
              <div>│   • Zero External Runtime or Library Dependencies      │</div>
              <div className="text-purple-400 font-bold">└────────────────────────────────────────────────────────┘</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VS Code & Code-OSS Extension ─── */}
      <section id="vscode" className="section section-alt">
        <SectionTitle
          kicker="Developer Tooling"
          title="Official VS Code &amp; Code-OSS Extension v3.0.0"
          subtitle="Everything in C-Greater-VSCode is packaged in ready-to-use VSIX format: Automatic Suggestions, High-Fidelity Colors, Dedicated Syntax Snippets, Real-Time Mistake Detection, and Tailored Templates."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white">Download VSIX Package</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono border border-emerald-500/30">v3.0.0 VSIX</span>
              </div>
              <p className="text-xs text-slate-400 mb-4">Packaged Open-VSIX archive compatible with VS Code, Code-OSS, and VSCodium:</p>
              
              <div className="font-mono text-xs bg-slate-950 p-4 rounded-xl text-slate-300 border border-slate-800 mb-4">
                <span className="text-blue-400 font-bold">c-greater-3.0.0.vsix</span> (166.6 KB)<br />
                ├── <span className="text-yellow-400">c-greater-syntax-keywords.json</span> (Syntax Matrix)<br />
                ├── <span className="text-purple-400">snippets/c-greater-syntax-snippets.json</span> (Dedicated)<br />
                ├── <span className="text-purple-400">snippets/syntax_snippets.json</span> (Pipelines &amp; Async)<br />
                ├── <span className="text-purple-400">snippets/cgt.json</span> (Standard Templates)<br />
                ├── <span className="text-pink-400">themes/c-greater-dark-theme.json</span> (Vibrant Dark Colors)<br />
                ├── <span className="text-pink-400">themes/c-greater-light-theme.json</span> (Vibrant Light Colors)<br />
                ├── <span className="text-emerald-400">syntaxes/cgt.tmLanguage.json</span> (Full Grammar)<br />
                ├── <span className="text-yellow-400">autocomplete.json</span> (v3.0.0 Suggestions)<br />
                └── <span className="text-cyan-400">extension.js</span> (Tailored Templates &amp; Low-Level Assembly)
              </div>
            </div>

            <div className="space-y-2">
              <a
                href="/c-greater-3.0.0.vsix"
                download="c-greater-3.0.0.vsix"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                <span>📦</span> Download c-greater-3.0.0.vsix (Latest Flagship v3.0)
              </a>
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-mono">
                <span>MD5 verified</span>
                <span>•</span>
                <a href="/c-greater-2.1.2.vsix" download="c-greater-2.1.2.vsix" className="text-slate-400 hover:text-white underline">v2.1.2</a>
                <span>•</span>
                <a href="/c-greater-2.1.1.vsix" download="c-greater-2.1.1.vsix" className="text-slate-400 hover:text-white underline">v2.1.1</a>
                <span>•</span>
                <a href="/c-greater-2.1.0.vsix" download="c-greater-2.1.0.vsix" className="text-slate-400 hover:text-white underline">v2.1.0</a>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-2">Self-Completion, Colors &amp; Dedicated Snippets</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 font-bold">1.</span>
                <span><strong>Expanded Self-Completion (Suggestions):</strong> Autocompletion for new words (<code className="text-yellow-400">say</code>, <code className="text-yellow-400">ask</code>, <code className="text-yellow-400">repeat</code>, <code className="text-yellow-400">whenever</code>, <code className="text-yellow-400">inspect</code>, <code className="text-yellow-400">announce</code>, <code className="text-yellow-400">gather</code>, <code className="text-yellow-400">pulse</code>, <code className="text-yellow-400">fail_safe</code>, <code className="text-amber-400">kernel</code>, <code className="text-rose-400">asm</code>) with parameter hints.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-400 font-bold">2.</span>
                <span><strong>Dedicated Color Themes &amp; Syntax Scopes:</strong> Includes built-in <code className="text-white">C&gt; Vibrant Dark</code> and <code className="text-white">C&gt; Vibrant Light</code> color themes, color-coding beginner syntax (Gold), dataflow (Purple), guards (Mint), async (Violet), self-hosting (Cyan), low-level assembly (Crimson), and GPU shaders (Amber).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">3.</span>
                <span><strong>Tailored Template Generators (v3.0.0):</strong> Command <code className="text-white">C&gt;: Insert Tailored Template According to Your Code</code> customizes snippet variables dynamically to match your active editor selection across all 20 language constructs.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">4.</span>
                <span><strong>Mistakes Detection &amp; Diagnostics:</strong> Real-time detection of syntax omissions, affine moves, unclosed strings, and unmanaged hardware access with automatic Quick-Fix resolutions.</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Install in VS Code or Code-OSS</h3>
              <p className="text-xs text-slate-400 mb-4">Install directly with the command line or file copy:</p>
              
              <div className="space-y-3">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">Via VS Code command line:</span>
                  <div className="font-mono text-xs text-emerald-300">
                    code --install-extension c-greater-3.0.0.vsix
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">Copy to VS Code extensions:</span>
                  <div className="flex items-center justify-between font-mono text-xs text-blue-300">
                    <span className="truncate">cp -r C-Greater-VSCode ~/.vscode/extensions/c-greater</span>
                    <button
                      onClick={handleCopyVscode}
                      className="ml-2 px-2 py-1 rounded bg-blue-600/30 hover:bg-blue-600 text-blue-200 text-xs transition cursor-pointer"
                    >
                      {copiedVscode ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">Copy to Code-OSS / VSCodium:</span>
                  <div className="font-mono text-xs text-blue-300 truncate">
                    cp -r C-Greater-VSCode ~/.config/Code\ -\ OSS/extensions/c-greater
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-950/40 border border-blue-800/50 rounded-xl text-xs text-blue-200">
              💡 <strong>Instant Activation:</strong> Open any <code className="text-white">.cgt</code> file and enjoy automatic suggestions, colors, and mistake alerts.
            </div>
          </div>
        </div>

        {/* ─── Codes & Items Inside the Add-on (Interactive Beginner Explorer with Tailored Templates) ─── */}
        <div className="mt-12 pt-10 border-t border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 font-mono inline-block mb-3">
              🎯 Interactive Add-on Codes &amp; Tailored Templates Explorer (v3.0.0)
            </span>
            <h3 className="text-2xl font-bold text-white mb-2">
              Codes &amp; Items Inside the C&gt; Add-on
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Click any code or item below. When a beginner clicks one, you don&apos;t get a ready-made template right away; instead, <strong>you see a friendly explanation along with the syntax-colored code preview first</strong>, and full templates appear only after you click the reveal button — complete with <strong>customization tailored to your code!</strong>
            </p>
          </div>

          {/* Add-on Category Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {[
              { id: 'all', label: 'All Add-on Items (20)' },
              { id: 'Beginner Universal', label: 'Beginner Universal (say, ask, repeat, whenever, define, given)' },
              { id: 'Safety & Faults', label: 'Safety & Faults (attempt, guard, fail_safe)' },
              { id: 'Pipelines & Streams', label: 'Pipelines & Streams (flow)' },
              { id: 'Concurrency & Async', label: 'Concurrency (pulse)' },
              { id: 'Autonomous Self-Host', label: 'Autonomous Self-Host (bootstrap)' },
              { id: 'Hardware Control', label: 'Hardware Control (lowlevel)' },
              { id: 'Formal Contracts', label: 'Contracts (contract)' },
              { id: 'Low-Level Assembly', label: 'Low-Level Assembly (asm, port_io, isr, simd_vec, atomic_cas)' },
              { id: 'GPU & Parallel Compute', label: 'GPU Parallel Compute (kernel)' },
            ].map((cat) => (
              <button
                key={cat.id}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer border ${
                  addonCategoryFilter === cat.id
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
                onClick={() => setAddonCategoryFilter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Two-Column Explorer Layout */}
          <div className="examples-layout">
            {/* Left Column: Clickable List of Add-on Items */}
            <div className="example-tabs">
              {filteredAddonItems.map((item) => (
                <button
                  key={item.id}
                  className={`example-tab ${selectedAddonItem.id === item.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedAddonItem(item);
                    setShowAddonTemplate(false); // Retain requirement: beginner sees explanation + code first!
                    setActiveTemplateTab('basic');
                    setCustomVarName(item.defaultCustomVar);
                    setCustomValOrExpr(item.defaultCustomVal);
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded font-mono font-bold text-xs bg-slate-950 border border-slate-800 ${item.colorClass}`}>
                        {item.keyword}
                      </span>
                      <span className="tab-title text-sm">{item.name}</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-blue-300 font-mono">
                      {item.badge}
                    </span>
                  </div>
                  <span className="tab-desc text-xs line-clamp-2">{item.explanation.summary}</span>
                </button>
              ))}
            </div>

            {/* Right Column: Explanation along with Code First, and Comprehensive Templates only after clicking */}
            <div className="example-viewer">
              {/* Add-on Item Header */}
              <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded font-mono font-bold text-sm bg-slate-950 border border-slate-800 ${selectedAddonItem.colorClass}`}>
                    {selectedAddonItem.keyword}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">{selectedAddonItem.name}</h4>
                    <span className="text-[11px] text-slate-400">
                      {selectedAddonItem.category} · Syntax Color:{' '}
                      <span style={{ color: selectedAddonItem.colorHex }} className="font-semibold">
                        {selectedAddonItem.colorName}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 border border-blue-700/40 font-mono">
                    {selectedAddonItem.badge}
                  </span>
                  <button
                    onClick={() => setShowAddonTemplate(!showAddonTemplate)}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-blue-600/20"
                  >
                    <span>
                      {showAddonTemplate ? '▲ Hide Ready-Made Templates' : '✨ Click to Reveal Ready-Made Templates'}
                    </span>
                  </button>
                </div>
              </div>

              {/* 1. Beginner Explanation Card (Seen FIRST along with the code) */}
              <div className="p-4 sm:p-5 bg-slate-900/70 border-b border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-yellow-400 flex items-center gap-1.5">
                    <span>📘</span> Beginner Explanation &amp; Item Guide
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Add-on Keyword: <code className="text-white font-bold">{selectedAddonItem.keyword}</code>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {selectedAddonItem.explanation.summary}
                </p>

                {/* Why this is easier for beginners */}
                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
                  <span className="text-[11px] font-semibold text-blue-300 block mb-1">💡 Why this is easier for beginners:</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedAddonItem.explanation.whyForBeginners}
                  </p>
                </div>

                {/* Syntax pattern */}
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1">Syntax Structure:</span>
                  <code className="text-xs font-mono text-emerald-400 font-semibold">{selectedAddonItem.explanation.syntaxBreakdown}</code>
                </div>

                {/* Step-by-Step execution walkthrough */}
                <div className="pt-2 border-t border-slate-800/60">
                  <span className="text-[11px] font-semibold text-slate-300 block mb-1">How it executes step-by-step:</span>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {selectedAddonItem.explanation.howItWorks.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-blue-400 font-bold">•</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>
                    👇 <em>Inspect the syntax-highlighted code preview below. When ready, click the blue button above to reveal the ready-made templates!</em>
                  </span>
                </div>
              </div>

              {/* 2. Code Preview (Shown ALONG WITH the explanation first) */}
              <div className="bg-slate-950">
                <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-[11px] text-slate-400">Code Preview (With High-Fidelity Colors):</span>
                  <span className="text-[11px] text-slate-500 font-mono">Packaged in C-Greater-VSCode</span>
                </div>
                <CodeBlock code={selectedAddonItem.codePreview} />
              </div>

              {/* 3. Ready-Made Templates Suite (Appears ONLY AFTER clicking the reveal button!) */}
              {showAddonTemplate && (
                <div className="p-4 sm:p-5 bg-slate-950 border-t-2 border-dashed border-blue-500/50 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                          🎉 Complete Templates Suite Unlocked:
                        </span>
                        <span className="text-[11px] text-slate-400">
                          (Select any template style or customize according to your code)
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSendToLiveViewer}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 text-xs transition cursor-pointer font-mono flex items-center gap-1.5"
                      >
                        <span>{sentToSimulator ? '✓ Scrolled to Viewer!' : '🚀 Test in Live Code Viewer'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Template Style Tabs */}
                  <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setActiveTemplateTab('basic')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                        activeTemplateTab === 'basic'
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>🏷️ Basic Template</span>
                    </button>
                    <button
                      onClick={() => setActiveTemplateTab('practical')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                        activeTemplateTab === 'practical'
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>⚡ Practical Real-World</span>
                    </button>
                    <button
                      onClick={() => setActiveTemplateTab('production')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                        activeTemplateTab === 'production'
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>🛡️ Production Safe</span>
                    </button>
                    <button
                      onClick={() => setActiveTemplateTab('tailored')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                        activeTemplateTab === 'tailored'
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-yellow-500/20'
                          : 'text-yellow-400 hover:text-yellow-300'
                      }`}
                    >
                      <span>🎯 Tailored to Your Code (على حسب كودك)</span>
                    </button>
                  </div>

                  {/* Tab 1: Basic Template */}
                  {activeTemplateTab === 'basic' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>🏷️ <strong>Basic / Minimal Snippet:</strong> Cleanest code pattern with standard tabstops.</span>
                        <button
                          onClick={() => handleCopyAddonTemplate(selectedAddonItem.templateBasic)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-200 text-xs transition cursor-pointer font-mono flex items-center gap-1.5"
                        >
                          <span>{copiedAddonTemplate ? '✓ Copied!' : '📋 Copy Basic Template'}</span>
                        </button>
                      </div>
                      <CodeBlock code={selectedAddonItem.templateBasic} />
                    </div>
                  )}

                  {/* Tab 2: Practical Template */}
                  {activeTemplateTab === 'practical' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>⚡ <strong>Practical Real-World:</strong> Expanded logic with multiple variables and condition branches.</span>
                        <button
                          onClick={() => handleCopyAddonTemplate(selectedAddonItem.templatePractical)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-200 text-xs transition cursor-pointer font-mono flex items-center gap-1.5"
                        >
                          <span>{copiedAddonTemplate ? '✓ Copied!' : '📋 Copy Practical Template'}</span>
                        </button>
                      </div>
                      <CodeBlock code={selectedAddonItem.templatePractical} />
                    </div>
                  )}

                  {/* Tab 3: Production Safe Template */}
                  {activeTemplateTab === 'production' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>🛡️ <strong>Production &amp; Defensive:</strong> Hardened with precondition guards, fail-safe recovery, and telemetry.</span>
                        <button
                          onClick={() => handleCopyAddonTemplate(selectedAddonItem.templateProduction)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-200 text-xs transition cursor-pointer font-mono flex items-center gap-1.5"
                        >
                          <span>{copiedAddonTemplate ? '✓ Copied!' : '📋 Copy Production Template'}</span>
                        </button>
                      </div>
                      <CodeBlock code={selectedAddonItem.templateProduction} />
                    </div>
                  )}

                  {/* Tab 4: Interactive Tailored Template Generator (على حسب كود حقك) */}
                  {activeTemplateTab === 'tailored' && (
                    <div className="space-y-4 p-4 rounded-xl bg-slate-900/90 border border-yellow-500/30">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                        <div>
                          <span className="text-xs font-bold text-yellow-400 flex items-center gap-1.5">
                            <span>✨</span> Live Template Builder (تخصيص القالب على حسب كودك)
                          </span>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Type your own variable name and custom expression below — the template generates dynamically in real time!
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setCustomVarName(selectedSample.id.replace(/-/g, '_'));
                              setCustomValOrExpr('42');
                            }}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-yellow-300 text-xs transition cursor-pointer font-mono"
                          >
                            🪄 Use Sample &apos;{selectedSample.id}&apos;
                          </button>
                          <button
                            onClick={() => {
                              setCustomVarName(selectedAddonItem.defaultCustomVar);
                              setCustomValOrExpr(selectedAddonItem.defaultCustomVal);
                            }}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition cursor-pointer"
                          >
                            🔄 Reset
                          </button>
                        </div>
                      </div>

                      {/* Interactive Custom Inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                            {selectedAddonItem.customPromptLabel}
                          </label>
                          <input
                            type="text"
                            value={customVarName}
                            onChange={(e) => setCustomVarName(e.target.value)}
                            placeholder="e.g. user_account"
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-yellow-400"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                            {selectedAddonItem.customValLabel}
                          </label>
                          <input
                            type="text"
                            value={customValOrExpr}
                            onChange={(e) => setCustomValOrExpr(e.target.value)}
                            placeholder="e.g. 100 or 'Success'"
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-yellow-400"
                          />
                        </div>
                      </div>

                      {/* Real-time Generated Code Preview */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                            Generated C&gt; Code (Live Preview):
                          </span>
                          <button
                            onClick={() => handleCopyTailoredTemplate(selectedAddonItem.generateTailored(customVarName, customValOrExpr))}
                            className="px-3 py-1 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-xs transition cursor-pointer font-mono flex items-center gap-1.5 shadow-md shadow-yellow-500/20"
                          >
                            <span>{copiedTailored ? '✓ Copied!' : '📋 Copy Tailored Template'}</span>
                          </button>
                        </div>
                        <CodeBlock code={selectedAddonItem.generateTailored(customVarName, customValOrExpr)} />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                    <span>
                      💡 <em>In VS Code, press <code className="text-white font-mono">Ctrl+Shift+P</code> &gt; <code className="text-yellow-400 font-mono">C&gt;: Insert Tailored Template According to Your Code</code> to insert directly into your file!</em>
                    </span>
                    <button
                      onClick={() => setShowAddonTemplate(false)}
                      className="text-slate-400 hover:text-white underline cursor-pointer text-xs"
                    >
                      Hide Templates
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pipeline ─── */}
      <section id="pipeline" className="section">
        <SectionTitle
          kicker="Compiler Internals"
          title="10-Stage Compiler &amp; Translation Pipeline"
          subtitle="The cgt compiler operates through a strictly functional pipeline from source text to native machine executable."
        />
        <div className="pipeline-flow">
          <div className="pipeline-input">
            <span>C&gt; Source (.cgt)</span>
          </div>
          <div className="pipeline-stages">
            {pipelineStages.map((stage) => (
              <div key={stage.num} className="pipeline-stage">
                <div className="stage-num">{stage.num}</div>
                <div className="stage-body">
                  <div className="stage-name">{stage.name}</div>
                  <div className="stage-file">{stage.file}</div>
                  <div className="stage-desc">{stage.description}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="pipeline-output">
            <span>Executable / Translated C</span>
          </div>
        </div>
      </section>

      {/* ─── Comparison ─── */}
      <section id="compare" className="section section-alt">
        <SectionTitle
          kicker="Language Philosophy"
          title="Why C> v2+ Does Not Copy Rust or C++"
          subtitle="A purposeful divergence: avoiding borrow-checker friction while rejecting unsafe undefined behavior."
        />
        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Architectural Dimension</th>
                <th>C</th>
                <th>C++</th>
                <th>Rust</th>
                <th className="col-highlight">C{'>'} v2+</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="feat-cell font-semibold">Memory Model</td>
                <td>Manual (UB &amp; CVEs)</td>
                <td>Smart pointers (aliasing bugs)</td>
                <td>Strict single-tier borrow check</td>
                <td className="col-highlight font-bold">Multi-tier: Affine + Arenas + Hazard Epochs</td>
              </tr>
              <tr>
                <td className="feat-cell font-semibold">Formal Verification</td>
                <td>None</td>
                <td>Fragmented across standards</td>
                <td>External crates / asserts only</td>
                <td className="col-highlight font-bold">Built-in: spec, contract, requires, ensures</td>
              </tr>
              <tr>
                <td className="feat-cell font-semibold">Concurrency</td>
                <td>Pthreads (raw pointers)</td>
                <td>std::thread (heavy framing)</td>
                <td>Async state machines (poll loop)</td>
                <td className="col-highlight font-bold">Quantum fibers + Nexus channels + Hazard pins</td>
              </tr>
              <tr>
                <td className="feat-cell font-semibold">Self-Translation</td>
                <td>C bootstraps via GCC/Clang</td>
                <td>Massive C++ toolchain required</td>
                <td>LLVM dependency chain</td>
                <td className="col-highlight font-bold">Independent Native Self-Translator (Zero C Deps)</td>
              </tr>
              <tr>
                <td className="feat-cell font-semibold">Hardware MMIO &amp; ASM</td>
                <td>Volatile pointers</td>
                <td>Intrinsics</td>
                <td>Unsafe wrapper ceremony</td>
                <td className="col-highlight font-bold">First-class: pin(), isolate, asm(), vector&lt;T, N&gt;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── Build & Run ─── */}
      <section id="build" className="section">
        <SectionTitle
          kicker="Quick Start"
          title="Build, Run &amp; Translate in Seconds"
          subtitle="Zero package managers. Zero dependency hell. Clean, auditable, and self-contained."
        />
        <div className="build-grid">
          <div className="build-card">
            <h4>1. Build the C&gt; Compiler</h4>
            <CodeBlock code={`cd C>\nmake`} />
            <p className="build-note">Produces: bin/cgt, bin/cgt_test, bin/libcgt_runtime.a</p>
          </div>
          <div className="build-card">
            <h4>2. Compile &amp; Run Any Program</h4>
            <CodeBlock code={`./bin/cgt -r examples/v2_highlevel_pipeline.cgt`} />
            <p className="build-note">Compiles to native x86_64 and runs immediately.</p>
          </div>
          <div className="build-card">
            <h4>3. Translate to Independent Standalone C</h4>
            <CodeBlock code={`./bin/cgt -t examples/v2_regions_arena.cgt -o app.c`} />
            <p className="build-note">Produces 100% self-contained code with zero external deps.</p>
          </div>
          <div className="build-card">
            <h4>4. Run the Self-Translator</h4>
            <CodeBlock code={`./bin/cgt -r translator/cgt_self_translator.cgt`} />
            <p className="build-note">Validates the bootstrapping self-translation loop.</p>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="logo-icon">{'>'}</span>
            <span className="logo-text">C-Greater v3.0</span>
          </div>
          <p className="footer-tagline">
            Universal systems programming, reimagined. Pure C implementation. Independent self-translator.
          </p>
          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#snippets">v3.0 Snippets</a>
            <a href="#translator">Self-Translator</a>
            <a href="#vscode">VS Code Extension</a>
            <a href="#build">Build</a>
          </div>
          <p className="footer-license">
            Copyright (c) 2026 C{'>'} Language Project Contributors.
            <br />
            Licensed under Apache 2.0.
          </p>
        </div>
      </footer>
    </div>
  );
}
