import { SITE, absoluteUrl } from "@/config/site";

export function GET() {
  const lines = SITE.indexingEnabled
    ? [
        "User-agent: *",
        "Allow: /",
        "",
        `Sitemap: ${absoluteUrl("/sitemap.xml")}`,
      ]
    : [
        "User-agent: *",
        "Disallow: /",
        "",
        `Sitemap: ${absoluteUrl("/sitemap.xml")}`,
      ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
