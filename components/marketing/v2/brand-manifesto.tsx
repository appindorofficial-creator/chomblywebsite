import { SectionBeacon } from "@/components/marketing/v2/section-beacon";
import { MARKETING_V2 } from "@/config/marketing-content-v2";

export function BrandManifesto() {
  const copy = MARKETING_V2.manifesto;
  return (
    <section className="v2-manifesto" data-header-theme="on-light" aria-labelledby="manifesto-title">
      <SectionBeacon sectionId="manifesto" />
      <div className="v2-manifesto-image">
        <img src="/images/v2/moment-10.webp" alt="Persona compartiendo un momento cercano con su mascota" width="1200" height="1800" loading="lazy" />
      </div>
      <div className="v2-shell v2-manifesto-copy">
        <p className="v2-eyebrow">{copy.eyebrow}</p>
        <h2 id="manifesto-title">{copy.title}</h2>
        <p>{copy.bodyOne}</p>
        <blockquote>{copy.statement}</blockquote>
        <p>{copy.bodyThree}</p>
        <strong>{copy.closing}</strong>
      </div>
    </section>
  );
}
