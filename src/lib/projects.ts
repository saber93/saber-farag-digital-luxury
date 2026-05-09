export type Project = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  status?: "live" | "in-development";
  problem: string;
  approach: string[];
  metrics: { label: string; value: string; sub?: string }[];
  highlights: string[];
};

export const projects: Project[] = [
  {
    slug: "luxury-yacht-platform",
    index: "01",
    title: "Luxury Yacht Booking & Showcase",
    tagline: "An editorial e-commerce experience for the high-net-worth charter market.",
    category: "Yacht Industry · Web Platform",
    year: "2024",
    status: "live",
    problem:
      "Existing yacht platforms felt like rental catalogues. The brief: a cinematic showcase that drives qualified inquiries without compromising on speed or SEO.",
    approach: [
      "Editorial information architecture with deep yacht profiles, galleries, and crew bios.",
      "Inquiry funnel optimized around itinerary, season, and guest count.",
      "Performance-first front-end: lazy media, edge caching, sub-2s LCP on mobile.",
      "SEO architecture covering destinations, yacht categories, and seasonal content.",
    ],
    metrics: [
      { label: "Qualified inquiries", value: "+186%", sub: "YoY" },
      { label: "Mobile LCP", value: "1.8s", sub: "p75" },
      { label: "Organic traffic", value: "+312%", sub: "in 9 months" },
      { label: "Bounce rate", value: "−41%", sub: "vs prior site" },
    ],
    highlights: ["Premium UX", "Yacht galleries", "Lead generation", "SEO-focused architecture", "Mobile responsive"],
  },
  {
    slug: "ads-analytics-dashboard",
    index: "02",
    title: "Google Ads + Analytics Dashboard",
    tagline: "A unified command center for paid media performance and decisioning.",
    category: "Analytics · Internal Tool",
    year: "2024",
    status: "live",
    problem:
      "Marketing operated across six tools to answer one question: what's working today? They needed a single live surface for spend, performance, and intent.",
    approach: [
      "Defined a north-star metric framework before sketching a single screen.",
      "Composable widget grid — campaigns, creatives, audiences, attribution.",
      "Live data pipelines via Google Ads & GA4 APIs with anomaly highlighting.",
      "Operator UX: keyboard-first, dense information, zero unnecessary chrome.",
    ],
    metrics: [
      { label: "ROAS", value: "4.7×", sub: "blended" },
      { label: "CAC", value: "−38%" },
      { label: "Reporting time", value: "−92%", sub: "vs spreadsheets" },
      { label: "Decisions/week", value: "3.4×" },
    ],
    highlights: ["Campaign metrics", "KPI tiles", "Data visualization", "Live reporting", "Modern admin UI"],
  },
  {
    slug: "seo-search-console-platform",
    index: "03",
    title: "SEO & Search Console Reporting",
    tagline: "Turning Search Console raw data into a strategic, narrative product.",
    category: "SEO Intelligence · SaaS",
    year: "2025",
    status: "live",
    problem:
      "Search Console exposes the data, not the story. Strategists needed an interface that surfaces opportunity clusters, technical health, and trend deltas at a glance.",
    approach: [
      "Keyword cluster maps with intent classification and movement tracking.",
      "Crawl health surfaces: indexability, canonical issues, Core Web Vitals.",
      "Side-by-side period comparisons designed for client-facing presentation.",
      "Granular permissioning for agency / client workspaces.",
    ],
    metrics: [
      { label: "Keywords tracked", value: "48k+" },
      { label: "Avg. position lift", value: "+11.4" },
      { label: "Click-through", value: "+62%" },
      { label: "Reports auto-generated", value: "920/mo" },
    ],
    highlights: ["Keyword tracking", "Traffic analytics", "Technical SEO insights", "Performance graphs"],
  },
  {
    slug: "marketing-intelligence-hub",
    index: "04",
    title: "Marketing Intelligence Hub",
    tagline: "A centralized BI layer unifying ads, analytics, search, and CRM signals.",
    category: "Business Intelligence · In Development",
    year: "2026",
    status: "in-development",
    problem:
      "Modern marketing teams are drowning in dashboards. The hub consolidates Google Ads, GA4, Search Console, and CRM into one decision-grade product.",
    approach: [
      "Cross-source schema model with deduplication and identity stitching.",
      "Real-time widgets, alerting, and goal pacing across every channel.",
      "Narrative-style reports: insight first, chart second.",
      "Role-based workspaces for executive, channel lead, and analyst views.",
    ],
    metrics: [
      { label: "Data sources", value: "12+" },
      { label: "Refresh latency", value: "<60s" },
      { label: "Pilot teams", value: "7" },
      { label: "Time-to-insight", value: "−74%" },
    ],
    highlights: ["Multi-platform campaigns", "GA + GSC integration", "Reporting systems", "Real-time widgets", "BI"],
  },
];
