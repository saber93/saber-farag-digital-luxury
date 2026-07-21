import { absoluteUrl, robotsDirective, site, type RouteRecord } from "./site";

type JsonLd = Record<string, unknown>;

export function breadcrumbSchema(items: ReadonlyArray<{ name: string; path: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const websiteSchema: JsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.origin}/#website`,
  url: site.origin,
  name: `${site.name} — Analytics Specialist`,
  description: site.description,
};

export const profileSchema: JsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${absoluteUrl("/about")}#profile`,
  url: absoluteUrl("/about"),
  name: `About ${site.name}`,
  mainEntity: {
    "@type": "Person",
    "@id": `${site.origin}/#saber-el-shafey`,
    name: site.name,
    alternateName: site.alternateName,
    jobTitle: site.role,
    description: site.description,
    email: `mailto:${site.email}`,
    url: absoluteUrl("/about"),
  },
};

function safeJson(value: JsonLd): string {
  const escapes: Record<string, string> = {
    "<": "\\u003c",
    ">": "\\u003e",
    "&": "\\u0026",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029",
  };
  return JSON.stringify(value).replace(/[<>&\u2028\u2029]/g, (character) => escapes[character]);
}

export function pageHead(
  page: Pick<RouteRecord, "path" | "title" | "description">,
  options: { indexable?: boolean; schemas?: JsonLd[] } = {},
) {
  const indexable = options.indexable ?? true;
  const canonical = absoluteUrl(page.path);

  return {
    meta: [
      { title: page.title },
      { name: "description", content: page.description },
      { name: "author", content: site.name },
      { name: "robots", content: robotsDirective(indexable) },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: `${site.name} — Analytics Specialist` },
      { property: "og:title", content: page.title },
      { property: "og:description", content: page.description },
      { property: "og:url", content: canonical },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: page.title },
      { name: "twitter:description", content: page.description },
    ],
    links: [{ rel: "canonical", href: canonical }],
    scripts: (options.schemas ?? []).map((schema) => ({
      type: "application/ld+json",
      children: safeJson(schema),
    })),
  };
}

export function detailHead(project: { slug: string; title: string; summary: string }) {
  return pageHead(
    {
      path: `/work/${project.slug}`,
      title: `${project.title} — Analytics Concept by ${site.name}`,
      description: project.summary,
    },
    {
      indexable: false,
      schemas: [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: project.title, path: `/work/${project.slug}` },
        ]),
      ],
    },
  );
}
