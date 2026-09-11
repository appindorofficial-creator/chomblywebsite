import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/tracked-link";
import { SectionBeacon } from "@/components/marketing/v2/section-beacon";
import { MARKETING_V2 } from "@/config/marketing-content-v2";

export function MidnightMoment() {
  return (
    <section className="v2-midnight" data-header-theme="on-dark" aria-labelledby="midnight-title">
      <SectionBeacon sectionId="midnight_moment" />
      <div className="v2-midnight-photo" aria-hidden="true">
        <img src="/images/v2/moment-08.webp" alt="" width="1200" height="1800" loading="lazy" />
      </div>
      <div className="v2-shell v2-midnight-content">
        <time>11:47 p. m.</time>
        <div className="v2-midnight-beats">
          <h2 id="midnight-title">Algo no te cuadra.</h2>
          <p>Tu mascota no está como siempre. Buscas. Preguntas. Comparas. Y lo único que quieres es saber qué hacer.</p>
          <strong>No necesitas adivinar.</strong>
          <p>Empieza por orientarte, organiza lo importante y encuentra ayuda profesional cuando haga falta.</p>
        </div>
        <ol className="v2-midnight-path" aria-label="Camino desde una pregunta hasta encontrar ayuda">
          {['Pregunta', 'Orientación', 'Próximo paso', 'Ayuda'].map((item, index) => <li key={item}><span>{index + 1}</span>{item}</li>)}
        </ol>
        <TrackedLink
          className="v2-button v2-button-lime"
          href="/es-co/join?audience=owner&source=midnight"
          eventProperties={{ cta_id: "midnight_owner_interest", placement: "midnight", audience: "owner" }}
        >
          {MARKETING_V2.ctas.ownerMoment}<ArrowRight aria-hidden="true" size={18} />
        </TrackedLink>
      </div>
    </section>
  );
}
