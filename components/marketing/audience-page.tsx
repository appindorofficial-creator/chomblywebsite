"use client";

import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import type { AudienceId } from "@/config/audiences";
import { TrackedLink } from "@/components/tracked-link";
import { FaqSection } from "@/components/marketing/v2/faq-section";
import { useLocale } from "@/components/marketing/locale-context";
import { seoPages } from "@/config/seo-pages";
import { SITE, type LocaleCode } from "@/config/site";
import { localizePath, t } from "@/lib/locale";

export type AudiencePageKind =
  | "families"
  | "professionals"
  | "clinics"
  | "businesses"
  | "partners";

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

function contentFor(kind: AudiencePageKind, locale: LocaleCode): PageContent {
  const join = (audience: string, extra = "") =>
    localizePath(locale, "/join", `audience=${audience}${extra}`);

  const pages: Record<AudiencePageKind, PageContent> = {
    families: {
      audience: "owner",
      eyebrow: t(locale, "Para familias", "For families"),
      title: t(
        locale,
        "Cuidarla no debería sentirse como resolverlo todo solo.",
        "Caring for them should not feel like figuring everything out alone.",
      ),
      description: t(
        locale,
        "Chombly reúne orientación, ayuda profesional y herramientas de cuidado para acompañarte en los momentos cotidianos y cuando algo cambia.",
        "Chombly brings together guidance, professional help, and care tools for everyday moments and when something changes.",
      ),
      image: "/images/dev-owner.webp",
      imageAlt: t(
        locale,
        "Persona compartiendo en casa con un perro y un gato",
        "Person at home with a dog and a cat",
      ),
      cta: t(locale, "Quiero Chombly para mi mascota", "I want Chombly for my pet"),
      ctaId: "family_open_app",
      joinPath: SITE.appWelcomeUrl,
      chapter: t(locale, "Un lugar para cada momento", "A place for every moment"),
      statement: t(
        locale,
        "La duda de hoy, la persona indicada y lo importante de su historia pueden vivir más cerca.",
        "Today's question, the right person, and what matters in their story can live closer together.",
      ),
      points: [
        {
          title: t(locale, "Aclara", "Clarify"),
          body: t(
            locale,
            "Ordena el contexto y entiende cuál puede ser el siguiente paso responsable.",
            "Organize the context and understand what a responsible next step can be.",
          ),
        },
        {
          title: t(locale, "Encuentra", "Find"),
          body: t(
            locale,
            "Acércate a profesionales, clínicas y servicios que forman parte del cuidado.",
            "Get closer to professionals, clinics, and services that are part of care.",
          ),
        },
        {
          title: t(locale, "Sigue", "Follow through"),
          body: t(
            locale,
            "Lleva contigo vacunas, documentos y momentos importantes para dar continuidad.",
            "Carry vaccines, documents, and important moments with you for continuity.",
          ),
        },
      ],
      boundary: t(
        locale,
        "Chombly orienta y conecta. No diagnostica, prescribe ni reemplaza la atención veterinaria.",
        "Chombly guides and connects. It does not diagnose, prescribe, or replace veterinary care.",
      ),
      tone: "is-lavender",
    },
    professionals: {
      audience: "professional",
      eyebrow: t(locale, "Para profesionales", "For professionals"),
      title: t(
        locale,
        "Tu conocimiento puede ayudar a más familias.",
        "Your knowledge can help more families.",
      ),
      description: t(
        locale,
        "Chombly quiere convertirse en un nuevo punto de encuentro entre profesionales y personas que necesitan orientación y atención para sus mascotas.",
        "Chombly aims to become a new meeting point between professionals and people who need guidance and care for their pets.",
      ),
      image: "/images/dev-vet.webp",
      imageAlt: t(
        locale,
        "Profesional veterinaria conversando junto a un perro",
        "Veterinary professional talking next to a dog",
      ),
      cta: t(locale, "Quiero estar en Chombly", "I want to be on Chombly"),
      ctaId: "professional_interest",
      joinPath: join("professional"),
      chapter: t(locale, "Tu criterio sigue en el centro", "Your judgment stays at the center"),
      statement: t(
        locale,
        "Más contexto para una conversación clara. Más presencia para que las familias sepan dónde encontrarte.",
        "More context for a clear conversation. More presence so families know where to find you.",
      ),
      points: [
        {
          title: t(locale, "Presencia profesional", "Professional presence"),
          body: t(
            locale,
            "Un perfil pensado para mostrar con claridad lo que haces y cómo puedes ayudar.",
            "A profile designed to clearly show what you do and how you can help.",
          ),
        },
        {
          title: t(locale, "Nuevas oportunidades", "New opportunities"),
          body: t(
            locale,
            "Una puerta para acercarte a familias que buscan orientación o atención responsable.",
            "A door to families looking for guidance or responsible care.",
          ),
        },
        {
          title: t(locale, "Flujos con contexto", "Context-aware flows"),
          body: t(
            locale,
            "Una visión de continuidad antes, durante y después de cada conversación.",
            "A continuity view before, during, and after every conversation.",
          ),
        },
      ],
      boundary: t(
        locale,
        "La tecnología acompaña el criterio profesional; nunca lo suplanta ni promete pacientes o ingresos.",
        "Technology supports professional judgment; it never replaces it or promises patients or revenue.",
      ),
      tone: "is-lime",
    },
    clinics: {
      audience: "clinic",
      eyebrow: t(locale, "Para clínicas", "For clinics"),
      title: t(
        locale,
        "Haz que encontrarte sea más fácil. Y que volver a ti también.",
        "Make it easier to find you. And easier to come back.",
      ),
      description: t(
        locale,
        "Chombly puede abrir un nuevo canal para acercar tu clínica a más familias y mantener la relación presente más allá de una visita.",
        "Chombly can open a new channel to bring your clinic closer to more families and keep the relationship present beyond one visit.",
      ),
      image: "/images/dev-vet.webp",
      imageAlt: t(
        locale,
        "Profesional veterinaria trabajando desde una clínica",
        "Veterinary professional working from a clinic",
      ),
      cta: t(locale, "Chombly para mi clínica", "Chombly for my clinic"),
      ctaId: "clinic_interest",
      joinPath: join("clinic"),
      chapter: t(
        locale,
        "La relación no termina en la puerta",
        "The relationship does not end at the door",
      ),
      statement: t(
        locale,
        "Descubrimiento, contexto y continuidad pueden sentirse como una misma experiencia.",
        "Discovery, context, and continuity can feel like one experience.",
      ),
      points: [
        {
          title: t(locale, "Hazte visible", "Become visible"),
          body: t(
            locale,
            "Presenta tu clínica donde las familias ya están pensando en el cuidado.",
            "Present your clinic where families are already thinking about care.",
          ),
        },
        {
          title: t(locale, "Llega con contexto", "Arrive with context"),
          body: t(
            locale,
            "Acerca información útil a la conversación sin añadir promesas clínicas.",
            "Bring useful information into the conversation without clinical promises.",
          ),
        },
        {
          title: t(locale, "Permanece cerca", "Stay close"),
          body: t(
            locale,
            "Mantén una relación más clara entre los momentos que importan.",
            "Keep a clearer relationship across the moments that matter.",
          ),
        },
      ],
      boundary: t(
        locale,
        "No prometemos integraciones, demanda, retorno ni disponibilidad comercial antes de que existan.",
        "We do not promise integrations, demand, returns, or commercial availability before they exist.",
      ),
      tone: "is-coral",
    },
    businesses: {
      audience: "partner",
      eyebrow: t(locale, "Para negocios pet", "For pet businesses"),
      title: t(
        locale,
        "Tu negocio también puede estar donde las familias cuidan.",
        "Your business can also be where families care.",
      ),
      description: t(
        locale,
        "Acerca tus servicios a personas que ya están buscando mejores formas de cuidar a sus mascotas.",
        "Bring your services to people already looking for better ways to care for their pets.",
      ),
      image: "/images/dev-grooming.webp",
      imageAlt: t(
        locale,
        "Servicio de cuidado y grooming para mascotas",
        "Pet care and grooming service",
      ),
      cta: t(
        locale,
        "Quiero llevar mi negocio a Chombly",
        "I want to bring my business to Chombly",
      ),
      ctaId: "business_interest",
      joinPath: join("partner", "&organizationType=company"),
      chapter: t(
        locale,
        "El cuidado también ocurre en tu negocio",
        "Care also happens in your business",
      ),
      statement: t(
        locale,
        "Servicios relevantes, expectativas claras y una relación que puede volver a empezar en cada visita.",
        "Relevant services, clear expectations, and a relationship that can start again at every visit.",
      ),
      points: [
        {
          title: t(locale, "Más cerca", "Closer"),
          body: t(
            locale,
            "Aparece en un universo centrado en las necesidades reales de las familias.",
            "Show up in a universe centered on real family needs.",
          ),
        },
        {
          title: t(locale, "Más claro", "Clearer"),
          body: t(
            locale,
            "Explica lo que ofreces con información útil y sin ruido.",
            "Explain what you offer with useful information and less noise.",
          ),
        },
        {
          title: t(locale, "Más conectado", "More connected"),
          body: t(
            locale,
            "Forma parte de una experiencia de cuidado que mira el recorrido completo.",
            "Be part of a care experience that looks at the full journey.",
          ),
        },
      ],
      boundary: t(
        locale,
        "Estar en Chombly no implica tráfico, ventas o resultados garantizados.",
        "Being on Chombly does not imply traffic, sales, or guaranteed results.",
      ),
      tone: "is-ivory",
    },
    partners: {
      audience: "partner",
      eyebrow: t(locale, "Para aliados", "For partners"),
      title: t(
        locale,
        "Hagamos que cuidar sea más fácil, juntos.",
        "Let's make caring easier, together.",
      ),
      description: t(
        locale,
        "Fundaciones, comunidades y aliados pueden ayudar a ampliar acceso, acompañar nuevos comienzos y conectar a más familias con mejores opciones.",
        "Foundations, communities, and partners can help expand access, support new beginnings, and connect more families with better options.",
      ),
      image: "/images/dev-walk.webp",
      imageAlt: t(
        locale,
        "Persona caminando al aire libre con su perro",
        "Person walking outdoors with their dog",
      ),
      cta: t(locale, "Quiero construir con Chombly", "I want to build with Chombly"),
      ctaId: "partner_interest",
      joinPath: join("partner"),
      chapter: t(
        locale,
        "Cuando el acceso crece, el cuidado también",
        "When access grows, care grows too",
      ),
      statement: t(
        locale,
        "Las mejores alianzas empiezan por una necesidad compartida y una forma concreta de actuar.",
        "The best partnerships start with a shared need and a concrete way to act.",
      ),
      points: [
        {
          title: t(locale, "Comunidades", "Communities"),
          body: t(
            locale,
            "Acerca Chombly a personas y mascotas que necesitan mejores opciones.",
            "Bring Chombly to people and pets who need better options.",
          ),
        },
        {
          title: t(locale, "Nuevos comienzos", "New beginnings"),
          body: t(
            locale,
            "Acompaña adopción, educación y transiciones importantes con más contexto.",
            "Support adoption, education, and important transitions with more context.",
          ),
        },
        {
          title: t(locale, "Impacto responsable", "Responsible impact"),
          body: t(
            locale,
            "Define objetivos, responsabilidades y datos con claridad desde el inicio.",
            "Define goals, responsibilities, and data clearly from the start.",
          ),
        },
      ],
      boundary: t(
        locale,
        "Cada alianza requiere un alcance, responsabilidades y gobernanza de datos acordados por separado.",
        "Every partnership needs separately agreed scope, responsibilities, and data governance.",
      ),
      tone: "is-forest",
    },
  };

  return pages[kind];
}

