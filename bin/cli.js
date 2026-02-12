#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const VERSION = require('../package.json').version;
const args = process.argv.slice(2);
const command = args[0];

const c = {
    cyan: (t) => `\x1b[36m${t}\x1b[0m`,
    green: (t) => `\x1b[32m${t}\x1b[0m`,
    yellow: (t) => `\x1b[33m${t}\x1b[0m`,
    red: (t) => `\x1b[31m${t}\x1b[0m`,
    dim: (t) => `\x1b[2m${t}\x1b[0m`,
    bold: (t) => `\x1b[1m${t}\x1b[0m`,
    magenta: (t) => `\x1b[35m${t}\x1b[0m`,
};

const LOGO = `${c.cyan(`
  __ _  __ _        ___ ___  _ __ ___
 / _\` |/ _\` |_____ / __/ _ \\| '__/ _ \\
| (_| | (_| |_____| (_| (_) | | |  __/
 \\__,_|\\__, |      \\___\\___/|_|  \\___|
       |___/`)}  ${c.dim(`v${VERSION}`)}
`;

function ask(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve) =>
        rl.question(query, (ans) => {
            rl.close();
            resolve(ans.trim());
        })
    );
}

function getSourceContents(dir, prefix) {
    prefix = prefix || '';
    const items = [];
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
        const full = path.join(dir, entry);
        const rel = prefix ? `${prefix}/${entry}` : entry;
        const stat = fs.statSync(full);
        if (stat.isDirectory()) {
            items.push({ type: 'dir', path: rel });
            items.push(...getSourceContents(full, rel));
        } else {
            items.push({ type: 'file', path: rel, size: stat.size });
        }
    }
    return items;
}

function copyRecursive(src, dest) {
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        for (const child of fs.readdirSync(src)) {
            copyRecursive(
                path.join(src, child),
                path.join(dest, child)
            );
        }
    } else {
        fs.copyFileSync(src, dest);
    }
}

function removeRecursive(dirPath) {
    if (!fs.existsSync(dirPath)) return;
    for (const file of fs.readdirSync(dirPath)) {
        const cur = path.join(dirPath, file);
        if (fs.lstatSync(cur).isDirectory()) {
            removeRecursive(cur);
        } else {
            fs.unlinkSync(cur);
        }
    }
    fs.rmdirSync(dirPath);
}

function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(1)} KB`;
}

function printPreview(items) {
    const dirs = items.filter((i) => i.type === 'dir');
    const files = items.filter((i) => i.type === 'file');
    const totalSize = files.reduce((sum, f) => sum + f.size, 0);

    console.log(c.bold('\n  Contents:'));
    const topLevel = items.filter(
        (i) => !i.path.includes('/') || i.path.split('/').length === 1
    );
    for (const item of topLevel) {
        if (item.type === 'dir') {
            const children = files.filter((f) =>
                f.path.startsWith(item.path + '/')
            );
            console.log(
                `    ${c.cyan(item.path + '/')}  ${c.dim(`(${children.length} files)`)}`
            );
        }
    }
    console.log(
        c.dim(
            `\n  Total: ${dirs.length} folders, ${files.length} files (${formatSize(totalSize)})`
        )
    );
}

