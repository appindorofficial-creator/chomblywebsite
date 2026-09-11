import type { AudienceId } from "@/config/audiences";
import { AudienceForm } from "@/components/forms/audience-form";
import { metadataFor } from "@/lib/seo";
import { isLocale, localizePath, t } from "@/lib/locale";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return metadataFor(
    t(raw, "Quiero Chombly", "I want Chombly"),
    t(
      raw,
      "Cuéntanos cómo te gustaría formar parte de Chombly.",
      "Tell us how you would like to be part of Chombly.",
    ),
    localizePath(raw, "/join"),
    { locale: raw },
  );
}

const audiences = new Set<AudienceId>(["owner", "professional", "clinic", "partner"]);

export default async function JoinPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ audience?: string; organizationType?: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const query = await searchParams;
  const defaultAudience = audiences.has(query.audience as AudienceId)
    ? (query.audience as AudienceId)
    : "owner";
  const isBusiness =
    defaultAudience === "partner" && query.organizationType === "company";

  const content =
    defaultAudience === "owner"
      ? {
          eyebrow: t(raw, "Para ti y tu mascota", "For you and your pet"),
          title: t(raw, "Cuéntanos un poco de ustedes.", "Tell us a bit about you."),
          body: t(
            raw,
            "Así podremos avisarte cuando Chombly esté listo para dar el siguiente paso contigo.",
            "So we can let you know when Chombly is ready for the next step with you.",
          ),
          submit: t(raw, "Quiero entrar a Chombly", "I want to join Chombly"),
        }
      : defaultAudience === "professional"
        ? {
            eyebrow: t(raw, "Para profesionales", "For professionals"),
            title: t(raw, "Queremos conocer lo que haces.", "We want to know what you do."),
            body: t(
              raw,
              "Cuéntanos cómo trabajas para mantenerte cerca de las familias que buscan mejores opciones de cuidado.",
              "Tell us how you work so we can stay close to families looking for better care options.",
            ),
            submit: t(raw, "Quiero estar en Chombly", "I want to be on Chombly"),
          }
        : defaultAudience === "clinic"
          ? {
              eyebrow: t(raw, "Para clínicas", "For clinics"),
              title: t(raw, "Hablemos de tu clínica.", "Let's talk about your clinic."),
              body: t(
                raw,
                "Comparte lo esencial para que podamos conocer tu equipo y la forma en que cuidan.",
                "Share the essentials so we can learn about your team and how you care.",
              ),
              submit: t(raw, "Quiero Chombly para mi clínica", "I want Chombly for my clinic"),
            }
          : isBusiness
            ? {
                eyebrow: t(raw, "Para negocios pet", "For pet businesses"),
                title: t(raw, "Queremos conocer tu negocio.", "We want to know your business."),
                body: t(
                  raw,
                  "Cuéntanos qué haces y cómo te gustaría acercarte a más familias con mascotas.",
                  "Tell us what you do and how you would like to reach more pet families.",
                ),
                submit: t(
                  raw,
                  "Quiero llevar mi negocio a Chombly",
                  "I want to bring my business to Chombly",
                ),
              }
            : {
                eyebrow: t(raw, "Para aliados", "For partners"),
                title: t(
                  raw,
                  "Hagamos que cuidar sea más fácil, juntos.",
                  "Let's make caring easier, together.",
                ),
                body: t(
                  raw,
                  "Cuéntanos sobre tu organización y la forma en que imaginas una colaboración con Chombly.",
                  "Tell us about your organization and how you imagine collaborating with Chombly.",
                ),
                submit: t(raw, "Quiero construir con Chombly", "I want to build with Chombly"),
              };

  return (
    <main id="main-content" className="join-page">
      <div className="container join-grid">
        <div className="join-intro">
          <p className="eyebrow">{content.eyebrow}</p>
          <h1>{content.title}</h1>
          <p>{content.body}</p>
          <div className="join-notes">
            <span>01</span>
            <p>
              {t(
                raw,
                "Elige cómo formas parte del universo pet.",
                "Choose how you are part of the pet universe.",
              )}
            </p>
            <span>02</span>
            <p>
              {t(
                raw,
                "Comparte solo la información necesaria.",
                "Share only the information needed.",
              )}
            </p>
            <span>03</span>
            <p>
              {t(
                raw,
                "Elige el medio por el que prefieres que conversemos.",
                "Choose how you prefer us to reach you.",
              )}
            </p>
          </div>
        </div>
        <AudienceForm
          defaultAudience={defaultAudience}
          route={localizePath(raw, "/join")}
          submitLabel={content.submit}
          defaultOrganizationType={isBusiness ? "company" : undefined}
        />
      </div>
    </main>
  );
}
