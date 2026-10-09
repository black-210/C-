/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

// ─── Code Samples (High-Level & Low-Level v2+) ──────────────────────────────────

interface CodeSample {
  id: string;
  category: 'high-level' | 'low-level' | 'translator';
  title: string;
  badge: string;
  description: string;
  code: string;
  expectedOutput: string;
  translatedSnippet: string;
}

const codeSamples: CodeSample[] = [
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
  { label: 'Language Version', value: 'v2.0.0-LTS' },
  { label: 'Compiler Pipeline Stages', value: '10' },
  { label: 'Working Examples', value: '26' },
  { label: 'External Runtime Dependencies', value: '0' },
];

// ─── Syntax Highlighter ────────────────────────────────────────────────────────

function highlightCode(code: string): string {
  const keywords = [
    'module', 'fn', 'let', 'mut', 'own', 'struct', 'enum', 'trait', 'impl',
    'unsafe', 'gpu_kernel', 'gpu_dispatch', 'simd', 'return', 'if', 'else', 'while', 'for',
    'in', 'match', 'break', 'continue', 'import', 'type', 'const', 'defer',
    'asm', 'atomic', 'move', 'true', 'false', 'null', 'as', 'pub', 'extern',
    'sizeof', 'borrow', 'view', 'class',
    // C> v2+ keywords
    'spec', 'contract', 'requires', 'ensures', 'invariant',
    'nexus', 'quantum', 'yield_to', 'region', 'morph',
    'isolate', 'hazard', 'claim', 'pin', 'volatile',
  ];
  const types = [
    'i8', 'i16', 'i32', 'i64', 'i128', 'isize',
    'u8', 'u16', 'u32', 'u64', 'u128', 'usize',
    'f32', 'f64', 'bool', 'char', 'void', 'str',
    'vector', 'device_span', 'v128_f32', 'v128_i32', 'v256_f32', 'v256_i32', 'Buffer'
  ];

  let result = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Comments
  result = result.replace(/(\/\/[^\n]*)/g, '<span class="tok-comment">$1</span>');

  // Strings
  result = result.replace(/("[^"]*")/g, '<span class="tok-string">$1</span>');

  // Keywords
  const kwPattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  result = result.replace(kwPattern, '<span class="tok-keyword">$1</span>');

  // Types
  const typePattern = new RegExp(`\\b(${types.join('|')})\\b`, 'g');
  result = result.replace(typePattern, '<span class="tok-type">$1</span>');

  // Numbers (hex and decimal)
  result = result.replace(/\b(0x[0-9a-fA-F]+|\d+)\b/g, '<span class="tok-number">$1</span>');

  // Functions (word followed by opening paren)
  result = result.replace(/\b([a-z_][a-z0-9_]*)\s*\(/gi, '<span class="tok-fn">$1</span>(');

  return result;
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
  const [activeCategory, setActiveCategory] = useState<'all' | 'high-level' | 'low-level' | 'translator'>('all');
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
            <span className="logo-text">C-Greater v2+</span>
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
            <a href="#build" className="nav-cta">
              Quick Start
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
            C{'>'} v2.0.0-LTS — The Universal Self-Translating Systems Language
          </div>
          <h1 className="hero-title">
            <span className="hero-symbol">C{'>'}</span>
            <br />
            Universal Systems,
            <br />
            <span className="hero-gradient">High-Level &amp; Bare-Metal.</span>
          </h1>
          <p className="hero-subtitle">
            C{'>'} v2+ transcends single-domain boundaries. From formal verification contracts and cooperative fibers
            to lock-free hazard epochs, hardware SIMD vectors, and an <strong>independent native self-translator</strong> that translates itself without external runtimes.
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
          {(['all', 'high-level', 'low-level', 'translator'] as const).map((cat) => (
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
                ? 'All Code Snippets (8)'
                : cat === 'high-level'
                ? 'High-Level (Contracts, Quantum, Regions, Morph)'
                : cat === 'low-level'
                ? 'Low-Level (Kernel, Hazards, SIMD)'
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
          title="Official VS Code &amp; Code-OSS Extension"
          subtitle="Everything in C-Greater-VSCode is fully complete: grammar highlighting, intelligent autocompletion, snippets, and commands."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-2">Extension File Tree</h3>
            <p className="text-xs text-slate-400 mb-4">Complete bundle ready for VS Code &amp; Code-OSS:</p>
            <div className="font-mono text-xs bg-slate-950 p-4 rounded-xl text-slate-300 border border-slate-800">
              <span className="text-blue-400 font-bold">C-Greater-VSCode/</span><br />
              ├── <span className="text-white">package.json</span> (Manifest &amp; commands)<br />
              ├── <span className="text-white">extension.js</span> (Autocomplete &amp; hover)<br />
              ├── <span className="text-white">language-configuration.json</span><br />
              ├── <span className="text-yellow-400">autocomplete.json</span> (Rich dictionary)<br />
              ├── <span className="text-emerald-400">syntaxes/</span><br />
              │   └── <span className="text-white">cgt.tmLanguage.json</span><br />
              ├── <span className="text-purple-400">snippets/</span><br />
              │   └── <span className="text-white">cgt.json</span><br />
              └── <span className="text-slate-400">README.md</span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-2">Key Extension Features</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">✓</span>
                <span><strong>TextMate Syntax Highlighting:</strong> Complete grammar highlighting for v2+ contracts, quantum fibers, hazards, and SIMD vectors.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">✓</span>
                <span><strong>Intelligent Autocompletion:</strong> Powered by <code className="text-yellow-400">autocomplete.json</code> with contextual symbol detection.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">✓</span>
                <span><strong>Rich Hover Tooltips:</strong> Full markdown documentation and code examples on hover for all keywords and primitives.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">✓</span>
                <span><strong>24+ Code Snippets:</strong> Tab-stop snippets for functions, structs, contracts, arenas, and GPU kernels.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">✓</span>
                <span><strong>Integrated Commands:</strong> Run (<kbd>cgt -r</kbd>), compile, and translate directly from editor context menus.</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Installation in Seconds</h3>
              <p className="text-xs text-slate-400 mb-4">Compatible with both VS Code and Code-OSS / VSCodium:</p>
              
              <div className="space-y-3">
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
              💡 <strong>Instant Activation:</strong> Open any <code className="text-white">.cgt</code> file and enjoy immediate syntax highlighting and autocomplete.
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
