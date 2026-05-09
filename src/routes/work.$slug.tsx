import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check, Quote, Layers, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/site/SectionLabel";
import { GlassCard } from "@/components/site/GlassCard";
import { Reveal } from "@/components/site/Reveal";
import { BrowserFrame } from "@/components/site/BrowserFrame";
import { DeviceFrame } from "@/components/site/DeviceFrame";
import { MiniArea, MiniBars } from "@/components/site/MiniChart";
import { AnimatedCounter } from "@/components/site/AnimatedCounter";
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

/* ── Helpers ── */

function MockChart({ type, height = 140 }: { type: string; height?: number }) {
  if (type === "bars") return <MiniBars height={height} />;
  return <MiniArea height={height} />;
}

function KpiGrid({ metrics, accentHsl }: { metrics: typeof projects[0]["metrics"]; accentHsl: string }) {
  const accent = `hsl(${accentHsl})`;
  return (
    <div className="grid grid-cols-2 gap-3 p-4">
      {metrics.map((m) => (
        <div key={m.label} className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-3">
          <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: accent }}>{m.label}</div>
          <div className="mt-1 font-display text-xl text-foreground">{m.value}</div>
          {m.sub && <div className="text-[10px] text-muted-foreground">{m.sub}</div>}
        </div>
      ))}
    </div>
  );
}

function DonutMock({ accentHsl }: { accentHsl: string }) {
  const accent = `hsl(${accentHsl})`;
  const segs = [
    { pct: 42, color: accent },
    { pct: 28, color: "var(--silver)" },
    { pct: 18, color: "var(--primary)" },
    { pct: 12, color: "var(--muted-foreground)" },
  ];
  let offset = 0;
  return (
    <div className="flex items-center justify-center p-6">
      <svg viewBox="0 0 100 100" className="h-32 w-32">
        {segs.map((s, i) => {
          const dash = (s.pct / 100) * 251.2;
          const gap = 251.2 - dash;
          const o = offset;
          offset += dash;
          return (
            <circle key={i} cx="50" cy="50" r="40" fill="none" stroke={s.color} strokeWidth="8"
              strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-o}
              className="opacity-80" style={{ transform: "rotate(-90deg)", transformOrigin: "center" }} />
          );
        })}
      </svg>
    </div>
  );
}

/* ── Main Component ── */

