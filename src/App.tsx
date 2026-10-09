/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

// ─── Data ──────────────────────────────────────────────────────────────────────

interface CodeSample {
  title: string;
  description: string;
  code: string;
}

const codeSamples: CodeSample[] = [
  {
    title: 'Hello World',
    description: 'Every journey begins with a single print.',
    code: `module examples::hello;

fn main() -> i32 {
    println("Hello, C> World!");
    return 0;
}`,
  },
  {
    title: 'Ownership & Move',
    description: 'Affine ownership — one owner, explicit moves.',
    code: `module examples::ownership;

struct Resource {
    handle: i32,
    size: i32,
}

fn consume(r: own<Resource>) -> void {
    println("Resource consumed.");
}

fn main() -> i32 {
    let r1: own<Resource> = Resource {
        handle: 42,
        size: 1024,
    };
    let r2: own<Resource> = move(r1);
    consume(r2);
    return 0;
}`,
  },
  {
    title: 'Borrowing',
    description: 'Alias XOR Mutability — shared or mutable, never both.',
    code: `module examples::borrowing;

struct Counter { count: i32 }

fn inspect(c: &Counter) -> i32 {
    return c.count;
}

fn increment(c: &mut Counter) -> void {
    c.count = c.count + 1;
}

fn main() -> i32 {
    let mut c: Counter = Counter { count: 10 };
    let val: i32 = inspect(&c);
    increment(&mut c);
    return 0;
}`,
  },
  {
    title: 'GPU Compute',
    description: 'First-class GPU kernel declarations.',
    code: `module examples::gpu_compute;

gpu_kernel fn vector_scale(scalar: f32) -> void {
    println("GPU kernel executing on device grid.");
}

fn main() -> i32 {
    println("Host initializing GPU pipeline.");
    vector_scale(2.5);
    println("GPU compute workload finished.");
    return 0;
}`,
  },
  {
    title: 'Unsafe & Inline Assembly',
    description: 'Direct hardware access, walled behind unsafe.',
    code: `module examples::unsafe_code;

fn main() -> i32 {
    println("Entering safe code block.");

    unsafe {
        asm("nop");
        println("Inline assembly executed.");
    }

    println("Returned to safe context.");
    return 0;
}`,
  },
  {
    title: 'Systems Programming',
    description: 'Page table entries, kernel-grade types.',
    code: `module examples::systems_programming;

struct PageTableEntry {
    address: u64,
    flags: u32,
    present: bool,
}

fn create_pte(addr: u64) -> PageTableEntry {
    let pte: PageTableEntry = PageTableEntry {
        address: addr,
        flags: 0x03,
        present: true,
    };
    return pte;
}`,
  },
];

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: '🛡️',
    title: 'Compile-Time Memory Safety',
    description:
      'Affine ownership types and non-lexical borrow checking eliminate use-after-free, double-free, and data races — statically, before your code ever runs.',
  },
  {
    icon: '⚡',
    title: 'Zero-Cost Abstractions',
    description:
      'What you don\'t use, you don\'t pay for. What you do use, you could not write better by hand. No garbage collector, no virtual machine, no hidden runtime.',
  },
  {
    icon: '🖥️',
    title: 'Direct Hardware Control',
    description:
      'MMIO registers, CPU instructions, cache control, interrupt vectors, and inline assembly — all accessible through explicit, auditable unsafe blocks.',
  },
  {
    icon: '🎨',
    title: 'First-Class GPU Programming',
    description:
      'Native gpu_kernel declarations with multi-backend lowering to Vulkan SPIR-V, CUDA PTX, Metal MSL, and host SIMD emulation for development.',
  },
  {
    icon: '🔒',
    title: 'Static Security Auditor',
    description:
      'Built-in vulnerability analysis: integer overflow detection, buffer overrun auditing, address truncation prevention, and format string protection.',
  },
  {
    icon: '📦',
    title: 'True Module System',
    description:
      'Replace the fragile C preprocessor with explicit module, import, and namespace boundaries — discrete compilation units with clean symbol separation.',
  },
];

interface PipelineStage {
  num: number;
  name: string;
  file: string;
  description: string;
}

