import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:4173",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: {
    command: `${process.execPath} ${process.env.npm_execpath} run build:production && ${process.execPath} scripts/serve-built.mjs`,
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "desktop-1440x900", use: { viewport: { width: 1440, height: 900 } } },
    { name: "mobile-360x800", use: { viewport: { width: 360, height: 800 } } },
    { name: "mobile-390x844", use: { viewport: { width: 390, height: 844 } } },
    { name: "mobile-412x915", use: { viewport: { width: 412, height: 915 } } },
  ],
});
