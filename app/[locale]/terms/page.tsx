import { SITE } from "@/config/site";
import { metadataFor } from "@/lib/seo";
import { isLocale, localizePath, t } from "@/lib/locale";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return metadataFor(
    t(raw, "Términos", "Terms"),
    t(raw, "Condiciones para usar la experiencia pública de Chombly.", "Terms for using Chombly's public experience."),
    localizePath(raw, "/terms"),
    { locale: raw },
  );
}

export default function TermsPage() {
  return (
    <main id="main-content" className="container policy-page">
      <header>
        <p className="eyebrow">Términos</p>
        <h1>Claridad desde el principio.</h1>
        <p>Última actualización: 2 de septiembre de 2026. Estas condiciones describen la experiencia pública de Chombly.</p>
      </header>
      <div className="policy-content">
        <section><h2>Disponibilidad</h2><p>Chombly se presenta próximamente en Colombia. El sitio comunica una visión y permite registrar interés; no promete disponibilidad, cobertura, verificación profesional ni integraciones operativas.</p></section>
        <section><h2>No es atención veterinaria</h2><p>El contenido y las pruebas no diagnostican, prescriben ni reemplazan el criterio de un profesional veterinario. Ante una urgencia o preocupación de salud, contacta a un servicio veterinario habilitado.</p></section>
        <section><h2>Registro de interés</h2><p>Enviar un formulario expresa interés. No crea una cuenta, reserva, relación laboral, alianza, acceso preferente ni obligación de seleccionar a la persona u organización.</p></section>
        <section><h2>Contenido y propiedad</h2><p>La identidad, textos y prototipos de Chombly son materiales de una iniciativa en construcción. Los comentarios que compartas pueden usarse de forma agregada para aprendizaje, respetando el aviso de privacidad y tus autorizaciones.</p></section>
        <section><h2>Cambios y contacto</h2><p>Estos términos pueden cambiar a medida que la etapa evoluciona. Antes de activar producto, pagos o servicios, se requiere una versión legal definitiva. Contacto operativo: <a href={`mailto:${SITE.operationalEmail}`}>{SITE.operationalEmail}</a>.</p></section>
      </div>
    </main>
  );
}
