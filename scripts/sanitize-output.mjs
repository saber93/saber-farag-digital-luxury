import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { extname, join, sep } from "node:path";

const textExtensions = new Set([".css", ".html", ".js", ".json", ".mjs"]);
const outputRoots = ["dist/server", ".netlify/v1"];
const projectPrefix = `${process.cwd()}${sep}`;
let sanitizedFiles = 0;

function visit(path) {
  const stat = statSync(path);
  if (stat.isDirectory()) {
    for (const entry of readdirSync(path)) visit(join(path, entry));
    return;
  }
  if (!textExtensions.has(extname(path))) return;

  const source = readFileSync(path, "utf8");
  const sanitized = source.split(projectPrefix).join("");
  if (sanitized !== source) {
    writeFileSync(path, sanitized);
    sanitizedFiles += 1;
  }
}

for (const root of outputRoots) if (existsSync(root)) visit(root);

console.log(`Sanitized build-root metadata from ${sanitizedFiles} artifact(s).`);
