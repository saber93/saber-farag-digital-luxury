import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/site/SectionLabel";
import { GlassCard } from "@/components/site/GlassCard";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Process — Saber Farag" },
      { name: "description", content: "An eight-step workflow from research to optimization, designed for premium digital products and analytics platforms." },
      { property: "og:title", content: "Process — Saber Farag" },
      { property: "og:description", content: "From research to live optimization — how premium platforms come together." },
    ],
  }),
  component: ProcessPage,
});

const steps = [
  { title: "Research", body: "Stakeholder interviews, competitive deep-dives, generative user research." },
  { title: "UX Strategy", body: "Define the north-star metric, user jobs, and product principles." },
  { title: "Wireframing", body: "Low-fidelity flows that pressure-test the architecture before pixels." },
  { title: "Dashboard Architecture", body: "Information hierarchy and widget systems for decision-grade UX." },
  { title: "Data Structuring", body: "Define entities, sources, refresh logic, and the schema design surfaces." },
  { title: "UI Design", body: "Editorial typography, glass surfaces, motion, and component systems." },
  { title: "Developer Collaboration", body: "Tight design-engineering partnership with token-driven systems." },
  { title: "Optimization & Analytics", body: "Post-launch instrumentation, experimentation, and continuous tuning." },
];

function ProcessPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pb-16 pt-36 sm:pt-44">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="mx-auto max-w-7xl px-6">
          <SectionLabel>Process</SectionLabel>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.05]">
            Eight steps from <span className="italic text-gradient">insight</span> to <span className="italic text-gradient">live optimization</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            A repeatable, opinionated workflow built for products where craft, data, and outcomes all need to win.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="relative ml-3 border-l border-white/10 pl-8 sm:ml-6 sm:pl-14">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.04}>
              <div className="relative pb-10 last:pb-0">
                <span className="absolute -left-[44px] top-0 sm:-left-[60px]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-background font-display text-sm text-silver shadow-[0_0_30px_oklch(0.72_0.18_240/0.25)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                <GlassCard className="p-7">
                  <h3 className="font-display text-2xl sm:text-3xl">{s.title}</h3>
                  <p className="mt-3 max-w-2xl text-muted-foreground">{s.body}</p>
                </GlassCard>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
