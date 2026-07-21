import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/site/GlassCard";
import { SectionLabel } from "@/components/site/SectionLabel";
import { getProject, isProjectSlug, projects } from "@/lib/projects";
import { detailHead } from "@/lib/seo";
import { routeHeaders } from "@/lib/site";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    if (!isProjectSlug(params.slug)) {
      throw notFound({ headers: routeHeaders(false, false) });
    }

    return getProject(params.slug);
  },
  head: ({ loaderData }) => (loaderData ? detailHead(loaderData) : {}),
  headers: () => routeHeaders(false),
  component: ProjectPage,
});

function ProjectPage() {
  const project = Route.useLoaderData();
  const currentIndex = projects.findIndex(({ slug }) => slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <article>
      <header className="relative overflow-hidden pb-20 pt-36 sm:pt-44">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <Link
            to="/work"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-glow"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All work
          </Link>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <SectionLabel>{project.category}</SectionLabel>
            <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Pending verification · portfolio concept
            </span>
          </div>
          <h1 className="mt-7 max-w-5xl font-display text-[clamp(3rem,7vw,6rem)] leading-[0.96]">
            {project.title}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {project.summary}
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            This support page is retained for review. The concept has no verified client,
            production-deployment, or outcome claim.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16" aria-labelledby="question-heading">
        <GlassCard strong className="p-8 sm:p-12">
          <p className="micro-label">Design question</p>
          <h2
            id="question-heading"
            className="mt-5 max-w-4xl font-display text-3xl leading-tight sm:text-5xl"
          >
            {project.question}
          </h2>
        </GlassCard>
      </section>

      <section
        className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[.8fr_1.2fr]"
        aria-labelledby="approach-heading"
      >
        <div>
          <SectionLabel>Approach</SectionLabel>
          <h2 id="approach-heading" className="mt-5 font-display text-4xl">
            Structure before decoration.
          </h2>
        </div>
        <ol className="space-y-4">
          {project.approach.map((item, index) => (
            <li
              key={item}
              className="grid gap-4 rounded-2xl border border-white/8 bg-white/[0.025] p-6 sm:grid-cols-[auto_1fr]"
            >
              <span className="font-display text-2xl text-primary-glow" aria-hidden="true">
                0{index + 1}
              </span>
              <p className="leading-relaxed text-muted-foreground">{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16" aria-labelledby="views-heading">
        <SectionLabel>Interface views</SectionLabel>
        <h2 id="views-heading" className="mt-5 font-display text-4xl sm:text-5xl">
          A proposed investigation path.
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {project.views.map((view, index) => (
            <GlassCard key={view.title} className="p-7">
              <span className="text-xs text-primary-glow">VIEW 0{index + 1}</span>
              <h3 className="mt-5 font-display text-2xl">{view.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {view.description}
              </p>
            </GlassCard>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-white/10 px-4 py-2 text-xs text-muted-foreground"
            >
              {tool}
            </span>
          ))}
        </div>
      </section>

      <nav className="mx-auto max-w-7xl px-6 py-20" aria-label="Project navigation">
        <Link
          to="/work/$slug"
          params={{ slug: nextProject.slug }}
          className="group flex items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-glow"
        >
          <div>
            <p className="micro-label">Next concept</p>
            <p className="mt-3 font-display text-3xl">{nextProject.title}</p>
          </div>
          <ArrowRight
            className="h-6 w-6 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </nav>
    </article>
  );
}
