import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const publicPages = ["/", "/about", "/process", "/contact", "/work"] as const;
const projectSlugs = [
  "luxury-yacht-platform",
  "ads-analytics-dashboard",
  "seo-search-console-platform",
  "marketing-intelligence-hub",
] as const;

function captureRuntimeErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

for (const path of publicPages) {
  test(`${path} is server-rendered, canonical, and accessible`, async ({
    page,
    request,
  }, testInfo) => {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect(response.headers()["x-robots-tag"]).toContain("index, follow");
    expect(response.headers()["content-security-policy"]).toContain("default-src 'self'");
    expect(response.headers()["strict-transport-security"]).toContain("max-age=31536000");
    expect(response.headers()["x-content-type-options"]).toBe("nosniff");
    expect(response.headers()["x-frame-options"]).toBe("DENY");
    expect(response.headers()["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    const html = await response.text();
    expect(html).toContain("<h1");
    expect(html).toContain("https://analytics.elshafey.online");

    const runtimeErrors = captureRuntimeErrors(page);
    await page.goto(path);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://analytics.elshafey.online${path === "/" ? "/" : path}`,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index, follow/);

    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(schemas.length).toBeGreaterThan(0);
    for (const schema of schemas) {
      const parsed = JSON.parse(schema) as { "@type"?: string };
      expect(["WebSite", "ProfilePage", "BreadcrumbList"]).toContain(parsed["@type"]);
    }

    if (testInfo.project.name === "desktop-1440x900") {
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toEqual([]);
    }
    expect(runtimeErrors).toEqual([]);
  });
}

for (const slug of projectSlugs) {
  test(`${slug} is a direct 200 but noindex`, async ({ page }) => {
    const runtimeErrors = captureRuntimeErrors(page);
    const response = await page.goto(`/work/${slug}`);
    expect(response?.status()).toBe(200);
    expect(response?.headers()["x-robots-tag"]).toContain("noindex");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex, follow/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://analytics.elshafey.online/work/${slug}`,
    );
    await expect(page.getByText("Pending verification · portfolio concept")).toBeVisible();
    expect(runtimeErrors).toEqual([]);
  });
}

test("unknown paths return genuine noindex 404 responses", async ({ page }) => {
  for (const path of ["/work/not-a-project", "/not-a-route"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    expect(response?.headers()["x-robots-tag"]).toContain("noindex");
    await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex, follow/);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  }
});

test("sitemap contains only the five indexable URLs", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const xml = await response.text();
  expect(xml.match(/<url>/g) ?? []).toHaveLength(5);
  expect(xml).not.toContain("netlify.app");
  for (const slug of projectSlugs) expect(xml).not.toContain(slug);
});

test("internal links resolve without soft errors", async ({ page, request }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1440x900");
  await page.goto("/");
  const hrefs = await page
    .locator('a[href^="/"]')
    .evaluateAll((anchors) =>
      Array.from(new Set(anchors.map((anchor) => anchor.getAttribute("href")).filter(Boolean))),
    );
  expect(hrefs.length).toBeGreaterThanOrEqual(8);
  for (const href of hrefs) {
    const response = await request.get(href as string);
    expect(response.status(), href as string).toBeLessThan(400);
  }
});

test("contact exposes only honest email actions", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1440x900");
  await page.goto("/contact");
  await expect(page.locator("form")).toHaveCount(0);
  await expect(page.locator('a[href="mailto:saber.elshafey@gmail.com"]')).toHaveCount(3);
  await expect(page.getByRole("button", { name: "Copy address" })).toBeVisible();
});

test("skip navigation is the first keyboard target", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1440x900");
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("captures initial and rendered viewport evidence", async ({ page, request }, testInfo) => {
  const runtimeErrors = captureRuntimeErrors(page);
  const response = await request.get("/");
  await testInfo.attach("initial-home.html", {
    body: Buffer.from(await response.text()),
    contentType: "text/html",
  });
  await page.goto("/");
  await testInfo.attach("rendered-home.html", {
    body: Buffer.from(await page.content()),
    contentType: "text/html",
  });
  await page.screenshot({ path: testInfo.outputPath("home.png"), fullPage: true });
  await testInfo.attach("console.json", {
    body: Buffer.from(JSON.stringify(runtimeErrors, null, 2)),
    contentType: "application/json",
  });
  expect(runtimeErrors).toEqual([]);
});
