"use client";

import { useEffect } from "react";
import type { LocaleCode } from "@/config/site";
import { htmlLang } from "@/lib/locale";

/** Keep <html lang> aligned with the active path locale. */
export function DocumentLang({ locale }: { locale: LocaleCode }) {
  useEffect(() => {
    document.documentElement.lang = htmlLang(locale);
  }, [locale]);
  return null;
}
