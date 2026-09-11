import type { LocaleCode } from "@/config/site";
import { t } from "@/lib/locale";

export function marketingV2(locale: LocaleCode) {
  return {
    stage: t(locale, "PRÓXIMAMENTE EN COLOMBIA", "COMING SOON IN COLOMBIA"),
    home: {
      h1: t(
        locale,
        "Tu mascota cuenta contigo. Tú puedes contar con Chombly.",
        "Your pet counts on you. You can count on Chombly.",
      ),
      descriptor: t(
        locale,
        "Una app para resolver dudas, encontrar ayuda profesional y tener lo importante de su cuidado en un solo lugar.",
        "An app to answer questions, find professional help, and keep what matters about their care in one place.",
      ),
    },
    ctas: {
      owner: t(
        locale,
        "Quiero Chombly para mi mascota",
        "I want Chombly for my pet",
      ),
      ownerMicrocopy: t(
        locale,
        "Sé de los primeros en entrar.",
        "Be among the first to join.",
      ),
      b2b: t(locale, "Quiero estar en Chombly", "I want to be on Chombly"),
      ownerMoment: t(
        locale,
        "Quiero tener Chombly a la mano",
        "I want Chombly at hand",
      ),
      professional: t(
        locale,
        "Quiero estar en Chombly",
        "I want to be on Chombly",
      ),
      clinic: t(locale, "Chombly para mi clínica", "Chombly for my clinic"),
      business: t(
        locale,
        "Quiero llevar mi negocio a Chombly",
        "I want to bring my business to Chombly",
      ),
      partner: t(
        locale,
        "Quiero construir con Chombly",
        "I want to build with Chombly",
      ),
    },
    navigation: {
      families: t(locale, "Familias", "Families"),
      professionals: t(locale, "Profesionales", "Professionals"),
      organizations: t(locale, "Clínicas y negocios", "Clinics & businesses"),
      about: t(locale, "Nosotros", "About"),
      clinics: t(locale, "Clínicas", "Clinics"),
      businesses: t(locale, "Negocios pet", "Pet businesses"),
      partners: t(locale, "Partners", "Partners"),
    },
    manifesto: {
      eyebrow: t(locale, "POR QUÉ EXISTE CHOMBLY", "WHY CHOMBLY EXISTS"),
      title: t(
        locale,
        "Para ellos, tú eres su mundo.",
        "To them, you are their world.",
      ),
      bodyOne: t(
        locale,
        "Te esperan. Te buscan. Celebran cuando llegas. Confían en ti sin preguntar cuánto sabes, cuánto tienes o de dónde vienes.",
        "They wait for you. They look for you. They celebrate when you arrive. They trust you without asking how much you know, how much you have, or where you come from.",
      ),
      bodyTwo: t(
        locale,
        "Chombly nace de una idea sencilla: cuidar mejor no debería depender de saberlo todo, conocer a la persona correcta o tener que resolver cada duda por tu cuenta.",
        "Chombly comes from a simple idea: better care should not depend on knowing everything, knowing the right person, or figuring out every question alone.",
      ),
      statement: t(
        locale,
        "Aquí no importa quién eres. Importa a quién estás cuidando.",
        "Here it does not matter who you are. It matters who you are caring for.",
      ),
      bodyThree: t(
        locale,
        "Queremos acercar orientación, profesionales y mejores opciones a las personas que comparten su vida con una mascota.",
        "We want to bring guidance, professionals, and better options to people who share their lives with a pet.",
      ),
      closing: t(
        locale,
        "Porque para nosotros también son familia.",
        "Because for us, they are family too.",
      ),
    },
    footer: {
      tagline: t(
        locale,
        "Más claridad para cuidar. Más cerca cuando importa.",
        "More clarity to care. Closer when it matters.",
      ),
      families: t(locale, "Familias", "Families"),
      forFamilies: t(locale, "Para familias", "For families"),
      professionalsBusinesses: t(
        locale,
        "Profesionales y negocios",
        "Professionals & businesses",
      ),
      contact: t(locale, "Contacto", "Contact"),
      privacy: t(locale, "Privacidad", "Privacy"),
      terms: t(locale, "Términos", "Terms"),
      madeFor: t(
        locale,
        "Hecho para quienes también son familia.",
        "Made for those who are family too.",
      ),
      eggTitle: t(
        locale,
        "Eh… ¿sigues un poco más abajo?",
        "Still peeking a little further down?",
      ),
      eggBody: t(
        locale,
        "Aquí termina la página. Si quieres, el siguiente paso puede ser para ti y tu mascota.",
        "That's the end of the page. If you want, the next step can be for you and your pet.",
      ),
      eggCta: t(
        locale,
        "Quiero conocer Chombly",
        "I want to know Chombly",
      ),
      eggTop: t(locale, "Volver arriba", "Back to top"),
    },
    final: {
      title: t(
        locale,
        "¿Tu mascota también es familia?",
        "Is your pet family too?",
      ),
      body: t(
        locale,
        "Entonces Chombly es para ustedes.",
        "Then Chombly is for you.",
      ),
    },
  } as const;
}

/** @deprecated Prefer marketingV2(locale) */
export const MARKETING_V2 = marketingV2("es-co");
