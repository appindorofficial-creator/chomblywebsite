import { SITE } from "@/config/site";
import { metadataFor } from "@/lib/seo";

export const metadata = metadataFor(
  "Privacidad",
  "Información sobre el tratamiento de datos de Chombly.",
  "/es-co/privacy",
);

export default function PrivacyPage() {
  return (
    <main id="main-content" className="container policy-page">
      <header>
        <p className="eyebrow">Privacidad</p>
        <h1>Información clara, datos mínimos.</h1>
        <p>Última actualización: 2 de septiembre de 2026. Este aviso cubre los formularios públicos de acceso temprano y colaboración de Chombly.</p>
      </header>
      <div className="policy-content">
        <section><h2>Quién gestiona tus datos</h2><p>Para asuntos de privacidad puedes escribir a <a href={`mailto:${SITE.operationalEmail}`}>{SITE.operationalEmail}</a>. La identificación legal definitiva del operador se publicará una vez sea confirmada.</p></section>
        <section><h2>Qué recopilamos</h2><p>Nombre, datos de contacto, ciudad o mercado, tipo de audiencia, selecciones estructuradas sobre tu interés y las autorizaciones que otorgues. Los formularios de marketing no solicitan síntomas, historias clínicas, credenciales ni texto clínico libre.</p></section>
        <section><h2>Para qué se usa</h2><p>Para responder a tu solicitud, organizar conversaciones, gestionar acceso temprano y mejorar Chombly. No vendemos estos datos ni los usamos para emitir diagnósticos.</p></section>
        <section><h2>Con quién se comparte</h2><p>Con proveedores operativos necesarios para alojar el sitio, almacenar respuestas o gestionar contactos, bajo configuración y acceso controlado. Una integración remota de CRM solo debe activarse cuando exista contrato y revisión correspondiente.</p></section>
        <section><h2>Tus decisiones</h2><p>Puedes solicitar acceso, corrección o eliminación escribiendo al correo operativo. Las comunicaciones opcionales requieren una autorización separada y pueden revocarse.</p></section>
        <section><h2>Seguridad y retención</h2><p>Aplicamos validación del lado del servidor, minimización, controles de acceso y límites contra abuso. Los periodos de retención y la política legal definitiva deben aprobarse antes del lanzamiento público comercial.</p></section>
      </div>
    </main>
  );
}
