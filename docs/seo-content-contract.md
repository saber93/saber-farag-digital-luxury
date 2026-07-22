# SEO and content contract

- Canonical origin: `https://analytics.elshafey.online`
- Canonical identity: **Saber El Shafey**
- Alternate name only: **Saber Farag**
- Indexable production routes: `/`, `/about`, `/process`, `/contact`, `/work`
- The four stable `/work/:slug` concept pages return 200 with `noindex, follow` and are excluded from the sitemap.
- Every unknown slug or route must return HTTP 404 with a branded page and `noindex` response metadata.
- Deploy previews and branch deploys must remain noindex in both HTML metadata and `X-Robots-Tag`.

The project pages are portfolio concepts. They must not claim clients, production status, testimonials, or measured outcomes without a separately reviewed evidence source. Structured data is limited to `WebSite`, visible `Person`/`ProfilePage`, and `BreadcrumbList`.

Contact is intentionally direct: `mailto:saber.elshafey@gmail.com` plus a copy-address action. There is no simulated form submission or response-time promise.
