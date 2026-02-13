const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "../../");
const packageJsonPath = path.join(rootDir, "package.json");
const indexPath = path.join(rootDir, "index.html");

try {
    // Read package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    const version = packageJson.version;
    console.log(`Current version: ${version}`);

    // Read index.html
    let indexHtml = fs.readFileSync(indexPath, "utf8");

    // Regex to match the badge div content: <div class="badge">vX.Y.Z Release</div>
    const badgeRegex = /<div class="badge">v.*? Release<\/div>/;
    const newBadge = `<div class="badge">v${version} Release</div>`;

    if (badgeRegex.test(indexHtml)) {
        indexHtml = indexHtml.replace(badgeRegex, newBadge);
        fs.writeFileSync(indexPath, indexHtml, "utf8");
        console.log(`Successfully updated index.html to version ${version}`);

        // If running via npm version, we need to add the file to the commit
        // But since this might be run manually, we'll verify context.
        // For npm version hook, git add is needed.
    } else {
        console.error("Error: Could not find version badge in index.html");
        process.exit(1);
    }
} catch (error) {
    console.error("Error syncing version:", error);
    process.exit(1);
}
