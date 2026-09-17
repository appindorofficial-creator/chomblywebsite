import { Mail } from "lucide-react";
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
  return metadataForSeoPage(raw, "contact");
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  return (
    <>
      <main id="main-content" className="contact-page">
        <div className="container contact-grid">
          <div>
            <p className="eyebrow">{t(raw, "Contacto", "Contact")}</p>
            <h1>
              {t(
                raw,
                "¿Tienes algo en mente? Conversemos.",
                "Have something in mind? Let's talk.",
              )}
            </h1>
            <p>
              {t(
                raw,
                "Para acceso temprano, presencia profesional o una colaboración, elige tu camino en Chombly. Para asuntos operativos, escríbenos.",
                "For early access, professional presence, or a collaboration, choose your path on Chombly. For operational matters, email us.",
              )}
            </p>
          </div>
          <a className="contact-email" href={`mailto:${SITE.operationalEmail}`}>
            <Mail aria-hidden="true" />
            <span>{t(raw, "Correo operativo", "Operations email")}</span>
            <strong>{SITE.operationalEmail}</strong>
          </a>
        </div>
      </main>
      <JsonLd data={marketingPageGraph(raw, "contact")} />
    </>
  );
}
