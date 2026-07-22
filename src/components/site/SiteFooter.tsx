import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl">
              Analytics made <span className="italic text-gradient">clear enough to act on.</span>
            </p>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Dashboard concepts, measurement thinking, and reporting systems by {site.name}.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm transition-all hover:border-primary-glow/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-glow"
            >
              Get in touch <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <nav aria-label="Footer navigation">
            <p className="micro-label">Navigate</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/work" className="text-muted-foreground hover:text-foreground">
                  Work
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link to="/process" className="text-muted-foreground hover:text-foreground">
                  Process
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="micro-label">Contact</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-flex items-center gap-2 break-all text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-glow"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" /> {site.email}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>Analytics specialist</p>
        </div>
      </div>
    </footer>
  );
}
