import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join } from "node:path";

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

function filesBelow(root) {
  if (!existsSync(root)) return [];
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name);
    return entry.isDirectory() ? filesBelow(path) : [path];
  });
}

const clientFiles = filesBelow("dist/client");
const allOutputFiles = [...filesBelow("dist"), ...filesBelow(".netlify/v1")];
const assets = clientFiles.filter((path) => [".js", ".css"].includes(extname(path)));

assert(existsSync("dist/server/server.js"), "TanStack Start server output is missing.");
assert(existsSync(".netlify/v1/functions/server.mjs"), "Netlify SSR function output is missing.");
assert(!existsSync("dist/client/index.html"), "A competing SPA index.html was emitted.");
assert(assets.length >= 8, "Expected fingerprinted client asset output was not emitted.");
for (const asset of assets) {
  assert(/-[A-Za-z0-9_-]{8,}[.](?:js|css)$/.test(asset), `Asset is not fingerprinted: ${asset}`);
}
for (const path of allOutputFiles) {
  assert(extname(path) !== ".map", `Production source map was emitted: ${path}`);
  if ([".js", ".mjs", ".html", ".css"].includes(extname(path))) {
    const content = readFileSync(path, "utf8");
    assert(!content.includes("sourceMappingURL="), `Source map reference remains: ${path}`);
    assert(!content.includes("netlify.app"), `Preview hostname leaked into output: ${path}`);
  }
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Verified ${allOutputFiles.length} build artifacts and ${assets.length} fingerprinted assets.`,
  );
}
