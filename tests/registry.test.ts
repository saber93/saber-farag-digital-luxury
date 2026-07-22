import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getProject, isProjectSlug, projects, projectSlugs } from "../src/lib/projects";
import { breadcrumbSchema, profileSchema, websiteSchema } from "../src/lib/seo";
import {
  absoluteUrl,
  canonicalRoutes,
  indexablePaths,
  pages,
  routeRegistry,
  site,
  supportRoutes,
} from "../src/lib/site";

describe("public content registries", () => {
  it("defines exactly five canonical indexable routes", () => {
    expect(indexablePaths).toEqual(["/", "/about", "/process", "/contact", "/work"]);
    expect(new Set(indexablePaths).size).toBe(5);
    expect(
      Object.values(pages)
        .map((page) => page.path)
        .sort(),
    ).toEqual([...indexablePaths].sort());
    expect(canonicalRoutes).toHaveLength(5);
    expect(routeRegistry.filter((route) => route.indexability === "index")).toEqual(
      canonicalRoutes,
    );
  });

  it("implements the shared route-record contract", () => {
    expect(routeRegistry).toHaveLength(9);
    expect(new Set(routeRegistry.map((route) => route.path)).size).toBe(9);
    expect(supportRoutes).toHaveLength(4);

    for (const route of routeRegistry) {
      expect(route.locale).toBe("en");
      expect(route.localizedCounterpart).toBeNull();
      expect(route.canonical).toBe(absoluteUrl(route.path));
      expect(route.title.length).toBeGreaterThan(10);
      expect(route.description.length).toBeGreaterThan(40);
      expect(route.h1.length).toBeGreaterThan(10);
      expect(route.evidenceReferences.length).toBeGreaterThan(0);
    }

    for (const route of supportRoutes) {
      expect(route.ownerStatus).toBe("pending-support");
      expect(route.indexability).toBe("noindex");
      expect(indexablePaths).not.toContain(route.path);
    }
  });

  it("uses the approved canonical identity and origin", () => {
    expect(site.origin).toBe("https://analytics.elshafey.online");
    expect(site.name).toBe("Saber El Shafey");
    expect(site.alternateName).toBe("Saber Farag");
    expect(absoluteUrl("/about")).toBe("https://analytics.elshafey.online/about");
  });

  it("defines exactly the four stable project slugs", () => {
    expect(projectSlugs).toHaveLength(4);
    expect(projects).toHaveLength(4);
    expect(new Set(projectSlugs).size).toBe(4);
    for (const slug of projectSlugs) {
      expect(isProjectSlug(slug)).toBe(true);
      expect(getProject(slug).slug).toBe(slug);
    }
    expect(isProjectSlug("not-a-project")).toBe(false);
  });

  it("limits structured data to the approved visible schema types", () => {
    expect(websiteSchema["@type"]).toBe("WebSite");
    expect(profileSchema["@type"]).toBe("ProfilePage");
    expect((profileSchema.mainEntity as Record<string, unknown>)["@type"]).toBe("Person");
    expect(JSON.stringify(profileSchema)).not.toContain("sameAs");
    expect(JSON.stringify(profileSchema)).not.toContain("Organization");
    expect(breadcrumbSchema([{ name: "Home", path: "/" }])["@type"]).toBe("BreadcrumbList");
  });

  it("keeps contact behavior truthful and explicit", () => {
    const source = readFileSync(new URL("../src/routes/contact.tsx", import.meta.url), "utf8");
    expect(source).toContain("mailto:${site.email}");
    expect(source).toContain("navigator.clipboard.writeText(site.email)");
    expect(source).not.toMatch(/<form\b|onSubmit|message received|within 24 hours/i);
  });
});
