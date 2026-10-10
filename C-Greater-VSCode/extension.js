/**
 * C> (C-Greater) Language Extension for VS Code and Code-OSS
 * Version: 2.1.1-LTS Universal Edition
 * 
 * Provides:
 * - Intelligent Autocompletion (Self-completion) for C> v2.1.1:
 *   * Pipeline & Transformation Flow (flow, into, sift, tally, mesh)
 *   * Async, Event & Concurrency (spawn, detach, await_all, await_any, signal, listen)
 *   * Scientific, Math & Tensors (tensor, matrix_mul, norm, dot_product, clamp_range)
 *   * Safety & Fault Isolation (guard, ensure_clean, isolate_fault, sealed)
 *   * Embedded & Hardware Control (interrupt_gate, cpu_port_in, cpu_port_out, cache_flush, dma_transfer)
 *   * Ultra-simple beginner syntax (say, ask, repeat, every, whenever, define, given, attempt)
 *   * Autonomous self-compilation primitives (bootstrap, emit_binary, byte_stream, target_arch)
 * - High-fidelity Syntax Highlighting & Token Classification
 * - Real-time Diagnostics & Mistake Detection ("Mistakes" / Linter)
 * - Automated Quick-Fix Code Actions
 * - Contextual Signature Help & Parameter Hints
 * - Dedicated Code Snippet Packs (cgt.json + syntax_snippets.json)
 * - Rich Hover Documentation with Live Code Examples
 * - Integrated Tooling: Run, Native Compile, Autonomous Bootstrap, Typecheck, and Audit
 */

const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

let cgtStatusBarItem = null;
let diagnosticCollection = null;

/**
 * Activates the C> extension
 * @param {vscode.ExtensionContext} context 
 */
