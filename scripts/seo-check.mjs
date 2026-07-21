import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const site = read("src/lib/site.ts");
const projects = read("src/lib/projects.ts");
const contact = read("src/routes/contact.tsx");
const seo = read("src/lib/seo.ts");
const netlify = read("netlify.toml");
const vite = read("vite.config.ts");
const robots = read("public/robots.txt");
const packageJson = JSON.parse(read("package.json"));

assert(
  site.includes('origin: "https://analytics.elshafey.online"'),
  "Canonical origin is missing or changed.",
);
assert(site.includes('name: "Saber El Shafey"'), "Canonical person name is missing.");
assert(site.includes('alternateName: "Saber Farag"'), "Alternate name is missing.");
assert(!netlify.includes('to = "/index.html"'), "SPA catch-all redirect is still configured.");
assert(
  netlify.includes('publish = "dist/client"'),
  "Netlify publish directory must be dist/client.",
);
assert(
  robots.includes("Sitemap: https://analytics.elshafey.online/sitemap.xml"),
  "robots.txt sitemap is incorrect.",
);
assert(
  packageJson.devDependencies["@netlify/vite-plugin-tanstack-start"] === "1.3.17",
  "Netlify Start adapter must be pinned to 1.3.17.",
);
assert(packageJson.engines.node === ">=22.12.0 <23", "Node 22 LTS must be enforced.");
assert(packageJson.packageManager === "npm@10.9.2", "npm 10.9.2 must be enforced.");
assert(
  netlify.includes('command = "npm run build:netlify"'),
  "Netlify must run verification before building.",
);
assert(
  netlify.includes('VITE_DEPLOY_CONTEXT = "deploy-preview"'),
  "Preview indexing context is missing.",
);
assert(vite.includes("sourcemap: false"), "Production source maps must remain disabled.");

const expectedSlugs = [
  "luxury-yacht-platform",
  "ads-analytics-dashboard",
  "seo-search-console-platform",
  "marketing-intelligence-hub",
];
for (const slug of expectedSlugs)
  assert(projects.includes(`"${slug}"`), `Missing project slug: ${slug}`);

const forbiddenClaims = [
  /google[ -]?certified/i,
  /40\+ shipped/i,
  /312%/i,
  /186%/i,
  /4[.]7[×x]/i,
  /92% reporting/i,
  /\$500m\+/i,
  /\$2m\+/i,
  /global yachting group/i,
  /launch product/i,
  /booking .*engagement/i,
  /within 24 hours/i,
  /https?:\/\/(?:www[.])?linkedin[.]com\/?(?:["')\s]|$)/i,
];
const publicSource = [
  "src/routes/index.tsx",
  "src/routes/about.tsx",
  "src/routes/process.tsx",
  "src/routes/contact.tsx",
  "src/routes/work.index.tsx",
  "src/routes/work.$slug.tsx",
  "src/lib/projects.ts",
]
  .map(read)
  .join("\n");
for (const claim of forbiddenClaims)
  assert(!claim.test(publicSource), `Unsupported public claim remains: ${claim}`);

assert(!/<form\b|onSubmit=/i.test(contact), "A simulated contact form remains.");
assert(contact.includes("mailto:${site.email}"), "The direct mailto action is missing.");
assert(
  contact.includes("navigator.clipboard.writeText(site.email)"),
  "The explicit copy-email action is missing.",
);
for (const forbiddenSchema of ["Organization", "CreativeWork", "Product", "Review"])
  assert(!seo.includes(`\"${forbiddenSchema}\"`), `Unapproved schema remains: ${forbiddenSchema}`);

for (const field of [
  "ownerStatus",
  "indexability",
  "canonical",
  "localizedCounterpart",
  "h1",
  "schemaEligibility",
  "evidenceReferences",
]) {
  assert(site.includes(field), `Shared route-record field is missing: ${field}`);
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log("SEO and content contract checks passed.");
}
