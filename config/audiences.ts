export type AudienceId = "owner" | "professional" | "clinic" | "partner";

export const AUDIENCES = {
  owner: {
    id: "owner",
    label: "Familias con mascotas",
    shortLabel: "Para tu mascota",
    path: "/es-co/pet-owners",
    joinPath: "/es-co/join?audience=owner",
  },
  professional: {
    id: "professional",
    label: "Profesionales veterinarios",
    shortLabel: "Profesionales",
    path: "/es-co/professionals",
    joinPath: "/es-co/join?audience=professional",
  },
  clinic: {
    id: "clinic",
    label: "Clínicas y equipos",
    shortLabel: "Clínicas",
    path: "/es-co/clinics",
    joinPath: "/es-co/join?audience=clinic",
  },
  partner: {
    id: "partner",
    label: "Aliados y fundaciones",
    shortLabel: "Aliados",
    path: "/es-co/partners",
    joinPath: "/es-co/join?audience=partner",
  },
} as const satisfies Record<AudienceId, {id: AudienceId; label: string; shortLabel: string; path: string; joinPath: string}>;

