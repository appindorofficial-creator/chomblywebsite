import { SITE, absoluteUrl } from "@/config/site";

export function GET() {
  const sitemap = `Sitemap: ${absoluteUrl("/sitemap.xml")}`;
  const lines = SITE.indexingEnabled
    ? [
        "User-agent: *",
        "Allow: /",
        "",
        "User-agent: OAI-SearchBot",
        "Allow: /",
        "",
        "User-agent: GPTBot",
        "Disallow: /",
        "",
        sitemap,
      ]
    : [
        "User-agent: *",
        "Disallow: /",
        "",
        sitemap,
      ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
