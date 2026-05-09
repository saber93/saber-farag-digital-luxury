import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Linkedin, Copy, Check, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { SectionLabel } from "@/components/site/SectionLabel";
import { GlassCard } from "@/components/site/GlassCard";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Saber Farag" },
      { name: "description", content: "Available for product design, dashboard systems, and luxury digital experiences." },
      { property: "og:title", content: "Contact — Saber Farag" },
      { property: "og:description", content: "Let's design something premium together." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText("saber.elshafey@gmail.com");
    setCopied(true);
    toast.success("Email copied to clipboard");
    setTimeout(() => setCopied(false), 1800);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    toast.success("Message received — I'll be in touch within 24 hours.");
    (e.target as HTMLFormElement).reset();
    setSubmitting(false);
  };

  return (
    <>
      <section className="relative isolate overflow-hidden pb-16 pt-36 sm:pt-44">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="mx-auto max-w-7xl px-6">
          <SectionLabel>Contact</SectionLabel>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.05]">
            Let's design something <span className="italic text-gradient">premium</span> together.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Available for product design, dashboard systems, and luxury digital experiences. Currently
            booking selective engagements for 2026.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <GlassCard strong className="relative overflow-hidden p-8 sm:p-10">
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-glow/20 blur-3xl" />
              <h2 className="font-display text-3xl">Start a conversation</h2>
              <p className="mt-2 text-sm text-muted-foreground">Tell me about the project — I'll respond within 24 hours.</p>

              <form onSubmit={submit} className="relative mt-8 grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name" className="micro-label">Name</Label>
                    <Input id="name" required name="name" placeholder="Your name" className="mt-2 h-12 border-white/10 bg-white/[0.03]" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="micro-label">Email</Label>
                    <Input id="email" required type="email" name="email" placeholder="you@company.com" className="mt-2 h-12 border-white/10 bg-white/[0.03]" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="company" className="micro-label">Company / Project</Label>
                  <Input id="company" name="company" placeholder="Optional" className="mt-2 h-12 border-white/10 bg-white/[0.03]" />
                </div>
                <div>
                  <Label htmlFor="message" className="micro-label">Brief</Label>
                  <Textarea id="message" required name="message" rows={5} placeholder="What are you building?" className="mt-2 border-white/10 bg-white/[0.03]" />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">By sending, you agree to a friendly reply.</p>
                  <Button type="submit" variant="luxury" size="lg" disabled={submitting}>
                    {submitting ? "Sending..." : <>Send message <ArrowUpRight className="h-4 w-4" /></>}
                  </Button>
                </div>
              </form>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4">
              <GlassCard className="p-6">
                <div className="micro-label">Direct email</div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <a href="mailto:saber.elshafey@gmail.com" className="font-display text-xl text-foreground hover:text-gradient">
                    saber.elshafey@gmail.com
                  </a>
                  <button onClick={copy} aria-label="Copy email" className="rounded-full border border-white/10 p-2 hover:border-white/30">
                    {copied ? <Check className="h-4 w-4 text-primary-glow" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="micro-label">Connect</div>
                <div className="mt-4 space-y-3">
                  <a href="mailto:saber.elshafey@gmail.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground">
                    <Mail className="h-4 w-4" /> Email
                  </a>
                  <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="micro-label">Currently</div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-sm text-foreground">Open to new projects</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Booking 2 engagements per quarter to keep craft and attention high.
                </p>
              </GlassCard>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