export function AudiencePage({ kind }: { kind: AudiencePageKind }) {
  const locale = useLocale();
  const content = contentFor(kind, locale);
  const seoKey = (
    {
      families: "pet-owners",
      professionals: "professionals",
      clinics: "clinics",
      businesses: "businesses",
      partners: "partners",
    } as const
  )[kind];
  const faqs = seoPages(locale)[seoKey].faqs ?? [];
  return (
    <main id="main-content" className={`v2-audience-page ${content.tone}`}>
      <section className="v2-audience-hero">
        <div className="v2-shell v2-audience-hero-grid">
          <div className="v2-audience-hero-copy">
            <p className="v2-eyebrow">{content.eyebrow}</p>
            <h1>{content.title}</h1>
            <p>{content.description}</p>
            <TrackedLink
              className="v2-button"
              href={content.joinPath}
              target={content.joinPath.startsWith("http") ? "_blank" : undefined}
              rel={content.joinPath.startsWith("http") ? "noopener noreferrer" : undefined}
              eventProperties={{
                cta_id: content.ctaId,
                placement: "audience_hero",
                audience: content.audience,
              }}
            >
              {content.cta} <ArrowUpRight size={18} aria-hidden="true" />
            </TrackedLink>
          </div>
          <figure className="v2-audience-photo">
            <img src={content.image} alt={content.imageAlt} width="1440" height="960" />
            <figcaption>
              {t(locale, "Fotografía temporal de desarrollo", "Temporary development photography")}
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="v2-audience-chapter">
        <div className="v2-shell v2-audience-chapter-grid">
          <div>
            <p className="v2-eyebrow">{content.chapter}</p>
            <h2>{content.statement}</h2>
          </div>
          <ol className="v2-audience-list">
            {content.points.map((point, index) => (
              <li key={point.title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                </div>
                <Check aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </section>
      <FaqSection
        eyebrow={t(locale, "Preguntas frecuentes", "Frequently asked questions")}
        title={t(
          locale,
          "Respuestas claras antes de continuar.",
          "Clear answers before you continue.",
        )}
        faqs={faqs}
      />
      <section className="v2-audience-boundary" data-header-theme="on-dark">
        <div className="v2-shell v2-audience-boundary-grid">
          <ShieldCheck aria-hidden="true" />
          <div>
            <p className="v2-eyebrow">
              {t(locale, "Con claridad desde el principio", "With clarity from the start")}
            </p>
            <h2>{content.boundary}</h2>
          </div>
          <TrackedLink
            className="v2-button v2-button-lime"
            href={content.joinPath}
            target={content.joinPath.startsWith("http") ? "_blank" : undefined}
            rel={content.joinPath.startsWith("http") ? "noopener noreferrer" : undefined}
            eventProperties={{
              cta_id: content.ctaId,
              placement: "audience_boundary",
              audience: content.audience,
            }}
          >
            {content.cta} <ArrowUpRight size={18} aria-hidden="true" />
          </TrackedLink>
        </div>
      </section>
    </main>
  );
}
