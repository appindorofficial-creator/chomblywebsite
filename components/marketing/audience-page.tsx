import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import type { AudienceId } from "@/config/audiences";
import { TrackedLink } from "@/components/tracked-link";

export type AudiencePageKind = "families" | "professionals" | "clinics" | "businesses" | "partners";

type PageContent = {
  audience: AudienceId;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  cta: string;
  ctaId: string;
  joinPath: string;
  chapter: string;
  statement: string;
  points: readonly { title: string; body: string }[];
  boundary: string;
  tone: string;
};

const CONTENT: Record<AudiencePageKind, PageContent> = {
  families: {
    audience: "owner", eyebrow: "Para familias", title: "Cuidarla no debería sentirse como resolverlo todo solo.",
    description: "Chombly reúne orientación, ayuda profesional y herramientas de cuidado para acompañarte en los momentos cotidianos y cuando algo cambia.",
    image: "/images/dev-owner.webp", imageAlt: "Persona compartiendo en casa con un perro y un gato", cta: "Quiero Chombly para mi mascota", ctaId: "family_interest", joinPath: "/es-co/join?audience=owner",
    chapter: "Un lugar para cada momento", statement: "La duda de hoy, la persona indicada y lo importante de su historia pueden vivir más cerca.",
    points: [
      { title: "Aclara", body: "Ordena el contexto y entiende cuál puede ser el siguiente paso responsable." },
      { title: "Encuentra", body: "Acércate a profesionales, clínicas y servicios que forman parte del cuidado." },
      { title: "Sigue", body: "Lleva contigo vacunas, documentos y momentos importantes para dar continuidad." },
    ],
    boundary: "Chombly orienta y conecta. No diagnostica, prescribe ni reemplaza la atención veterinaria.", tone: "is-lavender",
  },
  professionals: {
    audience: "professional", eyebrow: "Para profesionales", title: "Tu conocimiento puede ayudar a más familias.",
    description: "Chombly quiere convertirse en un nuevo punto de encuentro entre profesionales y personas que necesitan orientación y atención para sus mascotas.",
    image: "/images/dev-vet.webp", imageAlt: "Profesional veterinaria conversando junto a un perro", cta: "Quiero estar en Chombly", ctaId: "professional_interest", joinPath: "/es-co/join?audience=professional",
    chapter: "Tu criterio sigue en el centro", statement: "Más contexto para una conversación clara. Más presencia para que las familias sepan dónde encontrarte.",
    points: [
      { title: "Presencia profesional", body: "Un perfil pensado para mostrar con claridad lo que haces y cómo puedes ayudar." },
      { title: "Nuevas oportunidades", body: "Una puerta para acercarte a familias que buscan orientación o atención responsable." },
      { title: "Flujos con contexto", body: "Una visión de continuidad antes, durante y después de cada conversación." },
    ],
    boundary: "La tecnología acompaña el criterio profesional; nunca lo suplanta ni promete pacientes o ingresos.", tone: "is-lime",
  },
  clinics: {
    audience: "clinic", eyebrow: "Para clínicas", title: "Haz que encontrarte sea más fácil. Y que volver a ti también.",
    description: "Chombly puede abrir un nuevo canal para acercar tu clínica a más familias y mantener la relación presente más allá de una visita.",
    image: "/images/dev-vet.webp", imageAlt: "Profesional veterinaria trabajando desde una clínica", cta: "Chombly para mi clínica", ctaId: "clinic_interest", joinPath: "/es-co/join?audience=clinic",
    chapter: "La relación no termina en la puerta", statement: "Descubrimiento, contexto y continuidad pueden sentirse como una misma experiencia.",
    points: [
      { title: "Hazte visible", body: "Presenta tu clínica donde las familias ya están pensando en el cuidado." },
      { title: "Llega con contexto", body: "Acerca información útil a la conversación sin añadir promesas clínicas." },
      { title: "Permanece cerca", body: "Mantén una relación más clara entre los momentos que importan." },
    ],
    boundary: "No prometemos integraciones, demanda, retorno ni disponibilidad comercial antes de que existan.", tone: "is-coral",
  },
  businesses: {
    audience: "partner", eyebrow: "Para negocios pet", title: "Tu negocio también puede estar donde las familias cuidan.",
    description: "Acerca tus servicios a personas que ya están buscando mejores formas de cuidar a sus mascotas.",
    image: "/images/dev-grooming.webp", imageAlt: "Servicio de cuidado y grooming para mascotas", cta: "Quiero llevar mi negocio a Chombly", ctaId: "business_interest", joinPath: "/es-co/join?audience=partner&organizationType=company",
    chapter: "El cuidado también ocurre en tu negocio", statement: "Servicios relevantes, expectativas claras y una relación que puede volver a empezar en cada visita.",
    points: [
      { title: "Más cerca", body: "Aparece en un universo centrado en las necesidades reales de las familias." },
      { title: "Más claro", body: "Explica lo que ofreces con información útil y sin ruido." },
      { title: "Más conectado", body: "Forma parte de una experiencia de cuidado que mira el recorrido completo." },
    ],
    boundary: "Estar en Chombly no implica tráfico, ventas o resultados garantizados.", tone: "is-ivory",
  },
  partners: {
    audience: "partner", eyebrow: "Para aliados", title: "Hagamos que cuidar sea más fácil, juntos.",
    description: "Fundaciones, comunidades y aliados pueden ayudar a ampliar acceso, acompañar nuevos comienzos y conectar a más familias con mejores opciones.",
    image: "/images/dev-walk.webp", imageAlt: "Persona caminando al aire libre con su perro", cta: "Quiero construir con Chombly", ctaId: "partner_interest", joinPath: "/es-co/join?audience=partner",
    chapter: "Cuando el acceso crece, el cuidado también", statement: "Las mejores alianzas empiezan por una necesidad compartida y una forma concreta de actuar.",
    points: [
      { title: "Comunidades", body: "Acerca Chombly a personas y mascotas que necesitan mejores opciones." },
      { title: "Nuevos comienzos", body: "Acompaña adopción, educación y transiciones importantes con más contexto." },
      { title: "Impacto responsable", body: "Define objetivos, responsabilidades y datos con claridad desde el inicio." },
    ],
    boundary: "Cada alianza requiere un alcance, responsabilidades y gobernanza de datos acordados por separado.", tone: "is-forest",
  },
};

