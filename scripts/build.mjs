import { spawnSync } from "node:child_process";

const result = spawnSync(process.execPath, ["node_modules/vite/bin/vite.js", "build"], {
  cwd: process.cwd(),
  env: process.env,
  stdio: "inherit",
});

if (result.status !== 0) process.exit(result.status ?? 1);

await import("./sanitize-output.mjs");