async function handleInit(isUpdate) {
    const sourceDir = path.join(__dirname, '..', '.agent');
    const targetDir = path.join(process.cwd(), '.agent');
    const exists = fs.existsSync(targetDir);

    console.log(LOGO);
    console.log(c.bold('  AG Core - AI Agent Standards & Templates'));
    console.log(c.dim(`  Target: ${process.cwd()}`));

    if (!fs.existsSync(sourceDir)) {
        console.log(c.red('\n  Error: Source .agent folder not found.'));
        process.exit(1);
    }

    const items = getSourceContents(sourceDir);
    printPreview(items);

    let prompt;
    if (isUpdate && exists) {
        console.log(c.yellow('\n  Mode: UPDATE (overwrite core files)'));
        prompt = `\n  ${c.yellow('?')} Proceed with update? ${c.dim('(y/N)')} `;
    } else if (exists) {
        console.log(c.yellow('\n  .agent folder already exists.'));
        prompt = `\n  ${c.yellow('?')} Re-initialize (overwrite)? ${c.dim('(y/N)')} `;
    } else {
        prompt = `\n  ${c.green('?')} Install .agent folder? ${c.dim('(Y/n)')} `;
    }

    const ans = await ask(prompt);
    const isNewInstall = !exists;
    const accepted = isNewInstall
        ? ans.toLowerCase() !== 'n'
        : ans.toLowerCase() === 'y';

    if (!accepted) {
        console.log(c.dim('\n  Cancelled.\n'));
        return;
    }

    try {
        process.stdout.write(c.dim('\n  Copying files... '));
        copyRecursive(sourceDir, targetDir);
        console.log(c.green('Done!'));

        console.log(c.green('\n  Setup complete!'));
        console.log(c.dim('  ─────────────────────────────────────'));
        console.log(
            `  Activation: Type ${c.cyan('"Xin chao ag-core"')} in AI chat.`
        );
        console.log(
            `  Commands:   ${c.cyan('/help')} ${c.dim('to see available commands')}`
        );
        console.log(c.dim('  ─────────────────────────────────────\n'));
    } catch (err) {
        console.error(c.red(`\n  Error: ${err.message}`));
        process.exit(1);
    }
}

async function handleRemove() {
    const targetDir = path.join(process.cwd(), '.agent');

    console.log(LOGO);
    console.log(c.bold('  AG Core - Remove'));
    console.log(c.dim(`  Target: ${process.cwd()}`));

    if (!fs.existsSync(targetDir)) {
        console.log(c.dim('\n  No .agent folder found. Nothing to remove.\n'));
        return;
    }

    const items = getSourceContents(targetDir);
    const files = items.filter((i) => i.type === 'file');
    console.log(
        c.yellow(`\n  This will permanently delete ${files.length} files.`)
    );

    const ans = await ask(
        `\n  ${c.red('?')} Delete .agent folder? ${c.dim('(y/N)')} `
    );
    if (ans.toLowerCase() !== 'y') {
        console.log(c.dim('\n  Cancelled.\n'));
        return;
    }

    try {
        removeRecursive(targetDir);
        console.log(c.green('\n  .agent folder removed.\n'));
    } catch (err) {
        console.error(c.red(`\n  Error: ${err.message}`));
        process.exit(1);
    }
}

function showHelp() {
    console.log(LOGO);
    console.log(c.bold('  Usage:'));
    console.log(`    npx @htrnguyen/ag-core ${c.dim('[command]')}\n`);
    console.log(c.bold('  Commands:'));
    console.log(
        `    ${c.cyan('(default)')}    Interactive install with preview`
    );
    console.log(
        `    ${c.cyan('init')}         Install .agent folder`
    );
    console.log(
        `    ${c.cyan('update')}       Update to latest templates`
    );
    console.log(
        `    ${c.cyan('remove')}       Remove .agent folder`
    );
    console.log(
        `    ${c.cyan('--version')}    Show version\n`
    );
}

async function main() {
    try {
        if (!command || command === 'init') {
            await handleInit(false);
        } else if (command === 'update') {
            await handleInit(true);
        } else if (command === 'remove' || command === 'uninstall') {
            await handleRemove();
        } else if (command === '--help' || command === '-h') {
            showHelp();
        } else if (command === '--version' || command === '-v') {
            console.log(`ag-core v${VERSION}`);
        } else {
            console.log(c.red(`\n  Unknown command: ${command}`));
            console.log(c.dim('  Run with --help for options.\n'));
        }
    } catch (err) {
        console.error(c.red(`Unexpected error: ${err.message}`));
        process.exit(1);
    }
}

main();
