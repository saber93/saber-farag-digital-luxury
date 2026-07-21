import { projects, type ProjectSlug } from "./projects";

export const site = {
  origin: "https://analytics.elshafey.online",
  name: "Saber El Shafey",
  alternateName: "Saber Farag",
  role: "Analytics Specialist",
  email: "saber.elshafey@gmail.com",
  description:
    "Analytics specialist designing clear dashboards, measurement systems, and decision-ready reporting experiences.",
} as const;

export function absoluteUrl(path: string): string {
  const normalized = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}`;
  return new URL(normalized, site.origin).toString();
}

export const indexablePaths = ["/", "/about", "/process", "/contact", "/work"] as const;
export type IndexablePath = (typeof indexablePaths)[number];

export type SchemaEligibility = "WebSite" | "ProfilePage" | "Person" | "BreadcrumbList";

export type RouteRecord = {
  path: string;
  locale: "en";
  ownerStatus: "canonical-owner" | "pending-support";
  indexability: "index" | "noindex";
  canonical: string;
  localizedCounterpart: null;
  title: string;
  description: string;
  h1: string;
  schemaEligibility: readonly SchemaEligibility[];
  evidenceReferences: readonly string[];
  label: string;
};

export type PageRecord = RouteRecord & {
  path: IndexablePath;
  ownerStatus: "canonical-owner";
  indexability: "index";
};

function definePage(
  record: Pick<
    PageRecord,
    "path" | "title" | "description" | "h1" | "schemaEligibility" | "evidenceReferences" | "label"
  >,
): PageRecord {
  return {
    ...record,
    locale: "en",
    ownerStatus: "canonical-owner",
    indexability: "index",
    canonical: absoluteUrl(record.path),
    localizedCounterpart: null,
  };
}

export const pages = {
  home: definePage({
    path: "/",
    title: "Saber El Shafey — Analytics Specialist",
    description:
      "Analytics dashboards, measurement systems, and decision-ready reporting concepts by Saber El Shafey.",
    h1: "Turn data into clear decisions.",
    schemaEligibility: ["WebSite"],
    evidenceReferences: ["governance:identity:saber-el-shafey", "governance:property:analytics"],
    label: "Home",
  }),
  about: definePage({
    path: "/about",
    title: "About Saber El Shafey — Analytics Specialist",
    description:
      "How Saber El Shafey approaches analytics, dashboard design, and clear communication for decision-making.",
    h1: "Analytics needs an analyst's discipline and a designer's clarity.",
    schemaEligibility: ["ProfilePage", "Person", "BreadcrumbList"],
    evidenceReferences: [
      "governance:identity:saber-el-shafey",
      "governance:claim:analytics-specialist",
    ],
    label: "About",
  }),
  process: definePage({
    path: "/process",
    title: "Analytics Process — Saber El Shafey",
    description:
      "A practical process for defining questions, auditing data, designing dashboards, and validating analytics outputs.",
    h1: "From a decision question to a reporting system that can be understood.",
    schemaEligibility: ["BreadcrumbList"],
    evidenceReferences: ["owner-review:analytics-method"],
    label: "Process",
  }),
  contact: definePage({
    path: "/contact",
    title: "Contact Saber El Shafey",
    description:
      "Contact Saber El Shafey to discuss analytics, reporting, dashboard, or measurement work.",
    h1: "Start with the decision you need the data to support.",
    schemaEligibility: ["BreadcrumbList"],
    evidenceReferences: ["governance:contact:saber-el-shafey-email"],
    label: "Contact",
  }),
  work: definePage({
    path: "/work",
    title: "Analytics Work — Saber El Shafey",
    description:
      "Selected analytics interface concepts exploring campaign reporting, search performance, and cross-channel data.",
    h1: "Analytics concepts built around questions, context, and investigation.",
    schemaEligibility: ["BreadcrumbList"],
    evidenceReferences: ["governance:claim:analytics-projects-pending-verification"],
    label: "Work",
  }),
} as const satisfies Record<string, PageRecord>;

export type SupportRouteRecord = RouteRecord & {
  projectSlug: ProjectSlug;
  ownerStatus: "pending-support";
  indexability: "noindex";
};

export const canonicalRoutes = Object.freeze(Object.values(pages));

export const supportRoutes: readonly SupportRouteRecord[] = Object.freeze(
  projects.map((project) => {
    const path = `/work/${project.slug}`;
    return {
      path,
      projectSlug: project.slug,
      locale: "en",
      ownerStatus: "pending-support",
      indexability: "noindex",
      canonical: absoluteUrl(path),
      localizedCounterpart: null,
      title: `${project.title} — Analytics Concept by ${site.name}`,
      description: project.summary,
      h1: project.title,
      schemaEligibility: ["BreadcrumbList"],
      evidenceReferences: [
        "governance:claim:analytics-projects-pending-verification",
        `repository:analytics-project:${project.slug}`,
      ],
      label: project.title,
    } satisfies SupportRouteRecord;
  }),
);

export const routeRegistry: readonly RouteRecord[] = Object.freeze([
  ...canonicalRoutes,
  ...supportRoutes,
]);

export const deployContext = import.meta.env.VITE_DEPLOY_CONTEXT ?? "local";
export const isIndexableDeployment = deployContext === "production";

export function robotsDirective(indexable: boolean): string {
  if (!isIndexableDeployment) return "noindex, nofollow";
  return indexable
    ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    : "noindex, follow";
}

export const securityHeaders = {
  "Content-Security-Policy": [
    "default-src 'self'",
    "base-uri 'self'",
    "connect-src 'self'",
    "font-src 'self' data:",
    "form-action 'self'",
    "frame-ancestors 'none'",
    isIndexableDeployment ? "frame-src 'none'" : "frame-src https://app.netlify.com",
    "img-src 'self' data:",
    "object-src 'none'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "upgrade-insecure-requests",
  ].join("; "),
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
} as const;

export function routeHeaders(indexable: boolean, cache = true): Record<string, string> {
  return {
    ...securityHeaders,
    "X-Robots-Tag": robotsDirective(indexable),
    "Cache-Control": cache ? "public, max-age=0, must-revalidate" : "no-store",
    ...(cache
      ? {
          "Netlify-CDN-Cache-Control":
            "public, durable, s-maxage=3600, stale-while-revalidate=86400",
        }
      : {}),
  };
}
