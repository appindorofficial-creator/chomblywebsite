"use client";

import { useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { track } from "@/lib/analytics/client";

export function FooterEasterEgg() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      node.classList.add("is-revealed");
      track("easter_egg_revealed", { section_id: "footer_easter_egg" });
      observer.disconnect();
    }, { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="v2-footer-egg" ref={ref} aria-labelledby="footer-egg-title">
      <div className="v2-footer-egg-visual" aria-hidden="true">
        <img src="/brand/v2/chombly-mark.png" alt="" width="400" height="420" />
      </div>
      <div>
        <h2 id="footer-egg-title">Eh… privacidad, por favor. 👀</h2>
        <p>La página ya se había acabado.</p>
      </div>
      <a className="v2-egg-top" href="#main-content">Volver arriba <ArrowUp aria-hidden="true" size={16} /></a>
    </section>
  );
}
