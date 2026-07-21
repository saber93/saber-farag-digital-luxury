import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { robotsDirective, routeHeaders, site } from "@/lib/site";

function NotFoundComponent() {
  return (
    <section className="relative flex min-h-[72vh] items-center justify-center overflow-hidden px-6 py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="relative max-w-xl text-center">
        <p className="micro-label">Error 404</p>
        <h1 className="mt-4 font-display text-6xl text-gradient sm:text-8xl">Page not found</h1>
        <p className="mt-5 text-muted-foreground">
          This address does not match a published page. Use the navigation or return to the
          analytics portfolio.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-11 items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Return home
        </Link>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  return (
    <section className="flex min-h-[72vh] items-center justify-center px-6 py-32">
      <div className="max-w-lg text-center">
        <p className="micro-label">Unexpected error</p>
        <h1 className="mt-4 font-display text-4xl">This page could not be rendered</h1>
        <p className="mt-4 text-muted-foreground">
          Try the request again. If the issue continues, use the contact page to report it.
        </p>
        <button
          type="button"
          onClick={() => {
            void router.invalidate();
            reset();
          }}
          className="mt-8 min-h-11 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Try again
        </button>
        {import.meta.env.DEV ? <pre className="sr-only">{error.message}</pre> : null}
      </div>
    </section>
  );
}

export const Route = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#090a0f" },
      { name: "robots", content: robotsDirective(false) },
      { title: `${site.name} — Analytics Specialist` },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
    ],
  }),
  headers: () => routeHeaders(false, false),
  shellComponent: RootDocument,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-lg bg-foreground px-4 py-2 text-background transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <div className="relative min-h-screen bg-background text-foreground">
        <SiteHeader />
        <main id="main-content" className="relative" tabIndex={-1}>
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
