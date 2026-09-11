import { z } from "zod";

export const audienceValues = [
  "owner",
  "professional",
  "clinic",
  "partner",
] as const;

const phone = z
  .string()
  .trim()
  .regex(/^\+?[\d\s()-]{7,22}$/)
  .optional()
  .or(z.literal(""));

const email = z.string().trim().email().max(160).optional().or(z.literal(""));

export const leadSchema = z
  .object({
    idempotencyKey: z.string().uuid(),
    audience: z.enum(audienceValues),
    name: z.string().trim().min(2).max(100),
    email,
    phone,
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
    route: z.string().trim().regex(/^\/es-co(?:\/.*)?$/).max(180),
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
    consentResearch: z.literal(true),
    consentUpdates: z.boolean().default(false),
    website: z.string().max(0).default(""),
  })
  .strict()
  .superRefine((value, context) => {
    if (value.contactPreference === "email" && !value.email) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["email"],
        message: "Necesitamos un correo válido.",
      });
    }
    if (value.contactPreference === "phone" && !value.phone) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: "Necesitamos un teléfono válido.",
      });
    }
    if (value.audience === "owner" && (!value.ownerTrigger || !value.petStage)) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ["ownerTrigger"], message: "Completa el momento y la etapa." });
    }
    if (
      value.audience === "professional" &&
      (!value.professionalRole || !value.experience || !value.interest)
    ) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ["professionalRole"], message: "Completa tu perfil profesional." });
    }
    if (
      value.audience === "clinic" &&
      (!value.clinicRole || !value.organization || !value.teamSize || !value.interest)
    ) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ["organization"], message: "Completa la información de la clínica." });
    }
    if (
      value.audience === "partner" &&
      (!value.organization || !value.organizationType || !value.interest)
    ) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ["organization"], message: "Completa la información de la organización." });
    }
  });

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
