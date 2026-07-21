import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const roots = ["src", "public", "netlify.toml", "vite.config.ts", "package-lock.json"];
if (existsSync("dist")) roots.push("dist");
const allowedExtensions = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".mjs",
  ".css",
  ".txt",
  ".toml",
  ".json",
  ".html",
  ".map",
]);
const findings = [];

function visit(path) {
  const stat = statSync(path);
  if (stat.isDirectory()) {
    for (const entry of readdirSync(path)) visit(join(path, entry));
    return;
  }
  if (!allowedExtensions.has(extname(path))) return;
  if (extname(path) === ".map") {
    findings.push(`${path}: production source map`);
    return;
  }
  const content = readFileSync(path, "utf8");
  const checks = [
    [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/, "private key"],
    [/\bsk-[A-Za-z0-9_-]{20,}\b/, "secret-looking API key"],
    [/https?:\/\/www\.linkedin\.com\/?["')\s]/, "generic LinkedIn URL"],
    [/sourcemap:\s*true/, "production source maps"],
    [/to\s*=\s*["']\/index\.html["']/, "SPA catch-all"],
    [/https?:\/\/[a-z0-9.-]*supabase[.]co/i, "unapproved public Supabase endpoint"],
  ];
  for (const [pattern, label] of checks)
    if (pattern.test(content)) findings.push(`${path}: ${label}`);
}

for (const root of roots) visit(root);

const lock = JSON.parse(readFileSync("package-lock.json", "utf8"));
const compromisedVersions = new Map([
  ["node_modules/@tanstack/react-start", new Set(["1.167.68", "1.167.71"])],
  ["node_modules/@tanstack/react-router", new Set(["1.169.5", "1.169.8"])],
]);
for (const [path, versions] of compromisedVersions) {
  const version = lock.packages?.[path]?.version;
  if (version && versions.has(version)) findings.push(`${path}: compromised version ${version}`);
}

if (findings.length) {
  console.error(findings.map((finding) => `- ${finding}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log("Static security scan passed.");
}
