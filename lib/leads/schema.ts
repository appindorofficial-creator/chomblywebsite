import { z } from "zod";
import type { LocaleCode } from "@/config/site";
import { t } from "@/lib/locale";

export const audienceValues = [
  "owner",
  "professional",
  "clinic",
  "partner",
] as const;

/** Practical email check: local@domain.tld with a real-looking domain. */
export function isValidEmail(value: string): boolean {
  const email = value.trim().toLowerCase();
  if (!email || email.length > 160) return false;
  if (email.includes("..") || email.startsWith(".") || email.endsWith(".")) {
    return false;
  }
  const re =
    /^[a-z0-9](?:[a-z0-9._%+-]*[a-z0-9])?@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i;
  if (!re.test(email)) return false;
  const [local, domain] = email.split("@");
  if (!local || !domain || local.length > 64 || domain.length > 255) return false;
  const labels = domain.split(".");
  const tld = labels[labels.length - 1] || "";
  if (tld.length < 2 || !/^[a-z]+$/i.test(tld)) return false;
  return labels.every((label) => label.length > 0 && !label.startsWith("-") && !label.endsWith("-"));
}

/**
 * Phone check for Colombia (+57 / 3xx…) and general E.164-style numbers.
 * Accepts formatting spaces, dashes, parentheses.
 * In es-CO the same number is treated as WhatsApp; in en-US as phone/SMS.
 */
export function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 22) return false;
  if (!/^\+?[\d\s().-]+$/.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) return false;
  // Colombia mobile: 3XXXXXXXXX or 573XXXXXXXXX
  if (digits.length === 10 && /^3\d{9}$/.test(digits)) return true;
  if (digits.length === 12 && /^573\d{9}$/.test(digits)) return true;
  // Other international numbers (E.164 digit length), no leading 0 trunk
  if (digits.length >= 8 && digits.length <= 15 && !digits.startsWith("0")) {
    return true;
  }
  return false;
}

function optionalEmail(locale: LocaleCode) {
  return z
    .string()
    .trim()
    .max(160)
    .optional()
    .or(z.literal(""))
    .superRefine((value, context) => {
      if (!value) return;
      if (!isValidEmail(value)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: t(
            locale,
            "Ingresa un correo válido (ej. nombre@dominio.com).",
            "Enter a valid email (e.g. name@domain.com).",
          ),
        });
      }
    });
}

function optionalPhone(locale: LocaleCode) {
  return z
    .string()
    .trim()
    .max(22)
    .optional()
    .or(z.literal(""))
    .superRefine((value, context) => {
      if (!value) return;
      if (!isValidPhone(value)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: t(
            locale,
            "Ingresa un WhatsApp válido (ej. 3001234567 o +57 300 123 4567).",
            "Enter a valid phone (e.g. 3001234567 or +1 555 123 4567).",
          ),
        });
      }
    });
}

