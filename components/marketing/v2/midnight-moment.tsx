"use client";

import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/tracked-link";
import { SectionBeacon } from "@/components/marketing/v2/section-beacon";
import { useLocale, useMarketing } from "@/components/marketing/locale-context";
import { SITE } from "@/config/site";
import { t } from "@/lib/locale";

export function MidnightMoment() {
  const locale = useLocale();
  const copy = useMarketing();
  const path = [
    t(locale, "Pregunta", "Ask"),
    t(locale, "Orientación", "Guidance"),
    t(locale, "Próximo paso", "Next step"),
    t(locale, "Ayuda", "Help"),
  ];

  return (
    <section className="v2-midnight" data-header-theme="on-dark" aria-labelledby="midnight-title">
      <SectionBeacon sectionId="midnight_moment" />
      <div className="v2-midnight-photo" aria-hidden="true">
        <img src="/images/v2/moment-08.webp" alt="" width="1200" height="1800" loading="lazy" />
      </div>
      <div className="v2-shell v2-midnight-content">
        <time>11:47 p. m.</time>
        <div className="v2-midnight-beats">
          <h2 id="midnight-title">
            {t(locale, "Algo no te cuadra.", "Something feels off.")}
          </h2>
          <p>
            {t(
              locale,
              "Tu mascota no está como siempre. Buscas. Preguntas. Comparas. Y lo único que quieres es saber qué hacer.",
              "Your pet is not themselves. You search. You ask. You compare. All you want is to know what to do.",
            )}
          </p>
          <strong>{t(locale, "No necesitas adivinar.", "You do not need to guess.")}</strong>
          <p>
            {t(
              locale,
              "Empieza por orientarte, organiza lo importante y encuentra ayuda profesional cuando haga falta.",
              "Start with guidance, organize what matters, and find professional help when you need it.",
            )}
          </p>
        </div>
        <ol
          className="v2-midnight-path"
          aria-label={t(
            locale,
            "Camino desde una pregunta hasta encontrar ayuda",
            "Path from a question to finding help",
          )}
        >
          {path.map((item, index) => (
            <li key={item}>
              <span>{index + 1}</span>
              {item}
            </li>
          ))}
        </ol>
        <TrackedLink
          className="v2-button v2-button-lime"
          href={SITE.appWelcomeUrl}
          target="_blank"
          rel="noopener noreferrer"
          eventProperties={{
            cta_id: "midnight_open_app",
            placement: "midnight",
            audience: "owner",
          }}
        >
          {copy.ctas.ownerMoment}
          <ArrowRight aria-hidden="true" size={18} />
        </TrackedLink>
      </div>
    </section>
  );
}
