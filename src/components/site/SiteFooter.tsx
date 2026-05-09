import { Link } from "@tanstack/react-router";
import { Mail, Linkedin, ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="font-display text-3xl">
              Designing the next era of <span className="italic text-gradient">luxury</span> & data.
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Available for product design, dashboard systems, and luxury digital experiences.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm backdrop-blur-md transition-all hover:border-primary-glow/50"
            >
              Start a project <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div>
            <div className="micro-label">Navigate</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/work" className="text-muted-foreground hover:text-foreground">Work</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
              <li><Link to="/process" className="text-muted-foreground hover:text-foreground">Process</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          <div>
            <div className="micro-label">Contact</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="mailto:saber.elshafey@gmail.com" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <Mail className="h-4 w-4" /> saber.elshafey@gmail.com
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Saber Farag — All rights reserved.</div>
          <div className="tracking-[0.22em] uppercase">Crafted with precision</div>
        </div>
      </div>
    </footer>
  );
}
