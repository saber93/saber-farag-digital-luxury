export type MockupScreen = {
  title: string;
  description: string;
  /** Which mini-chart type to render inside the mock */
  chart: "area" | "bars" | "donut" | "kpi-grid";
  image?: string; // Optional real image override
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  status?: "live" | "in-development";
  // The "Masterpiece" storytelling fields
  businessContext?: {
    problem: string;
    objective: string;
    marketInsight: string;
  };
  problem: string; // Keep for backward compat
  approach: string[];
  designDecisions?: {
    title: string;
    content: string;
    impact: string;
  }[];
  systemThinking?: {
    architecture: string;
    scalability: string;
    collaboration: string;
  };
  metrics: { label: string; value: string; sub?: string; trend?: "up" | "down"; data?: number[] }[];
  highlights: string[];
  accentHsl: string;
  stack: string[];
  screens: MockupScreen[];
  testimonial?: { quote: string; author: string; role: string; avatar?: string };
};

export const projects: Project[] = [
  {
    slug: "luxury-yacht-platform",
    index: "01",
    title: "Aura: The Future of Yachting",
    tagline: "A world-class digital ecosystem managing $500M+ in floating assets.",
    category: "Product Strategy · Dashboard UX",
    year: "2024",
    status: "live",
    accentHsl: "245 65% 55%",
    businessContext: {
      problem: "The luxury yacht industry relied on fragmented legacy systems, leading to $2M+ in annual maintenance inefficiencies and disjointed guest experiences.",
      objective: "To create a unified digital OS that provides absolute transparency for owners, predictive maintenance for engineers, and a cinematic booking interface for brokers.",
      marketInsight: "HNW users prioritize 'time-as-luxury'. Every micro-interaction must reduce cognitive load while reinforcing the brand's premium stature.",
    },
    problem:
      "The luxury yacht industry relied on fragmented legacy systems, leading to $2M+ in annual maintenance inefficiencies and disjointed guest experiences.",
    approach: [
      "Unified telemetry engine translating raw NMEA 2000 data into intuitive heatmaps.",
      "Cinematic booking funnel optimized for high-conversion broker inquiries.",
      "Atomic design system with 150+ components for cross-platform consistency.",
      "Predictive maintenance algorithms reducing critical downtime by 35%.",
    ],
    designDecisions: [
      {
        title: "Telemetry-First Dashboard",
        content: "We translated complex engine-room metrics into a simplified 'vessel health' score, allowing owners to understand status at a glance without technical expertise.",
        impact: "Reduced owner inquiry volume regarding vessel status by 60%.",
      },
      {
        title: "The 'Golden Path' Booking",
        content: "By integrating real-time seasonal availability with predictive weather patterns, we created a booking experience that feels anticipatory rather than reactive.",
        impact: "Increased broker-led inquiry volume by 186% YoY.",
      },
    ],
    systemThinking: {
      architecture: "Headless CMS architecture feeding a multi-platform React ecosystem (Web, iOS, and On-board Tablets).",
      scalability: "Modular component library allowing regional offices to spin up localized charter portals in < 4 hours.",
      collaboration: "Automated Figma-to-Code pipelines, ensuring 100% fidelity between design vision and production code.",
    },
    metrics: [
      { label: "Qualified inquiries", value: "+186%", sub: "YoY", trend: "up", data: [30, 45, 40, 65, 58, 85, 92] },
      { label: "Mobile LCP", value: "1.2s", sub: "p75", trend: "down", data: [2.1, 1.8, 1.5, 1.2, 1.0, 0.9, 0.8] },
      { label: "Operational ROI", value: "4.2x", sub: "Annual", trend: "up", data: [1.2, 2.4, 3.8, 4.5, 5.2, 5.8, 6.4] },
      { label: "Bounce rate", value: "−41%", sub: "vs prior site", trend: "down", data: [45, 42, 38, 35, 33, 31, 32] },
    ],
    highlights: ["Predictive Maintenance", "Cinematic Booking", "Global Fleet OS", "HNW UX Systems", "Real-time Telemetry"],
    stack: ["React", "TypeScript", "D3.js", "Framer Motion", "Real-time Data", "GraphQL"],
    screens: [
      { 
        title: "Asset Intelligence Dashboard", 
        description: "A high-fidelity cockpit for owners to monitor fleet health, location, and expenses in real-time.", 
        chart: "area" 
      },
      { 
        title: "Cinematic Yacht Profile", 
        description: "Full-bleed gallery, deck plans, crew bios, and interactive itinerary builder.", 
        chart: "kpi-grid" 
      },
      { 
        title: "Broker Charter Tool", 
        description: "Advanced multi-step charter configuration optimized for professional brokers.", 
        chart: "bars" 
      },
    ],
    testimonial: {
      quote: "Saber didn't just design a website; he built a product system that fundamentally changed how we manage our global fleet. The level of business intelligence integrated into the UX is unprecedented.",
      author: "Julian Vance",
      role: "Director of Digital Innovation, Global Yachting Group",
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
