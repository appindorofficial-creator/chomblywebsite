"use client";

import { ArrowUpRight } from "lucide-react";
import { TrackedLink } from "@/components/tracked-link";
import { PUBLIC_LEADERSHIP } from "@/config/leadership";
import { useLocale } from "@/components/marketing/locale-context";
import { localizePath, t } from "@/lib/locale";

export default function AboutPage() {
  const locale = useLocale();
  return (
    <main id="main-content" className="v2-about">
      <section className="v2-about-hero">
        <div className="v2-shell">
          <p className="v2-eyebrow">{t(locale, "Por qué existe Chombly", "Why Chombly exists")}</p>
          <h1>
            {t(locale, "Nacimos por una idea simple: ", "We started from a simple idea: ")}
            <span>
              {t(locale, "ellos merecen que cuidar sea más fácil.", "they deserve care that feels easier.")}
            </span>
          </h1>
          <p>
            {t(
              locale,
              "Una mascota no vive su cuidado en categorías. Vive momentos. Chombly imagina una experiencia que los conecta con más claridad, humanidad y mejores opciones.",
              "A pet does not live care in categories. They live moments. Chombly imagines an experience that connects them with more clarity, humanity, and better options.",
            )}
          </p>
        </div>
      </section>
      <section className="v2-about-manifesto" data-header-theme="on-dark">
        <div className="v2-shell v2-about-manifesto-grid">
          <div>
            <p className="v2-eyebrow">{t(locale, "Nuestro punto de partida", "Our starting point")}</p>
            <h2>{t(locale, "Para ellos, tú eres su mundo.", "To them, you are their world.")}</h2>
          </div>
          <div>
            <p>
              {t(
                locale,
                "Te esperan. Te buscan. Celebran cuando llegas. Confían en ti sin preguntar cuánto sabes, cuánto tienes o de dónde vienes.",
                "They wait for you. They look for you. They celebrate when you arrive. They trust you without asking how much you know, how much you have, or where you come from.",
              )}
            </p>
            <p>
              {t(
                locale,
                "Chombly nace de una idea sencilla: cuidar mejor no debería depender de saberlo todo, conocer a la persona correcta o resolver cada duda por tu cuenta.",
                "Chombly comes from a simple idea: better care should not depend on knowing everything, knowing the right person, or solving every question alone.",
              )}
            </p>
            <blockquote>
              {t(locale, "Aquí no importa quién eres. ", "Here it does not matter who you are. ")}
              <span>{t(locale, "Importa a quién estás cuidando.", "It matters who you are caring for.")}</span>
            </blockquote>
          </div>
        </div>
      </section>
      <section className="v2-about-vision">
        <div className="v2-shell v2-about-vision-grid">
          <div>
            <p className="v2-eyebrow">{t(locale, "La visión", "The vision")}</p>
            <h2>{t(locale, "Un ecosistema de cuidado más cerca.", "A care ecosystem, closer.")}</h2>
          </div>
          <div className="v2-about-vision-copy">
            <p>
              {t(
                locale,
                "Queremos acercar orientación, profesionales y mejores opciones a las personas que comparten su vida con una mascota.",
                "We want to bring guidance, professionals, and better options to people who share their lives with a pet.",
              )}
            </p>
            <p>
              {t(
                locale,
                "Empezamos en Colombia con la ambición de hacer que cada duda tenga más contexto, cada búsqueda tenga mejores caminos y cada historia pueda continuar.",
                "We start in Colombia with the ambition to give every question more context, every search better paths, and every story a way to continue.",
              )}
            </p>
            <strong>{t(locale, "Porque para nosotros también son familia.", "Because for us, they are family too.")}</strong>
          </div>
        </div>
      </section>
      {PUBLIC_LEADERSHIP.length > 0 ? (
        <section className="v2-about-team">
          <div className="v2-shell">
            <p className="v2-eyebrow">{t(locale, "Personas detrás de Chombly", "People behind Chombly")}</p>
            <div className="v2-about-team-grid">
              {PUBLIC_LEADERSHIP.map((person) => (
                <article key={person.name}>
                  <h3>{person.name}</h3>
                  <p>{person.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <section className="v2-about-close" data-header-theme="on-dark">
        <div className="v2-shell">
          <p className="v2-eyebrow">{t(locale, "El siguiente momento", "The next moment")}</p>
          <h2>{t(locale, "Construyamos una forma más humana de cuidar.", "Let's build a more human way to care.")}</h2>
          <TrackedLink
            className="v2-button v2-button-lime"
            href={localizePath(locale, "/contact")}
            eventProperties={{ cta_id: "about_contact", placement: "about_close" }}
          >
            {t(locale, "Hablemos", "Let's talk")} <ArrowUpRight aria-hidden="true" size={18} />
          </TrackedLink>
        </div>
      </section>
    </main>
  );
}
