"use client";

import { SectionBeacon } from "@/components/marketing/v2/section-beacon";
import { useLocale, useMarketing } from "@/components/marketing/locale-context";
import { t } from "@/lib/locale";

export function BrandManifesto() {
  const locale = useLocale();
  const copy = useMarketing().manifesto;
  return (
    <section className="v2-manifesto" data-header-theme="on-light" aria-labelledby="manifesto-title">
      <SectionBeacon sectionId="manifesto" />
      <div className="v2-manifesto-image">
        <img
          src="/images/v2/moment-10.webp"
          alt={t(
            locale,
            "Persona compartiendo un momento cercano con su mascota",
            "Person sharing a close moment with their pet",
          )}
          width="1200"
          height="1800"
          loading="lazy"
        />
      </div>
      <div className="v2-shell v2-manifesto-copy">
        <p className="v2-eyebrow">{copy.eyebrow}</p>
        <h2 id="manifesto-title">{copy.title}</h2>
        <p>{copy.bodyOne}</p>
        <blockquote>{copy.statement}</blockquote>
        <p>{copy.bodyThree}</p>
        <strong>{copy.closing}</strong>
      </div>
    </section>
  );
}
