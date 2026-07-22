import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Clipboard, Mail } from "lucide-react";
import { GlassCard } from "@/components/site/GlassCard";
import { SectionLabel } from "@/components/site/SectionLabel";
import { breadcrumbSchema, pageHead } from "@/lib/seo";
import { pages, routeHeaders, site } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead(pages.contact, {
      schemas: [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]),
      ],
    }),
  headers: () => routeHeaders(true),
  component: ContactPage,
});

function ContactPage() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  async function copyEmail() {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(site.email);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-36 sm:pt-44">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionLabel>Contact</SectionLabel>
          <h1 className="mt-7 max-w-5xl font-display text-[clamp(3rem,7vw,6rem)] leading-[0.96]">
            Start with the decision you need the data to{" "}
            <span className="italic text-gradient">support.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Email {site.name} with the reporting challenge, intended audience, available sources,
            and any constraints you already know.
          </p>
        </div>
      </section>

      <section
        className="mx-auto grid max-w-5xl gap-6 px-6 py-20 md:grid-cols-[1.15fr_.85fr]"
        aria-labelledby="email-heading"
      >
        <GlassCard strong className="relative overflow-hidden p-8 sm:p-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative">
            <Mail className="h-6 w-6 text-primary-glow" aria-hidden="true" />
            <h2 id="email-heading" className="mt-6 font-display text-3xl">
              Email directly
            </h2>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 block break-all text-lg text-foreground underline decoration-white/25 underline-offset-4 hover:decoration-primary-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-glow sm:text-xl"
            >
              {site.email}
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-glow"
              >
                Open email app
              </a>
              <button
                type="button"
                onClick={() => void copyEmail()}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-glow"
              >
                {copyState === "copied" ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Clipboard className="h-4 w-4" aria-hidden="true" />
                )}
                {copyState === "copied" ? "Copied" : "Copy address"}
              </button>
            </div>
            <p
              className="mt-4 min-h-5 text-sm text-muted-foreground"
              role="status"
              aria-live="polite"
            >
              {copyState === "copied" ? "Email address copied to the clipboard." : null}
              {copyState === "error"
                ? "Copy is unavailable in this browser. Select the address above instead."
                : null}
            </p>
          </div>
        </GlassCard>

        <GlassCard className="p-8">
          <p className="micro-label">Useful context</p>
          <ul className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <li>• The decision or question the work should support</li>
            <li>• Who will use the reporting experience</li>
            <li>• Which data sources are available</li>
            <li>• Known definitions, limitations, or deadlines</li>
          </ul>
          <p className="mt-8 border-t border-white/8 pt-6 text-sm text-muted-foreground">
            This site does not use a simulated contact form. Your message is sent only when you
            choose an email action.
          </p>
        </GlassCard>
      </section>
    </>
  );
}
