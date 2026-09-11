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
  supportedLocales: ["es-co"] as const,
  preparedLocales: ["es-co", "en-us"] as const,
  baseUrl:
    process.env.NEXT_PUBLIC_CHOMBLY_BASE_URL?.replace(/\/$/, "") ||
    "https://chombly.invalid",
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
  PRELAUNCH: "En construcción y validación",
  PILOT: "Piloto controlado",
  LIVE: "Disponible",
} satisfies Record<SiteMode, string>;

export const PUBLIC_ROUTES = [
  "/es-co",
  "/es-co/pet-owners",
  "/es-co/professionals",
  "/es-co/clinics",
  "/es-co/businesses",
  "/es-co/partners",
  "/es-co/about",
  "/es-co/join",
  "/es-co/contact",
  "/es-co/privacy",
  "/es-co/terms",
] as const;

export const EXPERIMENT_ROUTES = [
  "/es-co/e/continuity",
  "/es-co/e/care-navigator",
  "/es-co/e/pet-passport",
] as const;

export function absoluteUrl(path = "/es-co"): string {
  return new URL(path, `${SITE.baseUrl}/`).href;
}
