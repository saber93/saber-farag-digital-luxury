import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const artifactMode = process.argv.includes("--artifacts");
const sourceRoots = [
  "src",
  "public",
  "package.json",
  "package-lock.json",
  "netlify.toml",
  "vite.config.ts",
];
const artifactRoots = ["dist", ".netlify/v1"];
const allowedExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".map",
  ".mjs",
  ".svg",
  ".toml",
  ".ts",
  ".tsx",
  ".txt",
  ".xml",
]);
const findings = [];

const advisory = "GHSA-g7cv-rxg3-hmpx";
const compromisedVersions = new Map(
  Object.entries({
    "@tanstack/arktype-adapter": ["1.166.12", "1.166.15"],
    "@tanstack/eslint-plugin-router": ["1.161.9", "1.161.12"],
    "@tanstack/eslint-plugin-start": ["0.0.4", "0.0.7"],
    "@tanstack/history": ["1.161.9", "1.161.12"],
    "@tanstack/nitro-v2-vite-plugin": ["1.154.12", "1.154.15"],
    "@tanstack/react-router": ["1.169.5", "1.169.8"],
    "@tanstack/react-router-devtools": ["1.166.16", "1.166.19"],
    "@tanstack/react-router-ssr-query": ["1.166.15", "1.166.18"],
    "@tanstack/react-start": ["1.167.68", "1.167.71"],
    "@tanstack/react-start-client": ["1.166.51", "1.166.54"],
    "@tanstack/react-start-rsc": ["0.0.47", "0.0.50"],
    "@tanstack/react-start-server": ["1.166.55", "1.166.58"],
    "@tanstack/router-cli": ["1.166.46", "1.166.49"],
    "@tanstack/router-core": ["1.169.5", "1.169.8"],
    "@tanstack/router-devtools": ["1.166.16", "1.166.19"],
    "@tanstack/router-devtools-core": ["1.167.6", "1.167.9"],
    "@tanstack/router-generator": ["1.166.45", "1.166.48"],
    "@tanstack/router-plugin": ["1.167.38", "1.167.41"],
    "@tanstack/router-ssr-query-core": ["1.168.3", "1.168.6"],
    "@tanstack/router-utils": ["1.161.11", "1.161.14"],
    "@tanstack/router-vite-plugin": ["1.166.53", "1.166.56"],
    "@tanstack/solid-router": ["1.169.5", "1.169.8"],
    "@tanstack/solid-router-devtools": ["1.166.16", "1.166.19"],
    "@tanstack/solid-router-ssr-query": ["1.166.15", "1.166.18"],
    "@tanstack/solid-start": ["1.167.65", "1.167.68"],
    "@tanstack/solid-start-client": ["1.166.50", "1.166.53"],
    "@tanstack/solid-start-server": ["1.166.54", "1.166.57"],
    "@tanstack/start-client-core": ["1.168.5", "1.168.8"],
    "@tanstack/start-fn-stubs": ["1.161.9", "1.161.12"],
    "@tanstack/start-plugin-core": ["1.169.23", "1.169.26"],
    "@tanstack/start-server-core": ["1.167.33", "1.167.36"],
    "@tanstack/start-static-server-functions": ["1.166.44", "1.166.47"],
    "@tanstack/start-storage-context": ["1.166.38", "1.166.41"],
    "@tanstack/valibot-adapter": ["1.166.12", "1.166.15"],
    "@tanstack/virtual-file-routes": ["1.161.10", "1.161.13"],
    "@tanstack/vue-router": ["1.169.5", "1.169.8"],
    "@tanstack/vue-router-devtools": ["1.166.16", "1.166.19"],
    "@tanstack/vue-router-ssr-query": ["1.166.15", "1.166.18"],
    "@tanstack/vue-start": ["1.167.61", "1.167.64"],
    "@tanstack/vue-start-client": ["1.166.46", "1.166.49"],
    "@tanstack/vue-start-server": ["1.166.50", "1.166.53"],
    "@tanstack/zod-adapter": ["1.166.12", "1.166.15"],
  }).map(([name, versions]) => [name, new Set(versions)]),
);

const advisoryIndicators = [
  "github:tanstack/router#79ac49eedf774dd4b0cfa308722bc463cfe5885c",
  "@tanstack/setup",
  "router_init.js",
  "tanstack_runner.js",
  "filev2.getsession.org",
  "seed1.getsession.org",
  "seed2.getsession.org",
  "seed3.getsession.org",
  "litter.catbox.moe/h8nc9u.js",
  "litter.catbox.moe/7rrc6l.mjs",
];

