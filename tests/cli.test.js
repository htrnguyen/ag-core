const { test } = require("node:test");
const assert = require("node:assert");
const { execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const pkg = require("../package.json");

const CLI_PATH = path.join(__dirname, "../bin/cli.js");
const TEST_DIR = path.join(__dirname, "temp_test_env");

test("CLI Initialization", (t) => {
    // Setup
    if (fs.existsSync(TEST_DIR))
        fs.rmSync(TEST_DIR, { recursive: true, force: true });
    fs.mkdirSync(TEST_DIR);

    // Run init command (dry run / help check for now)
    const versionOutput = execSync(`node ${CLI_PATH} --version`).toString();
    assert.ok(
        versionOutput.includes(pkg.version),
        `Version should match package.json (${pkg.version})`,
    );

    // Verify help command works
    const helpOutput = execSync(`node ${CLI_PATH} --help`).toString();
    assert.ok(helpOutput.includes("Usage:"), "Help output should be shown");

    // Cleanup
    if (fs.existsSync(TEST_DIR))
        fs.rmSync(TEST_DIR, { recursive: true, force: true });
});
