import type { LocaleCode } from "@/config/site";
import { t } from "@/lib/locale";

export type ExperimentId = "continuity" | "care-navigator" | "pet-passport";

export type ExperimentDefinition = {
  id: ExperimentId;
  thesisId: string;
  title: string;
  audience: "owner";
  priority: "A" | "B" | "C";
  source: string;
  cta: string;
  qualifiedSignal: string;
  downstream: string;
  disclosureTitle: string;
  disclosureBody: string;
  signalLabel: string;
  nextLabel: string;
  hypothesisLabel: string;
  variants: readonly { id: "control" | "challenger"; headline: string; body: string }[];
};

export function experimentsFor(locale: LocaleCode): Record<ExperimentId, ExperimentDefinition> {
  return {
    continuity: {
      id: "continuity",
      thesisId: "thesis.a.continuity",
      title: t(locale, "Continuidad de cuidado", "Care continuity"),
      audience: "owner",
      priority: "A",
      source: "Phase A + Phase B decision pack",
      cta: t(locale, "Compartir mi perspectiva", "Share my perspective"),
      qualifiedSignal: t(
        locale,
        "Consentimiento + momento de cuidado seleccionado",
        "Consent + selected care moment",
      ),
      downstream: t(
        locale,
        "Entrevista de descubrimiento sobre continuidad",
        "Discovery interview about continuity",
      ),
      disclosureTitle: t(
        locale,
        "Esto es una prueba de concepto.",
        "This is a concept test.",
      ),
      disclosureBody: t(
        locale,
        "No es un producto clínico, un diagnóstico ni una capacidad disponible.",
        "It is not a clinical product, a diagnosis, or an available capability.",
      ),
      signalLabel: t(locale, "Señal calificada", "Qualified signal"),
      nextLabel: t(locale, "Siguiente paso", "Next step"),
      hypothesisLabel: t(locale, "Hipótesis", "Hypothesis"),
      variants: [
        {
          id: "control",
          headline: t(
            locale,
            "El cuidado cambia. El contexto no debería perderse.",
            "Care changes. Context should not get lost.",
          ),
          body: t(
            locale,
            "Ayúdanos a entender cuándo la continuidad se vuelve más valiosa para tu familia.",
            "Help us understand when continuity becomes more valuable for your family.",
          ),
        },
        {
          id: "challenger",
          headline: t(
            locale,
            "Muchos momentos. Una historia de cuidado más clara.",
            "Many moments. One clearer care story.",
          ),
          body: t(
            locale,
            "Estamos validando cómo mantener información útil cuando cambian las personas, los lugares o las etapas.",
            "We are validating how to keep useful information when people, places, or stages change.",
          ),
        },
      ],
    },
    "care-navigator": {
      id: "care-navigator",
      thesisId: "thesis.b.care-navigator",
      title: t(locale, "Care Navigator", "Care Navigator"),
      audience: "owner",
      priority: "B",
      source: "Phase A + Phase B decision pack",
      cta: t(locale, "Participar en una prueba", "Join a test"),
      qualifiedSignal: t(
        locale,
        "Consentimiento + detonante de orientación seleccionado",
        "Consent + selected guidance trigger",
      ),
      downstream: t(
        locale,
        "Sesión guiada de prueba del concepto",
        "Guided concept test session",
      ),
      disclosureTitle: t(
        locale,
        "Esto es una prueba de concepto.",
        "This is a concept test.",
      ),
      disclosureBody: t(
        locale,
        "No es un producto clínico, un diagnóstico ni una capacidad disponible.",
        "It is not a clinical product, a diagnosis, or an available capability.",
      ),
      signalLabel: t(locale, "Señal calificada", "Qualified signal"),
      nextLabel: t(locale, "Siguiente paso", "Next step"),
      hypothesisLabel: t(locale, "Hipótesis", "Hypothesis"),
      variants: [
        {
          id: "control",
          headline: t(
            locale,
            "Algo pasa con tu mascota. ¿Qué haces?",
            "Something happens with your pet. What do you do?",
          ),
          body: t(
            locale,
            "Prueba una hipótesis de guía que ordena el contexto y ayuda a aclarar el siguiente paso.",
            "Try a guidance hypothesis that organizes context and helps clarify the next step.",
          ),
        },
        {
          id: "challenger",
          headline: t(
            locale,
            "Menos vueltas. Un siguiente paso más claro.",
            "Fewer loops. A clearer next step.",
          ),
          body: t(
            locale,
            "Queremos aprender cuándo una guía de cuidado puede reducir la incertidumbre sin reemplazar al veterinario.",
            "We want to learn when care guidance can reduce uncertainty without replacing the veterinarian.",
          ),
        },
      ],
    },
    "pet-passport": {
      id: "pet-passport",
      thesisId: "thesis.c.pet-passport",
      title: t(locale, "Pet Passport", "Pet Passport"),
      audience: "owner",
      priority: "C",
      source: "Phase A + Phase B decision pack",
      cta: t(locale, "Compartir mi perspectiva", "Share my perspective"),
      qualifiedSignal: t(
        locale,
        "Consentimiento + situación de uso seleccionada",
        "Consent + selected use situation",
      ),
      downstream: t(
        locale,
        "Entrevista sobre documentos y portabilidad del contexto",
        "Interview about documents and context portability",
      ),
      disclosureTitle: t(
        locale,
        "Esto es una prueba de concepto.",
        "This is a concept test.",
      ),
      disclosureBody: t(
        locale,
        "No es un producto clínico, un diagnóstico ni una capacidad disponible.",
        "It is not a clinical product, a diagnosis, or an available capability.",
      ),
      signalLabel: t(locale, "Señal calificada", "Qualified signal"),
      nextLabel: t(locale, "Siguiente paso", "Next step"),
      hypothesisLabel: t(locale, "Hipótesis", "Hypothesis"),
      variants: [
        {
          id: "control",
          headline: t(
            locale,
            "La información importante de tu mascota, más fácil de llevar.",
            "Your pet's important information, easier to carry.",
          ),
          body: t(
            locale,
            "Ayúdanos a validar cuándo reunir documentos y contexto realmente simplifica el cuidado.",
            "Help us validate when gathering documents and context truly simplifies care.",
          ),
        },
        {
          id: "challenger",
          headline: t(
            locale,
            "Su contexto también viaja contigo.",
            "Their context travels with you too.",
          ),
          body: t(
            locale,
            "Estamos explorando una forma simple de preparar la información útil para cambios, viajes y nuevas etapas.",
            "We are exploring a simple way to prepare useful information for changes, travel, and new stages.",
          ),
        },
      ],
    },
  };
}

/** Spanish defaults for analytics IDs and backward-compatible imports. */
export const EXPERIMENTS = experimentsFor("es-co");