const commonChecks = [
  [new RegExp("-----BEGIN " + "(?:RSA |EC |OPENSSH )?PRIVATE KEY-----"), "private key"],
  [new RegExp("\\bsk-" + "[A-Za-z0-9_-]{20,}\\b"), "secret-looking API key"],
  [new RegExp("\\bgh[ps]_[A-Za-z0-9]{30,}\\b"), "GitHub token"],
  [new RegExp("\\bgithub_pat_" + "[A-Za-z0-9_]{40,}\\b"), "GitHub fine-grained token"],
  [new RegExp("\\bnpm_" + "[A-Za-z0-9]{30,}\\b"), "npm token"],
];
const sourceChecks = [
  ...commonChecks,
  [/https?:\/\/www\.linkedin\.com\/?["')\s]/, "generic LinkedIn URL"],
  [/sourcemap:\s*true/, "production source maps"],
  [/to\s*=\s*["']\/index\.html["']/, "SPA catch-all"],
  [/https?:\/\/[a-z0-9.-]*supabase[.]co/i, "unapproved public Supabase endpoint"],
];
const artifactChecks = [
  ...commonChecks,
  [/\/(?:Users|private\/tmp|opt\/build)\//, "absolute local build path"],
  [/https?:\/\/[a-z0-9-]+\.netlify\.app/i, "preview hostname"],
  [/sourceMappingURL=/, "source map reference"],
  ...advisoryIndicators.map((indicator) => [
    new RegExp(indicator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    `${advisory} indicator`,
  ]),
];

function visit(path, checks) {
  const stat = statSync(path);
  if (stat.isDirectory()) {
    for (const entry of readdirSync(path)) visit(join(path, entry), checks);
    return;
  }
  if (!allowedExtensions.has(extname(path))) return;
  if (extname(path) === ".map") {
    findings.push(`${path}: production source map`);
    return;
  }
  const content = readFileSync(path, "utf8");
  for (const [pattern, label] of checks) {
    if (pattern.test(content)) findings.push(`${path}: ${label}`);
  }
}

function packageNameFromLockPath(path) {
  const marker = "node_modules/";
  const index = path.lastIndexOf(marker);
  return index === -1 ? null : path.slice(index + marker.length);
}

function equalRecord(left = {}, right = {}) {
  return (
    JSON.stringify(Object.entries(left).sort()) === JSON.stringify(Object.entries(right).sort())
  );
}

if (artifactMode) {
  for (const root of artifactRoots) {
    if (!existsSync(root)) findings.push(`${root}: required build artifacts are missing`);
    else visit(root, artifactChecks);
  }
} else {
  for (const root of sourceRoots) if (existsSync(root)) visit(root, sourceChecks);
  if (existsSync("scripts")) visit("scripts", commonChecks);

  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
  const lockText = readFileSync("package-lock.json", "utf8");
  const lock = JSON.parse(lockText);
  const lockRoot = lock.packages?.[""] ?? {};

  if (lock.lockfileVersion !== 3) findings.push("package-lock.json: lockfileVersion must be 3");
  if (!equalRecord(packageJson.dependencies, lockRoot.dependencies)) {
    findings.push("package-lock.json: root dependencies do not match package.json");
  }
  if (!equalRecord(packageJson.devDependencies, lockRoot.devDependencies)) {
    findings.push("package-lock.json: root devDependencies do not match package.json");
  }

  const allowedInstallScripts = new Set([
    "",
    "node_modules/esbuild",
    "node_modules/fsevents",
    "node_modules/playwright/node_modules/fsevents",
    "node_modules/sharp",
  ]);

  for (const [path, record] of Object.entries(lock.packages ?? {})) {
    const packageName = packageNameFromLockPath(path);
    const affected = packageName ? compromisedVersions.get(packageName) : null;
    if (affected?.has(record.version)) {
      findings.push(`${path}: ${advisory} compromised version ${record.version}`);
    }
    if (record.hasInstallScript && !allowedInstallScripts.has(path)) {
      findings.push(`${path || "root"}: unreviewed install script`);
    }
    if (record.resolved) {
      if (!record.resolved.startsWith("https://registry.npmjs.org/")) {
        findings.push(`${path}: non-registry package source ${record.resolved}`);
      }
      if (!record.integrity) findings.push(`${path}: remote package is missing integrity`);
    }
    if (record.link) findings.push(`${path}: linked package is not allowed`);
  }

  for (const indicator of advisoryIndicators) {
    if (lockText.includes(indicator))
      findings.push(`package-lock.json: ${advisory} indicator ${indicator}`);
  }

  const tanstackRoot = "node_modules/@tanstack";
  if (existsSync(tanstackRoot)) {
    const suspiciousFilenames = new Set(["router_init.js", "tanstack_runner.js"]);
    const inspectNames = (path) => {
      for (const entry of readdirSync(path, { withFileTypes: true })) {
        const child = join(path, entry.name);
        if (suspiciousFilenames.has(entry.name))
          findings.push(`${child}: ${advisory} payload file`);
        if (entry.isDirectory()) inspectNames(child);
      }
    };
    inspectNames(tanstackRoot);
  }
}

if (findings.length) {
  console.error(findings.map((finding) => `- ${finding}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    artifactMode
      ? "Built client, server, and Netlify function security scan passed."
      : `Source, lock provenance, install-script, and ${advisory} checks passed.`,
  );
}