export function AudiencePage({ kind }: { kind: AudiencePageKind }) {
  const content = CONTENT[kind];
  return (
    <main id="main-content" className={`v2-audience-page ${content.tone}`}>
      <section className="v2-audience-hero">
        <div className="v2-shell v2-audience-hero-grid">
          <div className="v2-audience-hero-copy">
            <p className="v2-eyebrow">{content.eyebrow}</p>
            <h1>{content.title}</h1>
            <p>{content.description}</p>
            <TrackedLink className="v2-button" href={content.joinPath} eventProperties={{ cta_id: content.ctaId, placement: "audience_hero", audience: content.audience }}>
              {content.cta} <ArrowUpRight size={18} aria-hidden="true" />
            </TrackedLink>
          </div>
          <figure className="v2-audience-photo">
            <img src={content.image} alt={content.imageAlt} width="1440" height="960" />
            <figcaption>Fotografía temporal de desarrollo</figcaption>
          </figure>
        </div>
      </section>
      <section className="v2-audience-chapter">
        <div className="v2-shell v2-audience-chapter-grid">
          <div><p className="v2-eyebrow">{content.chapter}</p><h2>{content.statement}</h2></div>
          <ol className="v2-audience-list">
            {content.points.map((point, index) => (
              <li key={point.title}><span>0{index + 1}</span><div><h3>{point.title}</h3><p>{point.body}</p></div><Check aria-hidden="true" /></li>
            ))}
          </ol>
        </div>
      </section>
      <section className="v2-audience-boundary" data-header-theme="on-dark">
        <div className="v2-shell v2-audience-boundary-grid">
          <ShieldCheck aria-hidden="true" />
          <div><p className="v2-eyebrow">Con claridad desde el principio</p><h2>{content.boundary}</h2></div>
          <TrackedLink className="v2-button v2-button-lime" href={content.joinPath} eventProperties={{ cta_id: content.ctaId, placement: "audience_boundary", audience: content.audience }}>
            {content.cta} <ArrowUpRight size={18} aria-hidden="true" />
          </TrackedLink>
        </div>
      </section>
    </main>
  );
}
