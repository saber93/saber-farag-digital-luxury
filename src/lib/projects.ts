export const projectSlugs = [
  "luxury-yacht-platform",
  "ads-analytics-dashboard",
  "seo-search-console-platform",
  "marketing-intelligence-hub",
] as const;

export type ProjectSlug = (typeof projectSlugs)[number];

export type Project = {
  slug: ProjectSlug;
  index: string;
  title: string;
  category: string;
  summary: string;
  question: string;
  approach: readonly string[];
  views: readonly { title: string; description: string }[];
  tools: readonly string[];
};

export const projects = [
  {
    slug: "luxury-yacht-platform",
    index: "01",
    title: "Asset Operations Dashboard",
    category: "Operations analytics concept",
    summary:
      "A portfolio concept for organizing asset health, service activity, and inquiry information in one readable operations view.",
    question:
      "How could mixed operational signals become a calm, scannable view for non-technical decision-makers?",
    approach: [
      "Group information by the decisions a user needs to make.",
      "Separate current state, history, and follow-up actions.",
      "Use progressive detail so exceptions remain visible without overwhelming the overview.",
    ],
    views: [
      {
        title: "Portfolio overview",
        description: "A hierarchy for status, attention, and recency across assets.",
      },
      {
        title: "Asset detail",
        description: "A focused view of signals, notes, and follow-up context.",
      },
      {
        title: "Inquiry workspace",
        description: "A structured handoff between inquiry context and operational availability.",
      },
    ],
    tools: [
      "Information architecture",
      "Dashboard design",
      "Data visualization",
      "Interaction design",
    ],
  },
  {
    slug: "ads-analytics-dashboard",
    index: "02",
    title: "Campaign Performance Dashboard",
    category: "Marketing analytics concept",
    summary:
      "A portfolio concept exploring how campaign spend, outcomes, and diagnostic signals can share one decision-ready workspace.",
    question:
      "How can channel data answer what changed, why it matters, and where an analyst should look next?",
    approach: [
      "Start with business questions before selecting visualizations.",
      "Keep outcome, efficiency, and delivery signals visually distinct.",
      "Pair every alert with enough context for investigation.",
    ],
    views: [
      {
        title: "Campaign overview",
        description: "A compact summary of delivery, outcome, and efficiency signals.",
      },
      {
        title: "Change analysis",
        description: "Period comparison designed to explain movement rather than only show it.",
      },
      {
        title: "Diagnostic view",
        description: "A drill-down path from channel to campaign and creative context.",
      },
    ],
    tools: ["Measurement planning", "Dashboard design", "Campaign analysis", "Data storytelling"],
  },
  {
    slug: "seo-search-console-platform",
    index: "03",
    title: "Search Performance Monitor",
    category: "Search analytics concept",
    summary:
      "A portfolio concept for turning search query, page, and indexation data into a structured review workflow.",
    question:
      "How can search data reveal useful opportunities without hiding uncertainty or context?",
    approach: [
      "Organize queries and pages around observable patterns rather than vanity totals.",
      "Keep performance and technical signals connected but independently readable.",
      "Show comparison windows and filters beside every interpretation.",
    ],
    views: [
      {
        title: "Search overview",
        description: "A review surface for trends, pages, queries, and data freshness.",
      },
      {
        title: "Opportunity groups",
        description: "A way to inspect related query and landing-page patterns.",
      },
      {
        title: "Indexation review",
        description: "A focused queue for investigating crawl and canonical signals.",
      },
    ],
    tools: ["Search analytics", "Information architecture", "Technical SEO", "Reporting design"],
  },
  {
    slug: "marketing-intelligence-hub",
    index: "04",
    title: "Marketing Data Hub",
    category: "Cross-channel analytics concept",
    summary:
      "A portfolio concept for aligning channel definitions, data freshness, and narrative reporting in a shared analytics workspace.",
    question:
      "How can a shared analytics surface expose both the answer and the limits of the underlying data?",
    approach: [
      "Define source ownership and metric meaning before composing dashboards.",
      "Make freshness, filters, and comparison periods visible.",
      "Separate executive summaries from analyst investigation paths.",
    ],
    views: [
      {
        title: "Decision brief",
        description: "A concise summary of movements, caveats, and next questions.",
      },
      {
        title: "Channel explorer",
        description: "A consistent route from shared metrics into source-level detail.",
      },
      {
        title: "Definition library",
        description: "A visible reference for metric ownership, meaning, and refresh cadence.",
      },
    ],
    tools: ["Analytics strategy", "Metric governance", "Dashboard design", "Data communication"],
  },
] as const satisfies readonly Project[];

export function isProjectSlug(value: string): value is ProjectSlug {
  return projectSlugs.some((slug) => slug === value);
}

export function getProject(slug: ProjectSlug): Project {
  const project = projects.find((item) => item.slug === slug);
  if (!project) throw new Error(`Missing project registry entry: ${slug}`);
  return project;
}
