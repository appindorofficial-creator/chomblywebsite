import type { LocaleCode } from "@/config/site";
import { SITE } from "@/config/site";

export const DEFAULT_LOCALE: LocaleCode = "es-co";

export function isLocale(value: string): value is LocaleCode {
  return (SITE.supportedLocales as readonly string[]).includes(value);
}

export function otherLocale(locale: LocaleCode): LocaleCode {
  return locale === "es-co" ? "en-us" : "es-co";
}

export function toggleLabel(locale: LocaleCode): string {
  return locale === "es-co" ? "EN" : "ES";
}

export function htmlLang(locale: LocaleCode): string {
  return locale === "en-us" ? "en-US" : "es-CO";
}

export function openGraphLocale(locale: LocaleCode): string {
  return locale === "en-us" ? "en_US" : "es_CO";
}

export function t(locale: LocaleCode, spanish: string, english: string): string {
  return locale === "en-us" ? english : spanish;
}

/** Strip leading locale segment from a pathname. */
export function stripLocale(pathname: string): string {
  const cleaned = pathname.replace(/\/+$/, "") || "/";
  for (const locale of SITE.supportedLocales) {
    if (cleaned === `/${locale}`) return "/";
    if (cleaned.startsWith(`/${locale}/`)) {
      return cleaned.slice(locale.length + 1) || "/";
    }
  }
  return cleaned;
}

/** Prefix a path (and optional query) with the locale. */
export function localizePath(
  locale: LocaleCode,
  path = "/",
  query?: string,
): string {
  const bare = path.startsWith("/") ? path : `/${path}`;
  const withoutLocale = stripLocale(bare);
  const localized =
    withoutLocale === "/" ? `/${locale}` : `/${locale}${withoutLocale}`;
  if (!query) return localized;
  const q = query.startsWith("?") ? query : `?${query}`;
  return `${localized}${q}`;
}

/** Swap locale prefix while preserving the rest of the URL. */
export function swapLocalePath(pathname: string, nextLocale: LocaleCode): string {
  const [pathPart, queryPart] = pathname.split("?");
  return localizePath(nextLocale, stripLocale(pathPart || "/"), queryPart);
}

export function publicRoutesForLocale(locale: LocaleCode): string[] {
  const suffixes = [
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
  ];
  return suffixes.map((suffix) => `/${locale}${suffix}`);
}

export function experimentRoutesForLocale(locale: LocaleCode): string[] {
  return ["continuity", "care-navigator", "pet-passport"].map(
    (id) => `/${locale}/e/${id}`,
  );
}
