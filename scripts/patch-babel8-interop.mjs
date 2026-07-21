import { readFileSync, writeFileSync } from "node:fs";

const targets = [
  "node_modules/@tanstack/start-plugin-core/dist/esm/hydrate-when-transform.js",
  "node_modules/@tanstack/start-plugin-core/dist/esm/start-compiler/compiler.js",
  "node_modules/@tanstack/start-plugin-core/dist/esm/start-compiler/handleCreateServerFn.js",
];
const incompatibleImport = 'import babel from "@babel/core";';
const compatibleImport = 'import * as babel from "@babel/core";';

for (const target of targets) {
  const source = readFileSync(target, "utf8");
  if (source.includes(compatibleImport)) continue;
  if (!source.includes(incompatibleImport)) {
    throw new Error(`Refusing to patch unexpected TanStack compiler content: ${target}`);
  }
  writeFileSync(target, source.replace(incompatibleImport, compatibleImport));
}

console.log("Verified TanStack compiler compatibility with the patched Babel runtime.");
