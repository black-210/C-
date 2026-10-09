# C> (C-Greater) Language Support for VS Code & Code-OSS

Official Visual Studio Code and Code-OSS extension for **C> (C-Greater)** — a next-generation systems programming language featuring compile-time affine memory safety, formal specification contracts, lock-free hazard epochs, hardware SIMD vectors, scoped arena regions, GPU compute kernels, and an independent self-hosting translator.

---

## Features

- **Rich Syntax Highlighting:** Complete TextMate grammar (`cgt.tmLanguage.json`) highlighting v2+ contracts (`spec`, `contract`, `requires`, `ensures`, `invariant`), cooperative task fibers (`quantum`, `yield_to`), memory safety (`own`, `lent`, `ref`), scoped arenas (`region`), hardware primitives (`pin`, `isolate`, `hazard`, `claim`), and SIMD/GPU declarations.
- **Intelligent Autocompletion:** Context-aware completion for keywords, built-in types, hardware registers, intrinsics, and active file symbols.
- **Rich Documentation Hover:** Instant Markdown documentation and code examples on hover for all C> keywords, operators, and types.
- **Pre-built Code Snippets:** Ready-to-use snippets for high-level business logic, formal contracts, kernel drivers, SIMD vector math, lock-free queues, and GPU pipelines.
- **Compiler Integration:** Run, compile, translate, or audit files directly from editor commands or the context menu:
  - `cgt.run`: Compile and execute active file (`cgt -r`)
  - `cgt.translate`: Translate active file to standalone portable C (`cgt -t`)
  - `cgt.check`: Run memory safety & borrow checker (`cgt --check-only`)
  - `cgt.securityAudit`: Run static vulnerability audit (`cgt --security-audit`)

---

## Installation

### For VS Code
1. Copy the `C-Greater-VSCode` folder to your VS Code extensions directory:
   - **Linux:** `~/.vscode/extensions/c-greater`
   - **macOS:** `~/.vscode/extensions/c-greater`
   - **Windows:** `%USERPROFILE%\.vscode\extensions\c-greater`
2. Restart VS Code or run **Developer: Reload Window**.

### For Code-OSS / VSCodium
1. Copy the `C-Greater-VSCode` folder to your Code-OSS extensions directory:
   - **Linux:** `~/.config/Code - OSS/extensions/c-greater` (or `~/.vscode-oss/extensions/c-greater`)
2. Restart Code-OSS.

### Packaging as `.vsix`
```bash
cd C-Greater-VSCode
npx @vscode/vsce package
code --install-extension c-greater-2.0.0.vsix
```

---

## File Association
All files ending with `.cgt` will automatically be recognized as C> source code.

```cgt
module examples::hello;

fn main() -> i32 {
    println("Hello from C> v2+!");
    return 0;
}
```