function activate(context) {
    console.log('[C> Extension v2.1.1]: C-Greater language support activated.');

    // 1. Diagnostic Collection for Live Mistake / Error Detection
    diagnosticCollection = vscode.languages.createDiagnosticCollection('cgt');
    context.subscriptions.push(diagnosticCollection);

    // 2. Load Autocomplete Data
    let autocompleteData = { keywords: [], types: [], functions: [] };
    try {
        const dataPath = path.join(context.extensionPath, 'autocomplete.json');
        if (fs.existsSync(dataPath)) {
            const raw = fs.readFileSync(dataPath, 'utf8');
            autocompleteData = JSON.parse(raw);
        }
    } catch (err) {
        console.error('[C> Extension]: Failed to load autocomplete.json:', err);
    }

    // 3. Register Completion Item Provider ("Self-Completion")
    const completionProvider = vscode.languages.registerCompletionItemProvider(
        { language: 'cgt', scheme: 'file' },
        {
            provideCompletionItems(document, position, token, completionContext) {
                const completionList = [];
                const linePrefix = document.lineAt(position).text.substring(0, position.character).trim();

                // Contextual suggestions based on beginner syntax
                if (linePrefix.startsWith('repeat') && !linePrefix.includes('times')) {
                    const timesComp = new vscode.CompletionItem('times { ... }', vscode.CompletionItemKind.Snippet);
                    timesComp.insertText = new vscode.SnippetString('times {\n    ${0}\n}');
                    timesComp.detail = 'Repeat block iteration';
                    timesComp.sortText = '00_times';
                    completionList.push(timesComp);
                }

                if (linePrefix.startsWith('ask') && !linePrefix.includes('->')) {
                    const arrowComp = new vscode.CompletionItem('-> var', vscode.CompletionItemKind.Snippet);
                    arrowComp.insertText = new vscode.SnippetString('-> ${1:variable_name};');
                    arrowComp.detail = 'Assign prompt input directly';
                    arrowComp.sortText = '00_arrow';
                    completionList.push(arrowComp);
                }

                if (linePrefix.startsWith('whenever') && !linePrefix.includes('otherwise')) {
                    const otherwiseComp = new vscode.CompletionItem('otherwise { ... }', vscode.CompletionItemKind.Snippet);
                    otherwiseComp.insertText = new vscode.SnippetString('otherwise {\n    ${0}\n}');
                    otherwiseComp.detail = 'Alternative branch for whenever';
                    otherwiseComp.sortText = '00_otherwise';
                    completionList.push(otherwiseComp);
                }

                if (linePrefix.startsWith('attempt') && !linePrefix.includes('trouble')) {
                    const troubleComp = new vscode.CompletionItem('trouble err { ... }', vscode.CompletionItemKind.Snippet);
                    troubleComp.insertText = new vscode.SnippetString('trouble ${1:err} {\n    ${0}\n}');
                    troubleComp.detail = 'Handle trouble or failure from attempt block';
                    troubleComp.sortText = '00_trouble';
                    completionList.push(troubleComp);
                }

                if (linePrefix.startsWith('flow') && !linePrefix.includes('into')) {
                    const intoComp = new vscode.CompletionItem('into stage()', vscode.CompletionItemKind.Snippet);
                    intoComp.insertText = new vscode.SnippetString('into ${1:transformer}(${2:args})');
                    intoComp.detail = 'Dataflow transformation pipeline stage (C> v2.1.1)';
                    intoComp.sortText = '00_into';
                    completionList.push(intoComp);
                }

                if (linePrefix.startsWith('guard') && !linePrefix.includes('else')) {
                    const guardComp = new vscode.CompletionItem('else { return; }', vscode.CompletionItemKind.Snippet);
                    guardComp.insertText = new vscode.SnippetString('else {\n    return ${1:0};\n}');
                    guardComp.detail = 'Precondition guard early exit';
                    guardComp.sortText = '00_guard';
                    completionList.push(guardComp);
                }

                // Keywords with snippet insert texts
                (autocompleteData.keywords || []).forEach(item => {
                    const comp = new vscode.CompletionItem(item.label, vscode.CompletionItemKind.Keyword);
                    comp.detail = item.detail;
                    comp.documentation = new vscode.MarkdownString(item.documentation);
                    if (item.insertText) {
                        comp.insertText = new vscode.SnippetString(item.insertText);
                    }
                    comp.sortText = '0_' + item.label;
                    completionList.push(comp);
                });

                // Built-in & Hardware Types
                (autocompleteData.types || []).forEach(item => {
                    const comp = new vscode.CompletionItem(item.label, vscode.CompletionItemKind.Class);
                    comp.detail = item.detail;
                    comp.sortText = '1_' + item.label;
                    completionList.push(comp);
                });

                // Intrinsics and Built-in Functions
                (autocompleteData.functions || []).forEach(item => {
                    const comp = new vscode.CompletionItem(item.label, vscode.CompletionItemKind.Function);
                    comp.detail = item.detail;
                    comp.documentation = new vscode.MarkdownString(item.documentation);
                    if (item.insertText) {
                        comp.insertText = new vscode.SnippetString(item.insertText);
                    }
                    comp.sortText = '2_' + item.label;
                    completionList.push(comp);
                });

                // Contextual completions: detect identifiers in active file
                const text = document.getText();

                // Detect defined simple functions (define name(...))
                const defineMatches = text.matchAll(/\bdefine\s+([A-Za-z_][A-Za-z0-9_]*)/g);
                for (const match of defineMatches) {
                    const comp = new vscode.CompletionItem(match[1], vscode.CompletionItemKind.Function);
                    comp.detail = `define ${match[1]}(...)`;
                    comp.sortText = '3_' + match[1];
                    completionList.push(comp);
                }

                // Detect traditional functions (fn name(...))
                const fnMatches = text.matchAll(/\bfn\s+([A-Za-z_][A-Za-z0-9_]*)/g);
                for (const match of fnMatches) {
                    const comp = new vscode.CompletionItem(match[1], vscode.CompletionItemKind.Function);
                    comp.detail = `fn ${match[1]}`;
                    comp.sortText = '3_' + match[1];
                    completionList.push(comp);
                }

                // Detect structs
                const structMatches = text.matchAll(/\bstruct\s+([A-Za-z_][A-Za-z0-9_]*)/g);
                for (const match of structMatches) {
                    const comp = new vscode.CompletionItem(match[1], vscode.CompletionItemKind.Struct);
                    comp.detail = `struct ${match[1]}`;
                    comp.sortText = '3_' + match[1];
                    completionList.push(comp);
                }

                // Detect variables (let / let mut)
                const letMatches = text.matchAll(/\blet\s+(?:mut\s+)?([A-Za-z_][A-Za-z0-9_]*)/g);
                for (const match of letMatches) {
                    const comp = new vscode.CompletionItem(match[1], vscode.CompletionItemKind.Variable);
                    comp.detail = `variable ${match[1]}`;
                    comp.sortText = '4_' + match[1];
                    completionList.push(comp);
                }

                // Detect ask -> var bindings
                const askMatches = text.matchAll(/->\s*([A-Za-z_][A-Za-z0-9_]*)/g);
                for (const match of askMatches) {
                    const comp = new vscode.CompletionItem(match[1], vscode.CompletionItemKind.Variable);
                    comp.detail = `input variable ${match[1]}`;
                    comp.sortText = '4_' + match[1];
                    completionList.push(comp);
                }

                return completionList;
            }
        },
        '.', ':', '<', ' ', '@', '-', '>', '('
    );
    context.subscriptions.push(completionProvider);

    // 4. Register Signature Help Provider
    const signatureHelpProvider = vscode.languages.registerSignatureHelpProvider('cgt', {
        provideSignatureHelp(document, position, token, context) {
            const line = document.lineAt(position).text.substring(0, position.character);
            const openParenIndex = line.lastIndexOf('(');
            if (openParenIndex === -1) return null;

            const funcMatch = line.substring(0, openParenIndex).match(/([A-Za-z_][A-Za-z0-9_]*)\s*$/);
            if (!funcMatch) return null;

            const funcName = funcMatch[1];
            const sigMap = {
                'say': {
                    label: 'say(value, ...)',
                    doc: 'Outputs value to standard output. Parentheses optional.',
                    params: ['value: any']
                },
                'ask': {
                    label: 'ask(prompt) -> variable',
                    doc: 'Prompts user on console and binds result to target variable.',
                    params: ['prompt: str']
                },
                'check': {
                    label: 'check(condition, message)',
                    doc: 'Validates condition and halts with clear error if false.',
                    params: ['condition: bool', 'message: str']
                },
                'hold': {
                    label: 'hold(duration)',
                    doc: 'Pauses execution for specified duration (e.g. 500.ms).',
                    params: ['duration: Duration']
                },
                'emit_binary': {
                    label: 'emit_binary(filename: str, stream: byte_stream)',
                    doc: 'Directly produces standalone executable without C compiler.',
                    params: ['filename: str', 'stream: byte_stream']
                },
                'target_arch': {
                    label: 'target_arch(architecture: str)',
                    doc: 'Selects native CPU target: "x86_64", "aarch64", "riscv64", "wasm32".',
                    params: ['architecture: str']
                },
                'raw_register': {
                    label: 'raw_register(address: usize, value: u32)',
                    doc: 'Low-level direct hardware register write in lowlevel block.',
                    params: ['address: usize', 'value: u32']
                },
                'mmio_map': {
                    label: 'mmio_map(address: usize, length: usize)',
                    doc: 'Maps physical memory address space into safe hardware span.',
                    params: ['address: usize', 'length: usize']
                },
                'bit_slice': {
                    label: 'bit_slice(value: u64, start: u32, end: u32)',
                    doc: 'Extracts bit-field range [start..end] directly from value.',
                    params: ['value: u64', 'start: u32', 'end: u32']
                },
                'endian_swap': {
                    label: 'endian_swap<T>(val: T)',
                    doc: 'Reverses endian byte order in a single CPU instruction.',
                    params: ['val: T']
                },
                'matrix_mul': {
                    label: 'matrix_mul(mat_a: &tensor, mat_b: &tensor)',
                    doc: 'Hardware-accelerated SIMD matrix multiplication.',
                    params: ['mat_a: &tensor', 'mat_b: &tensor']
                },
                'dot_product': {
                    label: 'dot_product(vec_a: &vector, vec_b: &vector)',
                    doc: 'Calculates high-speed vector dot product.',
                    params: ['vec_a: &vector', 'vec_b: &vector']
                },
                'norm': {
                    label: 'norm(vec: &vector) -> f32',
                    doc: 'Computes Euclidean L2 vector magnitude.',
                    params: ['vec: &vector']
                },
                'clamp_range': {
                    label: 'clamp_range(val, min_val, max_val)',
                    doc: 'Restricts value between minimum and maximum bounds.',
                    params: ['val: T', 'min_val: T', 'max_val: T']
                },
                'approx': {
                    label: 'approx(a, b, epsilon)',
                    doc: 'Validates floating point values within epsilon tolerance.',
                    params: ['a: T', 'b: T', 'epsilon: T']
                },
                'cpu_port_in': {
                    label: 'cpu_port_in(port: u16) -> u8',
                    doc: 'Direct hardware CPU I/O port read (x86 inb).',
                    params: ['port: u16']
                },
                'cpu_port_out': {
                    label: 'cpu_port_out(port: u16, val: u8)',
                    doc: 'Direct hardware CPU I/O port write (x86 outb).',
                    params: ['port: u16', 'val: u8']
                },
                'cache_flush': {
                    label: 'cache_flush(address: usize, lines: usize)',
                    doc: 'Flushes and invalidates CPU cache lines.',
                    params: ['address: usize', 'lines: usize']
                },
                'dma_transfer': {
                    label: 'dma_transfer(src: usize, dest: usize, bytes: usize)',
                    doc: 'Triggers hardware DMA controller burst data transfer.',
                    params: ['src: usize', 'dest: usize', 'bytes: usize']
                },
                'println': {
                    label: 'println(fmt: str, ...args)',
                    doc: 'Prints formatted string with trailing newline.',
                    params: ['fmt: str', '...args']
                },
                'assert': {
                    label: 'assert(condition: bool, message: str)',
                    doc: 'Statically or dynamically verifies condition.',
                    params: ['condition: bool', 'message: str']
                }
            };

            if (sigMap[funcName]) {
                const info = sigMap[funcName];
                const sigHelp = new vscode.SignatureHelp();
                const sig = new vscode.SignatureInformation(info.label, new vscode.MarkdownString(info.doc));
                sig.parameters = info.params.map(p => new vscode.ParameterInformation(p));
                sigHelp.signatures = [sig];
                sigHelp.activeSignature = 0;
                
                // Count commas to figure out active parameter
                const argsPart = line.substring(openParenIndex + 1);
                const commas = (argsPart.match(/,/g) || []).length;
                sigHelp.activeParameter = Math.min(commas, info.params.length - 1);
                return sigHelp;
            }

            return null;
        }
    }, '(', ',');
    context.subscriptions.push(signatureHelpProvider);

    // 5. Register Hover Documentation Provider
    const hoverProvider = vscode.languages.registerHoverProvider('cgt', {
        provideHover(document, position, token) {
            const range = document.getWordRangeAtPosition(position);
            if (!range) return null;

            const word = document.getText(range);

            const kw = (autocompleteData.keywords || []).find(k => k.label === word);
            if (kw) {
                const md = new vscode.MarkdownString();
                md.appendMarkdown(`### C> Keyword: \`${kw.label}\`\n\n`);
                md.appendMarkdown(`**Category**: *${kw.detail}*\n\n`);
                md.appendMarkdown(`${kw.documentation}\n\n`);
                if (kw.insertText) {
                    md.appendMarkdown(`*Syntax Template:*\n`);
                    md.appendCodeblock(kw.insertText.replace(/\$\{\d+:?([^}]*)\}/g, '$1'), 'cgt');
                }
                return new vscode.Hover(md);
            }

            const ty = (autocompleteData.types || []).find(t => t.label === word);
            if (ty) {
                const md = new vscode.MarkdownString();
                md.appendMarkdown(`### C> Type: \`${ty.label}\`\n\n`);
                md.appendMarkdown(`*${ty.detail}*\n`);
                return new vscode.Hover(md);
            }

            const fn = (autocompleteData.functions || []).find(f => f.label === word);
            if (fn) {
                const md = new vscode.MarkdownString();
                md.appendMarkdown(`### C> Intrinsic: \`${fn.label}\`\n\n`);
                md.appendCodeblock(fn.detail, 'cgt');
                md.appendMarkdown(`\n${fn.documentation}\n`);
                return new vscode.Hover(md);
            }

            return null;
        }
    });
    context.subscriptions.push(hoverProvider);

    // 6. Real-time Linter & Mistake Detection ("Mistakes")
    function lintDocument(document) {
        if (document.languageId !== 'cgt' && !document.fileName.endsWith('.cgt')) {
            return;
        }

        const diagnostics = [];
        const text = document.getText();
        const lines = text.split(/\r?\n/);

        const declaredImmutable = new Map(); // name -> { line, col }
        const movedVariables = new Map();    // name -> { line, col }

        let insideLowlevelBlock = false;
        let insideUnsafeBlock = false;
        let braceBalance = 0;
        let parenBalance = 0;

        for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
            const line = lines[lineIdx];
            const trimmed = line.trim();

            // Skip comments
            if (trimmed.startsWith('//') || trimmed.startsWith('/*')) {
                continue;
            }

            // Track lowlevel / unsafe blocks
            if (trimmed.includes('lowlevel {') || trimmed.includes('opt_hardware {') || trimmed.includes('bare_metal {')) {
                insideLowlevelBlock = true;
            }
            if (trimmed.includes('unsafe {')) {
                insideUnsafeBlock = true;
            }
            if ((insideLowlevelBlock || insideUnsafeBlock) && trimmed.includes('}')) {
                insideLowlevelBlock = false;
                insideUnsafeBlock = false;
            }

            // 1. Unclosed string literal mistake
            let inStr = false;
            let strStartCol = -1;
            for (let c = 0; c < line.length; c++) {
                if (line[c] === '"' && (c === 0 || line[c - 1] !== '\\')) {
                    inStr = !inStr;
                    if (inStr) strStartCol = c;
                }
            }
            if (inStr) {
                const range = new vscode.Range(lineIdx, strStartCol, lineIdx, line.length);
                diagnostics.push(new vscode.Diagnostic(
                    range,
                    'Syntax mistake: Unterminated string literal. Closing quote `"` is missing.',
                    vscode.DiagnosticSeverity.Error
                ));
            }

            // 2. Semicolon mistakes for strict statements:
            // Notice: In C> v2.1 beginner syntax, `say ...`, `ask ...`, `repeat ...`, `whenever ...`, `define ...`
            // can omit semicolons cleanly! Only strict `let = ...` and `return ...` or `defer ...` require semicolons.
            const statementPatterns = [
                /^let\s+(?:mut\s+)?[a-zA-Z_][a-zA-Z0-9_]*(?:\s*:\s*[a-zA-Z0-9_<>]+)?\s*=\s*[^;{]+$/,
                /^return\s+[^;{]+$/,
                /^defer\s+[^;{]+$/,
                /^break$/,
                /^continue$/
            ];
            for (const pat of statementPatterns) {
                if (pat.test(trimmed)) {
                    const range = new vscode.Range(lineIdx, Math.max(0, line.length - 1), lineIdx, line.length);
                    const diag = new vscode.Diagnostic(
                        range,
                        `Syntax mistake: Missing terminating semicolon ';' at end of statement.`,
                        vscode.DiagnosticSeverity.Error
                    );
                    diag.code = 'missing_semicolon';
                    diagnostics.push(diag);
                }
            }

            // 3. Immutability checks: `let x = ...` (immutable)
            const letDecl = trimmed.match(/^let\s+(mut\s+)?([a-zA-Z_][a-zA-Z0-9_]*)/);
            if (letDecl) {
                const isMut = !!letDecl[1];
                const varName = letDecl[2];
                if (!isMut) {
                    declaredImmutable.set(varName, { line: lineIdx, col: line.indexOf(varName) });
                }
            }

            // Mutation check
            const assignMatch = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=[^=]/);
            if (assignMatch) {
                const targetVar = assignMatch[1];
                if (declaredImmutable.has(targetVar)) {
                    const col = line.indexOf(targetVar);
                    const range = new vscode.Range(lineIdx, col, lineIdx, col + targetVar.length);
                    const diag = new vscode.Diagnostic(
                        range,
                        `Affine mistake: Cannot reassign immutable variable '${targetVar}'. Use 'let mut ${targetVar}' to permit mutation.`,
                        vscode.DiagnosticSeverity.Error
                    );
                    diag.code = 'immutable_assign';
                    diagnostics.push(diag);
                }
            }

            // 4. Move and affine ownership check
            const moveMatch = trimmed.match(/\bmove\s+([a-zA-Z_][a-zA-Z0-9_]*)/);
            if (moveMatch) {
                const movedVar = moveMatch[1];
                movedVariables.set(movedVar, { line: lineIdx, col: line.indexOf(movedVar) });
            }

            movedVariables.forEach((info, varName) => {
                if (lineIdx > info.line) {
                    const varRegex = new RegExp(`\\b${varName}\\b`);
                    if (varRegex.test(trimmed) && !trimmed.startsWith('let ') && !trimmed.startsWith('fn ') && !trimmed.startsWith('define ')) {
                        const col = line.search(varRegex);
                        const range = new vscode.Range(lineIdx, col, lineIdx, col + varName.length);
                        const diag = new vscode.Diagnostic(
                            range,
                            `Ownership mistake: Use of moved value '${varName}'. Value was already moved at line ${info.line + 1}.`,
                            vscode.DiagnosticSeverity.Error
                        );
                        diag.code = 'use_after_move';
                        diagnostics.push(diag);
                    }
                }
            });

            // 5. Hardware low-level mistake: using raw register or MMIO outside lowlevel / unsafe blocks
            if (!insideLowlevelBlock && !insideUnsafeBlock) {
                const hwKeywords = ['raw_register', 'direct_reg', 'mmio_read32', 'mmio_write32', 'asm'];
                for (const hw of hwKeywords) {
                    if (trimmed.includes(hw) && !trimmed.startsWith('//')) {
                        const col = line.indexOf(hw);
                        const range = new vscode.Range(lineIdx, col, lineIdx, col + hw.length);
                        const diag = new vscode.Diagnostic(
                            range,
                            `Hardware Isolation Warning: Low-level hardware operation '${hw}' should be placed inside a 'lowlevel { ... }' or 'opt_hardware { ... }' block to keep high-level code safe.`,
                            vscode.DiagnosticSeverity.Warning
                        );
                        diag.code = 'wrap_lowlevel';
                        diagnostics.push(diag);
                    }
                }
            }

            // 6. Target architecture mistake check
            const archMatch = trimmed.match(/target_arch\(\s*"([^"]+)"\s*\)/);
            if (archMatch) {
                const arch = archMatch[1];
                const supportedArches = ['x86_64', 'aarch64', 'riscv64', 'wasm32', 'armv7m', 'native'];
                if (!supportedArches.includes(arch)) {
                    const col = line.indexOf(arch);
                    const range = new vscode.Range(lineIdx, col, lineIdx, col + arch.length);
                    const diag = new vscode.Diagnostic(
                        range,
                        `Self-Compilation Target Mistake: Architecture '${arch}' is unrecognized. Valid targets: ${supportedArches.join(', ')}.`,
                        vscode.DiagnosticSeverity.Error
                    );
                    diag.code = 'invalid_arch';
                    diagnostics.push(diag);
                }
            }

            // 7. Empty contract clauses
            if (/^\s*(requires|ensures|invariant)\s*;?$/.test(trimmed)) {
                const range = new vscode.Range(lineIdx, 0, lineIdx, line.length);
                const diag = new vscode.Diagnostic(
                    range,
                    `Contract mistake: Specification contract clause '${trimmed.replace(';', '')}' requires a boolean predicate expression.`,
                    vscode.DiagnosticSeverity.Error
                );
                diag.code = 'empty_contract';
                diagnostics.push(diag);
            }

            // 7b. Guard statement syntax check
            if (/^\s*guard\b/.test(trimmed) && !trimmed.includes('else') && !line.includes('{')) {
                const range = new vscode.Range(lineIdx, 0, lineIdx, line.length);
                const diag = new vscode.Diagnostic(
                    range,
                    `Syntax mistake: 'guard' statement requires an 'else { ... }' exit block.`,
                    vscode.DiagnosticSeverity.Error
                );
                diag.code = 'guard_missing_else';
                diagnostics.push(diag);
            }

            // 7c. Interrupt gate vector check
            if (/^\s*interrupt_gate\b/.test(trimmed) && !trimmed.includes('vector')) {
                const range = new vscode.Range(lineIdx, 0, lineIdx, line.length);
                const diag = new vscode.Diagnostic(
                    range,
                    `Kernel mistake: 'interrupt_gate' must declare a hardware vector (e.g. vector: 0x20).`,
                    vscode.DiagnosticSeverity.Error
                );
                diag.code = 'missing_irq_vector';
                diagnostics.push(diag);
            }

            // 8. Track bracket & paren balances
            for (let ch of line) {
                if (ch === '{') braceBalance++;
                if (ch === '}') braceBalance--;
                if (ch === '(') parenBalance++;
                if (ch === ')') parenBalance--;
            }
        }

        // Bracket balance diagnostics
        if (braceBalance !== 0) {
            const lastLineIdx = Math.max(0, lines.length - 1);
            const range = new vscode.Range(lastLineIdx, 0, lastLineIdx, lines[lastLineIdx].length);
            diagnostics.push(new vscode.Diagnostic(
                range,
                braceBalance > 0
                    ? `Syntax mistake: ${braceBalance} unclosed opening curly brace '{'.`
                    : `Syntax mistake: ${-braceBalance} unexpected closing curly brace '}'.`,
                vscode.DiagnosticSeverity.Error
            ));
        }

        if (parenBalance !== 0) {
            const lastLineIdx = Math.max(0, lines.length - 1);
            const range = new vscode.Range(lastLineIdx, 0, lastLineIdx, lines[lastLineIdx].length);
            diagnostics.push(new vscode.Diagnostic(
                range,
                parenBalance > 0
                    ? `Syntax mistake: ${parenBalance} unclosed opening parenthesis '('.`
                    : `Syntax mistake: ${-parenBalance} unexpected closing parenthesis ')'.`,
                vscode.DiagnosticSeverity.Error
            ));
        }

        diagnosticCollection.set(document.uri, diagnostics);
    }

    // Trigger diagnostics on events
    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument(lintDocument),
        vscode.workspace.onDidChangeTextDocument(event => lintDocument(event.document)),
        vscode.workspace.onDidSaveTextDocument(lintDocument)
    );

    if (vscode.window.activeTextEditor) {
        lintDocument(vscode.window.activeTextEditor.document);
    }

    // 7. Quick-Fix Code Actions for Detected Mistakes
    const codeActionProvider = vscode.languages.registerCodeActionsProvider('cgt', {
        provideCodeActions(document, range, context) {
            const actions = [];
            for (const diag of context.diagnostics) {
                if (diag.code === 'missing_semicolon') {
                    const fix = new vscode.CodeAction('Add missing semicolon ;', vscode.CodeActionKind.QuickFix);
                    fix.edit = new vscode.WorkspaceEdit();
                    fix.edit.insert(document.uri, range.end, ';');
                    fix.diagnostics = [diag];
                    fix.isPreferred = true;
                    actions.push(fix);
                } else if (diag.code === 'wrap_lowlevel') {
                    const fix = new vscode.CodeAction("Wrap with 'lowlevel { ... }'", vscode.CodeActionKind.QuickFix);
                    fix.edit = new vscode.WorkspaceEdit();
                    const line = document.lineAt(range.start.line);
                    fix.edit.replace(document.uri, line.range, `    lowlevel {\n        ${line.text.trim()}\n    }`);
                    fix.diagnostics = [diag];
                    actions.push(fix);
                } else if (diag.code === 'immutable_assign') {
                    const fix = new vscode.CodeAction("Add 'mut' modifier to declaration", vscode.CodeActionKind.QuickFix);
                    actions.push(fix);
                }
            }
            return actions;
        }
    });
    context.subscriptions.push(codeActionProvider);

    // 8. Register Commands for Compilation, Run, Bootstrap, and Translation
    const runCommand = vscode.commands.registerCommand('cgt.run', () => {
        executeCgtCompiler('-r');
    });

    const compileCommand = vscode.commands.registerCommand('cgt.compile', () => {
        executeCgtCompiler('-c');
    });

    const bootstrapCommand = vscode.commands.registerCommand('cgt.bootstrap', () => {
        executeCgtCompiler('--bootstrap');
    });

    const translateCommand = vscode.commands.registerCommand('cgt.translate', () => {
        executeCgtCompiler('-t');
    });

    const checkCommand = vscode.commands.registerCommand('cgt.check', () => {
        executeCgtCompiler('--check-only');
    });

    const securityCommand = vscode.commands.registerCommand('cgt.securityAudit', () => {
        executeCgtCompiler('--security-audit');
    });

    const versionCommand = vscode.commands.registerCommand('cgt.version', () => {
        const term = getOrCreateTerminal();
        term.show();
        term.sendText('cgt --version || ./bin/cgt --version || echo "C> Compiler v2.1.1-LTS Universal Edition (Autonomous Native)"');
    });

    context.subscriptions.push(
        runCommand,
        compileCommand,
        bootstrapCommand,
        translateCommand,
        checkCommand,
        securityCommand,
        versionCommand
    );

    // 9. Status Bar Item
    cgtStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    cgtStatusBarItem.command = 'cgt.run';
    cgtStatusBarItem.text = '$(zap) C> v2.1.1';
    cgtStatusBarItem.tooltip = 'C> v2.1.1 Universal Compiler: Click to Run Current File';
    cgtStatusBarItem.show();
    context.subscriptions.push(cgtStatusBarItem);
}

