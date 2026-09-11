import { ArrowRight, CircleHelp, MapPin, Stethoscope } from "lucide-react";
import { SectionBeacon } from "@/components/marketing/v2/section-beacon";

const context = ["Edad", "Especie", "Momento", "Historial", "Señales"] as const;
const network = [
  ["Profesional", "pro"],
  ["Clínica", "clinic"],
  ["Servicio pet", "business"],
  ["Independiente", "independent"],
] as const;
const timeline = ["Hoy", "Consulta", "Seguimiento", "Recordatorio", "Próximo momento"] as const;

export function CareTriad() {
  return (
    <div className="v2-care-triad">
      <section className="v2-care-scene v2-clarify" data-header-theme="on-light" aria-labelledby="clarify-title">
        <SectionBeacon sectionId="clarify" />
        <div className="v2-shell v2-care-scene-grid">
          <div className="v2-care-copy">
            <p className="v2-eyebrow">CUANDO NO SABES QUÉ HACER</p>
            <h2 id="clarify-title">No tienes que saberlo todo <span>para empezar por el lugar correcto.</span></h2>
            <p>Haz una pregunta, añade el contexto de tu mascota y recibe una orientación clara sobre qué podrías hacer después.</p>
            <p className="v2-supporting">Si hace falta atención profesional, Chombly te ayuda a pasar de la duda a buscar ayuda.</p>
            <small>Orientación general. No reemplaza un diagnóstico ni la atención veterinaria.</small>
          </div>
          <div className="v2-orientation-stage" aria-label="Ejemplo visual de una duda que se organiza con contexto">
            <CircleHelp aria-hidden="true" />
            <blockquote>“¿Esto que está haciendo es normal?”</blockquote>
            <div className="v2-context-orbit">
              {context.map((item, index) => <span key={item} style={{ "--orbit-index": index } as React.CSSProperties}>{item}</span>)}
            </div>
            <div className="v2-orientation-result"><span>Orientación</span><ArrowRight aria-hidden="true" /><strong>Próximo paso</strong></div>
          </div>
        </div>
      </section>

      <section className="v2-care-scene v2-find" data-header-theme="on-dark" aria-labelledby="find-title">
        <SectionBeacon sectionId="find_help" />
        <div className="v2-shell v2-care-scene-grid is-reversed">
          <div className="v2-network-stage" aria-label="Red de profesionales, clínicas y servicios alrededor de una familia">
            <div className="v2-network-center">
              <img src="/images/v2/moment-01.webp" alt="Familia compartiendo con sus mascotas" width="800" height="1200" loading="lazy" />
              <span>Tú + tu mascota</span>
            </div>
            {network.map(([item, kind], index) => (
              <div className={`v2-network-node is-${kind}`} key={item} style={{ "--node-index": index } as React.CSSProperties}>
                {kind === "clinic" ? <Stethoscope aria-hidden="true" /> : <MapPin aria-hidden="true" />}{item}
              </div>
            ))}
          </div>
          <div className="v2-care-copy">
            <p className="v2-eyebrow is-light">CUANDO ES MOMENTO DE ACTUAR</p>
            <h2 id="find-title">Cuando necesitas a alguien, <span>encontrarlo no debería ser otro problema.</span></h2>
            <p>Descubre profesionales, clínicas y servicios pet según lo que necesitas y da el siguiente paso desde un mismo lugar.</p>
            <strong className="v2-scene-tagline">Ayuda relevante, cuando la necesites.</strong>
          </div>
        </div>
      </section>

      <section className="v2-care-scene v2-continue" data-header-theme="on-light" aria-labelledby="continue-title">
        <SectionBeacon sectionId="continue_care" />
        <div className="v2-shell">
          <div className="v2-care-copy v2-continue-copy">
            <p className="v2-eyebrow">CUANDO EL DÍA SIGUE</p>
            <h2 id="continue-title">La consulta termina. <span>El cuidado no.</span></h2>
            <p>Guarda lo importante de su historia, recuerda lo que viene y evita empezar de cero cada vez.</p>
          </div>
          <ol className="v2-care-timeline">
            {timeline.map((item, index) => <li key={item}><span>0{index + 1}</span><strong>{item}</strong></li>)}
          </ol>
        </div>
      </section>
    </div>
  );
}
