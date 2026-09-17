"use client";

import { useLocale } from "@/components/marketing/locale-context";
import { seoPages } from "@/config/seo-pages";
import { t } from "@/lib/locale";

export function HomeFaq() {
  const locale = useLocale();
  const faqs = seoPages(locale).home.faqs ?? [];
  if (!faqs.length) return null;

  return (
    <section className="v2-home-faq" aria-labelledby="home-faq-title">
      <div className="v2-shell">
        <p className="eyebrow">
          {t(locale, "Preguntas frecuentes", "Frequently asked questions")}
        </p>
        <h2 id="home-faq-title">
          {t(
            locale,
            "Lo esencial, sin promesas de más.",
            "The essentials, without overpromising.",
          )}
        </h2>
        <div className="v2-home-faq-list">
          {faqs.map((faq) => (
            <details key={faq.question} className="v2-home-faq-item">
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
