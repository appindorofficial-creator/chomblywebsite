"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/tracked-link";
import { SectionBeacon } from "@/components/marketing/v2/section-beacon";
import { useLocale, useMarketing } from "@/components/marketing/locale-context";
import { localizePath, t } from "@/lib/locale";
import { track } from "@/lib/analytics/client";

export function EcosystemStage() {
  const locale = useLocale();
  const copy = useMarketing();
  const modes = [
    {
      id: "professional",
      label: t(locale, "Profesional independiente", "Independent professional"),
      title: t(
        locale,
        "Tu conocimiento puede ayudar a más familias.",
        "Your knowledge can help more families.",
      ),
      body: t(
        locale,
        "Construye tu presencia dentro de Chombly y convierte tus espacios disponibles en nuevas oportunidades de atención.",
        "Build your presence inside Chombly and turn available time into new care opportunities.",
      ),
      cta: copy.ctas.professional,
      href: localizePath(locale, "/join", "audience=professional"),
      ctaId: "professional_interest",
      image: "/images/v2/moment-05.webp",
      alt: t(
        locale,
        "Profesional veterinaria acompañando a una mascota",
        "Veterinary professional with a pet",
      ),
    },
    {
      id: "clinic",
      label: t(locale, "Clínica", "Clinic"),
      title: t(
        locale,
        "Más familias pueden encontrarte. Y tus clientes pueden seguir cerca.",
        "More families can find you. And your clients can stay close.",
      ),
      body: t(
        locale,
        "Un nuevo punto de encuentro para acercarte a familias, recibir oportunidades y mantener tu presencia más allá de una sola visita.",
        "A new place to meet families, receive opportunities, and stay present beyond a single visit.",
      ),
      cta: copy.ctas.clinic,
      href: localizePath(locale, "/join", "audience=clinic"),
      ctaId: "clinic_interest",
      image: "/images/v2/moment-06.webp",
      alt: t(
        locale,
        "Equipo veterinario atendiendo a una mascota",
        "Veterinary team caring for a pet",
      ),
    },
    {
      id: "business",
      label: t(locale, "Negocio pet", "Pet business"),
      title: t(
        locale,
        "Lo que haces también merece estar donde están las familias.",
        "What you do also deserves to be where families are.",
      ),
      body: t(
        locale,
        "Acerca tus servicios a personas que ya están pensando en el bienestar de su mascota.",
        "Bring your services to people already thinking about their pet's wellbeing.",
      ),
      cta: copy.ctas.business,
      href: localizePath(locale, "/businesses"),
      ctaId: "business_interest",
      image: "/images/v2/moment-07.webp",
      alt: t(
        locale,
        "Servicio pet durante una rutina de cuidado",
        "Pet service during a care routine",
      ),
    },
  ] as const;

  const [selected, setSelected] = useState<(typeof modes)[number]["id"]>("professional");
  const mode = modes.find((item) => item.id === selected) ?? modes[0];

  return (
    <section className="v2-ecosystem" data-header-theme="on-dark" aria-labelledby="ecosystem-title">
      <SectionBeacon sectionId="ecosystem" />
      <div className="v2-shell">
        <p className="v2-eyebrow is-light">
          {t(
            locale,
            "PARA QUIENES TAMBIÉN VIVEN PARA CUIDARLOS",
            "FOR THOSE WHO ALSO LIVE TO CARE FOR THEM",
          )}
        </p>
        <div className="v2-ecosystem-intro">
          <h2 id="ecosystem-title">
            {t(locale, "Haz que tu experiencia ", "Let your experience ")}
            <span>{t(locale, "llegue a más familias.", "reach more families.")}</span>
          </h2>
          <p>
            {t(
              locale,
              "Chombly también está hecho para quienes dedican su trabajo a cuidar. Conecta con personas que están buscando ayuda y construye nuevas oportunidades alrededor de lo que sabes hacer mejor.",
              "Chombly is also built for people who dedicate their work to care. Connect with people looking for help and create new opportunities around what you do best.",
            )}
          </p>
        </div>
        <div className="v2-ecosystem-stage">
          <div
            className="v2-ecosystem-tabs"
            role="tablist"
            aria-label={t(locale, "Elige cómo quieres estar en Chombly", "Choose how you want to be on Chombly")}
          >
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
                  track("ecosystem_mode_selected", {
                    ecosystem_mode: item.id,
                    section_id: "ecosystem",
                  });
                }}
              >
                <span>0{index + 1}</span>
                {item.label}
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
              eventProperties={{
                cta_id: mode.ctaId,
                placement: "ecosystem",
                audience: mode.id === "business" ? "partner" : mode.id,
              }}
            >
              {mode.cta}
              <ArrowRight aria-hidden="true" size={18} />
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
