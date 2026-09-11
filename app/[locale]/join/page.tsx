import type { AudienceId } from "@/config/audiences";
import { AudienceForm } from "@/components/forms/audience-form";
import { metadataFor } from "@/lib/seo";

export const metadata = metadataFor(
  "Quiero Chombly",
  "Cuéntanos cómo te gustaría formar parte de Chombly.",
  "/es-co/join",
);

const audiences = new Set<AudienceId>(["owner", "professional", "clinic", "partner"]);

export default async function JoinPage({
  searchParams,
}: {
  searchParams: Promise<{ audience?: string; organizationType?: string }>;
}) {
  const query = await searchParams;
  const defaultAudience = audiences.has(query.audience as AudienceId)
    ? (query.audience as AudienceId)
    : "owner";
  const isBusiness = defaultAudience === "partner" && query.organizationType === "company";
  const content = defaultAudience === "owner"
    ? { eyebrow: "Para ti y tu mascota", title: "Cuéntanos un poco de ustedes.", body: "Así podremos avisarte cuando Chombly esté listo para dar el siguiente paso contigo.", submit: "Quiero entrar a Chombly" }
    : defaultAudience === "professional"
      ? { eyebrow: "Para profesionales", title: "Queremos conocer lo que haces.", body: "Cuéntanos cómo trabajas para mantenerte cerca de las familias que buscan mejores opciones de cuidado.", submit: "Quiero estar en Chombly" }
      : defaultAudience === "clinic"
        ? { eyebrow: "Para clínicas", title: "Hablemos de tu clínica.", body: "Comparte lo esencial para que podamos conocer tu equipo y la forma en que cuidan.", submit: "Quiero Chombly para mi clínica" }
        : isBusiness
          ? { eyebrow: "Para negocios pet", title: "Queremos conocer tu negocio.", body: "Cuéntanos qué haces y cómo te gustaría acercarte a más familias con mascotas.", submit: "Quiero llevar mi negocio a Chombly" }
          : { eyebrow: "Para aliados", title: "Hagamos que cuidar sea más fácil, juntos.", body: "Cuéntanos sobre tu organización y la forma en que imaginas una colaboración con Chombly.", submit: "Quiero construir con Chombly" };

  return (
    <main id="main-content" className="join-page">
      <div className="container join-grid">
        <div className="join-intro">
          <p className="eyebrow">{content.eyebrow}</p>
          <h1>{content.title}</h1>
          <p>{content.body}</p>
          <div className="join-notes">
            <span>01</span><p>Elige cómo formas parte del universo pet.</p>
            <span>02</span><p>Comparte solo la información necesaria.</p>
            <span>03</span><p>Elige el medio por el que prefieres que conversemos.</p>
          </div>
        </div>
        <AudienceForm defaultAudience={defaultAudience} route="/es-co/join" submitLabel={content.submit} defaultOrganizationType={isBusiness ? "company" : undefined} />
      </div>
    </main>
  );
}