function CaseStudy() {
  const { project: p } = Route.useLoaderData() as { project: typeof projects[0] };
  const idx = projects.findIndex((pr) => pr.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];
  const accent = `hsl(${p.accentHsl})`;

  return (
    <>
      {/* ━━ HERO ━━ */}
      <section className="relative isolate overflow-hidden pb-20 pt-36 sm:pt-44">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(1_0_0_/_0.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0_/_0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>
        {/* accent bleed */}
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[700px] -translate-x-1/2 opacity-25 blur-[120px]"
          style={{ background: accent }} />

        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/work" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" /> All work
            </Link>
          </motion.div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
              <div className="flex items-center gap-4">
                <span className="font-display text-6xl sm:text-7xl" style={{ color: accent }}>{p.index}</span>
                {p.status === "in-development" && (
                  <span className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em]"
                    style={{ borderColor: `${accent}40`, background: `${accent}15`, color: accent }}>
                    In Development
                  </span>
                )}
              </div>
              <div className="mt-4 micro-label">{p.category}</div>
              <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.6rem,6.5vw,5rem)] leading-[1.04]">{p.title}</h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{p.tagline}</p>

              {/* meta strip */}
              <div className="mt-8 flex flex-wrap gap-6 border-t border-white/[0.06] pt-6">
                {[
                  ["Role", "Lead Product Designer"],
                  ["Year", p.year],
                  ["Status", p.status === "in-development" ? "In development" : "Live"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="micro-label">{k}</div>
                    <div className="mt-1 text-sm text-foreground">{v}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tech stack pills */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-2 lg:max-w-[260px] lg:justify-end">
              {p.stack.map((t) => (
                <span key={t} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground">{t}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━ CINEMATIC HERO MOCKUP ━━ */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <BrowserFrame title={p.screens[0].title} accentHsl={p.accentHsl} className="mx-auto max-w-5xl">
          <div className="p-5 sm:p-8">
            {/* KPI row */}
            <div className="grid gap-4 sm:grid-cols-4">
              {p.metrics.map((m, i) => (
                <motion.div key={m.label} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4"
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.08, duration: 0.7 }}>
                  <div className="micro-label">{m.label}</div>
                  <div className="mt-2 font-display text-3xl text-gradient">{m.value}</div>
                  {m.sub && <div className="text-xs text-muted-foreground">{m.sub}</div>}
                </motion.div>
              ))}
            </div>
            {/* Charts row */}
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
                <div className="flex items-center justify-between">
                  <div className="micro-label">Performance over time</div>
                  <div className="text-xs text-muted-foreground">Last 90 days</div>
                </div>
                <div className="-mx-1 mt-4"><MiniArea height={180} /></div>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
                <div className="flex items-center justify-between">
                  <div className="micro-label">Channel breakdown</div>
                  <div className="text-xs text-muted-foreground">Weekly</div>
                </div>
                <div className="-mx-1 mt-4"><MiniBars height={180} /></div>
              </div>
            </div>
          </div>
        </BrowserFrame>
      </section>

      {/* ━━ PROBLEM + APPROACH ━━ */}
      <section className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="pointer-events-none absolute right-0 top-1/2 -z-10 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full opacity-15 blur-[120px]"
          style={{ background: accent }} />
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionLabel>The challenge</SectionLabel>
            <h2 className="mt-5 font-display text-3xl leading-tight sm:text-4xl">{p.problem}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionLabel>Approach</SectionLabel>
            <h2 className="mt-5 font-display text-3xl leading-tight sm:text-4xl">How the work came together.</h2>
            <ul className="mt-8 space-y-5">
              {p.approach.map((a, i) => (
                <li key={i} className="flex gap-4">
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                    style={{ background: `${accent}20`, color: accent }}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-muted-foreground leading-relaxed">{a}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ━━ KEY SCREENS GALLERY ━━ */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal>
          <SectionLabel>Key Screens</SectionLabel>
          <h2 className="mt-5 max-w-3xl font-display text-3xl leading-[1.1] sm:text-4xl">
            Designed for <span className="italic text-gradient">clarity and impact.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {p.screens.map((screen, i) => (
            <Reveal key={screen.title} delay={i * 0.08}>
              <BrowserFrame title={screen.title} accentHsl={p.accentHsl}>
                <div className="min-h-[220px]">
                  {screen.chart === "kpi-grid" ? (
                    <KpiGrid metrics={p.metrics} accentHsl={p.accentHsl} />
                  ) : screen.chart === "donut" ? (
                    <DonutMock accentHsl={p.accentHsl} />
                  ) : (
                    <div className="p-4">
                      <MockChart type={screen.chart} height={160} />
                    </div>
                  )}
                </div>
              </BrowserFrame>
              <div className="mt-4">
                <h3 className="font-display text-xl">{screen.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{screen.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ━━ METRICS SHOWCASE ━━ */}
      <section className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-px w-[80%] -translate-x-1/2"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}40, transparent)` }} />
        <Reveal>
          <SectionLabel>Outcomes</SectionLabel>
          <h2 className="mt-5 max-w-3xl font-display text-3xl leading-[1.1] sm:text-4xl">
            Results that <span className="italic text-gradient">speak for themselves.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {p.metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.06}>
              <GlassCard strong className="group relative overflow-hidden p-7 transition-all duration-500 hover:border-white/20">
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ background: accent }} />
                <div className="micro-label">{m.label}</div>
                <div className="mt-3 font-display text-5xl text-gradient">{m.value}</div>
                {m.sub && <div className="mt-1 text-xs text-muted-foreground">{m.sub}</div>}
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ━━ MOBILE MOCKUP + HIGHLIGHTS ━━ */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.2fr]">
          <DeviceFrame accentHsl={p.accentHsl}>
            <div className="bg-gradient-to-b from-white/[0.04] to-transparent">
              <div className="px-4 pb-2 pt-4">
                <div className="micro-label" style={{ color: accent }}>{p.screens[0].title}</div>
                <div className="mt-2 font-display text-lg text-foreground">{p.metrics[0].value}</div>
                <div className="text-[10px] text-muted-foreground">{p.metrics[0].label}</div>
              </div>
              <div className="px-2"><MiniArea height={100} /></div>
              <div className="grid grid-cols-2 gap-2 px-3 pb-4">
                {p.metrics.slice(1, 3).map((m) => (
                  <div key={m.label} className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2.5">
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{m.label}</div>
                    <div className="mt-0.5 font-display text-sm text-foreground">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </DeviceFrame>

          <div>
            <Reveal>
              <SectionLabel>Highlights</SectionLabel>
              <h2 className="mt-5 font-display text-3xl leading-[1.1] sm:text-4xl">What makes this project sing.</h2>
            </Reveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {p.highlights.map((h, i) => (
                <Reveal key={h} delay={i * 0.05}>
                  <GlassCard className="flex items-center gap-3 p-5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: `${accent}15` }}>
                      {i % 2 === 0
                        ? <Layers className="h-4 w-4" style={{ color: accent }} />
                        : <Zap className="h-4 w-4" style={{ color: accent }} />}
                    </span>
                    <span className="font-display text-lg">{h}</span>
                  </GlassCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━ TESTIMONIAL ━━ */}
      {p.testimonial && (
        <section className="relative mx-auto max-w-7xl px-6 py-20">
          <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-px w-[60%] -translate-x-1/2"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}30, transparent)` }} />
          <Reveal>
            <GlassCard strong className="relative overflow-hidden p-10 sm:p-16">
              <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-3xl"
                style={{ background: accent }} />
              <Quote className="mb-6 h-10 w-10 opacity-20" style={{ color: accent }} />
              <blockquote className="max-w-3xl font-display text-2xl leading-relaxed sm:text-3xl">
                "{p.testimonial.quote}"
              </blockquote>
              <div className="mt-8 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full" style={{ background: `linear-gradient(135deg, ${accent}, var(--primary))` }} />
                <div>
                  <div className="text-sm font-medium text-foreground">{p.testimonial.author}</div>
                  <div className="text-xs text-muted-foreground">{p.testimonial.role}</div>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </section>
      )}

      {/* ━━ NEXT CASE STUDY ━━ */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal>
          <Link to="/work/$slug" params={{ slug: next.slug }} className="group block">
            <GlassCard strong className="relative overflow-hidden p-10 sm:p-14 transition-all duration-500 hover:border-white/20 hover:shadow-[var(--shadow-glow)]">
              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                style={{ background: `hsl(${next.accentHsl})` }} />
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div>
                  <div className="micro-label">Next case study</div>
                  <div className="mt-2 font-display text-5xl" style={{ color: `hsl(${next.accentHsl})` }}>{next.index}</div>
                  <h3 className="mt-3 font-display text-3xl sm:text-4xl">{next.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{next.tagline}</p>
                </div>
                <ArrowUpRight className="h-8 w-8 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </GlassCard>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