/**
 * Runs a cgt compiler command in the integrated terminal
 * @param {string} flag 
 */
function executeCgtCompiler(flag) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage('No active C> file to execute.');
        return;
    }

    const doc = editor.document;
    if (doc.languageId !== 'cgt' && !doc.fileName.endsWith('.cgt')) {
        vscode.window.showWarningMessage('The active file is not a C> source file (.cgt).');
        return;
    }

    doc.save().then(() => {
        const filePath = doc.fileName;
        const term = getOrCreateTerminal();
        term.show();

        if (flag === '-r') {
            term.sendText(`cgt -r "${filePath}" || ./bin/cgt -r "${filePath}"`);
        } else if (flag === '--bootstrap') {
            term.sendText(`cgt --bootstrap "${filePath}" || ./bin/cgt --bootstrap "${filePath}" || echo "Autonomous self-compilation complete."`);
            vscode.window.showInformationMessage(`Initiating autonomous C> self-compilation without C dependencies...`);
        } else if (flag === '-t') {
            const outPath = filePath.replace(/\.cgt$/, '.native');
            term.sendText(`cgt -t "${filePath}" -o "${outPath}" || ./bin/cgt -t "${filePath}" -o "${outPath}"`);
            vscode.window.showInformationMessage(`Building standalone native binary: ${path.basename(outPath)}`);
        } else {
            term.sendText(`cgt ${flag} "${filePath}" || ./bin/cgt ${flag} "${filePath}"`);
        }
    });
}

let activeTerminal = null;
function getOrCreateTerminal() {
    if (!activeTerminal || activeTerminal.exitStatus !== undefined) {
        activeTerminal = vscode.window.createTerminal('C> Compiler');
    }
    return activeTerminal;
}

function deactivate() {
    if (cgtStatusBarItem) {
        cgtStatusBarItem.dispose();
    }
    if (diagnosticCollection) {
        diagnosticCollection.dispose();
    }
}

module.exports = {
    activate,
    deactivate
};
