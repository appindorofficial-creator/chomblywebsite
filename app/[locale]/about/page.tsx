import { ArrowUpRight } from "lucide-react";
import { TrackedLink } from "@/components/tracked-link";
import { PUBLIC_LEADERSHIP } from "@/config/leadership";
import { metadataFor } from "@/lib/seo";

export const metadata = metadataFor("Sobre Chombly", "La idea, visión y ecosistema que inspiran una forma más clara de cuidar.", "/es-co/about");

export default function AboutPage() {
  return (
    <main id="main-content" className="v2-about">
      <section className="v2-about-hero">
        <div className="v2-shell">
          <p className="v2-eyebrow">Por qué existe Chombly</p>
          <h1>Nacimos por una idea simple: <span>ellos merecen que cuidar sea más fácil.</span></h1>
          <p>Una mascota no vive su cuidado en categorías. Vive momentos. Chombly imagina una experiencia que los conecta con más claridad, humanidad y mejores opciones.</p>
        </div>
      </section>
      <section className="v2-about-manifesto" data-header-theme="on-dark">
        <div className="v2-shell v2-about-manifesto-grid">
          <div><p className="v2-eyebrow">Nuestro punto de partida</p><h2>Para ellos, tú eres su mundo.</h2></div>
          <div>
            <p>Te esperan. Te buscan. Celebran cuando llegas. Confían en ti sin preguntar cuánto sabes, cuánto tienes o de dónde vienes.</p>
            <p>Chombly nace de una idea sencilla: cuidar mejor no debería depender de saberlo todo, conocer a la persona correcta o resolver cada duda por tu cuenta.</p>
            <blockquote>Aquí no importa quién eres. <span>Importa a quién estás cuidando.</span></blockquote>
          </div>
        </div>
      </section>
      <section className="v2-about-vision">
        <div className="v2-shell v2-about-vision-grid">
          <div><p className="v2-eyebrow">La visión</p><h2>Un ecosistema de cuidado más cerca.</h2></div>
          <div className="v2-about-vision-copy">
            <p>Queremos acercar orientación, profesionales y mejores opciones a las personas que comparten su vida con una mascota.</p>
            <p>Empezamos en Colombia con la ambición de hacer que cada duda tenga más contexto, cada búsqueda tenga mejores caminos y cada historia pueda continuar.</p>
            <strong>Porque para nosotros también son familia.</strong>
          </div>
        </div>
      </section>
      {PUBLIC_LEADERSHIP.length > 0 ? (
        <section className="v2-about-team"><div className="v2-shell"><p className="v2-eyebrow">Personas detrás de Chombly</p><div className="v2-about-team-grid">{PUBLIC_LEADERSHIP.map((person) => <article key={person.name}><h3>{person.name}</h3><p>{person.bio}</p></article>)}</div></div></section>
      ) : null}
      <section className="v2-about-close" data-header-theme="on-dark">
        <div className="v2-shell"><p className="v2-eyebrow">El siguiente momento</p><h2>Construyamos una forma más humana de cuidar.</h2><TrackedLink className="v2-button v2-button-lime" href="/es-co/contact" eventProperties={{ cta_id: "about_contact", placement: "about_close" }}>Hablemos <ArrowUpRight aria-hidden="true" size={18} /></TrackedLink></div>
      </section>
    </main>
  );
}
