import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TrackedLink } from "@/components/tracked-link";
import { SectionBeacon } from "@/components/marketing/v2/section-beacon";
import { MARKETING_V2 } from "@/config/marketing-content-v2";

export function FinalConversion() {
  return (
    <section className="v2-final-conversion" data-header-theme="on-dark" aria-labelledby="final-conversion-title">
      <SectionBeacon sectionId="final_conversion" />
      <div className="v2-shell v2-final-conversion-inner">
        <img src="/brand/v2/chombly-mark.png" alt="" width="400" height="420" />
        <h2 id="final-conversion-title">¿Tu mascota también es familia?</h2>
        <p>Entonces Chombly es para ustedes.</p>
        <div className="v2-final-actions">
          <TrackedLink
            className="v2-button v2-button-lime"
            href="/es-co/join?audience=owner"
            eventProperties={{ cta_id: "final_owner_interest", placement: "final", audience: "owner" }}
          >
            {MARKETING_V2.ctas.owner}<ArrowRight aria-hidden="true" size={18} />
          </TrackedLink>
          <TrackedLink
            className="v2-text-link is-light"
            href="/es-co/join?audience=professional"
            eventProperties={{ cta_id: "final_b2b_interest", placement: "final", audience: "professional" }}
          >
            {MARKETING_V2.ctas.b2b}<ArrowUpRight aria-hidden="true" size={17} />
          </TrackedLink>
        </div>
        <small>{MARKETING_V2.ctas.ownerMicrocopy}</small>
      </div>
    </section>
  );
}
