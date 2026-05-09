## Saber Farag — Luxury Portfolio

A dark, cinematic portfolio that fuses yacht-brand elegance with SaaS analytics polish. Editorial serif headlines (Instrument Serif) paired with Work Sans, on a Midnight Navy + Silver Glow palette.

### Design system
- **Palette tokens** in `src/styles.css` (oklch): `--background` #05070d, `--surface` #0c1428, `--surface-elevated` glass overlay, `--primary` #1e3a5f with `--primary-glow` cool blue, `--silver` #9bb4d4, `--foreground` near-white. Add gradient + shadow tokens: `--gradient-hero`, `--gradient-glass`, `--shadow-glow`, `--shadow-elevated`.
- **Typography**: Instrument Serif (display, italic accents) + Work Sans (body, UI). Tight tracking on display, generous line-height on body, uppercase micro-labels with wide letter-spacing.
- **Effects**: glassmorphism cards (backdrop-blur + 1px silver border at 8% opacity), soft radial glows, noise texture overlay, smooth scroll, framer-motion entrance + parallax.
- **Components**: extend shadcn Button with `luxury` and `ghost-glow` variants; reusable `GlassCard`, `MetricTile`, `SectionLabel`, `AnimatedCounter`, `MiniChart` (recharts), `FloatingDashboard` mock.

### Route architecture (TanStack file-based)
```
src/routes/
  __root.tsx         // shared nav + footer + metadata
  index.tsx          // Hero + condensed about/projects/contact teaser
  about.tsx          // Full bio, certifications, timeline
  work.tsx           // All 4 featured projects
  work.$slug.tsx     // Case study layout per project
  process.tsx        // 8-step workflow
  contact.tsx        // Contact form + details
```
Each route gets its own `head()` with unique title/description/og tags. Shared `<SiteHeader />` and `<SiteFooter />` rendered in `__root.tsx`.

### Page sections

**Home (`/`)**
- Hero: cinematic full-bleed with animated gradient mesh + slow-drifting yacht silhouette accent + floating glass dashboard cards (KPI tile, line chart, donut). Headline "Designing Luxury Digital Experiences & Data-Driven Platforms" in Instrument Serif with italic emphasis on "Luxury" and "Data-Driven". Two CTAs (View Projects / Contact). Scroll indicator.
- About teaser → link to `/about`
- Featured Work grid (4 projects, glass cards with hover tilt + glow) → link to `/work`
- Skills marquee (animated horizontal scroll)
- Results strip (animated counters)
- Contact CTA band

**About (`/about`)**
- Portrait area + bio paragraphs
- Certification badges (Google UX)
- Vertical timeline of 5+ years experience
- Capabilities grid

**Work (`/work`)**
- Editorial index of 4 projects with large typographic numbering, hover-reveal mockup
- Cards link to case studies

**Case study (`/work/$slug`)** — 4 entries:
1. Luxury Yacht Booking & Showcase
2. Google Ads + Analytics Dashboard
3. SEO & Search Console Reporting
4. Marketing Intelligence Hub (in development badge)
- Layout per case: hero cover, problem, role, approach, key metrics row, dashboard mockup gallery, results. Realistic mock UI built in-component (no external assets needed).

**Process (`/process`)**
- 8-step elegant flow (Research → Optimization & Analytics) as a vertical numbered sequence with connecting line and glass step cards.

**Contact (`/contact`)**
- Minimal form (name, email, message) — submits to a placeholder handler (no backend) showing toast confirmation
- Email: saber.elshafey@gmail.com, LinkedIn placeholder, copy-to-clipboard
- Availability statement

### Motion
- Framer Motion: hero stagger reveal, parallax floating dashboards, scroll-linked fades for sections, magnetic hover on CTAs, count-up on metrics (intersection-observer), card tilt on project hover.
- Recharts for the live mini-charts inside floating dashboards and case-study metrics.

### Technical
- Install: `framer-motion`, `recharts` (only adds; rest is in template).
- Reusable section primitives keep route files thin (~100 lines each).
- All colors via semantic tokens — no hardcoded hex in components.
- Responsive: mobile nav (Sheet), grids collapse to single column, hero typography fluid via `clamp()`.
- SEO: per-route meta + JSON-LD Person schema on `/about`.

### Out of scope (placeholder-friendly until you send assets)
- Real client logos, screenshots, and metrics — current build uses elegant in-code mock dashboards and lorem-style case copy you can swap later.
- Contact form backend (no Lovable Cloud yet — form is presentational).