export function createLeadSchema(locale: LocaleCode = "es-co") {
  return z
    .object({
      idempotencyKey: z.string().uuid(),
      audience: z.enum(audienceValues),
      name: z.string().trim().min(2).max(100),
      email: optionalEmail(locale),
      phone: optionalPhone(locale),
      contactPreference: z.enum(["email", "phone"]),
      city: z.string().trim().min(2).max(100),
      market: z.string().trim().min(2).max(80).default("Colombia"),
      ownerTrigger: z
        .enum([
          "new-pet",
          "everyday-care",
          "something-changed",
          "continuity",
          "documents",
          "care-navigator",
        ])
        .optional(),
      petStage: z.enum(["new", "young", "adult", "senior", "multiple"]).optional(),
      professionalRole: z
        .enum(["veterinarian", "vet-student", "care-professional", "other"])
        .optional(),
      experience: z.enum(["training", "0-3", "4-10", "11-plus"]).optional(),
      clinicRole: z
        .enum(["owner", "director", "operations", "clinical", "other"])
        .optional(),
      organization: z.string().trim().max(120).optional().or(z.literal("")),
      teamSize: z.enum(["1-5", "6-20", "21-50", "51-plus"]).optional(),
      organizationType: z
        .enum(["foundation", "community", "company", "academic", "other"])
        .optional(),
      interest: z
        .enum([
          "research",
          "guided-test",
          "pilot",
          "advisory",
          "community-learning",
          "partnership",
        ])
        .optional(),
      source: z.string().trim().min(1).max(80),
      route: z.string().trim().regex(/^\/(es-co|en-us)(?:\/.*)?$/).max(180),
      utmSource: z.string().trim().max(160).optional(),
      utmMedium: z.string().trim().max(160).optional(),
      utmCampaign: z.string().trim().max(160).optional(),
      utmContent: z.string().trim().max(160).optional(),
      utmTerm: z.string().trim().max(160).optional(),
      experimentId: z
        .enum(["continuity", "care-navigator", "pet-passport"])
        .optional(),
      thesisId: z.string().trim().max(80).optional(),
      variantId: z.enum(["control", "challenger"]).optional(),
      consentResearch: z.literal(true, {
        errorMap: () => ({
          message: t(
            locale,
            "Necesitamos tu autorización para registrar la solicitud.",
            "We need your authorization to register the request.",
          ),
        }),
      }),
      consentUpdates: z.boolean().default(false),
      website: z.string().max(0).default(""),
    })
    .strict()
    .superRefine((value, context) => {
      if (value.contactPreference === "email") {
        if (!value.email) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["email"],
            message: t(
              locale,
              "Necesitamos un correo válido.",
              "We need a valid email.",
            ),
          });
        } else if (!isValidEmail(value.email)) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["email"],
            message: t(
              locale,
              "Ingresa un correo válido (ej. nombre@dominio.com).",
              "Enter a valid email (e.g. name@domain.com).",
            ),
          });
        }
      }
      if (value.contactPreference === "phone") {
        if (!value.phone) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["phone"],
            message: t(
              locale,
              "Necesitamos un WhatsApp válido.",
              "We need a valid phone number.",
            ),
          });
        } else if (!isValidPhone(value.phone)) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["phone"],
            message: t(
              locale,
              "Ingresa un WhatsApp válido (ej. 3001234567 o +57 300 123 4567).",
              "Enter a valid phone (e.g. 3001234567 or +1 555 123 4567).",
            ),
          });
        }
      }
      // If the non-preferred field is filled, still require a real format.
      if (value.email && !isValidEmail(value.email)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["email"],
          message: t(
            locale,
            "Ingresa un correo válido (ej. nombre@dominio.com).",
            "Enter a valid email (e.g. name@domain.com).",
          ),
        });
      }
      if (value.phone && !isValidPhone(value.phone)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["phone"],
          message: t(
            locale,
            "Ingresa un WhatsApp válido (ej. 3001234567 o +57 300 123 4567).",
            "Enter a valid phone (e.g. 3001234567 or +1 555 123 4567).",
          ),
        });
      }
      if (value.audience === "owner" && (!value.ownerTrigger || !value.petStage)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["ownerTrigger"],
          message: t(
            locale,
            "Completa el momento y la etapa.",
            "Complete the moment and life stage.",
          ),
        });
      }
      if (
        value.audience === "professional" &&
        (!value.professionalRole || !value.experience || !value.interest)
      ) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["professionalRole"],
          message: t(
            locale,
            "Completa tu perfil profesional.",
            "Complete your professional profile.",
          ),
        });
      }
      if (
        value.audience === "clinic" &&
        (!value.clinicRole || !value.organization || !value.teamSize || !value.interest)
      ) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["organization"],
          message: t(
            locale,
            "Completa la información de la clínica.",
            "Complete the clinic information.",
          ),
        });
      }
      if (
        value.audience === "partner" &&
        (!value.organization || !value.organizationType || !value.interest)
      ) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["organization"],
          message: t(
            locale,
            "Completa la información de la organización.",
            "Complete the organization information.",
          ),
        });
      }
    });
}

/** Default Spanish schema for API/server usage. */
export const leadSchema = createLeadSchema("es-co");

export type LeadInput = z.infer<typeof leadSchema>;
export type LeadFormInput = z.input<typeof leadSchema>;

export function structuredLeadPayload(data: LeadInput): Record<string, string> {
  const entries = {
    contactPreference: data.contactPreference,
    ownerTrigger: data.ownerTrigger,
    petStage: data.petStage,
    professionalRole: data.professionalRole,
    experience: data.experience,
    clinicRole: data.clinicRole,
    teamSize: data.teamSize,
    organizationType: data.organizationType,
    interest: data.interest,
    utmSource: data.utmSource,
    utmMedium: data.utmMedium,
    utmCampaign: data.utmCampaign,
    utmContent: data.utmContent,
    utmTerm: data.utmTerm,
  };
  const payload: Record<string, string> = {};
  for (const [key, value] of Object.entries(entries)) {
    if (typeof value === "string") payload[key] = value;
  }
  return payload;
}
