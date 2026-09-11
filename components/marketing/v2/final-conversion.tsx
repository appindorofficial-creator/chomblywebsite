"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TrackedLink } from "@/components/tracked-link";
import { SectionBeacon } from "@/components/marketing/v2/section-beacon";
import { useLocale, useMarketing } from "@/components/marketing/locale-context";
import { localizePath } from "@/lib/locale";

export function FinalConversion() {
  const locale = useLocale();
  const copy = useMarketing();
  return (
    <section className="v2-final-conversion" data-header-theme="on-dark" aria-labelledby="final-conversion-title">
      <SectionBeacon sectionId="final_conversion" />
      <div className="v2-shell v2-final-conversion-inner">
        <img src="/brand/v2/chombly-mark.png" alt="" width="400" height="420" />
        <h2 id="final-conversion-title">{copy.final.title}</h2>
        <p>{copy.final.body}</p>
        <div className="v2-final-actions">
          <TrackedLink
            className="v2-button v2-button-lime"
            href={localizePath(locale, "/join", "audience=owner")}
            eventProperties={{ cta_id: "final_owner_interest", placement: "final", audience: "owner" }}
          >
            {copy.ctas.owner}
            <ArrowRight aria-hidden="true" size={18} />
          </TrackedLink>
          <TrackedLink
            className="v2-text-link is-light"
            href={localizePath(locale, "/join", "audience=professional")}
            eventProperties={{ cta_id: "final_b2b_interest", placement: "final", audience: "professional" }}
          >
            {copy.ctas.b2b}
            <ArrowUpRight aria-hidden="true" size={17} />
          </TrackedLink>
        </div>
        <small>{copy.ctas.ownerMicrocopy}</small>
      </div>
    </section>
  );
}
