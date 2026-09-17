import { SITE } from "@/config/site";
import { JsonLd } from "@/components/seo/json-ld";
import { marketingPageGraph, metadataForSeoPage } from "@/lib/seo";
import { isLocale, t } from "@/lib/locale";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return metadataForSeoPage(raw, "terms");
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  return (
    <>
      <main id="main-content" className="container policy-page">
        <header>
          <p className="eyebrow">{t(raw, "Términos", "Terms")}</p>
          <h1>
            {t(raw, "Claridad desde el principio.", "Clarity from the start.")}
          </h1>
          <p>
            {t(
              raw,
              "Última actualización: 2 de septiembre de 2026. Estas condiciones describen la experiencia pública de Chombly.",
              "Last updated: September 2, 2026. These terms describe Chombly's public experience.",
            )}
          </p>
        </header>
        <div className="policy-content">
          <section>
            <h2>{t(raw, "Disponibilidad", "Availability")}</h2>
            <p>
              {t(
                raw,
                "Chombly se presenta próximamente en Colombia. El sitio comunica una visión y permite registrar interés; no promete disponibilidad, cobertura, verificación profesional ni integraciones operativas.",
                "Chombly is coming soon in Colombia. The site shares a vision and lets you register interest; it does not promise availability, coverage, professional verification, or operational integrations.",
              )}
            </p>
          </section>
          <section>
            <h2>{t(raw, "No es atención veterinaria", "Not veterinary care")}</h2>
            <p>
              {t(
                raw,
                "El contenido y las pruebas no diagnostican, prescriben ni reemplazan el criterio de un profesional veterinario. Ante una urgencia o preocupación de salud, contacta a un servicio veterinario habilitado.",
                "Content and previews do not diagnose, prescribe, or replace a veterinary professional's judgment. For an emergency or health concern, contact a licensed veterinary service.",
              )}
            </p>
          </section>
          <section>
            <h2>{t(raw, "Registro de interés", "Interest registration")}</h2>
            <p>
              {t(
                raw,
                "Enviar un formulario expresa interés. No crea una cuenta, reserva, relación laboral, alianza, acceso preferente ni obligación de seleccionar a la persona u organización.",
                "Submitting a form expresses interest. It does not create an account, booking, employment relationship, partnership, preferred access, or an obligation to select the person or organization.",
              )}
            </p>
          </section>
          <section>
            <h2>{t(raw, "Contenido y propiedad", "Content and ownership")}</h2>
            <p>
              {t(
                raw,
                "La identidad, textos y prototipos de Chombly son materiales de una iniciativa en construcción. Los comentarios que compartas pueden usarse de forma agregada para aprendizaje, respetando el aviso de privacidad y tus autorizaciones.",
                "Chombly's identity, copy, and prototypes are materials of an initiative under construction. Feedback you share may be used in aggregate for learning, respecting the privacy notice and your authorizations.",
              )}
            </p>
          </section>
          <section>
            <h2>{t(raw, "Cambios y contacto", "Changes and contact")}</h2>
            <p>
              {t(
                raw,
                "Estos términos pueden cambiar a medida que la etapa evoluciona. Antes de activar producto, pagos o servicios, se requiere una versión legal definitiva. Contacto operativo:",
                "These terms may change as the stage evolves. Before enabling product, payments, or services, a definitive legal version is required. Operations contact:",
              )}{" "}
              <a href={`mailto:${SITE.operationalEmail}`}>{SITE.operationalEmail}</a>.
            </p>
          </section>
        </div>
      </main>
      <JsonLd data={marketingPageGraph(raw, "terms")} />
    </>
  );
}
