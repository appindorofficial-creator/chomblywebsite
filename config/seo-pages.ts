import type { LocaleCode } from "@/config/site";
import { localizePath, t } from "@/lib/locale";

export type SeoPageKey =
  | "home"
  | "pet-owners"
  | "professionals"
  | "clinics"
  | "businesses"
  | "partners"
  | "about"
  | "contact"
  | "privacy"
  | "terms"
  | "join";

export type SeoFaq = { question: string; answer: string };

export type SeoPageDefinition = {
  path: string;
  title: string;
  description: string;
  breadcrumb: string;
  faqs?: readonly SeoFaq[];
  noindex?: boolean;
};

export function seoPages(locale: LocaleCode): Record<SeoPageKey, SeoPageDefinition> {
  return {
    home: {
      path: localizePath(locale),
      title: t(
        locale,
        "App para el cuidado de mascotas en Colombia",
        "Pet care app in Colombia",
      ),
      description: t(
        locale,
        "Chombly ayuda a resolver dudas, encontrar ayuda profesional y llevar lo importante del cuidado de tu mascota en un solo lugar. Próximamente en Colombia.",
        "Chombly helps you answer questions, find professional help, and keep what matters about your pet's care in one place. Coming soon in Colombia.",
      ),
      breadcrumb: t(locale, "Inicio", "Home"),
      faqs: [
        {
          question: t(locale, "¿Qué es Chombly?", "What is Chombly?"),
          answer: t(
            locale,
            "Chombly es una app en construcción para conectar el contexto y el cuidado de las mascotas: orientación, ayuda profesional y continuidad de lo importante.",
            "Chombly is an app in development to connect pet context and care: guidance, professional help, and continuity for what matters.",
          ),
        },
        {
          question: t(
            locale,
            "¿Chombly reemplaza al veterinario?",
            "Does Chombly replace a veterinarian?",
          ),
          answer: t(
            locale,
            "No. Chombly orienta y conecta. No diagnostica, prescribe ni reemplaza la atención veterinaria profesional.",
            "No. Chombly guides and connects. It does not diagnose, prescribe, or replace professional veterinary care.",
          ),
        },
        {
          question: t(
            locale,
            "¿Dónde estará disponible?",
            "Where will it be available?",
          ),
          answer: t(
            locale,
            "Chombly se presenta próximamente en Colombia. Hoy puedes registrar interés para acceso temprano.",
            "Chombly is coming soon in Colombia. Today you can register interest for early access.",
          ),
        },
        {
          question: t(
            locale,
            "¿Para quién es Chombly?",
            "Who is Chombly for?",
          ),
          answer: t(
            locale,
            "Para familias con mascotas, profesionales veterinarios, clínicas, negocios pet y aliados que quieren cuidar con más claridad.",
            "For pet families, veterinary professionals, clinics, pet businesses, and partners who want clearer care.",
          ),
        },
      ],
    },
    "pet-owners": {
      path: localizePath(locale, "/pet-owners"),
      title: t(
        locale,
        "Para familias con mascotas en Colombia",
        "For pet families in Colombia",
      ),
      description: t(
        locale,
        "Orientación, ayuda profesional y herramientas de cuidado para acompañarte con tu perro o gato en lo cotidiano y cuando algo cambia.",
        "Guidance, professional help, and care tools to support you with your dog or cat day to day and when something changes.",
      ),
      breadcrumb: t(locale, "Familias", "Families"),
      faqs: [
        {
          question: t(
            locale,
            "¿Chombly es para perros y gatos?",
            "Is Chombly for dogs and cats?",
          ),
          answer: t(
            locale,
            "Sí. Chombly está pensado para familias que cuidan mascotas —empezando por perros y gatos— y quieren más claridad en el día a día.",
            "Yes. Chombly is built for families who care for pets—starting with dogs and cats—and want more clarity day to day.",
          ),
        },
        {
          question: t(
            locale,
            "¿Sirve si solo tengo una duda ocasional?",
            "Does it help if I only have occasional questions?",
          ),
          answer: t(
            locale,
            "Sí. Está pensado tanto para lo cotidiano como para cuando algo cambia y necesitas orientar el siguiente paso responsable.",
            "Yes. It is meant for everyday moments and for when something changes and you need a responsible next step.",
          ),
        },
        {
          question: t(
            locale,
            "¿Chombly diagnostica a mi mascota?",
            "Does Chombly diagnose my pet?",
          ),
          answer: t(
            locale,
            "No. Orienta y conecta; no diagnostica, prescribe ni reemplaza la atención veterinaria.",
            "No. It guides and connects; it does not diagnose, prescribe, or replace veterinary care.",
          ),
        },
      ],
    },
    professionals: {
      path: localizePath(locale, "/professionals"),
      title: t(
        locale,
        "Para profesionales veterinarios",
        "For veterinary professionals",
      ),
      description: t(
        locale,
        "Un punto de encuentro entre profesionales y familias con mascotas. Registra tu interés para estar en Chombly.",
        "A meeting point between professionals and pet families. Register your interest to be on Chombly.",
      ),
      breadcrumb: t(locale, "Profesionales", "Professionals"),
      faqs: [
        {
          question: t(
            locale,
            "¿Puedo registrar interés como profesional?",
            "Can I register interest as a professional?",
          ),
          answer: t(
            locale,
            "Sí. Puedes indicar tu rol e interés para conversaciones de acceso temprano. La verificación profesional se definirá antes de cualquier operación comercial.",
            "Yes. You can share your role and interest for early-access conversations. Professional verification will be defined before any commercial operation.",
          ),
        },
        {
          question: t(
            locale,
            "¿Chombly reemplaza mi criterio clínico?",
            "Does Chombly replace my clinical judgment?",
          ),
          answer: t(
            locale,
            "No. Chombly no diagnostica ni prescribe; busca acercar contexto y continuidad sin sustituir al profesional.",
            "No. Chombly does not diagnose or prescribe; it aims to bring context and continuity without replacing the professional.",
          ),
        },
        {
          question: t(
            locale,
            "¿Hay tarifas o cupos confirmados?",
            "Are there confirmed fees or slots?",
          ),
          answer: t(
            locale,
            "Todavía no. Hoy el sitio permite registrar interés; disponibilidad, tarifas y criterios se publicarán cuando estén definidos.",
            "Not yet. Today the site lets you register interest; availability, fees, and criteria will be published when defined.",
          ),
        },
      ],
    },
    clinics: {
      path: localizePath(locale, "/clinics"),
      title: t(locale, "Chombly para clínicas veterinarias", "Chombly for veterinary clinics"),
      description: t(
        locale,
        "Un canal para acercar tu clínica a más familias que buscan continuidad y claridad en el cuidado.",
        "A channel to bring your clinic closer to more families looking for continuity and clarity in care.",
      ),
      breadcrumb: t(locale, "Clínicas", "Clinics"),
      faqs: [
        {
          question: t(
            locale,
            "¿Qué gana una clínica con Chombly?",
            "What does a clinic gain with Chombly?",
          ),
          answer: t(
            locale,
            "Un canal potencial para acercarse a familias que buscan continuidad y claridad, sin inventar coberturas o resultados todavía no disponibles.",
            "A potential channel to reach families looking for continuity and clarity, without inventing coverage or outcomes that are not available yet.",
          ),
        },
        {
          question: t(
            locale,
            "¿Ya hay integración operativa?",
            "Is there an operational integration already?",
          ),
          answer: t(
            locale,
            "No. Ahora puedes registrar interés; integraciones y procesos se definirán con alcance y responsabilidades claras.",
            "No. You can register interest now; integrations and processes will be defined with clear scope and responsibilities.",
          ),
        },
        {
          question: t(
            locale,
            "¿Cómo empezamos la conversación?",
            "How do we start the conversation?",
          ),
          answer: t(
            locale,
            "Completa el formulario de clínicas o escríbenos al correo operativo publicado en Contacto.",
            "Complete the clinics form or email the operations address published on Contact.",
          ),
        },
      ],
    },
    businesses: {
      path: localizePath(locale, "/businesses"),
      title: t(locale, "Para negocios pet", "For pet businesses"),
      description: t(
        locale,
        "Acerca peluquería, paseos, hotel, guardería y otros servicios a personas que buscan mejores formas de cuidar.",
        "Bring grooming, walking, boarding, daycare, and other services to people looking for better ways to care.",
      ),
      breadcrumb: t(locale, "Negocios pet", "Pet businesses"),
      faqs: [
        {
          question: t(
            locale,
            "¿Qué tipo de negocios pet caben?",
            "What kinds of pet businesses fit?",
          ),
          answer: t(
            locale,
            "Servicios de cuidado como peluquería, paseos, hotel, guardería y afines. Cada categoría se activará cuando haya criterios claros.",
            "Care services such as grooming, walking, boarding, daycare, and related offerings. Each category will activate when clear criteria exist.",
          ),
        },
        {
          question: t(
            locale,
            "¿Ya puedo publicar mis servicios?",
            "Can I publish my services already?",
          ),
          answer: t(
            locale,
            "Todavía no hay publicación comercial. Hoy puedes registrar interés para conversaciones de acceso temprano.",
            "There is no commercial listing yet. Today you can register interest for early-access conversations.",
          ),
        },
        {
          question: t(
            locale,
            "¿Hay precios públicos en el sitio?",
            "Are there public prices on the site?",
          ),
          answer: t(
            locale,
            "No. No publicamos precios ni cobertura hasta que existan hechos verificables de operación.",
            "No. We do not publish prices or coverage until there are verifiable operating facts.",
          ),
        },
      ],
    },
    partners: {
      path: localizePath(locale, "/partners"),
      title: t(
        locale,
        "Aliados, fundaciones y comunidades",
        "Partners, foundations, and communities",
      ),
      description: t(
        locale,
        "Colabora con Chombly para ampliar acceso a orientación y cuidado animal con más claridad.",
        "Partner with Chombly to expand access to animal guidance and care with more clarity.",
      ),
      breadcrumb: t(locale, "Partners", "Partners"),
      faqs: [
        {
          question: t(
            locale,
            "¿Quiénes pueden ser aliados?",
            "Who can be partners?",
          ),
          answer: t(
            locale,
            "Fundaciones, comunidades, iniciativas académicas y organizaciones que quieran ampliar acceso a orientación y cuidado con claridad.",
            "Foundations, communities, academic initiatives, and organizations that want to expand access to guidance and care with clarity.",
          ),
        },
        {
          question: t(
            locale,
            "¿Una alianza queda activa al enviar el formulario?",
            "Does submitting the form activate a partnership?",
          ),
          answer: t(
            locale,
            "No. El formulario expresa interés. Cada alianza requiere alcance, responsabilidades y gobernanza de datos acordados por separado.",
            "No. The form expresses interest. Every partnership needs separately agreed scope, responsibilities, and data governance.",
          ),
        },
        {
          question: t(
            locale,
            "¿Cómo continuamos?",
            "How do we continue?",
          ),
          answer: t(
            locale,
            "Registra tu interés como aliado o escríbenos al correo operativo para una conversación inicial.",
            "Register interest as a partner or email operations for an initial conversation.",
          ),
        },
      ],
    },
    about: {
      path: localizePath(locale, "/about"),
      title: t(locale, "Sobre Chombly", "About Chombly"),
      description: t(
        locale,
        "Conoce la idea, la visión y el ecosistema detrás de una forma más clara de cuidar a quienes también son familia.",
        "Learn about the idea, vision, and ecosystem behind a clearer way to care for those who are family too.",
      ),
      breadcrumb: t(locale, "Nosotros", "About"),
    },
    contact: {
      path: localizePath(locale, "/contact"),
      title: t(locale, "Contacto Chombly", "Contact Chombly"),
      description: t(
        locale,
        "Escríbenos para acceso temprano, presencia profesional, clínicas, negocios pet o alianzas.",
        "Write to us for early access, professional presence, clinics, pet businesses, or partnerships.",
      ),
      breadcrumb: t(locale, "Contacto", "Contact"),
    },
    privacy: {
      path: localizePath(locale, "/privacy"),
      title: t(locale, "Aviso de privacidad", "Privacy notice"),
      description: t(
        locale,
        "Cómo trata Chombly los datos de formularios públicos de acceso temprano y colaboración.",
        "How Chombly handles data from public early-access and collaboration forms.",
      ),
      breadcrumb: t(locale, "Privacidad", "Privacy"),
    },
    terms: {
      path: localizePath(locale, "/terms"),
      title: t(locale, "Términos de uso", "Terms of use"),
      description: t(
        locale,
        "Condiciones de la experiencia pública de Chombly: interés, límites clínicos y disponibilidad.",
        "Terms for Chombly's public experience: interest registration, clinical limits, and availability.",
      ),
      breadcrumb: t(locale, "Términos", "Terms"),
    },
    join: {
      path: localizePath(locale, "/join"),
      title: t(locale, "Hablar con Chombly", "Talk with Chombly"),
      description: t(
        locale,
        "Familias: abre la app o déjanos un contacto. Profesionales, clínicas y aliados: registra tu interés.",
        "Families: open the app or leave a contact. Professionals, clinics, and partners: register your interest.",
      ),
      breadcrumb: t(locale, "Unirme", "Join"),
      noindex: true,
    },
  };
}
