"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/marketing/locale-context";
import { otherLocale, swapLocalePath, toggleLabel, t } from "@/lib/locale";

export function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname() || "/";
  const next = otherLocale(locale);
  const href = swapLocalePath(pathname, next);

  return (
    <Link
      className="v2-lang-toggle"
      href={href}
      hrefLang={next === "en-us" ? "en-US" : "es-CO"}
      aria-label={t(locale, "Cambiar a inglés", "Switch to Spanish")}
    >
      {toggleLabel(locale)}
    </Link>
  );
}
