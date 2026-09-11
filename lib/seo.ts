import type { Metadata } from "next";
import { PUBLIC_ROUTES, SITE, SITE_MODE, absoluteUrl } from "@/config/site";

export const BRAND_DESCRIPTION =
  "Chombly está construyendo una forma más clara de conectar el contexto y el cuidado de las mascotas.";

export function metadataFor(
  title: string,
  description: string,
  path: string,
  options: { noindex?: boolean } | "es" | "en" = {},
): Metadata {
  const shouldIndex =
    SITE.indexingEnabled &&
    !(typeof options === "object" && options.noindex);
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { "es-CO": url, "x-default": url },
    },
    robots: { index: shouldIndex, follow: shouldIndex },
    openGraph: {
      type: "website",
      locale: "es_CO",
      siteName: SITE.brandName,
      title,
      description,
      url,
    },
    twitter: { card: "summary", title, description },
  };
}

// Compatibility surface for the gated legacy product renderer. It is never
// used by the new public routes and intentionally makes no availability claims.
export function pageGraph(
  path: string,
  title: string,
  description: string,
  _faqs: readonly (readonly string[])[] = [],
  language: "es" | "en" = "es",
) {
  void _faqs;
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: language === "en" ? "en-US" : "es-CO",
        isPartOf: { "@id": `${SITE.baseUrl}/#website` },
      },
    ],
  };
}

export function organizationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.baseUrl}/#organization`,
        name: SITE.brandName,
        url: absoluteUrl("/es-co"),
        description: BRAND_DESCRIPTION,
        email: SITE.operationalEmail,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.baseUrl}/#website`,
        url: absoluteUrl("/es-co"),
        name: SITE.brandName,
        inLanguage: "es-CO",
        description: BRAND_DESCRIPTION,
        publisher: { "@id": `${SITE.baseUrl}/#organization` },
      },
    ],
  };
}

export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function sitemapPaths(): readonly string[] {
  return SITE.indexingEnabled ? PUBLIC_ROUTES : [];
}

export const SEO_STATE = {
  siteMode: SITE_MODE,
  indexingEnabled: SITE.indexingEnabled,
  canonicalConfigured: !SITE.baseUrl.endsWith(".invalid"),
} as const;
