"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/tracked-link";
import { SectionBeacon } from "@/components/marketing/v2/section-beacon";
import { MARKETING_V2 } from "@/config/marketing-content-v2";
import { track } from "@/lib/analytics/client";

const modes = [
  {
    id: "professional",
    label: "Profesional independiente",
    title: "Tu conocimiento puede ayudar a más familias.",
    body: "Construye tu presencia dentro de Chombly y convierte tus espacios disponibles en nuevas oportunidades de atención.",
    cta: MARKETING_V2.ctas.professional,
    href: "/es-co/join?audience=professional",
    ctaId: "professional_interest",
    image: "/images/v2/moment-05.webp",
    alt: "Profesional veterinaria acompañando a una mascota",
  },
  {
    id: "clinic",
    label: "Clínica",
    title: "Más familias pueden encontrarte. Y tus clientes pueden seguir cerca.",
    body: "Un nuevo punto de encuentro para acercarte a familias, recibir oportunidades y mantener tu presencia más allá de una sola visita.",
    cta: MARKETING_V2.ctas.clinic,
    href: "/es-co/join?audience=clinic",
    ctaId: "clinic_interest",
    image: "/images/v2/moment-06.webp",
    alt: "Equipo veterinario atendiendo a una mascota",
  },
  {
    id: "business",
    label: "Negocio pet",
    title: "Lo que haces también merece estar donde están las familias.",
    body: "Acerca tus servicios a personas que ya están pensando en el bienestar de su mascota.",
    cta: MARKETING_V2.ctas.business,
    href: "/es-co/businesses",
    ctaId: "business_interest",
    image: "/images/v2/moment-07.webp",
    alt: "Servicio pet durante una rutina de cuidado",
  },
] as const;

export function EcosystemStage() {
  const [selected, setSelected] = useState<(typeof modes)[number]["id"]>("professional");
  const mode = modes.find((item) => item.id === selected) ?? modes[0];

  return (
    <section className="v2-ecosystem" data-header-theme="on-dark" aria-labelledby="ecosystem-title">
      <SectionBeacon sectionId="ecosystem" />
      <div className="v2-shell">
        <p className="v2-eyebrow is-light">PARA QUIENES TAMBIÉN VIVEN PARA CUIDARLOS</p>
        <div className="v2-ecosystem-intro">
          <h2 id="ecosystem-title">Haz que tu experiencia <span>llegue a más familias.</span></h2>
          <p>Chombly también está hecho para quienes dedican su trabajo a cuidar. Conecta con personas que están buscando ayuda y construye nuevas oportunidades alrededor de lo que sabes hacer mejor.</p>
        </div>
        <div className="v2-ecosystem-stage">
          <div className="v2-ecosystem-tabs" role="tablist" aria-label="Elige cómo quieres estar en Chombly">
            {modes.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`ecosystem-tab-${item.id}`}
                aria-controls={`ecosystem-panel-${item.id}`}
                aria-selected={selected === item.id}
                onClick={() => {
                  setSelected(item.id);
                  track("ecosystem_mode_selected", { ecosystem_mode: item.id, section_id: "ecosystem" });
                }}
              >
                <span>0{index + 1}</span>{item.label}
              </button>
            ))}
          </div>
          <div className="v2-ecosystem-visual">
            <img key={mode.id} src={mode.image} alt={mode.alt} width="1440" height="960" loading="lazy" />
          </div>
          <div
            className="v2-ecosystem-panel"
            role="tabpanel"
            id={`ecosystem-panel-${mode.id}`}
            aria-labelledby={`ecosystem-tab-${mode.id}`}
          >
            <h3>{mode.title}</h3>
            <p>{mode.body}</p>
            <TrackedLink
              className="v2-text-link is-light"
              href={mode.href}
              eventProperties={{ cta_id: mode.ctaId, placement: "ecosystem", audience: mode.id === "business" ? "partner" : mode.id }}
            >
              {mode.cta}<ArrowRight aria-hidden="true" size={18} />
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
