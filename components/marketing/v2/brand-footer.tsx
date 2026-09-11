import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { BrandLogo } from "@/components/marketing/v2/brand-logo";
import { FooterEasterEgg } from "@/components/marketing/v2/footer-easter-egg";
import { SITE, FEATURE_FLAGS } from "@/config/site";

const columns = [
  { label: "Familias", links: [["Para familias", "/es-co/pet-owners"]] },
  { label: "Profesionales y negocios", links: [["Profesionales", "/es-co/professionals"], ["Clínicas", "/es-co/clinics"], ["Negocios pet", "/es-co/businesses"], ["Partners", "/es-co/partners"]] },
  { label: "Chombly", links: [["Nosotros", "/es-co/about"], ["Contacto", "/es-co/contact"]] },
  { label: "Legal", links: [["Privacidad", "/es-co/privacy"], ["Términos", "/es-co/terms"]] },
] as const;

export function BrandFooter() {
  return (
    <>
      <footer className="v2-footer" data-header-theme="on-dark">
        <div className="v2-shell v2-footer-top">
          <div className="v2-footer-brand">
            <BrandLogo tone="light" />
            <p>Más claridad para cuidar. Más cerca cuando importa.</p>
            <a href={`mailto:${SITE.operationalEmail}`}><Mail aria-hidden="true" size={16} />{SITE.operationalEmail}</a>
          </div>
          <div className="v2-footer-links">
            {columns.map((column) => (
              <div key={column.label}>
                <p>{column.label}</p>
                {column.links.map(([label, href]) => <Link key={href} href={href}>{label}<ArrowUpRight aria-hidden="true" size={13} /></Link>)}
              </div>
            ))}
          </div>
        </div>
        <div className="v2-shell v2-footer-bottom">
          <span>© {new Date().getUTCFullYear()} Chombly</span>
          <span>Hecho para quienes también son familia.</span>
        </div>
      </footer>
      {FEATURE_FLAGS.mascotFooterEasterEgg ? <FooterEasterEgg /> : null}
    </>
  );
}
