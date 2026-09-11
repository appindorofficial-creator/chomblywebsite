import { Mail } from "lucide-react";
import { SITE } from "@/config/site";
import { metadataFor } from "@/lib/seo";

export const metadata = metadataFor(
  "Contacto",
  "Ponte en contacto con el equipo de Chombly.",
  "/es-co/contact",
);

export default function ContactPage() {
  return (
    <main id="main-content" className="contact-page">
      <div className="container contact-grid">
        <div>
          <p className="eyebrow">Contacto</p>
          <h1>¿Tienes algo en mente? Conversemos.</h1>
          <p>Para acceso temprano, presencia profesional o una colaboración, elige tu camino en Chombly. Para asuntos operativos, escríbenos.</p>
        </div>
        <a className="contact-email" href={`mailto:${SITE.operationalEmail}`}>
          <Mail aria-hidden="true" />
          <span>Correo operativo</span>
          <strong>{SITE.operationalEmail}</strong>
        </a>
      </div>
    </main>
  );
}
