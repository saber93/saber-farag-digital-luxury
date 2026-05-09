import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/site/SectionLabel";
import { GlassCard } from "@/components/site/GlassCard";
import { Reveal } from "@/components/site/Reveal";
import { MiniArea, MiniBars } from "@/components/site/MiniChart";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Saber Farag" },
      { name: "description", content: "Selected projects: yacht industry platforms, analytics dashboards, SEO reporting, and marketing intelligence systems." },
      { property: "og:title", content: "Work — Saber Farag" },
      { property: "og:description", content: "Four shipped platforms across luxury, analytics, search, and BI." },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pb-12 pt-36 sm:pt-44">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="mx-auto max-w-7xl px-6">
          <SectionLabel>Selected Work</SectionLabel>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.05]">
            Four platforms. <span className="italic text-gradient">One obsession</span> with craft and outcomes.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            From yacht-grade web experiences to operator-grade dashboards — selected projects shipped across the last two years.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="space-y-6">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.04}>
              <Link to="/work/$slug" params={{ slug: p.slug }} className="group block">
                <GlassCard className="relative overflow-hidden p-8 transition-all duration-500 hover:border-white/20 hover:shadow-[var(--shadow-glow)] sm:p-12">
                  <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
                    <div>
                      <div className="flex items-center gap-4">
                        <span className="font-display text-5xl text-silver">{p.index}</span>
                        {p.status === "in-development" ? (
                          <span className="rounded-full border border-primary-glow/30 bg-primary-glow/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-primary-glow">
                            In Development
                          </span>
                        ) : (
                          <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                            {p.year}
                          </span>
                        )}
                      </div>
                      <div className="mt-5 micro-label">{p.category}</div>
                      <h2 className="mt-3 font-display text-4xl leading-[1.05] sm:text-5xl">{p.title}</h2>
                      <p className="mt-4 max-w-xl text-muted-foreground">{p.tagline}</p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {p.highlights.slice(0, 4).map((h) => (
                          <span key={h} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground">
                            {h}
                          </span>
                        ))}
                      </div>
                      <div className="mt-7 inline-flex items-center gap-2 text-sm text-foreground">
                        Open case study
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>

                    {/* mock dashboard */}
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-5">
                      <div className="grid grid-cols-2 gap-4">
                        {p.metrics.slice(0, 2).map((m) => (
                          <div key={m.label}>
                            <div className="micro-label">{m.label}</div>
                            <div className="mt-1 font-display text-3xl text-gradient">{m.value}</div>
                            {m.sub && <div className="text-[11px] text-muted-foreground">{m.sub}</div>}
                          </div>
                        ))}
                      </div>
                      <div className="-mx-2 mt-4">
                        {i % 2 === 0 ? <MiniArea height={120} /> : <MiniBars height={120} />}
                      </div>
                      <div className="mt-3 grid grid-cols-4 gap-2">
                        {p.metrics.slice(2, 4).concat(p.metrics).slice(0, 4).map((m, idx) => (
                          <div key={idx} className="rounded-lg border border-white/5 bg-white/[0.02] p-2 text-center">
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.label.split(" ")[0]}</div>
                            <div className="mt-0.5 text-sm text-foreground">{m.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
