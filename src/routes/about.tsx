import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Compass, FileSearch, Layers3 } from "lucide-react";
import { GlassCard } from "@/components/site/GlassCard";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";
import { breadcrumbSchema, pageHead, profileSchema } from "@/lib/seo";
import { pages, routeHeaders, site } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead(pages.about, {
      schemas: [
        profileSchema,
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]),
      ],
    }),
  headers: () => routeHeaders(true),
  component: AboutPage,
});

const focusAreas = [
  {
    icon: Compass,
    title: "Question framing",
    body: "Clarifying the decision, audience, and constraints before choosing metrics.",
  },
  {
    icon: FileSearch,
    title: "Data review",
    body: "Checking definitions, freshness, coverage, and limitations that affect interpretation.",
  },
  {
    icon: BarChart3,
    title: "Visual analysis",
    body: "Choosing representations that support comparison and investigation.",
  },
  {
    icon: Layers3,
    title: "Interface systems",
    body: "Designing repeatable patterns for overview, detail, filters, and explanation.",
  },
] as const;

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-36 sm:pt-44">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionLabel>About</SectionLabel>
          <h1 className="mt-7 max-w-5xl font-display text-[clamp(3rem,7vw,6rem)] leading-[0.96]">
            Analytics needs an analyst's discipline and a designer's{" "}
            <span className="italic text-gradient">clarity.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {site.name} is an analytics specialist focused on dashboards, measurement structure, and
            reporting experiences. {site.alternateName} is an alternate professional name used in
            earlier portfolio materials.
          </p>
        </div>
      </section>

      <section
        className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[.75fr_1.25fr] lg:gap-16"
        aria-labelledby="profile-heading"
      >
        <GlassCard strong className="p-8">
          <div
            className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-glow to-primary font-display text-3xl text-primary-foreground"
            aria-hidden="true"
          >
            SE
          </div>
          <h2 id="profile-heading" className="mt-7 font-display text-3xl">
            {site.name}
          </h2>
          <p className="mt-2 text-primary-glow">{site.role}</p>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Professional focus: analytics interfaces, measurement planning, search reporting, and
            data communication.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-7 inline-flex break-all text-sm text-foreground underline decoration-white/25 underline-offset-4 hover:decoration-primary-glow"
          >
            {site.email}
          </a>
        </GlassCard>

        <Reveal>
          <SectionLabel>Working principles</SectionLabel>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              Useful analytics begins with a concrete question. A chart is only helpful when its
              definitions, comparison period, and limitations are understandable.
            </p>
            <p>
              This portfolio therefore separates demonstrated interface work from business outcomes.
              The four work pages are explicitly presented as concept studies; they do not claim
              clients, deployments, or measured results.
            </p>
            <p>
              The goal is a reporting experience that helps a reader see what changed, inspect why,
              and decide what to do next.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20" aria-labelledby="focus-heading">
        <SectionLabel>Areas of focus</SectionLabel>
        <h2 id="focus-heading" className="mt-5 font-display text-4xl sm:text-5xl">
          The craft behind a readable analytics product.
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map(({ icon: Icon, title, body }) => (
            <GlassCard key={title} className="p-6">
              <Icon className="h-5 w-5 text-primary-glow" aria-hidden="true" />
              <h3 className="mt-5 font-display text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </GlassCard>
          ))}
        </div>
      </section>
    </>
  );
}
