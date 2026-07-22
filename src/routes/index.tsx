import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Database, Gauge, Search, Waypoints } from "lucide-react";
import { GlassCard } from "@/components/site/GlassCard";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";
import { projects } from "@/lib/projects";
import { pageHead, websiteSchema } from "@/lib/seo";
import { pages, routeHeaders, site } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => pageHead(pages.home, { schemas: [websiteSchema] }),
  headers: () => routeHeaders(true),
  component: HomePage,
});

const capabilities = [
  {
    icon: Gauge,
    title: "Dashboard design",
    body: "Information hierarchies that keep decisions, context, and exceptions connected.",
  },
  {
    icon: Waypoints,
    title: "Measurement planning",
    body: "Questions, definitions, ownership, and comparison logic before visual polish.",
  },
  {
    icon: Search,
    title: "Analysis workflows",
    body: "Interfaces that support investigation instead of presenting isolated totals.",
  },
  {
    icon: Database,
    title: "Data communication",
    body: "Clear descriptions of freshness, filters, sources, and uncertainty.",
  },
] as const;

function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pb-24 pt-36 sm:pt-44 lg:min-h-[90svh] lg:pt-44">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-50 noise" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <SectionLabel>Analytics specialist</SectionLabel>
            <h1 className="mt-7 max-w-4xl font-display text-[clamp(3.2rem,8vw,7rem)] leading-[0.92] tracking-tight">
              Turn data into <span className="italic text-gradient-primary">clear decisions.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {site.name} designs analytics dashboards, measurement systems, and reporting
              experiences that make context visible and next steps easier to find.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/work"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-glow"
              >
                Explore the concepts <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex min-h-12 items-center rounded-full border border-white/15 bg-white/[0.04] px-7 py-3 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-glow"
              >
                Contact Saber
              </Link>
            </div>
          </div>

          <GlassCard strong className="relative overflow-hidden p-7 sm:p-9">
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-primary/20 blur-3xl" />
            <p className="micro-label">Decision brief</p>
            <h2 className="mt-4 font-display text-3xl">
              A useful dashboard explains its own limits.
            </h2>
            <div className="mt-8 space-y-4">
              {[
                "What changed?",
                "Compared with what?",
                "How fresh is the data?",
                "What should be investigated next?",
              ].map((question, index) => (
                <div
                  key={question}
                  className="flex items-center gap-4 rounded-2xl border border-white/8 bg-black/15 p-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs text-primary-glow">
                    0{index + 1}
                  </span>
                  <span className="text-sm text-foreground/85">{question}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24" aria-labelledby="capabilities-heading">
        <Reveal>
          <SectionLabel>Capabilities</SectionLabel>
          <h2
            id="capabilities-heading"
            className="mt-5 max-w-3xl font-display text-4xl leading-tight sm:text-5xl"
          >
            Analysis, structure, and interface design in one workflow.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map(({ icon: Icon, title, body }) => (
            <GlassCard key={title} className="p-6">
              <Icon className="h-5 w-5 text-primary-glow" aria-hidden="true" />
              <h3 className="mt-6 font-display text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24" aria-labelledby="selected-work-heading">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionLabel>Selected work</SectionLabel>
            <h2
              id="selected-work-heading"
              className="mt-5 max-w-3xl font-display text-4xl leading-tight sm:text-5xl"
            >
              Four transparent portfolio concepts for analytics workflows.
            </h2>
          </Reveal>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            View all concepts <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              to="/work/$slug"
              params={{ slug: project.slug }}
              className="group rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-glow"
            >
              <GlassCard className="h-full p-7 transition-colors group-hover:border-primary/35">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-3xl text-white/20">{project.index}</span>
                  <span className="micro-label">Concept study</span>
                </div>
                <p className="mt-8 text-xs uppercase tracking-[0.18em] text-primary-glow">
                  {project.category}
                </p>
                <h3 className="mt-3 font-display text-3xl">{project.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{project.summary}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm">
                  Review the approach <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <GlassCard strong className="relative overflow-hidden p-10 sm:p-14">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <SectionLabel>Contact</SectionLabel>
              <h2 className="mt-5 font-display text-4xl sm:text-5xl">
                Have an analytics question worth clarifying?
              </h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Share the decision, available data, and current reporting challenge by email.
              </p>
            </div>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-glow"
            >
              Email Saber
            </a>
          </div>
        </GlassCard>
      </section>
    </>
  );
}
