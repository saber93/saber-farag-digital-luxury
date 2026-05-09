import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Award, Code2, LineChart, Search } from "lucide-react";
import { SectionLabel } from "@/components/site/SectionLabel";
import { GlassCard } from "@/components/site/GlassCard";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Saber Farag" },
      {
        name: "description",
        content:
          "Google-Certified UX Researcher & Product Designer specialized in dashboards, analytics, SEO platforms, and yacht industry digital ecosystems.",
      },
      { property: "og:title", content: "About — Saber Farag" },
      { property: "og:description", content: "5+ years designing premium dashboards, yacht platforms, and growth-driven products." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Saber Farag",
          jobTitle: "UI/UX & Product Designer",
          email: "saber.elshafey@gmail.com",
          knowsAbout: [
            "UI/UX Design", "Product Design", "Dashboard Design", "Data Visualization",
            "SEO", "Google Ads", "Google Analytics", "Search Console", "Business Intelligence",
          ],
        }),
      },
    ],
  }),
  component: AboutPage,
});

const timeline = [
  { year: "2020", title: "Started in product design", body: "First UX research projects, foundations in interface systems." },
  { year: "2022", title: "Yacht industry deep dive", body: "Designed editorial booking & showcase platforms for luxury charter brands." },
  { year: "2023", title: "Analytics & dashboards", body: "Shipped Google Ads + GA4 dashboards focused on operator-grade UX." },
  { year: "2024", title: "Search & SEO platforms", body: "Built Search Console reporting tools used by agency teams." },
  { year: "2026", title: "Marketing Intelligence Hub", body: "Architecting a centralized BI product unifying ads, analytics, search, and CRM." },
];

const capabilities = [
  { icon: Award, title: "UX Research", body: "Google-certified methods, generative & evaluative research." },
  { icon: LineChart, title: "Analytics & BI", body: "GA4, Ads, Search Console, dashboards, real-time reporting." },
  { icon: Search, title: "Growth & SEO", body: "Information architecture, technical SEO, conversion optimization." },
  { icon: Code2, title: "Engineering fluent", body: "HTML/CSS/JS fundamentals, APIs, design-to-code partnership." },
];

function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pb-16 pt-36 sm:pt-44">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="mx-auto max-w-7xl px-6">
          <SectionLabel>About</SectionLabel>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.05]">
            Designing for the <span className="italic text-gradient">few</span>, with the discipline of teams shipping for <span className="italic text-gradient">many</span>.
          </h1>
          <p className="mt-7 max-w-2xl text-lg text-muted-foreground">
            I'm Saber Farag — a Google-Certified UX Researcher & Designer with 5+ years
            building luxury web platforms, analytics dashboards, and growth-driven products.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <GlassCard className="aspect-[4/5] w-full">
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
                <div className="font-display text-[10rem] leading-none text-gradient italic">SF</div>
              </div>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionLabel>Practice</SectionLabel>
            <h2 className="mt-5 font-display text-4xl leading-[1.1]">
              A product-minded designer working at the intersection of brand and data.
            </h2>
            <div className="mt-6 space-y-5 text-muted-foreground">
              <p>
                My focus is on dashboards, analytics, Google Ads systems, SEO,
                reporting platforms, and yacht-industry digital ecosystems —
                products where craft, performance, and clarity matter equally.
              </p>
              <p>
                I work fluently across UX research, business logic, APIs,
                analytics, conversion optimization, and real-time reporting.
                The goal is always the same: make complex systems feel
                effortless, premium, and decision-grade.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {capabilities.map(({ icon: Icon, title, body }) => (
                <GlassCard key={title} className="p-5">
                  <Icon className="h-5 w-5 text-primary-glow" />
                  <div className="mt-3 font-display text-xl">{title}</div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal>
          <SectionLabel>Trajectory</SectionLabel>
          <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1.1] sm:text-5xl">
            Five years, sharpened across luxury, analytics, and growth.
          </h2>
        </Reveal>
        <div className="relative mt-14 ml-3 border-l border-white/10 pl-8 sm:ml-6 sm:pl-12">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.05}>
              <div className="relative pb-12 last:pb-0">
                <span className="absolute -left-[42px] top-1.5 flex h-3 w-3 items-center justify-center sm:-left-[54px]">
                  <span className="h-3 w-3 rounded-full bg-gradient-to-br from-primary-glow to-primary shadow-[0_0_20px_oklch(0.72_0.18_240/0.6)]" />
                </span>
                <div className="micro-label">{t.year}</div>
                <h3 className="mt-2 font-display text-2xl">{t.title}</h3>
                <p className="mt-2 max-w-xl text-muted-foreground">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <Reveal>
          <GlassCard strong className="relative overflow-hidden p-10 sm:p-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-glow/20 blur-3xl" />
            <div className="relative flex flex-wrap items-center justify-between gap-6">
              <div>
                <h3 className="font-display text-3xl">See selected work →</h3>
                <p className="mt-2 max-w-xl text-muted-foreground">
                  Four shipped platforms across luxury, analytics, search, and BI.
                </p>
              </div>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-primary-glow to-primary px-6 py-3 text-sm text-primary-foreground shadow-[var(--shadow-glow)]"
              >
                View projects <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </GlassCard>
        </Reveal>
      </section>
    </>
  );
}
