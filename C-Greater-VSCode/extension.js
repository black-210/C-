/**
 * C> (C-Greater) Language Extension for VS Code and Code-OSS
 * Version: 2.0.0
 * 
 * Provides:
 * - Intelligent Autocompletion for C> v2+ keywords, types, and functions
 * - Hover documentation with markdown support
 * - Signature help for built-in functions
 * - Direct build & run commands via the C> compiler (cgt)
 * - Self-hosting and translation execution support
 */

const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

let cgtStatusBarItem = null;

/**
 * Activates the C> extension
 * @param {vscode.ExtensionContext} context 
 */
function activate(context) {
    console.log('[C> Extension]: C-Greater language support activated.');

    // 1. Load Autocomplete Data
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

    // 2. Register Completion Item Provider
    const completionProvider = vscode.languages.registerCompletionItemProvider(
        { language: 'cgt', scheme: 'file' },
        {
            provideCompletionItems(document, position, token, context) {
                const completionList = [];

                // Keywords
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

                // Types
                (autocompleteData.types || []).forEach(item => {
                    const comp = new vscode.CompletionItem(item.label, vscode.CompletionItemKind.Class);
                    comp.detail = item.detail;
                    comp.sortText = '1_' + item.label;
                    completionList.push(comp);
                });

                // Built-in Functions & Intrinsics
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

                // Contextual completions: detect module / struct / fn identifiers in current file
                const text = document.getText();
                const structMatches = text.matchAll(/\bstruct\s+([A-Za-z_][A-Za-z0-9_]*)/g);
                for (const match of structMatches) {
                    const comp = new vscode.CompletionItem(match[1], vscode.CompletionItemKind.Struct);
                    comp.detail = `struct ${match[1]}`;
                    comp.sortText = '3_' + match[1];
                    completionList.push(comp);
                }

                const fnMatches = text.matchAll(/\bfn\s+([A-Za-z_][A-Za-z0-9_]*)/g);
                for (const match of fnMatches) {
                    const comp = new vscode.CompletionItem(match[1], vscode.CompletionItemKind.Function);
                    comp.detail = `fn ${match[1]}`;
                    comp.sortText = '3_' + match[1];
                    completionList.push(comp);
                }

                return completionList;
            }
        },
        '.', ':', '<'
    );
    context.subscriptions.push(completionProvider);

    // 3. Register Hover Provider
    const hoverProvider = vscode.languages.registerHoverProvider('cgt', {
        provideHover(document, position, token) {
            const range = document.getWordRangeAtPosition(position);
            if (!range) return null;

            const word = document.getText(range);

            // Search in keywords
            const kw = (autocompleteData.keywords || []).find(k => k.label === word);
            if (kw) {
                const md = new vscode.MarkdownString();
                md.appendMarkdown(`**C> Keyword: \`${kw.label}\`**\n\n`);
                md.appendMarkdown(`*${kw.detail}*\n\n`);
                md.appendMarkdown(`${kw.documentation}\n`);
                return new vscode.Hover(md);
            }

            // Search in types
            const ty = (autocompleteData.types || []).find(t => t.label === word);
            if (ty) {
                const md = new vscode.MarkdownString();
                md.appendMarkdown(`**C> Type: \`${ty.label}\`**\n\n`);
                md.appendMarkdown(`*${ty.detail}*\n`);
                return new vscode.Hover(md);
            }

            // Search in functions
            const fn = (autocompleteData.functions || []).find(f => f.label === word);
            if (fn) {
                const md = new vscode.MarkdownString();
                md.appendMarkdown(`**C> Function: \`${fn.label}\`**\n\n`);
                md.appendCodeblock(fn.detail, 'cgt');
                md.appendMarkdown(`\n${fn.documentation}\n`);
                return new vscode.Hover(md);
            }

            return null;
        }
    });
    context.subscriptions.push(hoverProvider);

    // 4. Register Commands for Compilation, Run, and Translation
    const runCommand = vscode.commands.registerCommand('cgt.run', () => {
        executeCgtCompiler('-r');
    });

    const compileCommand = vscode.commands.registerCommand('cgt.compile', () => {
        executeCgtCompiler('-c');
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
        term.sendText('cgt --version || ./bin/cgt --version || echo "C> Compiler v2.0.0-LTS"');
    });

    context.subscriptions.push(
        runCommand,
        compileCommand,
        translateCommand,
        checkCommand,
        securityCommand,
        versionCommand
    );

    // 5. Status Bar Item
    cgtStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    cgtStatusBarItem.command = 'cgt.run';
    cgtStatusBarItem.text = '$(zap) C> v2.0.0';
    cgtStatusBarItem.tooltip = 'Click to compile and run current C> file';
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
        } else if (flag === '-t') {
            const outPath = filePath.replace(/\.cgt$/, '.standalone.c');
            term.sendText(`cgt -t "${filePath}" -o "${outPath}" || ./bin/cgt -t "${filePath}" -o "${outPath}"`);
            vscode.window.showInformationMessage(`Translating C> source to standalone ${path.basename(outPath)}`);
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
}

module.exports = {
    activate,
    deactivate
};
