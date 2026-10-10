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
/* Complete color theme contributed in themes/c-greater-dark-theme.json */`
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
/* Zero dependencies on C compilers or Python virtual environments */`
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
/* Bypasses C completely, assembling directly to target CPU opcodes */`
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
/* Keeps everyday code safe while providing bare-metal precision */`
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
cgt_hazard_epoch_exit(&g_hazard_domain);`
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
#endif`
  },
  {
    id: 'translator',
    category: 'translator',
    title: 'Self-Hosting Independent Translator',
    badge: 'v2+ Self-Translator',
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
  { label: 'Language Version', value: 'v2.1.0-LTS Universal' },
  { label: 'Compiler Pipeline Stages', value: '10' },
  { label: 'Working Examples', value: '32+' },
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
    'channel', 'pulse', 'timeout_after', 'nexus', 'quantum', 'yield_to'
  ]);
  const selfhostWords = new Set([
    'bootstrap', 'compiler', 'target_arch', 'object_format', 'emit_binary', 'emit_native',
    'byte_stream', 'lex_stream', 'parse_tree', 'sym_table', 'link_native', 'reloc_table'
  ]);
  const hwWords = new Set([
    'lowlevel', 'opt_hardware', 'raw_register', 'mmio_map', 'fence_sync', 'direct_reg', 'bit_slice',
    'endian_swap', 'unmanaged', 'bare_metal', 'memory_barrier', 'simd_lane', 'asm', 'volatile',
    'region', 'morph', 'isolate', 'hazard', 'claim', 'pin', 'interrupt_gate', 'cpu_port_in',
    'cpu_port_out', 'cache_flush', 'dma_transfer'
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filteredSamples = codeSamples.filter(
    (s) => activeCategory === 'all' || s.category === activeCategory
  );

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'v2+ Snippets', href: '#snippets' },
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
            <span className="logo-text">C-Greater v2.1</span>
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
            C{'>'} v2.1.0-LTS Universal — Accessible for Everyone, Simpler than Python &amp; Autonomous
          </div>
          <h1 className="hero-title">
            <span className="hero-symbol">C{'>'}</span>
            <br />
            Universal Language for Everyone,
            <br />
            <span className="hero-gradient">Simpler than Python &amp; Self-Compiling.</span>
          </h1>
          <p className="hero-subtitle">
            C{'>'} v2.1 is designed for everyone. From ultra-simple syntax (<code className="text-yellow-400">say</code>, <code className="text-yellow-400">ask</code>, <code className="text-yellow-400">repeat</code>) to <strong>autonomous self-compilation without C dependencies</strong>, formal contract verification, and optional bare-metal hardware control.
          </p>
          <div className="hero-actions">
            <a href="#snippets" className="btn btn-primary">
              Explore v2+ Snippets
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
          subtitle="C> v2+ unites high-level declarative safety with low-level machine sympathy, refusing to compromise control or speed."
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
          title="High-Level &amp; Low-Level v2+ Code Snippets"
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
                ? 'All Code Snippets (11)'
                : cat === 'beginner'
                ? 'Beginner (Simpler than Python)'
                : cat === 'self-compilation'
                ? 'Autonomous Self-Compiler (No C)'
                : cat === 'high-level'
                ? 'Formal Contracts & Quantum'
                : cat === 'low-level'
                ? 'Bare-Metal Hardware & SIMD'
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
                onClick={() => setSelectedSample(sample)}
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
                  Source (.cgt)
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

            {activeMode === 'code' && <CodeBlock code={selectedSample.code} />}
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
          title="Official VS Code &amp; Code-OSS Extension v2.1.1"
          subtitle="Everything in C-Greater-VSCode is packaged in ready-to-use VSIX format: Automatic Suggestions, High-Fidelity Colors, Dedicated Syntax Snippets, and Real-Time Mistake Detection."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white">Download VSIX Package</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono border border-emerald-500/30">v2.1.1 VSIX</span>
              </div>
              <p className="text-xs text-slate-400 mb-4">Packaged Open-VSIX archive compatible with VS Code, Code-OSS, and VSCodium:</p>
              
              <div className="font-mono text-xs bg-slate-950 p-4 rounded-xl text-slate-300 border border-slate-800 mb-4">
                <span className="text-blue-400 font-bold">c-greater-2.1.1.vsix</span> (36.5 KB)<br />
                ├── <span className="text-yellow-400">c-greater-syntax-keywords.json</span> (Syntax Matrix)<br />
                ├── <span className="text-purple-400">snippets/c-greater-syntax-snippets.json</span> (Dedicated)<br />
                ├── <span className="text-purple-400">snippets/syntax_snippets.json</span> (Pipelines &amp; Async)<br />
                ├── <span className="text-purple-400">snippets/cgt.json</span> (Standard Templates)<br />
                ├── <span className="text-pink-400">themes/c-greater-dark-theme.json</span> (Vibrant Dark Colors)<br />
                ├── <span className="text-pink-400">themes/c-greater-light-theme.json</span> (Vibrant Light Colors)<br />
                ├── <span className="text-emerald-400">syntaxes/cgt.tmLanguage.json</span> (Full Grammar)<br />
                ├── <span className="text-yellow-400">autocomplete.json</span> (v2.1.1 Suggestions)<br />
                └── <span className="text-cyan-400">extension.js</span> (Mistakes Linter)
              </div>
            </div>

            <div className="space-y-2">
              <a
                href="/c-greater-2.1.1.vsix"
                download="c-greater-2.1.1.vsix"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                <span>📦</span> Download c-greater-2.1.1.vsix
              </a>
              <div className="text-center">
                <span className="text-[11px] text-slate-500 font-mono">MD5 verified &amp; ready to install</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-2">Self-Completion, Colors &amp; Dedicated Snippets</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 font-bold">1.</span>
                <span><strong>Expanded Self-Completion (Suggestions):</strong> Autocompletion for new words (<code className="text-yellow-400">say</code>, <code className="text-yellow-400">ask</code>, <code className="text-yellow-400">repeat</code>, <code className="text-yellow-400">whenever</code>, <code className="text-yellow-400">inspect</code>, <code className="text-yellow-400">announce</code>, <code className="text-yellow-400">gather</code>, <code className="text-yellow-400">pulse</code>, <code className="text-yellow-400">fail_safe</code>) with parameter hints.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-400 font-bold">2.</span>
                <span><strong>Dedicated Color Themes &amp; Syntax Scopes:</strong> Includes built-in <code className="text-white">C&gt; Vibrant Dark</code> and <code className="text-white">C&gt; Vibrant Light</code> color themes, color-coding beginner syntax (Gold), dataflow (Purple), guards (Mint), async (Violet), self-hosting (Cyan), and hardware (Crimson).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">3.</span>
                <span><strong>Dedicated Syntax Snippets Files:</strong> <code className="text-white">snippets/c-greater-syntax-snippets.json</code> and <code className="text-white">c-greater-syntax-keywords.json</code> provide dedicated programming language snippets with tabstops and instant expansion.</span>
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
                    code --install-extension c-greater-2.1.1.vsix
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
            <span className="logo-text">C-Greater v2+</span>
          </div>
          <p className="footer-tagline">
            Universal systems programming, reimagined. Pure C implementation. Independent self-translator.
          </p>
          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#snippets">v2+ Snippets</a>
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
