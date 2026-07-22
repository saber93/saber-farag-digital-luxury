import { spawnSync } from "node:child_process";

const result = spawnSync(
  "git",
  ["diff", "--exit-code", "--", "package.json", "package-lock.json"],
  {
    cwd: process.cwd(),
    encoding: "utf8",
  },
);

if (result.status !== 0) {
  if (result.stdout) process.stderr.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  throw new Error("npm ci changed package.json or package-lock.json");
}

console.log("Verified npm ci left the package manifest and lockfile unchanged.");
