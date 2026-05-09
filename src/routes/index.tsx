import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/site/SectionLabel";
import { GlassCard } from "@/components/site/GlassCard";
import { FloatingDashboards } from "@/components/site/FloatingDashboards";
import { Reveal } from "@/components/site/Reveal";
import { AnimatedCounter } from "@/components/site/AnimatedCounter";
import { MiniArea } from "@/components/site/MiniChart";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saber Farag — Luxury Digital Experiences & Data Platforms" },
      {
        name: "description",
        content:
          "UI/UX & Product Designer with 5+ years building yacht-industry websites, analytics dashboards, SEO platforms, and growth-driven products.",
      },
      { property: "og:title", content: "Saber Farag — Luxury Digital Experiences & Data Platforms" },
      { property: "og:description", content: "Cinematic dashboards, yacht-grade websites, growth-focused product design." },
    ],
  }),
  component: HomePage,
});

const skills = [
  "UI/UX Design", "Product Design", "Dashboard Design", "Data Visualization",
  "SEO", "Google Ads", "Google Analytics", "Search Console",
  "API Integration", "UX Research", "Conversion Optimization", "Figma",
  "Adobe XD", "Business Intelligence",
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden pb-24 pt-36 sm:pt-44 lg:min-h-[100svh] lg:pt-44 flex flex-col justify-center">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="pointer-events-none absolute inset-x-0 top-20 -z-10 mx-auto h-[600px] max-w-6xl opacity-70 noise" />
        
        {/* grid lines - more subtle */}
        <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(1_0_0_/_0.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0_/_0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
        </div>

        <FloatingDashboards />

        <div className="mx-auto max-w-7xl px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <SectionLabel className="justify-start">
              <span className="inline-flex items-center gap-1.5 font-bold tracking-widest text-[10px]">
                <Sparkles className="h-3 w-3 text-primary-glow animate-pulse" /> 2026 PRODUCT SYSTEMS & LUXURY UX
              </span>
            </SectionLabel>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-5xl font-display text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.95] tracking-tighter"
          >
            Crafting <span className="italic text-gradient-primary">Luxury</span> Product
            <br className="hidden sm:block" /> Systems & <span className="italic text-gradient-primary">Intelligent</span> Dashboards
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-10 max-w-2xl text-lg text-muted-foreground sm:text-xl font-light leading-relaxed"
          >
            Expert UI/UX & Product Design for high-stakes industries. Specializing in 
            <span className="text-foreground"> luxury yacht ecosystems</span>, 
            <span className="text-foreground"> enterprise analytics</span>, and 
            <span className="text-foreground"> conversion-driven growth systems</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <MagneticButton className="px-10 py-5 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-glow">
              <Link to="/work/luxury-yacht-platform" className="flex items-center gap-3">
                View Masterpiece <ArrowUpRight className="h-5 w-5" />
              </Link>
            </MagneticButton>
            <Link 
              to="/work" 
              className="px-8 py-5 rounded-full bg-surface/50 border border-white/5 hover:border-white/20 transition-all font-medium flex items-center gap-2 group"
            >
              All Systems <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* hero stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="mt-20 grid max-w-3xl grid-cols-3 gap-6 border-t border-white/5 pt-8"
          >
            {[
              { v: 5, s: "+", label: "Years designing premium products" },
              { v: 40, s: "+", label: "Shipped platforms & dashboards" },
              { v: 312, s: "%", label: "Avg. organic growth delivered" },
            ].map((m) => (
              <div key={m.label}>
                <div className="font-display text-4xl text-gradient">
                  <AnimatedCounter value={m.v} suffix={m.s} />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="relative mx-auto max-w-7xl px-6 py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionLabel>About</SectionLabel>
            <h2 className="mt-5 font-display text-4xl leading-[1.1] sm:text-5xl">
              A product mind, an editorial eye, an analyst's discipline.
            </h2>
            <p className="mt-6 text-base text-muted-foreground">
              Saber Farag is a Google-Certified UX Researcher & Designer who builds
              high-craft interfaces for the yacht industry, analytics platforms, and growth teams.
            </p>
            <p className="mt-4 text-base text-muted-foreground">
              The work sits at the intersection of luxury brand expression, real-time data,
              and the operator-grade UX modern teams demand.
            </p>
            <div className="mt-8">
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 text-sm text-foreground"
              >
                Read the full story
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["Google-Certified", "UX Researcher & Designer"],
                ["Yacht industry", "Premium platforms"],
                ["Dashboards", "Analytics & BI systems"],
                ["Growth UX", "SEO · Ads · CRO"],
              ].map(([k, v]) => (
                <GlassCard key={k} className="p-6">
                  <div className="micro-label">{k}</div>
                  <div className="mt-3 font-display text-xl">{v}</div>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between gap-4">
          <Reveal>
            <SectionLabel>Selected Work</SectionLabel>
            <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1.1] sm:text-5xl">
              Platforms shipped with intention. <span className="italic text-silver">Measured by outcomes.</span>
            </h2>
          </Reveal>
          <Link
            to="/work"
            className="hidden items-center gap-2 text-sm text-muted-foreground hover:text-foreground md:inline-flex"
          >
            All projects <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <Link to="/work/$slug" params={{ slug: p.slug }} className="group block">
                <GlassCard className="relative h-full p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-glow">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl opacity-20">{p.index}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground bg-white/5">
                      {p.year}
                    </span>
                  </div>
                  
                  <div className="mt-8">
                    <div className="micro-label text-primary">{p.category}</div>
                    <h3 className="mt-3 font-display text-4xl leading-tight group-hover:text-gradient transition-all duration-500">{p.title}</h3>
                    <p className="mt-4 text-muted-foreground line-clamp-2">{p.tagline}</p>
                  </div>

                  {/* High-fidelity mini dashboard preview */}
                  <div className="relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-6">
                    <div className="grid grid-cols-2 gap-8 relative z-10">
                      {p.metrics.slice(0, 2).map((m, mi) => (
                        <div key={mi}>
                          <div className="micro-label opacity-60">{m.label}</div>
                          <div className="mt-2 font-display text-3xl tracking-tight text-white">
                            <AnimatedCounter 
                              value={parseFloat(m.value.replace(/[^0-9.]/g, ''))} 
                              suffix={m.value.replace(/[0-9.]/g, '')}
                              decimals={m.value.includes('.') ? 1 : 0}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="absolute inset-0 -bottom-8 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                      <MiniArea height={120} />
                    </div>
                  </div>

                  <div className="mt-10 flex items-center justify-between">
                    <div className="flex -space-x-2">
                       {[1,2,3].map(avatar => (
                         <div key={avatar} className="h-8 w-8 rounded-full border-2 border-surface bg-white/10" />
                       ))}
                    </div>
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                      View System Architecture
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SKILLS MARQUEE */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionLabel>Capabilities</SectionLabel>
            <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1.1] sm:text-5xl">
              The full stack of design, data, and growth.
            </h2>
          </Reveal>
        </div>
        <div className="relative mt-12 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
          <motion.div
            className="flex gap-3 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          >
            {[...skills, ...skills, ...skills].map((s, i) => (
              <span
                key={i}
                className="glass rounded-full px-6 py-3 text-sm text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <SectionLabel>Outcomes</SectionLabel>
          <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1.1] sm:text-5xl">
            Design that compounds. <span className="italic text-silver">Numbers that hold up.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: 186, s: "%", label: "Lift in qualified yacht inquiries" },
            { v: 4, s: ".7×", label: "Blended ROAS on ads dashboards", raw: true },
            { v: 92, s: "%", label: "Reduction in reporting time" },
            { v: 312, s: "%", label: "Avg. organic traffic growth" },
          ].map((r) => (
            <Reveal key={r.label}>
              <GlassCard className="p-7">
                <div className="font-display text-5xl text-gradient">
                  {r.raw ? <>4.7×</> : <AnimatedCounter value={r.v} suffix={r.s} />}
                </div>
                <div className="mt-3 text-sm text-muted-foreground">{r.label}</div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <GlassCard strong className="relative overflow-hidden p-10 sm:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-glow/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
            <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <SectionLabel>Let's build</SectionLabel>
                <h3 className="mt-5 font-display text-4xl leading-[1.1] sm:text-5xl">
                  Have a platform worth designing <span className="italic text-gradient">beautifully?</span>
                </h3>
                <p className="mt-5 max-w-xl text-muted-foreground">
                  Available for product design, dashboard systems, and luxury digital experiences.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Button asChild variant="luxury" size="xl">
                  <Link to="/contact">Start a project <ArrowUpRight className="h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="ghost-glow" size="xl">
                  <a href="mailto:saber.elshafey@gmail.com">Email directly</a>
                </Button>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </section>
    </>
  );
}
