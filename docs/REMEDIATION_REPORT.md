# Analytics immediate remediation report

## Stable scope

This branch converts the portfolio from a catch-all SPA into a TanStack Start SSR application using Netlify's official Vite adapter. It does not alter production, DNS, Search Console, or any external account.

The canonical identity is **Saber El Shafey**. **Saber Farag** appears only as an approved alternate name. The property is positioned as an analytics-specialist portfolio, with direct email contact at `saber.elshafey@gmail.com` and no social profile claim.

## Route contract

| Owner status    |                                         Routes | HTTP | Robots                             | Sitemap |
| --------------- | ---------------------------------------------: | ---: | ---------------------------------- | ------: |
| Canonical owner | `/`, `/about`, `/process`, `/contact`, `/work` |  200 | `index, follow` in production only |       5 |
| Pending support |  Four inventoried `/work/:slug` concept routes |  200 | `noindex, follow`                  |       0 |
| Unknown         |                 Any other path or project slug |  404 | `noindex, follow`                  |       0 |

Every inventoried route carries the shared typed fields for locale, ownership, indexability, canonical URL, localized counterpart, title, description, H1, schema eligibility, and evidence references. Deploy previews and branch deploys override all route policies with HTML and response-header `noindex, nofollow` while retaining production canonical URLs.

## Truth and schema controls

- The four work pages are visibly labeled portfolio concepts pending verification.
- Unsupported metrics, testimonials, certifications, client identities, launch/deployment assertions, availability promises, and generic LinkedIn links are removed.
- Contact uses explicit `mailto:` and copy-address actions; there is no simulated submission.
- Structured data is limited to `WebSite`, visible `ProfilePage`/`Person` facts, and `BreadcrumbList`.
- `Organization`, `CreativeWork`, `Product`, `Review`, ratings, outcomes, and social `sameAs` claims are prohibited by tests.

## Delivery controls

The branch pins Node 22.23.1, declares npm 10.9.2 as the project package manager, and accepts Netlify's supported npm 10.9 patch-level command runner. Netlify must run `npm ci`, prove the manifest and lockfile remain unchanged, and then pass lint, type, unit, SEO, source security, build, artifact security, and output checks. Bun and unused UI dependencies are removed, source maps are disabled, assets are fingerprinted, and route security/cache headers are explicit. The runtime-only npm audit is a separate release gate.

The lock scan covers all 42 packages and 84 malicious versions in TanStack advisory `GHSA-g7cv-rxg3-hmpx`, rejects its dependency, filename, git-ref, and network indicators, validates registry/integrity provenance, and allows install scripts only for the reviewed root patch plus esbuild, fsevents, Playwright's fsevents copy, and sharp. Built client, server, and Netlify function output receives a mandatory second secret, local-path, preview-host, IOC, and source-map scan.

Production CSP blocks outbound frames. Non-indexable preview contexts allow only Netlify's same-provider review frame at `https://app.netlify.com`; `frame-ancestors 'none'` remains enforced in every context. This keeps the preview review toolbar from generating false console failures without weakening the production document policy.

The patched Babel runtime closes the current audit advisory. A narrow post-install script changes only three TanStack compiler default imports to namespace imports for Babel 8 ESM compatibility and fails if upstream file contents change. Playwright runs against the built Start/Netlify output rather than the development HMR server because the current TanStack HMR compiler still uses a Babel 7-only scope API. Remove both compatibility accommodations once TanStack publishes native Babel 8 interop.

Final branch heads, PR URLs, preview IDs and URLs, and post-preview QA belong in the Draft PR description and private governance release registry because they cannot truthfully be embedded in the commit that creates them.