const pipelineStages: PipelineStage[] = [
  { num: 1, name: 'Lexical Analysis', file: 'cgt_lexer.c', description: 'Token scanner with source locations' },
  { num: 2, name: 'Grammar Parsing', file: 'cgt_parser.c', description: 'Recursive descent, operator precedence' },
  { num: 3, name: 'Abstract Syntax Tree', file: 'cgt_ast.c', description: 'Complete AST construction and dump' },
  { num: 4, name: 'Semantic Analysis', file: 'cgt_semantic.c', description: 'Symbol table, scope, name resolution' },
  { num: 5, name: 'Type Checker', file: 'cgt_typechecker.c', description: 'Type unification and inference' },
  { num: 6, name: 'Memory Safety', file: 'cgt_memory_safety.c', description: 'Ownership tracking, borrow checking' },
  { num: 7, name: 'Security Auditor', file: 'cgt_security.c', description: 'Static vulnerability analysis' },
  { num: 8, name: 'Intermediate Representation', file: 'cgt_ir.c', description: 'Three-address SSA IR lowering' },
  { num: 9, name: 'IR Optimizer', file: 'cgt_optimizer.c', description: 'Constant folding, DCE, CFG cleanup' },
  { num: 10, name: 'Native Code Generation', file: 'cgt_codegen.c', description: 'C11 / assembly / ELF emission' },
];

interface TypeCategory {
  name: string;
  types: string[];
}

const typeSystem: TypeCategory[] = [
  { name: 'Signed Integers', types: ['i8', 'i16', 'i32', 'i64', 'i128', 'isize'] },
  { name: 'Unsigned Integers', types: ['u8', 'u16', 'u32', 'u64', 'u128', 'usize'] },
  { name: 'Floating Point', types: ['f32', 'f64'] },
  { name: 'Other Primitives', types: ['bool', 'char', 'void', 'str'] },
  { name: 'Reference Types', types: ['&T', '&mut T', 'own<T>', '*raw T', '*const T', 'volatile<T>'] },
  { name: 'SIMD Vectors', types: ['v128_f32', 'v128_i32', 'v256_f32', 'v256_i32'] },
  { name: 'Composite Types', types: ['[T; N]', '&[T]', 'struct', 'enum', 'tuple', 'gpu::Buffer<T>'] },
];

const comparisons = [
  {
    feature: 'Memory Safety',
    c: 'Unchecked — decades of CVEs',
    cpp: 'Unchecked — dangling references compile',
    rust: 'Compile-time verified',
    cgt: 'Compile-time verified',
  },
  {
    feature: 'Implementation Language',
    c: 'C',
    cpp: 'C++ (massive toolchain)',
    rust: 'Rust (requires LLVM)',
    cgt: 'Pure C (zero dependencies)',
  },
  {
    feature: 'Mutability',
    c: 'Mutable by default',
    cpp: 'Mutable by default',
    rust: 'Immutable by default',
    cgt: 'Immutable by default',
  },
  {
    feature: 'GPU Programming',
    c: 'None (external CUDA/OpenCL)',
    cpp: 'None (external)',
    rust: 'Third-party crates only',
    cgt: 'First-class gpu_kernel',
  },
  {
    feature: 'Inline Assembly',
    c: 'Platform extensions',
    cpp: 'Platform extensions',
    rust: 'Macro-based with LLVM constraints',
    cgt: 'Direct architecture-level asm()',
  },
  {
    feature: 'Unsafe Isolation',
    c: 'No concept of unsafe',
    cpp: 'No concept of unsafe',
    rust: 'Explicit unsafe blocks',
    cgt: 'Explicit unsafe blocks',
  },
];

const roadmap = [
  { version: 'v1.0', status: 'current', title: 'Foundation', items: ['9-stage compiler pipeline', 'Borrow checker', 'Security auditor', '19 working examples', 'Multi-arch backends'] },
  { version: 'v1.1', status: 'planned', title: 'LLVM Backend', items: ['Direct LLVM IR target', 'Alongside C backend', 'Advanced optimizations'] },
  { version: 'v1.2', status: 'planned', title: 'NLL Solver', items: ['Non-lexical lifetime graphs', 'Smarter borrow checker', 'Reduced false positives'] },
  { version: 'v1.3', status: 'planned', title: 'SPIR-V Emitter', items: ['Native Vulkan binary output', 'GPU kernel compilation', 'Device-side linking'] },
  { version: 'v1.4', status: 'planned', title: 'Self-Hosting', items: ['Compiler written in C>', 'Bootstrapped compilation', 'Dogfooding complete'] },
];

