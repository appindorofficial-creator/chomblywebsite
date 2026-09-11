"use client";

import { cloneElement, useEffect, useId, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { ArrowRight, CircleCheck, LoaderCircle } from "lucide-react";
import type { AudienceId } from "@/config/audiences";
import type { ExperimentId } from "@/config/experiments";
import { leadSchema, type LeadFormInput, type LeadInput } from "@/lib/leads/schema";
import { track } from "@/lib/analytics/client";
import { createIdempotencyKey } from "@/lib/ids";

type ExperimentContext = {
  experimentId: ExperimentId;
  thesisId: string;
  variantId: "control" | "challenger";
};

type UtmAttribution = Partial<
  Pick<LeadInput, "utmSource" | "utmMedium" | "utmCampaign" | "utmContent" | "utmTerm">
>;

const audienceOptions: readonly { value: AudienceId; label: string }[] = [
  { value: "owner", label: "Familia" },
  { value: "professional", label: "Profesional" },
  { value: "clinic", label: "Clínica" },
  { value: "partner", label: "Aliado" },
];

export function AudienceForm({
  defaultAudience,
  route,
  experiment,
  compact = false,
  submitLabel = "Quiero entrar a Chombly",
  defaultOrganizationType,
}: {
  defaultAudience: AudienceId;
  route: string;
  experiment?: ExperimentContext;
  compact?: boolean;
  submitLabel?: string;
  defaultOrganizationType?: "company";
}) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [idempotencyKey, setIdempotencyKey] = useState("");
  const [utmAttribution, setUtmAttribution] = useState<UtmAttribution>({});
  const [idReady, setIdReady] = useState(false);
  const started = useRef(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormInput, unknown, LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      idempotencyKey: "00000000-0000-4000-8000-000000000000",
      audience: defaultAudience,
      market: "Colombia",
      contactPreference: "email",
      source: experiment ? "experiment_landing" : "public_website",
      route,
      experimentId: experiment?.experimentId,
      thesisId: experiment?.thesisId,
      variantId: experiment?.variantId,
      organizationType: defaultOrganizationType,
      consentResearch: undefined,
      consentUpdates: false,
      website: "",
    },
  });

  useEffect(() => {
    try {
      const key = createIdempotencyKey();
      setIdempotencyKey(key);
      setIdReady(true);
      const params = new URLSearchParams(window.location.search);
      const clean = (name: string) => params.get(name)?.trim().slice(0, 160) || undefined;
      setUtmAttribution({
        utmSource: clean("utm_source"),
        utmMedium: clean("utm_medium"),
        utmCampaign: clean("utm_campaign"),
        utmContent: clean("utm_content"),
        utmTerm: clean("utm_term"),
      });
    } catch {
      setServerError(
        "Este navegador no ofrece generación aleatoria segura. Actualízalo antes de enviar el formulario.",
      );
    }
  }, []);

  const audience = watch("audience") || defaultAudience;
  const contactPreference = watch("contactPreference") || "email";
  const audienceField = register("audience");

  function markStarted() {
    if (started.current) return;
    started.current = true;
    track("form_started", {
      route,
      audience,
      form_id: "early_access",
      consent_state: "not_granted",
      experiment_id: experiment?.experimentId,
      thesis_id: experiment?.thesisId,
      variant_id: experiment?.variantId,
    });
  }

  async function submit(data: LeadInput) {
    setServerError(null);
    if (!idReady || !idempotencyKey) {
      setServerError("No pudimos preparar una solicitud segura. Actualiza la página e intenta nuevamente.");
      return;
    }
    const payload: LeadInput = {
      ...data,
      ...utmAttribution,
      idempotencyKey,
      audience: compact ? defaultAudience : data.audience,
      market: "Colombia",
      source: experiment ? "experiment_landing" : "public_website",
      route,
      experimentId: experiment?.experimentId,
      thesisId: experiment?.thesisId,
      variantId: experiment?.variantId,
    };
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(result?.error || "SUBMIT_FAILED");
      }
      setSubmitted(true);
      track("form_submitted", {
        route,
        audience: payload.audience,
        form_id: "early_access",
        market: payload.market,
        consent_state: payload.consentUpdates ? "research_and_updates" : "research_only",
        experiment_id: payload.experimentId,
        thesis_id: payload.thesisId,
        variant_id: payload.variantId,
      });
    } catch (error) {
      const reason = error instanceof Error ? error.message : "SUBMIT_FAILED";
      setServerError(
        reason === "RATE_LIMIT"
          ? "Recibimos varias solicitudes recientes con este contacto. Intenta más tarde."
          : "No pudimos registrar tu interés. Revisa tu conexión e intenta nuevamente.",
      );
      track("form_submission_failed", {
        route,
        audience,
        form_id: "early_access",
        consent_state: "not_granted",
        reason,
        experiment_id: experiment?.experimentId,
      });
    }
  }

  if (submitted) {
    const ownerSuccess = audience === "owner";
    return (
      <div className="form-success" role="status">
        <CircleCheck aria-hidden="true" />
        <p className="eyebrow">Recibido</p>
        <h2>{ownerSuccess ? "Ya estás más cerca de Chombly. 🐾" : "Nos encantará conocer lo que haces."}</h2>
        <p>{ownerSuccess ? "Te avisaremos cuando llegue el momento de entrar." : "Recibimos tu información. Nuestro equipo podrá ponerse en contacto contigo por el medio que elegiste."}</p>
      </div>
    );
  }

  return (
    <form
      className={`audience-form${compact ? " audience-form-compact" : ""}`}
      onSubmit={handleSubmit(submit)}
      onFocus={markStarted}
      noValidate
    >
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Sitio web</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {!compact ? (
        <fieldset className="audience-selector">
          <legend>¿Qué lugar ocupas en el universo pet?</legend>
          <div>
            {audienceOptions.map((option) => (
              <label key={option.value} data-selected={audience === option.value}>
                <input
                  type="radio"
                  value={option.value}
                  {...audienceField}
                  onChange={(event) => {
                    void audienceField.onChange(event);
                    track("audience_selected", {
                      route,
                      audience: option.value,
                      form_id: "early_access",
                      placement: "lead_form",
                      experiment_id: experiment?.experimentId,
                      thesis_id: experiment?.thesisId,
                      variant_id: experiment?.variantId,
                    });
                  }}
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      <div className="form-grid form-grid-two">
        <Field label="Nombre" error={errors.name?.message}>
          <input autoComplete="name" {...register("name")} />
        </Field>
        <Field label="Ciudad" error={errors.city?.message}>
          <input autoComplete="address-level2" {...register("city")} />
        </Field>
      </div>

      <fieldset className="contact-choice">
        <legend>¿Cómo prefieres que te contactemos?</legend>
        <label><input type="radio" value="email" {...register("contactPreference")} /> Correo</label>
        <label><input type="radio" value="phone" {...register("contactPreference")} /> Teléfono</label>
      </fieldset>

      <div className="form-grid form-grid-two">
        <Field label={`Correo${contactPreference === "email" ? " *" : ""}`} error={errors.email?.message}>
          <input type="email" autoComplete="email" {...register("email")} />
        </Field>
        <Field label={`Teléfono${contactPreference === "phone" ? " *" : ""}`} error={errors.phone?.message}>
          <input type="tel" autoComplete="tel" {...register("phone")} />
        </Field>
      </div>

      {audience === "owner" ? <OwnerFields register={register} errors={errors} /> : null}
      {audience === "professional" ? <ProfessionalFields register={register} errors={errors} /> : null}
      {audience === "clinic" ? <ClinicFields register={register} errors={errors} /> : null}
      {audience === "partner" ? <PartnerFields register={register} errors={errors} /> : null}

      <div className="form-boundary">
        Este formulario no solicita síntomas, historia clínica ni credenciales. No
        crea una cuenta ni activa un servicio.
      </div>

      <label className="consent-row">
        <input type="checkbox" {...register("consentResearch")} />
        <span>Acepto que Chombly use estos datos para responder a mi solicitud y contactarme sobre Chombly. *</span>
      </label>
      {errors.consentResearch ? <p className="field-error" role="alert">Necesitamos tu autorización para registrar la solicitud.</p> : null}
      <label className="consent-row">
        <input type="checkbox" {...register("consentUpdates")} />
        <span>También quiero recibir novedades ocasionales de Chombly.</span>
      </label>

      {serverError ? <div className="form-error" role="alert">{serverError}</div> : null}

      <button
        aria-busy={isSubmitting}
        className="button"
        type="submit"
        disabled={isSubmitting || !idReady}
      >
        {isSubmitting ? <LoaderCircle className="spin" aria-hidden="true" /> : null}
        {submitLabel} {!isSubmitting ? <ArrowRight size={18} aria-hidden="true" /> : null}
      </button>
    </form>
  );
}

type FormParts = {
  register: UseFormRegister<LeadFormInput>;
  errors: FieldErrors<LeadFormInput>;
};

function OwnerFields({ register, errors }: FormParts) {
  return (
    <div className="form-grid form-grid-two">
      <Field label="Momento que más te interesa" error={errors.ownerTrigger?.message}>
        <select {...register("ownerTrigger")} defaultValue="">
          <option value="" disabled>Selecciona</option>
          <option value="new-pet">Una nueva mascota</option>
          <option value="everyday-care">Cuidado cotidiano</option>
          <option value="something-changed">Cuando algo cambia</option>
          <option value="continuity">Continuidad entre momentos</option>
          <option value="documents">Documentos e información</option>
          <option value="care-navigator">Probar una guía de cuidado</option>
        </select>
      </Field>
      <Field label="Etapa de vida" error={errors.petStage?.message}>
        <select {...register("petStage")} defaultValue="">
          <option value="" disabled>Selecciona</option>
          <option value="new">Recién llegada</option>
          <option value="young">Joven</option>
          <option value="adult">Adulta</option>
          <option value="senior">Senior</option>
          <option value="multiple">Varias mascotas o etapas</option>
        </select>
      </Field>
    </div>
  );
}

function ProfessionalFields({ register, errors }: FormParts) {
  return (
    <div className="form-grid form-grid-three">
      <Field label="Perfil" error={errors.professionalRole?.message}>
        <select {...register("professionalRole")} defaultValue="">
          <option value="" disabled>Selecciona</option>
          <option value="veterinarian">Veterinario/a</option>
          <option value="vet-student">Estudiante de veterinaria</option>
          <option value="care-professional">Otro profesional de cuidado</option>
          <option value="other">Otro</option>
        </select>
      </Field>
      <Field label="Experiencia" error={errors.experience?.message}>
        <select {...register("experience")} defaultValue="">
          <option value="" disabled>Selecciona</option>
          <option value="training">En formación</option>
          <option value="0-3">0–3 años</option>
          <option value="4-10">4–10 años</option>
          <option value="11-plus">11+ años</option>
        </select>
      </Field>
      <Field label="Interés" error={errors.interest?.message}>
        <select {...register("interest")} defaultValue="">
          <option value="" disabled>Selecciona</option>
          <option value="research">Conocer Chombly</option>
          <option value="guided-test">Explorar cómo participar</option>
          <option value="advisory">Compartir mi experiencia</option>
        </select>
      </Field>
    </div>
  );
}

function ClinicFields({ register, errors }: FormParts) {
  return (
    <div className="form-grid form-grid-two">
      <Field label="Clínica u organización" error={errors.organization?.message}>
        <input autoComplete="organization" {...register("organization")} />
      </Field>
      <Field label="Tu rol" error={errors.clinicRole?.message}>
        <select {...register("clinicRole")} defaultValue="">
          <option value="" disabled>Selecciona</option>
          <option value="owner">Propiedad / liderazgo</option>
          <option value="director">Dirección médica</option>
          <option value="operations">Operaciones</option>
          <option value="clinical">Equipo clínico</option>
          <option value="other">Otro</option>
        </select>
      </Field>
      <Field label="Tamaño del equipo" error={errors.teamSize?.message}>
        <select {...register("teamSize")} defaultValue="">
          <option value="" disabled>Selecciona</option>
          <option value="1-5">1–5</option>
          <option value="6-20">6–20</option>
          <option value="21-50">21–50</option>
          <option value="51-plus">51+</option>
        </select>
      </Field>
      <Field label="Interés" error={errors.interest?.message}>
        <select {...register("interest")} defaultValue="">
          <option value="" disabled>Selecciona</option>
          <option value="research">Conocer Chombly</option>
          <option value="pilot">Explorar una colaboración</option>
          <option value="advisory">Compartir mi experiencia</option>
        </select>
      </Field>
    </div>
  );
}

function PartnerFields({ register, errors }: FormParts) {
  return (
    <div className="form-grid form-grid-two">
      <Field label="Organización" error={errors.organization?.message}>
        <input autoComplete="organization" {...register("organization")} />
      </Field>
      <Field label="Tipo de organización" error={errors.organizationType?.message}>
        <select {...register("organizationType")} defaultValue="">
          <option value="" disabled>Selecciona</option>
          <option value="foundation">Fundación</option>
          <option value="community">Comunidad</option>
          <option value="company">Empresa</option>
          <option value="academic">Académica</option>
          <option value="other">Otra</option>
        </select>
      </Field>
      <Field label="Interés" error={errors.interest?.message}>
        <select {...register("interest")} defaultValue="">
          <option value="" disabled>Selecciona</option>
          <option value="community-learning">Trabajar con una comunidad</option>
          <option value="research">Conocer Chombly</option>
          <option value="pilot">Explorar una iniciativa</option>
          <option value="partnership">Explorar alianza</option>
        </select>
      </Field>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactElement<{
    "aria-describedby"?: string;
    "aria-invalid"?: boolean;
  }>;
}) {
  const errorId = useId();
  const control = cloneElement(children, {
    "aria-describedby": error ? errorId : undefined,
    "aria-invalid": Boolean(error),
  });

  return (
    <label className="form-field">
      <span>{label}</span>
      {control}
      {error ? <small id={errorId} role="alert">{error}</small> : null}
    </label>
  );
}
