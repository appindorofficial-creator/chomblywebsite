export type SiteMode = "PRELAUNCH" | "PILOT" | "LIVE";
export type LocaleCode = "es-co" | "en-us";

const configuredMode = process.env.NEXT_PUBLIC_CHOMBLY_SITE_MODE;

export const SITE_MODE: SiteMode =
  configuredMode === "PILOT" || configuredMode === "LIVE"
    ? configuredMode
    : "PRELAUNCH";

export const SITE = {
  brandName: "Chombly",
  market: "Colombia",
  marketCode: "CO",
  currentLocale: "es-co" as const,
  supportedLocales: ["es-co", "en-us"] as const,
  preparedLocales: ["es-co", "en-us"] as const,
  baseUrl:
    process.env.NEXT_PUBLIC_CHOMBLY_BASE_URL?.replace(/\/$/, "") ||
    "https://chombly.invalid",
  /** Product welcome / app entry (not this marketing site). */
  appWelcomeUrl:
    process.env.NEXT_PUBLIC_CHOMBLY_APP_WELCOME_URL?.replace(/\/$/, "") ||
    "https://chombly-dqdzd0h4escvhyfe.westus3-01.azurewebsites.net/Welcome",
  operationalEmail:
    process.env.NEXT_PUBLIC_CHOMBLY_CONTACT_EMAIL || "Chomblypet@gmail.com",
  associatedOrganization:
    process.env.NEXT_PUBLIC_CHOMBLY_ASSOCIATED_ORG || "Home Indor Tech",
  indexingEnabled:
    SITE_MODE === "LIVE" &&
    process.env.NEXT_PUBLIC_CHOMBLY_INDEXING_ENABLED === "true",
} as const;

export const FEATURE_FLAGS = {
  publicWebsite: true,
  routeTransitions: true,
  brandIntro: true,
  mascotFooterEasterEgg: true,
  businessRoute: true,
  experimentLandings: true,
  leadCapture: true,
  productBooking:
    SITE_MODE !== "PRELAUNCH" &&
    process.env.CHOMBLY_LEGACY_PRODUCT_ENABLED === "true",
  payments:
    SITE_MODE === "LIVE" && process.env.CHOMBLY_PAYMENTS_ENABLED === "true",
  posthog:
    Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY) &&
    Boolean(process.env.NEXT_PUBLIC_POSTHOG_HOST),
  remoteCrm: process.env.CHOMBLY_CRM_ADAPTER === "webhook",
} as const;

export function legacyProductEnabled(): boolean {
  return (
    ((SITE_MODE === "PILOT" || SITE_MODE === "LIVE") &&
      process.env.CHOMBLY_LEGACY_PRODUCT_ENABLED === "true") ||
    (SITE.baseUrl.endsWith(".invalid") &&
      process.env.CHOMBLY_TEST_ONLY_ENABLE_LEGACY_PRODUCT === "true")
  );
}

export function paymentsEnabled(): boolean {
  return (
    (SITE_MODE === "LIVE" && process.env.CHOMBLY_PAYMENTS_ENABLED === "true") ||
    (SITE.baseUrl.endsWith(".invalid") &&
      process.env.CHOMBLY_TEST_ONLY_ENABLE_PAYMENTS === "true")
  );
}

export const STAGE_LABEL = {
  PRELAUNCH: {
    "es-co": "En construcción y validación",
    "en-us": "Under construction and validation",
  },
  PILOT: {
    "es-co": "Piloto controlado",
    "en-us": "Controlled pilot",
  },
  LIVE: {
    "es-co": "Disponible",
    "en-us": "Available",
  },
} satisfies Record<SiteMode, Record<LocaleCode, string>>;

const ROUTE_SUFFIXES = [
  "",
  "/pet-owners",
  "/professionals",
  "/clinics",
  "/businesses",
  "/partners",
  "/about",
  "/join",
  "/contact",
  "/privacy",
  "/terms",
] as const;

/** Public marketing URLs for the sitemap (forms/experiments excluded). */
const SITEMAP_SUFFIXES = [
  "",
  "/pet-owners",
  "/professionals",
  "/clinics",
  "/businesses",
  "/partners",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
] as const;

export const PUBLIC_ROUTES = SITE.supportedLocales.flatMap((locale) =>
  ROUTE_SUFFIXES.map((suffix) => `/${locale}${suffix}`),
);

export const SITEMAP_ROUTES = SITE.supportedLocales.flatMap((locale) =>
  SITEMAP_SUFFIXES.map((suffix) => `/${locale}${suffix}`),
);

export const EXPERIMENT_ROUTES = SITE.supportedLocales.flatMap((locale) =>
  ["continuity", "care-navigator", "pet-passport"].map(
    (id) => `/${locale}/e/${id}`,
  ),
);

export function absoluteUrl(path = "/es-co"): string {
  return new URL(path, `${SITE.baseUrl}/`).href;
}
