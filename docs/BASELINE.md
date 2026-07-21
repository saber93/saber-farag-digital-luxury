# Analytics production baseline

Baseline captured on 2026-07-21 before branch creation.

- Repository: `saber93/saber-farag-digital-luxury`
- Base commit: `1c40d599001219f7ee3220cb6ca2cf49eba86124`
- Netlify site: `saber-ux`
- Production deploy at capture: `69ff8a4970f75300088d04e7`
- Sanitized site inventory SHA-256: `fe2557ebc0e58ee4b58092965e035959d0f3951c8370d99dae1aa1a5ed1d9f5d`
- Cross-property evidence manifest SHA-256: `94d3168064c8063045c6d0f21f8db09c16c129c87012f1dedd4658c48ff22625`

The captured production site was a client-rendered Vite SPA. The homepage and eight known detail paths rendered through the SPA fallback; `/robots.txt`, `/sitemap.xml`, and unknown paths also returned the application shell with HTTP 200. Route-specific body content and head metadata were absent from the initial HTML.

Raw HTTP bodies, rendered HTML, asset copies, console records, screenshots, and unredacted evidence remain in the private governance evidence store. This application repository intentionally contains only the sanitized findings and checksums.
