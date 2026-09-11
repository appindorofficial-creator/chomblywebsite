import { SectionBeacon } from "@/components/marketing/v2/section-beacon";

const moments = [
  ["PREGUNTA", "Cuando tengas una duda.", "Orientación para preguntas cotidianas y próximos pasos, con límites claros y conexión con ayuda profesional cuando corresponda."],
  ["RECUERDA", "Cuando no quieras que algo se te pase.", "Información, recordatorios y momentos importantes de su cuidado."],
  ["ENCUENTRA", "Cuando necesites a alguien.", "Profesionales, clínicas y servicios dentro del universo Chombly."],
  ["CONTINÚA", "Cuando la vida siga.", "Un lugar que pueda acompañar la historia de tu mascota, no solamente un momento."],
] as const;

export function EverydayValue() {
  return (
    <section className="v2-everyday" data-header-theme="on-light" aria-labelledby="everyday-title">
      <SectionBeacon sectionId="everyday_value" />
      <div className="v2-shell">
        <div className="v2-everyday-heading">
          <p className="v2-eyebrow">ÚTIL DESDE EL PRINCIPIO</p>
          <h2 id="everyday-title">Empieza gratis. <span>Quédate porque te sirve.</span></h2>
          <p>Chombly está pensado para ser útil incluso antes de que necesites pagar por algo.</p>
        </div>
        <ol className="v2-value-rail">
          {moments.map(([label, title, body], index) => (
            <li key={label}>
              <div className="v2-value-index"><span>0{index + 1}</span><em>{label}</em></div>
              <div><h3>{title}</h3><p>{body}</p></div>
            </li>
          ))}
        </ol>
        <p className="v2-value-closing">Y cuando necesites más, Chombly podrá sumar nuevas formas de acceder a profesionales, servicios y beneficios.</p>
      </div>
    </section>
  );
}
