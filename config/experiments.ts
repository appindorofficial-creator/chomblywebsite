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
  variants: readonly { id: "control" | "challenger"; headline: string; body: string }[];
};

export const EXPERIMENTS = {
  continuity: {
    id: "continuity",
    thesisId: "thesis.a.continuity",
    title: "Continuidad de cuidado",
    audience: "owner",
    priority: "A",
    source: "Phase A + Phase B decision pack",
    cta: "Compartir mi perspectiva",
    qualifiedSignal: "Consentimiento + momento de cuidado seleccionado",
    downstream: "Entrevista de descubrimiento sobre continuidad",
    variants: [
      {
        id: "control",
        headline: "El cuidado cambia. El contexto no debería perderse.",
        body: "Ayúdanos a entender cuándo la continuidad se vuelve más valiosa para tu familia.",
      },
      {
        id: "challenger",
        headline: "Muchos momentos. Una historia de cuidado más clara.",
        body: "Estamos validando cómo mantener información útil cuando cambian las personas, los lugares o las etapas.",
      },
    ],
  },
  "care-navigator": {
    id: "care-navigator",
    thesisId: "thesis.b.care-navigator",
    title: "Care Navigator",
    audience: "owner",
    priority: "B",
    source: "Phase A + Phase B decision pack",
    cta: "Participar en una prueba",
    qualifiedSignal: "Consentimiento + detonante de orientación seleccionado",
    downstream: "Sesión guiada de prueba del concepto",
    variants: [
      {
        id: "control",
        headline: "Algo pasa con tu mascota. ¿Qué haces?",
        body: "Prueba una hipótesis de guía que ordena el contexto y ayuda a aclarar el siguiente paso.",
      },
      {
        id: "challenger",
        headline: "Menos vueltas. Un siguiente paso más claro.",
        body: "Queremos aprender cuándo una guía de cuidado puede reducir la incertidumbre sin reemplazar al veterinario.",
      },
    ],
  },
  "pet-passport": {
    id: "pet-passport",
    thesisId: "thesis.c.pet-passport",
    title: "Pet Passport",
    audience: "owner",
    priority: "C",
    source: "Phase A + Phase B decision pack",
    cta: "Compartir mi perspectiva",
    qualifiedSignal: "Consentimiento + situación de uso seleccionada",
    downstream: "Entrevista sobre documentos y portabilidad del contexto",
    variants: [
      {
        id: "control",
        headline: "La información importante de tu mascota, más fácil de llevar.",
        body: "Ayúdanos a validar cuándo reunir documentos y contexto realmente simplifica el cuidado.",
      },
      {
        id: "challenger",
        headline: "Su contexto también viaja contigo.",
        body: "Estamos explorando una forma simple de preparar la información útil para cambios, viajes y nuevas etapas.",
      },
    ],
  },
} as const satisfies Record<ExperimentId, ExperimentDefinition>;

