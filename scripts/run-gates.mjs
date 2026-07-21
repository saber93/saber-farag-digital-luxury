import { spawnSync } from "node:child_process";

const groups = {
  netlify: [
    "runtime:check",
    "lint",
    "typecheck",
    "test:unit",
    "seo:check",
    "security:scan",
    "build",
    "output:check",
  ],
  verify: [
    "runtime:check",
    "format:check",
    "lint",
    "typecheck",
    "test:unit",
    "seo:check",
    "security:scan",
    "build:production",
    "output:check",
  ],
};
groups.full = [...groups.verify, "test:e2e"];

const groupName = process.argv[2];
const gates = groups[groupName];
const npmCli = process.env.npm_execpath;

if (!gates || !npmCli) {
  throw new Error(`Unknown gate group or missing npm runtime: ${groupName ?? "none"}`);
}

for (const gate of gates) {
  const result = spawnSync(process.execPath, [npmCli, "run", gate], {
    cwd: process.cwd(),
    env: process.env,
    stdio: "inherit",
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
