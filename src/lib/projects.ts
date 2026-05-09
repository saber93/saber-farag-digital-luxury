export type MockupScreen = {
  title: string;
  description: string;
  /** Which mini-chart type to render inside the mock */
  chart: "area" | "bars" | "donut" | "kpi-grid";
};

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
  /** Accent colour used for project-specific glow effects */
  accentHsl: string;
  /** Tech & tools used */
  stack: string[];
  /** Screens shown as cinematic mockups */
  screens: MockupScreen[];
  /** Pull-quote / testimonial */
  testimonial?: { quote: string; author: string; role: string };
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
    accentHsl: "210 80% 56%",
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
    stack: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Cloudflare", "Figma"],
    screens: [
      { title: "Fleet Overview", description: "Cinematic grid with hero imagery, live availability, and pricing tiers.", chart: "area" },
      { title: "Yacht Profile", description: "Full-bleed gallery, deck plans, crew bios, and itinerary builder.", chart: "kpi-grid" },
      { title: "Inquiry Funnel", description: "Multi-step booking flow with date selection, guest configuration, and add-ons.", chart: "bars" },
    ],
    testimonial: {
      quote: "The new platform completely changed how prospects perceive us. Inquiries tripled and the quality of leads is night and day.",
      author: "Marina Director",
      role: "Charter Company",
    },
  },
  {
    slug: "ads-analytics-dashboard",
    index: "02",
    title: "Google Ads + Analytics Dashboard",
    tagline: "A unified command center for paid media performance and decisioning.",
    category: "Analytics · Internal Tool",
    year: "2024",
    status: "live",
    accentHsl: "165 70% 46%",
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
    stack: ["React", "TypeScript", "D3.js", "Google Ads API", "GA4 API", "Recharts"],
    screens: [
      { title: "Campaign Command", description: "Real-time spend tracker with campaign-level ROAS and conversion funnels.", chart: "bars" },
      { title: "Audience Insights", description: "Segmented audience performance with demographic and intent overlays.", chart: "donut" },
      { title: "Attribution View", description: "Multi-touch attribution model with path analysis and channel comparison.", chart: "area" },
    ],
    testimonial: {
      quote: "We went from six tabs and a spreadsheet to one screen. The team makes faster, better decisions every single day.",
      author: "Head of Growth",
      role: "Marketing Team",
    },
  },
  {
    slug: "seo-search-console-platform",
    index: "03",
    title: "SEO & Search Console Reporting",
    tagline: "Turning Search Console raw data into a strategic, narrative product.",
    category: "SEO Intelligence · SaaS",
    year: "2025",
    status: "live",
    accentHsl: "280 65% 58%",
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
    stack: ["React", "Python", "Search Console API", "PostgreSQL", "Recharts", "Figma"],
    screens: [
      { title: "Keyword Clusters", description: "Intent-classified keyword groups with movement deltas and opportunity scoring.", chart: "kpi-grid" },
      { title: "Crawl Health", description: "Indexability dashboard with canonical issues, CWV scores, and error logs.", chart: "bars" },
      { title: "Period Comparison", description: "Side-by-side metric comparison with sparklines and trend annotations.", chart: "area" },
    ],
    testimonial: {
      quote: "Finally, a tool that tells the SEO story instead of just dumping numbers. Our clients actually understand what we're doing now.",
      author: "SEO Director",
      role: "Digital Agency",
    },
  },
  {
    slug: "marketing-intelligence-hub",
    index: "04",
    title: "Marketing Intelligence Hub",
    tagline: "A centralized BI layer unifying ads, analytics, search, and CRM signals.",
    category: "Business Intelligence · In Development",
    year: "2026",
    status: "in-development",
    accentHsl: "35 85% 55%",
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
    stack: ["React", "Node.js", "GraphQL", "BigQuery", "Recharts", "Figma"],
    screens: [
      { title: "Executive Overview", description: "North-star KPIs, channel health, and goal pacing in a single dense view.", chart: "kpi-grid" },
      { title: "Channel Deep-Dive", description: "Drill-down from channel to campaign to creative with contextual benchmarks.", chart: "area" },
      { title: "Insight Reports", description: "Narrative-first report builder with auto-generated commentary and charts.", chart: "bars" },
    ],
    testimonial: {
      quote: "This is the product we've been trying to build internally for three years. It finally makes cross-channel data actionable.",
      author: "VP of Marketing",
      role: "Enterprise Client",
    },
  },
];
