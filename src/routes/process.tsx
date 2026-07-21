import { createFileRoute } from "@tanstack/react-router";
import { GlassCard } from "@/components/site/GlassCard";
import { SectionLabel } from "@/components/site/SectionLabel";
import { breadcrumbSchema, pageHead } from "@/lib/seo";
import { pages, routeHeaders } from "@/lib/site";

export const Route = createFileRoute("/process")({
  head: () =>
    pageHead(pages.process, {
      schemas: [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Process", path: "/process" },
        ]),
      ],
    }),
  headers: () => routeHeaders(true),
  component: ProcessPage,
});

const steps = [
  {
    number: "01",
    title: "Frame the decision",
    body: "Define who needs an answer, what action follows, and which constraints matter.",
  },
  {
    number: "02",
    title: "Audit the evidence",
    body: "Review sources, definitions, coverage, freshness, and known gaps before interpretation.",
  },
  {
    number: "03",
    title: "Map the questions",
    body: "Organize primary outcomes, diagnostic questions, and the paths between overview and detail.",
  },
  {
    number: "04",
    title: "Design the hierarchy",
    body: "Choose comparisons and visual forms that match the analytical task.",
  },
  {
    number: "05",
    title: "Prototype the workflow",
    body: "Connect filters, annotations, states, and drill-down behavior in a testable interface.",
  },
  {
    number: "06",
    title: "Validate understanding",
    body: "Check whether readers interpret the same definitions, changes, and caveats.",
  },
  {
    number: "07",
    title: "Document the system",
    body: "Record metric meaning, ownership, refresh expectations, and interface conventions.",
  },
  {
    number: "08",
    title: "Review and refine",
    body: "Revisit the questions as data, decisions, and user needs change.",
  },
] as const;

function ProcessPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-36 sm:pt-44">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionLabel>Process</SectionLabel>
          <h1 className="mt-7 max-w-5xl font-display text-[clamp(3rem,7vw,6rem)] leading-[0.96]">
            From a decision question to a reporting system that can be{" "}
            <span className="italic text-gradient">understood.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            The process keeps definitions and evidence close to the interface, so visual polish
            never outruns analytical clarity.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20" aria-label="Analytics design process">
        <ol className="grid gap-4 md:grid-cols-2">
          {steps.map((step) => (
            <li key={step.number}>
              <GlassCard className="grid h-full gap-5 p-7 sm:grid-cols-[auto_1fr]">
                <span className="font-display text-3xl text-primary-glow" aria-hidden="true">
                  {step.number}
                </span>
                <div>
                  <h2 className="font-display text-2xl">{step.title}</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </GlassCard>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
