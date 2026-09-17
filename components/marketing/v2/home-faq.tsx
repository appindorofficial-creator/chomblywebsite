"use client";

import { FaqSection } from "@/components/marketing/v2/faq-section";
import { useLocale } from "@/components/marketing/locale-context";
import { seoPages } from "@/config/seo-pages";
import { t } from "@/lib/locale";

export function HomeFaq() {
  const locale = useLocale();
  return (
    <FaqSection
      eyebrow={t(locale, "Preguntas frecuentes", "Frequently asked questions")}
      title={t(
        locale,
        "Lo esencial, sin promesas de más.",
        "The essentials, without overpromising.",
      )}
      faqs={seoPages(locale).home.faqs ?? []}
    />
  );
}
