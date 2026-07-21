import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { GlassCard } from "@/components/site/GlassCard";
import { SectionLabel } from "@/components/site/SectionLabel";
import { projects } from "@/lib/projects";
import { breadcrumbSchema, pageHead } from "@/lib/seo";
import { pages, routeHeaders } from "@/lib/site";

export const Route = createFileRoute("/work/")({
  head: () =>
    pageHead(pages.work, {
      schemas: [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ]),
      ],
    }),
  headers: () => routeHeaders(true),
  component: WorkPage,
});

function WorkPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-36 sm:pt-44">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionLabel>Work</SectionLabel>
          <h1 className="mt-7 max-w-5xl font-display text-[clamp(3rem,7vw,6rem)] leading-[0.96]">
            Analytics concepts built around questions, context, and{" "}
            <span className="italic text-gradient">investigation.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            These are portfolio concept studies. They demonstrate interface and measurement thinking
            without claiming clients, production deployments, or business results. Their project
            status remains pending verification.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20" aria-label="Analytics portfolio concepts">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              to="/work/$slug"
              params={{ slug: project.slug }}
              className="group rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-glow"
            >
              <GlassCard className="h-full p-8 transition-colors group-hover:border-primary/35">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-4xl text-white/20">{project.index}</span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Pending verification
                  </span>
                </div>
                <p className="mt-8 text-xs uppercase tracking-[0.18em] text-primary-glow">
                  {project.category}
                </p>
                <h2 className="mt-3 font-display text-4xl">{project.title}</h2>
                <p className="mt-5 leading-relaxed text-muted-foreground">{project.summary}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.tools.slice(0, 3).map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full bg-white/[0.04] px-3 py-1.5 text-xs text-muted-foreground"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm">
                  View concept <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
