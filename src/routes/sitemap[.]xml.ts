import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { absoluteUrl, indexablePaths, robotsDirective, securityHeaders } from "@/lib/site";

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexablePaths.map((path) => `  <url><loc>${absoluteUrl(path)}</loc></url>`).join("\n")}
</urlset>`;

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(xml, {
          headers: {
            ...securityHeaders,
            "Content-Type": "application/xml; charset=utf-8",
            "X-Robots-Tag": robotsDirective(true),
            "Cache-Control": "public, max-age=0, must-revalidate",
            "Netlify-CDN-Cache-Control":
              "public, durable, s-maxage=3600, stale-while-revalidate=86400",
          },
        }),
    },
  },
});
