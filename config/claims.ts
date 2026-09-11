export type ClaimStatus =
  | "LIVE"
  | "PRELAUNCH"
  | "PILOT"
  | "VISION"
  | "PENDING_PRODUCT"
  | "PENDING_LEGAL";

export type Claim = {
  id: string;
  status: ClaimStatus;
  publicText: string;
  internalNote?: string;
};

export const CLAIMS = {
  vision: {
    id: "claim.vision.connected-care",
    status: "VISION",
    publicText:
      "Chombly está construyendo una nueva forma de entender el contexto de tu mascota, conectar su cuidado y ayudarte a saber qué sigue.",
  },
  stage: {
    id: "claim.stage.validation",
    status: "PRELAUNCH",
    publicText:
      "Estamos construyendo y validando Chombly con familias, profesionales y organizaciones del ecosistema.",
  },
  noReplacement: {
    id: "claim.trust.no-replacement",
    status: "PRELAUNCH",
    publicText:
      "Chombly no diagnostica ni reemplaza el criterio de un profesional veterinario.",
  },
  navigator: {
    id: "claim.hypothesis.care-navigator",
    status: "VISION",
    publicText:
      "Estamos explorando una guía de cuidado que ayude a ordenar el contexto y aclarar un siguiente paso, sin emitir diagnósticos.",
  },
  continuity: {
    id: "claim.hypothesis.continuity",
    status: "VISION",
    publicText:
      "Exploramos cómo mantener el contexto de cuidado útil a través de distintos momentos de la vida.",
  },
  petPassport: {
    id: "claim.hypothesis.pet-passport",
    status: "VISION",
    publicText:
      "Exploramos una forma simple de reunir información importante de la mascota y facilitar su continuidad.",
  },
  verifiedNetwork: {
    id: "claim.pending.verified-network",
    status: "PENDING_PRODUCT",
    publicText: "Red verificada de profesionales y servicios.",
    internalNote: "No publicar hasta definir el estándar operativo de verificación.",
  },
  legalEntity: {
    id: "claim.pending.legal-entity",
    status: "PENDING_LEGAL",
    publicText: "Chombly S.A.S.",
    internalNote: "Chombly aún no está constituida como entidad independiente.",
  },
} as const satisfies Record<string, Claim>;

export const PUBLIC_CLAIM_STATUSES = new Set<ClaimStatus>([
  "LIVE",
  "PRELAUNCH",
  "PILOT",
  "VISION",
]);

export function publicClaim(claim: Claim): string | null {
  return PUBLIC_CLAIM_STATUSES.has(claim.status) ? claim.publicText : null;
}

