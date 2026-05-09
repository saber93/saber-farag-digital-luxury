import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { SectionLabel } from "@/components/site/SectionLabel";
import { GlassCard } from "@/components/site/GlassCard";
import { Reveal } from "@/components/site/Reveal";
import { MiniArea, MiniBars } from "@/components/site/MiniChart";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    if (!p) return { meta: [{ title: "Case Study — Saber Farag" }] };
    return {
      meta: [
        { title: `${p.title} — Case Study` },
        { name: "description", content: p.tagline },
        { property: "og:title", content: `${p.title} — Saber Farag` },
        { property: "og:description", content: p.tagline },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-4xl">Case study not found</h1>
        <Link to="/work" className="mt-6 inline-flex text-sm text-muted-foreground hover:text-foreground">
          ← Back to all work
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <h1 className="font-display text-3xl">Couldn't load case study</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button onClick={reset} className="mt-6 rounded-full bg-gradient-to-br from-primary-glow to-primary px-5 py-2 text-sm">Try again</button>
      </div>
    </div>
  ),
  component: CaseStudy,
});

function CaseStudy() {
  const { project } = Route.useLoaderData();
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <section className="relative isolate overflow-hidden pb-16 pt-36 sm:pt-44">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/work" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> All work
          </Link>
          <div className="mt-8 flex items-center gap-4">
            <span className="font-display text-5xl text-silver">{project.index}</span>
            {project.status === "in-development" && (
              <span className="rounded-full border border-primary-glow/30 bg-primary-glow/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-primary-glow">
                In Development
              </span>
            )}
          </div>
          <div className="mt-4 micro-label">{project.category}</div>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.6rem,6.5vw,5rem)] leading-[1.04]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{project.tagline}</p>
        </div>
      </section>

      {/* Mock dashboard hero */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <Reveal>
          <GlassCard strong className="relative overflow-hidden p-6 sm:p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-glow/20 blur-3xl" />
            <div className="grid gap-6 md:grid-cols-4">
              {project.metrics.map((m) => (
                <div key={m.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="micro-label">{m.label}</div>
                  <div className="mt-2 font-display text-3xl text-gradient">{m.value}</div>
                  {m.sub && <div className="text-xs text-muted-foreground">{m.sub}</div>}
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center justify-between">
                  <div className="micro-label">Performance over time</div>
                  <div className="text-xs text-muted-foreground">Last 90 days</div>
                </div>
                <div className="-mx-1 mt-4">
                  <MiniArea height={180} />
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center justify-between">
                  <div className="micro-label">Channel breakdown</div>
                  <div className="text-xs text-muted-foreground">Weekly</div>
                </div>
                <div className="-mx-1 mt-4">
                  <MiniBars height={180} />
                </div>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </section>

      {/* Problem + Approach */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionLabel>The challenge</SectionLabel>
            <h2 className="mt-5 font-display text-3xl leading-tight sm:text-4xl">{project.problem}</h2>
            <div className="mt-8 space-y-3 text-sm text-muted-foreground">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="micro-label">Role</span><span className="text-foreground">Lead Product Designer</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="micro-label">Year</span><span className="text-foreground">{project.year}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="micro-label">Status</span>
                <span className="text-foreground">{project.status === "in-development" ? "In development" : "Live"}</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionLabel>Approach</SectionLabel>
            <h2 className="mt-5 font-display text-3xl leading-tight sm:text-4xl">
              How the work came together.
            </h2>
            <ul className="mt-8 space-y-4">
              {project.approach.map((a) => (
                <li key={a} className="flex gap-3">
                  <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-glow to-primary">
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </span>
                  <span className="text-muted-foreground">{a}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <SectionLabel>Highlights</SectionLabel>
          <h2 className="mt-5 max-w-3xl font-display text-3xl leading-[1.1] sm:text-4xl">
            What makes this project sing.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {project.highlights.map((h, i) => (
            <Reveal key={h} delay={i * 0.04}>
              <GlassCard className="p-6">
                <div className="font-display text-2xl">{h}</div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Next */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Link to="/work/$slug" params={{ slug: next.slug }} className="group block">
          <GlassCard strong className="relative overflow-hidden p-10 sm:p-14">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <div className="micro-label">Next case study</div>
                <h3 className="mt-3 font-display text-3xl sm:text-4xl">{next.title}</h3>
              </div>
              <ArrowUpRight className="h-7 w-7 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </GlassCard>
        </Link>
      </section>
    </>
  );
}
