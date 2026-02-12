#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const args = process.argv.slice(2);
const command = args[0];

const ASCII_ART = `\x1b[36m
  __ _  __ _        ___ ___  _ __ ___ 
 / _\` |/ _\` |_____ / __/ _ \\| '__/ _ \\
| (_| | (_| |_____| (_| (_) | | |  __/
 \\__,_|\\__, |      \\___\\___/|_|  \\___|
       |___/                          
\x1b[0m`;

async function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }));
}

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(
                path.join(src, childItemName),
                path.join(dest, childItemName)
            );
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

function removeRecursiveSync(dirPath) {
    if (fs.existsSync(dirPath)) {
        fs.readdirSync(dirPath).forEach((file, index) => {
            const curPath = path.join(dirPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                removeRecursiveSync(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(dirPath);
    }
}

async function handleInit(isUpdate = false) {
    const sourceDir = path.join(__dirname, '..', '.agent');
    const targetDir = path.join(process.cwd(), '.agent');
    const action = isUpdate ? "Update" : "Initialize";

    // Header
    console.log(ASCII_ART);
    console.log(`🚀 AG Core ${action} Tool`);
    console.log(`Target: ${process.cwd()}`);
    
    // Confirmation

    let message = "";
    if (isUpdate) {
        if (!fs.existsSync(targetDir)) {
            console.log("⚠️  .agent folder not found. Switching to install mode.");
            // Fallback to install logic essentially, but keep action as Update for logging if we want, or just proceed
            message = "\nReady to install .agent folder? (y/N): ";
        } else {
            message = "\nReady to UPDATE .agent folder? (This will overwrite core files) (y/N): ";
        }
    } else {
        if (fs.existsSync(targetDir)) {
            console.log(`\n⚠️  .agent folder already exists.`);
            message = "Do you want to re-initialize (overwrite)? (y/N): ";
        } else {
            message = "\nReady to install .agent folder? (y/N): ";
        }
    }

    const ans = await askQuestion(message);
    if (ans.toLowerCase() !== 'y') {
        console.log('Action cancelled.');
        return;
    }

    try {
        console.log(`\n📦 Copying files...`);
        copyRecursiveSync(sourceDir, targetDir);
        console.log(`✅ ${action} completed successfully!`);
        if (!isUpdate) {
            console.log('\n🌟 Activation: Type "Xin chào ag-core" to start.');
        }
    } catch (err) {
        console.error(`❌ Error during ${action.toLowerCase()}:`, err.message);
        process.exit(1);
    }
}

async function handleRemove() {
    const targetDir = path.join(process.cwd(), '.agent');
    
    console.log(ASCII_ART);
    console.log(`🗑️  AG Core Removal Tool`);
    
    if (!fs.existsSync(targetDir)) {
        console.log('ℹ️  No .agent folder found in current directory.');
        return;
    }

    const ans = await askQuestion(`Are you sure you want to PERMANENTLY DELETE .agent folder? (y/N): `);
    if (ans.toLowerCase() !== 'y') {
        console.log('Deletion cancelled.');
        return;
    }

    try {
        removeRecursiveSync(targetDir);
        console.log('✅ .agent folder removed.');
    } catch (err) {
        console.error('❌ Error deleting:', err.message);
        process.exit(1);
    }
}

async function main() {
    try {
        // Default to init if no command, or if command is 'init'
        if (!command || command === 'init') {
            await handleInit(false);
        } else if (command === 'update') {
            await handleInit(true);
        } else if (command === 'remove' || command === 'uninstall') {
            await handleRemove();
        } else if (command === '--help' || command === '-h') {
            console.log(ASCII_ART);
            console.log('Usage: npx @htrnguyen/ag-core [command]');
            console.log('\nCommands:');
            console.log('  (no args)   Interactive init/install');
            console.log('  update      Update .agent folder to latest');
            console.log('  remove      Remove .agent folder');
        } else {
            console.log(`Unknown command: ${command}`);
            console.log('Run with --help for options');
        }
    } catch (e) {
        console.error("Unexpected error:", e);
    }
}

main();
