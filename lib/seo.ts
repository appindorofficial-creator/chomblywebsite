import type { Metadata } from "next";
import {
  PUBLIC_ROUTES,
  SITE,
  SITE_MODE,
  SITEMAP_ROUTES,
  absoluteUrl,
  type LocaleCode,
} from "@/config/site";
import {
  seoPages,
  type SeoFaq,
  type SeoPageDefinition,
  type SeoPageKey,
} from "@/config/seo-pages";
import { htmlLang, openGraphLocale, stripLocale, localizePath, otherLocale } from "@/lib/locale";

export const BRAND_DESCRIPTION = {
  "es-co":
    "Chombly es una app para el cuidado de mascotas en Colombia: orientación, ayuda profesional y continuidad de lo importante.",
  "en-us":
    "Chombly is a pet care app in Colombia: guidance, professional help, and continuity for what matters.",
} as const;

export const DEFAULT_OG_IMAGE = {
  url: "/brand/og-default.jpg",
  width: 1280,
  height: 720,
  alt: "Chombly — cuidado de mascotas en Colombia",
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
  const alternateLocale = openGraphLocale(otherLocale(locale));

  return {
    title,
    description,
    keywords: [
      "Chombly",
      locale === "en-us" ? "pet care Colombia" : "cuidado de mascotas Colombia",
      locale === "en-us" ? "pet app" : "app para mascotas",
      locale === "en-us" ? "veterinary professionals" : "profesionales veterinarios",
    ],
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
      alternateLocale: [alternateLocale],
      siteName: SITE.brandName,
      title,
      description,
      url,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

export function metadataForSeoPage(
  locale: LocaleCode,
  key: SeoPageKey,
): Metadata {
  const page = seoPages(locale)[key];
  return metadataFor(page.title, page.description, page.path, {
    locale,
    noindex: page.noindex,
  });
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

function breadcrumbList(locale: LocaleCode, page: SeoPageDefinition) {
  const home = seoPages(locale).home;
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: home.breadcrumb,
      item: absoluteUrl(home.path),
    },
  ];
  if (page.path !== home.path) {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: page.breadcrumb,
      item: absoluteUrl(page.path),
    });
  }
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(page.path)}#breadcrumb`,
    itemListElement: items,
  };
}

function faqPage(path: string, faqs: readonly SeoFaq[]) {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function marketingPageGraph(locale: LocaleCode, key: SeoPageKey) {
  const page = seoPages(locale)[key];
  const url = absoluteUrl(page.path);
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      inLanguage: htmlLang(locale),
      isPartOf: { "@id": `${SITE.baseUrl}/#website` },
      about: { "@id": `${SITE.baseUrl}/#organization` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    breadcrumbList(locale, page),
  ];
  if (page.faqs?.length) {
    graph.push(faqPage(page.path, page.faqs));
  }
  return {
    "@context": "https://schema.org",
    "@graph": graph,
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
        logo: absoluteUrl("/brand/v2/chombly-mark.png"),
        areaServed: {
          "@type": "Country",
          name: "Colombia",
        },
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