const stats = [
  { label: 'Compiler Stages', value: '10' },
  { label: 'Example Programs', value: '19' },
  { label: 'C Source Files', value: '47' },
  { label: 'Dependencies', value: '0' },
];

// ─── Syntax Highlighter ────────────────────────────────────────────────────────

function highlightCode(code: string): string {
  const keywords = [
    'module', 'fn', 'let', 'mut', 'own', 'struct', 'enum', 'trait', 'impl',
    'unsafe', 'gpu_kernel', 'simd', 'return', 'if', 'else', 'while', 'for',
    'in', 'match', 'break', 'continue', 'import', 'type', 'const', 'defer',
    'asm', 'atomic', 'move', 'true', 'false', 'null', 'as', 'pub', 'extern',
    'sizeof', 'borrow', 'view', 'class',
  ];
  const types = [
    'i8', 'i16', 'i32', 'i64', 'i128', 'isize',
    'u8', 'u16', 'u32', 'u64', 'u128', 'usize',
    'f32', 'f64', 'bool', 'char', 'void', 'str',
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

// ─── Components ────────────────────────────────────────────────────────────────

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

// ─── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Examples', href: '#examples' },
    { label: 'Pipeline', href: '#pipeline' },
    { label: 'Types', href: '#types' },
    { label: 'Compare', href: '#compare' },
    { label: 'Roadmap', href: '#roadmap' },
  ];

  return (
    <div className="app">
      {/* ─── Nav ─── */}
      <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            <span className="logo-icon">{'>'}</span>
            <span className="logo-text">C-Greater</span>
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
              Get Started
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
            v1.0.0 — Now Available
          </div>
          <h1 className="hero-title">
            <span className="hero-symbol">C{'>'}</span>
            <br />
            Systems Programming,
            <br />
            <span className="hero-gradient">Reimagined.</span>
          </h1>
          <p className="hero-subtitle">
            A modern systems programming language implemented in 100% pure C.
            Compile-time memory safety. Direct CPU &amp; GPU control. Zero hidden runtimes.
          </p>
          <div className="hero-actions">
            <a href="#build" className="btn btn-primary">
              Quick Start
            </a>
            <a href="#examples" className="btn btn-ghost">
              View Examples
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
          kicker="Capabilities"
          title="Everything C and C++ should have been"
          subtitle="C> unifies zero-cost abstractions with deterministic hardware execution, strict compile-time memory safety, and first-class heterogeneous compute."
        />
        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Examples ─── */}
      <section id="examples" className="section section-alt">
        <SectionTitle
          kicker="Live Code"
          title="Language by example"
          subtitle="Explore real C> programs demonstrating ownership, borrowing, GPU compute, inline assembly, and systems-level programming."
        />
        <div className="examples-layout">
          <div className="example-tabs">
            {codeSamples.map((sample, i) => (
              <button
                key={sample.title}
                className={`example-tab ${activeTab === i ? 'active' : ''}`}
                onClick={() => setActiveTab(i)}
              >
                <span className="tab-title">{sample.title}</span>
                <span className="tab-desc">{sample.description}</span>
              </button>
            ))}
          </div>
          <div className="example-viewer">
            <div className="viewer-header">
              <div className="viewer-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <span className="viewer-filename">
                {codeSamples[activeTab].title.toLowerCase().replace(/[^a-z]+/g, '_')}.cgt
              </span>
            </div>
            <CodeBlock code={codeSamples[activeTab].code} />
          </div>
        </div>
      </section>

      {/* ─── Pipeline ─── */}
      <section id="pipeline" className="section">
        <SectionTitle
          kicker="Architecture"
          title="10-stage compiler pipeline"
          subtitle="The cgt compiler operates through a strictly functional pipeline — from source text to native executable — all written in portable C11."
        />
        <div className="pipeline-flow">
          <div className="pipeline-input">
            <span>Source Code (.cgt)</span>
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
            <span>Native Executable</span>
          </div>
        </div>
      </section>

      {/* ─── Type System ─── */}
      <section id="types" className="section section-alt">
        <SectionTitle
          kicker="Type System"
          title="A complete type hierarchy"
          subtitle="From hardware-precise integers to SIMD vectors and GPU buffers — C> gives you the vocabulary for every layer of the stack."
        />
        <div className="type-grid">
          {typeSystem.map((cat) => (
            <div key={cat.name} className="type-card">
              <h4>{cat.name}</h4>
              <div className="type-list">
                {cat.types.map((t) => (
                  <span key={t} className="type-chip">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Comparison ─── */}
      <section id="compare" className="section">
        <SectionTitle
          kicker="Comparison"
          title="C> vs C vs C++ vs Rust"
          subtitle="An honest, side-by-side look at how C> resolves the tension between safety, control, and pragmatism."
        />
        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>C</th>
                <th>C++</th>
                <th>Rust</th>
                <th className="col-highlight">C{'>'}</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row) => (
                <tr key={row.feature}>
                  <td className="feat-cell">{row.feature}</td>
                  <td>{row.c}</td>
                  <td>{row.cpp}</td>
                  <td>{row.rust}</td>
                  <td className="col-highlight">{row.cgt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── Build ─── */}
      <section id="build" className="section section-alt">
        <SectionTitle
          kicker="Get Started"
          title="Build &amp; run in seconds"
          subtitle="No package manager. No dependency hell. Just a C compiler and make."
        />
        <div className="build-grid">
          <div className="build-card">
            <h4>Build the compiler</h4>
            <CodeBlock code={`cd C>\nmake`} />
            <p className="build-note">Produces: bin/cgt, bin/cgt_test, bin/libcgt_runtime.a</p>
          </div>
          <div className="build-card">
            <h4>Compile &amp; run a program</h4>
            <CodeBlock code={`cgt examples/hello.cgt -r`} />
            <p className="build-note">Compiles to native binary and executes immediately.</p>
          </div>
          <div className="build-card">
            <h4>Run the test suite</h4>
            <CodeBlock code={`make test\n./tests/run_all_examples.sh`} />
            <p className="build-note">Unit tests + 19 end-to-end integration tests.</p>
          </div>
          <div className="build-card">
            <h4>Inspect the AST</h4>
            <CodeBlock code={`cgt examples/structs.cgt --emit-ast\ncgt examples/functions.cgt --emit-ir`} />
            <p className="build-note">Full pipeline visibility: AST, IR, C, and assembly output.</p>
          </div>
        </div>
      </section>

      {/* ─── Roadmap ─── */}
      <section id="roadmap" className="section">
        <SectionTitle
          kicker="Roadmap"
          title="The path forward"
          subtitle="From a solid foundation to a self-hosting compiler — here's where C> is headed."
        />
        <div className="roadmap-timeline">
          {roadmap.map((item, i) => (
            <div key={item.version} className={`roadmap-item ${item.status}`}>
              <div className="roadmap-marker">
                <div className="marker-dot" />
                {i < roadmap.length - 1 && <div className="marker-line" />}
              </div>
              <div className="roadmap-content">
                <div className="roadmap-header">
                  <span className="roadmap-version">{item.version}</span>
                  <span className={`roadmap-badge ${item.status}`}>
                    {item.status === 'current' ? 'Current' : 'Planned'}
                  </span>
                </div>
                <h4>{item.title}</h4>
                <ul>
                  {item.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="logo-icon">{'>'}</span>
            <span className="logo-text">C-Greater</span>
          </div>
          <p className="footer-tagline">
            Systems programming, reimagined. Built in pure C. Open source.
          </p>
          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#examples">Examples</a>
            <a href="#build">Build</a>
            <a href="#roadmap">Roadmap</a>
          </div>
          <p className="footer-license">
            Copyright (c) 2026 C{'>'} Language Project Contributors.
            <br />
            Licensed under Apache 2.0 or MIT at your option.
          </p>
        </div>
      </footer>
    </div>
  );
}
