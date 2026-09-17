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
  return metadataForSeoPage(raw, "privacy");
}

export default async function PrivacyPage({
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
          <p className="eyebrow">{t(raw, "Privacidad", "Privacy")}</p>
          <h1>
            {t(
              raw,
              "Información clara, datos mínimos.",
              "Clear information, minimal data.",
            )}
          </h1>
          <p>
            {t(
              raw,
              "Última actualización: 2 de septiembre de 2026. Este aviso cubre los formularios públicos de acceso temprano y colaboración de Chombly.",
              "Last updated: September 2, 2026. This notice covers Chombly's public early-access and collaboration forms.",
            )}
          </p>
        </header>
        <div className="policy-content">
          <section>
            <h2>{t(raw, "Quién gestiona tus datos", "Who manages your data")}</h2>
            <p>
              {t(
                raw,
                "Para asuntos de privacidad puedes escribir a",
                "For privacy matters you can write to",
              )}{" "}
              <a href={`mailto:${SITE.operationalEmail}`}>{SITE.operationalEmail}</a>
              {t(
                raw,
                ". La identificación legal definitiva del operador se publicará una vez sea confirmada.",
                ". The operator's definitive legal identity will be published once confirmed.",
              )}
            </p>
          </section>
          <section>
            <h2>{t(raw, "Qué recopilamos", "What we collect")}</h2>
            <p>
              {t(
                raw,
                "Nombre, datos de contacto, ciudad o mercado, tipo de audiencia, selecciones estructuradas sobre tu interés y las autorizaciones que otorgues. Los formularios de marketing no solicitan síntomas, historias clínicas, credenciales ni texto clínico libre.",
                "Name, contact details, city or market, audience type, structured interest selections, and the authorizations you grant. Marketing forms do not request symptoms, clinical histories, credentials, or free clinical text.",
              )}
            </p>
          </section>
          <section>
            <h2>{t(raw, "Para qué se usa", "What it is used for")}</h2>
            <p>
              {t(
                raw,
                "Para responder a tu solicitud, organizar conversaciones, gestionar acceso temprano y mejorar Chombly. No vendemos estos datos ni los usamos para emitir diagnósticos.",
                "To respond to your request, organize conversations, manage early access, and improve Chombly. We do not sell this data or use it to issue diagnoses.",
              )}
            </p>
          </section>
          <section>
            <h2>{t(raw, "Con quién se comparte", "Who it is shared with")}</h2>
            <p>
              {t(
                raw,
                "Con proveedores operativos necesarios para alojar el sitio, almacenar respuestas o gestionar contactos, bajo configuración y acceso controlado. Una integración remota de CRM solo debe activarse cuando exista contrato y revisión correspondiente.",
                "With operational providers needed to host the site, store responses, or manage contacts, under controlled configuration and access. A remote CRM integration should only be enabled when a contract and review exist.",
              )}
            </p>
          </section>
          <section>
            <h2>{t(raw, "Tus decisiones", "Your choices")}</h2>
            <p>
              {t(
                raw,
                "Puedes solicitar acceso, corrección o eliminación escribiendo al correo operativo. Las comunicaciones opcionales requieren una autorización separada y pueden revocarse.",
                "You can request access, correction, or deletion by writing to the operations email. Optional communications require a separate authorization and can be revoked.",
              )}
            </p>
          </section>
          <section>
            <h2>{t(raw, "Seguridad y retención", "Security and retention")}</h2>
            <p>
              {t(
                raw,
                "Aplicamos validación del lado del servidor, minimización, controles de acceso y límites contra abuso. Los periodos de retención y la política legal definitiva deben aprobarse antes del lanzamiento público comercial.",
                "We apply server-side validation, minimization, access controls, and abuse limits. Retention periods and the definitive legal policy must be approved before commercial public launch.",
              )}
            </p>
          </section>
        </div>
      </main>
      <JsonLd data={marketingPageGraph(raw, "privacy")} />
    </>
  );
}
