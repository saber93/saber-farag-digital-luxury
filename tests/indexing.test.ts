import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("deployment indexing policy", () => {
  it("allows indexing only in the production context", async () => {
    vi.stubEnv("VITE_DEPLOY_CONTEXT", "production");
    const production = await import("../src/lib/site");
    expect(production.robotsDirective(true)).toContain("index, follow");
    expect(production.robotsDirective(false)).toBe("noindex, follow");
    expect(production.routeHeaders(false, false)["X-Robots-Tag"]).toBe("noindex, follow");

    vi.resetModules();
    vi.stubEnv("VITE_DEPLOY_CONTEXT", "deploy-preview");
    const preview = await import("../src/lib/site");
    expect(preview.robotsDirective(true)).toBe("noindex, nofollow");
    expect(preview.routeHeaders(true)["X-Robots-Tag"]).toBe("noindex, nofollow");
  });
});
