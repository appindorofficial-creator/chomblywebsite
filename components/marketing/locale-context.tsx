"use client";

import { createContext, useContext } from "react";
import type { LocaleCode } from "@/config/site";
import { DEFAULT_LOCALE } from "@/lib/locale";
import { marketingV2 } from "@/config/marketing-content-v2";

const LocaleContext = createContext<LocaleCode>(DEFAULT_LOCALE);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: LocaleCode;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleCode {
  return useContext(LocaleContext);
}

export function useMarketing() {
  return marketingV2(useLocale());
}
