"use client";

import { useEffect, useRef } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { TrackedLink } from "@/components/tracked-link";
import { useLocale, useMarketing } from "@/components/marketing/locale-context";
import { localizePath } from "@/lib/locale";
import { track } from "@/lib/analytics/client";

export function FooterEasterEgg() {
  const locale = useLocale();
  const copy = useMarketing();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        node.classList.add("is-revealed");
        track("easter_egg_revealed", { section_id: "footer_easter_egg" });
        observer.disconnect();
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="v2-footer-egg" ref={ref} aria-labelledby="footer-egg-title">
      <div className="v2-footer-egg-visual" aria-hidden="true">
        <img src="/brand/v2/chombly-mark.png" alt="" width="400" height="420" />
      </div>
      <div className="v2-footer-egg-copy">
        <h2 id="footer-egg-title">{copy.footer.eggTitle}</h2>
        <p>{copy.footer.eggBody}</p>
        <TrackedLink
          className="v2-egg-cta"
          href={localizePath(locale, "/join", "audience=owner")}
          eventProperties={{
            cta_id: "footer_egg_join",
            placement: "footer_easter_egg",
            audience: "owner",
          }}
        >
          {copy.footer.eggCta} <ArrowUpRight aria-hidden="true" size={16} />
        </TrackedLink>
      </div>
      <a className="v2-egg-top" href="#main-content">
        {copy.footer.eggTop} <ArrowUp aria-hidden="true" size={16} />
      </a>
    </section>
  );
}
