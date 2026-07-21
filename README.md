# Saber El Shafey analytics portfolio

Server-rendered TanStack Start portfolio for `https://analytics.elshafey.online`, deployed through Netlify's official TanStack Start adapter.

## Runtime and commands

Use Node 22.23.1 and npm only. Install reproducibly with `npm ci` after the lockfile has been regenerated and reviewed for the adapter migration.

- `npm run dev` — local SSR development
- `npm run lint` — ESLint
- `npm run typecheck` — strict TypeScript check
- `npm test` — registry/content unit tests
- `npm run seo:check` — canonical, route, and claim contract checks
- `npm run security:scan` — static secret/configuration scan
- `npm run build:production` — production-indexable Start build
- `npm run test:e2e` — Playwright/axe SSR, SEO, 404, responsive, and accessibility checks
- `npm run verify:full` — complete local release gate

Deploy previews and branch deploys are built with noindex metadata and response headers. Only the production Netlify context is indexable.
