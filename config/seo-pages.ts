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
      title: t(locale, "Quiero entrar a Chombly", "I want to join Chombly"),
      description: t(
        locale,
        "Registra tu interés para acceso temprano como familia, profesional, clínica o aliado.",
        "Register your interest for early access as a family, professional, clinic, or partner.",
      ),
      breadcrumb: t(locale, "Unirme", "Join"),
      noindex: true,
    },
  };
}
