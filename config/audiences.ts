import type { LocaleCode } from "@/config/site";
import { localizePath, t } from "@/lib/locale";

export type AudienceId = "owner" | "professional" | "clinic" | "partner";

export function audiencesFor(locale: LocaleCode) {
  return {
    owner: {
      id: "owner" as const,
      label: t(locale, "Familias con mascotas", "Pet families"),
      shortLabel: t(locale, "Para tu mascota", "For your pet"),
      path: localizePath(locale, "/pet-owners"),
      joinPath: localizePath(locale, "/join", "audience=owner"),
    },
    professional: {
      id: "professional" as const,
      label: t(locale, "Profesionales veterinarios", "Veterinary professionals"),
      shortLabel: t(locale, "Profesionales", "Professionals"),
      path: localizePath(locale, "/professionals"),
      joinPath: localizePath(locale, "/join", "audience=professional"),
    },
    clinic: {
      id: "clinic" as const,
      label: t(locale, "Clínicas y equipos", "Clinics and teams"),
      shortLabel: t(locale, "Clínicas", "Clinics"),
      path: localizePath(locale, "/clinics"),
      joinPath: localizePath(locale, "/join", "audience=clinic"),
    },
    partner: {
      id: "partner" as const,
      label: t(locale, "Aliados y fundaciones", "Partners and foundations"),
      shortLabel: t(locale, "Aliados", "Partners"),
      path: localizePath(locale, "/partners"),
      joinPath: localizePath(locale, "/join", "audience=partner"),
    },
  } as const satisfies Record<
    AudienceId,
    {
      id: AudienceId;
      label: string;
      shortLabel: string;
      path: string;
      joinPath: string;
    }
  >;
}

/** Spanish defaults for backward-compatible imports. */
export const AUDIENCES = audiencesFor("es-co");
