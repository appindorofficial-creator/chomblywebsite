import type { Metadata } from "next";
import {
  PUBLIC_ROUTES,
  SITE,
  SITE_MODE,
  SITEMAP_ROUTES,
  absoluteUrl,
  type LocaleCode,
} from "@/config/site";
import { htmlLang, openGraphLocale, stripLocale, localizePath } from "@/lib/locale";

export const BRAND_DESCRIPTION = {
  "es-co":
    "Chombly está construyendo una forma más clara de conectar el contexto y el cuidado de las mascotas.",
  "en-us":
    "Chombly is building a clearer way to connect pet context and care.",
} as const;

export function metadataFor(
  title: string,
  description: string,
  path: string,
  options: { noindex?: boolean; locale?: LocaleCode } | "es" | "en" = {},
): Metadata {
  const normalized =
    options === "en"
      ? { locale: "en-us" as const }
      : options === "es"
        ? { locale: "es-co" as const }
        : options;
  const locale = normalized.locale ?? "es-co";
  const shouldIndex = SITE.indexingEnabled && !normalized.noindex;
  const url = absoluteUrl(path);
  const bare = stripLocale(path);
  const esPath = localizePath("es-co", bare);
  const enPath = localizePath("en-us", bare);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "es-CO": absoluteUrl(esPath),
        "en-US": absoluteUrl(enPath),
        "x-default": absoluteUrl(esPath),
      },
    },
    robots: { index: shouldIndex, follow: shouldIndex },
    openGraph: {
      type: "website",
      locale: openGraphLocale(locale),
      siteName: SITE.brandName,
      title,
      description,
      url,
    },
    twitter: { card: "summary", title, description },
  };
}

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

export function organizationGraph(locale: LocaleCode = "es-co") {
  const home = localizePath(locale);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.baseUrl}/#organization`,
        name: SITE.brandName,
        url: absoluteUrl(home),
        description: BRAND_DESCRIPTION[locale],
        email: SITE.operationalEmail,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.baseUrl}/#website`,
        url: absoluteUrl(home),
        name: SITE.brandName,
        inLanguage: htmlLang(locale),
        description: BRAND_DESCRIPTION[locale],
        publisher: { "@id": `${SITE.baseUrl}/#organization` },
      },
    ],
  };
}

export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export type SitemapEntry = {
  path: string;
  loc: string;
  alternates: { lang: string; href: string }[];
};

/** Always lists public marketing routes so Search Console can ingest them. */
export function sitemapPaths(): readonly string[] {
  return SITEMAP_ROUTES;
}

export function sitemapEntries(): readonly SitemapEntry[] {
  return SITEMAP_ROUTES.map((path) => {
    const bare = stripLocale(path);
    const esPath = localizePath("es-co", bare);
    const enPath = localizePath("en-us", bare);
    return {
      path,
      loc: absoluteUrl(path),
      alternates: [
        { lang: "es-CO", href: absoluteUrl(esPath) },
        { lang: "en-US", href: absoluteUrl(enPath) },
        { lang: "x-default", href: absoluteUrl(esPath) },
      ],
    };
  });
}

export function buildSitemapXml(): string {
  const urls = sitemapEntries()
    .map((entry) => {
      const links = entry.alternates
        .map(
          (alt) =>
            `<xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.href}"/>`,
        )
        .join("");
      return `<url><loc>${entry.loc}</loc>${links}</url>`;
    })
    .join("");

  return (
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">' +
    urls +
    "</urlset>"
  );
}

export const SEO_STATE = {
  siteMode: SITE_MODE,
  indexingEnabled: SITE.indexingEnabled,
  canonicalConfigured: !SITE.baseUrl.endsWith(".invalid"),
  publicRouteCount: PUBLIC_ROUTES.length,
  sitemapRouteCount: SITEMAP_ROUTES.length,
} as const;
