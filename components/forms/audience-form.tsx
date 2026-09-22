"use client";

import { cloneElement, useEffect, useId, useMemo, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { ArrowRight, CircleCheck, LoaderCircle } from "lucide-react";
import type { AudienceId } from "@/config/audiences";
import type { ExperimentId } from "@/config/experiments";
import { SITE, type LocaleCode } from "@/config/site";
import { TrackedLink } from "@/components/tracked-link";
import { useLocale } from "@/components/marketing/locale-context";
import { localizePath, t } from "@/lib/locale";
import { createLeadSchema, type LeadFormInput, type LeadInput } from "@/lib/leads/schema";
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

function audienceOptions(locale: LocaleCode): readonly { value: AudienceId; label: string }[] {
  return [
    { value: "owner", label: t(locale, "Familia", "Family") },
    { value: "professional", label: t(locale, "Profesional", "Professional") },
    { value: "clinic", label: t(locale, "Clínica", "Clinic") },
    { value: "partner", label: t(locale, "Aliado", "Partner") },
  ];
}

export function AudienceForm({
  defaultAudience,
  route,
  experiment,
  compact = false,
  submitLabel,
  defaultOrganizationType,
}: {
  defaultAudience: AudienceId;
  route: string;
  experiment?: ExperimentContext;
  compact?: boolean;
  submitLabel?: string;
  defaultOrganizationType?: "company";
}) {
  const locale = useLocale();
  const schema = useMemo(() => createLeadSchema(locale), [locale]);
  const resolvedSubmit =
    submitLabel || t(locale, "Quiero entrar a Chombly", "I want to join Chombly");
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
    resolver: zodResolver(schema),
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
        t(
          locale,
          "Este navegador no ofrece generación aleatoria segura. Actualízalo antes de enviar el formulario.",
          "This browser does not provide secure random generation. Update it before submitting the form.",
        ),
      );
    }
  }, [locale]);

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
      setServerError(
        t(
          locale,
          "No pudimos preparar una solicitud segura. Actualiza la página e intenta nuevamente.",
          "We could not prepare a secure request. Refresh the page and try again.",
        ),
      );
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
          ? t(
              locale,
              "Recibimos varias solicitudes recientes con este contacto. Intenta más tarde.",
              "We received several recent requests with this contact. Please try again later.",
            )
          : t(
              locale,
              "No pudimos registrar tu interés. Revisa tu conexión e intenta nuevamente.",
              "We could not register your interest. Check your connection and try again.",
            ),
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
    const whatsappHref = SITE.whatsappUrl
      ? `${SITE.whatsappUrl}${SITE.whatsappUrl.includes("?") ? "&" : "?"}text=${encodeURIComponent(
          t(
            locale,
            "Hola Chombly, acabo de registrarme como profesional y quiero saber el siguiente paso.",
            "Hi Chombly, I just registered as a professional and want to know the next step.",
          ),
        )}`
      : "";
    const mailHref = `mailto:${SITE.operationalEmail}?subject=${encodeURIComponent(
      t(locale, "Registro Chombly", "Chombly registration"),
    )}`;

    return (
      <div className="form-success" role="status">
        <CircleCheck aria-hidden="true" />
        <p className="eyebrow">{t(locale, "Recibido", "Received")}</p>
        <h2>
          {ownerSuccess
            ? t(locale, "Ya estás más cerca de Chombly. 🐾", "You are closer to Chombly. 🐾")
            : t(locale, "Nos encantará conocer lo que haces.", "We would love to learn what you do.")}
        </h2>
        <p>
          {ownerSuccess
            ? t(
                locale,
                "Puedes entrar a la app ahora, o esperar a que te avisemos cuando haya novedades.",
                "You can open the app now, or wait until we let you know about what’s next.",
              )
            : t(
                locale,
                "Recibimos tu información. Mientras tanto, puedes escribirnos por el canal que prefieras.",
                "We received your information. Meanwhile, you can reach us through the channel you prefer.",
              )}
        </p>
        <div className="form-success-actions">
          {ownerSuccess ? (
            <TrackedLink
              className="button form-success-primary"
              href={SITE.appWelcomeUrl}
              eventProperties={{
                cta_id: "success_owner_welcome",
                placement: "form_success",
                audience: "owner",
                form_id: "early_access",
              }}
            >
              {t(locale, "Abrir Chombly", "Open Chombly")}
              <ArrowRight aria-hidden="true" size={18} />
            </TrackedLink>
          ) : (
            <>
              {whatsappHref ? (
                <TrackedLink
                  className="button form-success-primary"
                  href={whatsappHref}
                  eventProperties={{
                    cta_id: "success_whatsapp",
                    placement: "form_success",
                    audience,
                    form_id: "early_access",
                  }}
                >
                  {t(locale, "Escribir por WhatsApp", "Message on WhatsApp")}
                  <ArrowRight aria-hidden="true" size={18} />
                </TrackedLink>
              ) : (
                <TrackedLink
                  className="button form-success-primary"
                  href={mailHref}
                  eventProperties={{
                    cta_id: "success_email",
                    placement: "form_success",
                    audience,
                    form_id: "early_access",
                  }}
                >
                  {t(locale, "Escribirnos por correo", "Email us")}
                  <ArrowRight aria-hidden="true" size={18} />
                </TrackedLink>
              )}
              <TrackedLink
                className="button form-success-secondary"
                href={localizePath(
                  locale,
                  audience === "clinic"
                    ? "/clinics"
                    : audience === "partner"
                      ? "/partners"
                      : "/professionals",
                )}
                eventProperties={{
                  cta_id: "success_audience_home",
                  placement: "form_success",
                  audience,
                  form_id: "early_access",
                }}
              >
                {t(locale, "Seguir explorando", "Keep exploring")}
              </TrackedLink>
            </>
          )}
        </div>
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
        <label htmlFor="website">{t(locale, "Sitio web", "Website")}</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {!compact ? (
        <fieldset className="audience-selector">
          <legend>
            {t(locale, "¿Qué lugar ocupas en el universo pet?", "Where do you fit in the pet universe?")}
          </legend>
          <div>
            {audienceOptions(locale).map((option) => (
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
        <Field label={t(locale, "Nombre", "Name")} error={errors.name?.message}>
          <input autoComplete="name" {...register("name")} />
        </Field>
        <Field label={t(locale, "Ciudad", "City")} error={errors.city?.message}>
          <input autoComplete="address-level2" {...register("city")} />
        </Field>
      </div>

      <fieldset className="contact-choice">
        <legend>
          {t(locale, "¿Cómo prefieres que te contactemos?", "How should we contact you?")}
        </legend>
        <label>
          <input type="radio" value="email" {...register("contactPreference")} />{" "}
          {t(locale, "Correo", "Email")}
        </label>
        <label>
          <input type="radio" value="phone" {...register("contactPreference")} />{" "}
          {t(locale, "Teléfono", "Phone")}
        </label>
      </fieldset>

      <div className="form-grid form-grid-two">
        <Field
          label={`${t(locale, "Correo", "Email")}${contactPreference === "email" ? " *" : ""}`}
          error={errors.email?.message}
        >
          <input type="email" autoComplete="email" {...register("email")} />
        </Field>
        <Field
          label={`${t(locale, "Teléfono", "Phone")}${contactPreference === "phone" ? " *" : ""}`}
          error={errors.phone?.message}
        >
          <input type="tel" autoComplete="tel" {...register("phone")} />
        </Field>
      </div>

      {audience === "owner" ? <OwnerFields locale={locale} register={register} errors={errors} /> : null}
      {audience === "professional" ? (
        <ProfessionalFields locale={locale} register={register} errors={errors} />
      ) : null}
      {audience === "clinic" ? <ClinicFields locale={locale} register={register} errors={errors} /> : null}
      {audience === "partner" ? <PartnerFields locale={locale} register={register} errors={errors} /> : null}

      <div className="form-boundary">
        {t(
          locale,
          "Este formulario no solicita síntomas, historia clínica ni credenciales. No crea una cuenta ni activa un servicio.",
          "This form does not ask for symptoms, clinical history, or credentials. It does not create an account or activate a service.",
        )}
      </div>

      <label className="consent-row">
        <input type="checkbox" {...register("consentResearch")} />
        <span>
          {t(
            locale,
            "Acepto que Chombly use estos datos para responder a mi solicitud y contactarme sobre Chombly. *",
            "I agree that Chombly may use this data to respond to my request and contact me about Chombly. *",
          )}
        </span>
      </label>
      {errors.consentResearch ? (
        <p className="field-error" role="alert">
          {t(
            locale,
            "Necesitamos tu autorización para registrar la solicitud.",
            "We need your authorization to register the request.",
          )}
        </p>
      ) : null}
      <label className="consent-row">
        <input type="checkbox" {...register("consentUpdates")} />
        <span>
          {t(
            locale,
            "También quiero recibir novedades ocasionales de Chombly.",
            "I also want to receive occasional updates from Chombly.",
          )}
        </span>
      </label>

      {serverError ? (
        <div className="form-error" role="alert">
          {serverError}
        </div>
      ) : null}

      <button
        aria-busy={isSubmitting}
        className="button"
        type="submit"
        disabled={isSubmitting || !idReady}
      >
        {isSubmitting ? <LoaderCircle className="spin" aria-hidden="true" /> : null}
        {resolvedSubmit} {!isSubmitting ? <ArrowRight size={18} aria-hidden="true" /> : null}
      </button>
    </form>
  );
}

type FormParts = {
  locale: LocaleCode;
  register: UseFormRegister<LeadFormInput>;
  errors: FieldErrors<LeadFormInput>;
};

function selectLabel(locale: LocaleCode) {
  return t(locale, "Selecciona", "Select");
}

function OwnerFields({ locale, register, errors }: FormParts) {
  return (
    <div className="form-grid form-grid-two">
      <Field
        label={t(locale, "Momento que más te interesa", "Moment that interests you most")}
        error={errors.ownerTrigger?.message}
      >
        <select {...register("ownerTrigger")} defaultValue="">
          <option value="" disabled>
            {selectLabel(locale)}
          </option>
          <option value="new-pet">{t(locale, "Una nueva mascota", "A new pet")}</option>
          <option value="everyday-care">{t(locale, "Cuidado cotidiano", "Everyday care")}</option>
          <option value="something-changed">{t(locale, "Cuando algo cambia", "When something changes")}</option>
          <option value="continuity">{t(locale, "Continuidad entre momentos", "Continuity between moments")}</option>
          <option value="documents">{t(locale, "Documentos e información", "Documents and information")}</option>
          <option value="care-navigator">{t(locale, "Probar una guía de cuidado", "Try a care guide")}</option>
        </select>
      </Field>
      <Field label={t(locale, "Etapa de vida", "Life stage")} error={errors.petStage?.message}>
        <select {...register("petStage")} defaultValue="">
          <option value="" disabled>
            {selectLabel(locale)}
          </option>
          <option value="new">{t(locale, "Recién llegada", "Newly arrived")}</option>
          <option value="young">{t(locale, "Joven", "Young")}</option>
          <option value="adult">{t(locale, "Adulta", "Adult")}</option>
          <option value="senior">{t(locale, "Senior", "Senior")}</option>
          <option value="multiple">{t(locale, "Varias mascotas o etapas", "Multiple pets or stages")}</option>
        </select>
      </Field>
    </div>
  );
}

function ProfessionalFields({ locale, register, errors }: FormParts) {
  return (
    <div className="form-grid form-grid-three">
      <Field label={t(locale, "Perfil", "Profile")} error={errors.professionalRole?.message}>
        <select {...register("professionalRole")} defaultValue="">
          <option value="" disabled>
            {selectLabel(locale)}
          </option>
          <option value="veterinarian">{t(locale, "Veterinario/a", "Veterinarian")}</option>
          <option value="vet-student">{t(locale, "Estudiante de veterinaria", "Veterinary student")}</option>
          <option value="care-professional">{t(locale, "Otro profesional de cuidado", "Other care professional")}</option>
          <option value="other">{t(locale, "Otro", "Other")}</option>
        </select>
      </Field>
      <Field label={t(locale, "Experiencia", "Experience")} error={errors.experience?.message}>
        <select {...register("experience")} defaultValue="">
          <option value="" disabled>
            {selectLabel(locale)}
          </option>
          <option value="training">{t(locale, "En formación", "In training")}</option>
          <option value="0-3">{t(locale, "0–3 años", "0–3 years")}</option>
          <option value="4-10">{t(locale, "4–10 años", "4–10 years")}</option>
          <option value="11-plus">{t(locale, "11+ años", "11+ years")}</option>
        </select>
      </Field>
      <Field label={t(locale, "Interés", "Interest")} error={errors.interest?.message}>
        <select {...register("interest")} defaultValue="">
          <option value="" disabled>
            {selectLabel(locale)}
          </option>
          <option value="research">{t(locale, "Conocer Chombly", "Learn about Chombly")}</option>
          <option value="guided-test">{t(locale, "Explorar cómo participar", "Explore how to participate")}</option>
          <option value="advisory">{t(locale, "Compartir mi experiencia", "Share my experience")}</option>
        </select>
      </Field>
    </div>
  );
}

function ClinicFields({ locale, register, errors }: FormParts) {
  return (
    <div className="form-grid form-grid-two">
      <Field
        label={t(locale, "Clínica u organización", "Clinic or organization")}
        error={errors.organization?.message}
      >
        <input autoComplete="organization" {...register("organization")} />
      </Field>
      <Field label={t(locale, "Tu rol", "Your role")} error={errors.clinicRole?.message}>
        <select {...register("clinicRole")} defaultValue="">
          <option value="" disabled>
            {selectLabel(locale)}
          </option>
          <option value="owner">{t(locale, "Propiedad / liderazgo", "Ownership / leadership")}</option>
          <option value="director">{t(locale, "Dirección médica", "Medical direction")}</option>
          <option value="operations">{t(locale, "Operaciones", "Operations")}</option>
          <option value="clinical">{t(locale, "Equipo clínico", "Clinical team")}</option>
          <option value="other">{t(locale, "Otro", "Other")}</option>
        </select>
      </Field>
      <Field label={t(locale, "Tamaño del equipo", "Team size")} error={errors.teamSize?.message}>
        <select {...register("teamSize")} defaultValue="">
          <option value="" disabled>
            {selectLabel(locale)}
          </option>
          <option value="1-5">1–5</option>
          <option value="6-20">6–20</option>
          <option value="21-50">21–50</option>
          <option value="51-plus">51+</option>
        </select>
      </Field>
      <Field label={t(locale, "Interés", "Interest")} error={errors.interest?.message}>
        <select {...register("interest")} defaultValue="">
          <option value="" disabled>
            {selectLabel(locale)}
          </option>
          <option value="research">{t(locale, "Conocer Chombly", "Learn about Chombly")}</option>
          <option value="pilot">{t(locale, "Explorar una colaboración", "Explore a collaboration")}</option>
          <option value="advisory">{t(locale, "Compartir mi experiencia", "Share my experience")}</option>
        </select>
      </Field>
    </div>
  );
}

function PartnerFields({ locale, register, errors }: FormParts) {
  return (
    <div className="form-grid form-grid-two">
      <Field label={t(locale, "Organización", "Organization")} error={errors.organization?.message}>
        <input autoComplete="organization" {...register("organization")} />
      </Field>
      <Field
        label={t(locale, "Tipo de organización", "Organization type")}
        error={errors.organizationType?.message}
      >
        <select {...register("organizationType")} defaultValue="">
          <option value="" disabled>
            {selectLabel(locale)}
          </option>
          <option value="foundation">{t(locale, "Fundación", "Foundation")}</option>
          <option value="community">{t(locale, "Comunidad", "Community")}</option>
          <option value="company">{t(locale, "Empresa", "Company")}</option>
          <option value="academic">{t(locale, "Académica", "Academic")}</option>
          <option value="other">{t(locale, "Otra", "Other")}</option>
        </select>
      </Field>
      <Field label={t(locale, "Interés", "Interest")} error={errors.interest?.message}>
        <select {...register("interest")} defaultValue="">
          <option value="" disabled>
            {selectLabel(locale)}
          </option>
          <option value="community-learning">
            {t(locale, "Trabajar con una comunidad", "Work with a community")}
          </option>
          <option value="research">{t(locale, "Conocer Chombly", "Learn about Chombly")}</option>
          <option value="pilot">{t(locale, "Explorar una iniciativa", "Explore an initiative")}</option>
          <option value="partnership">{t(locale, "Explorar alianza", "Explore a partnership")}</option>
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
      {error ? (
        <small id={errorId} role="alert">
          {error}
        </small>
      ) : null}
    </label>
  );
}
