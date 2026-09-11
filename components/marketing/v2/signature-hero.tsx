"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TrackedLink } from "@/components/tracked-link";
import { MARKETING_V2 } from "@/config/marketing-content-v2";
import { track } from "@/lib/analytics/client";

const MOMENTS = [
  { image: "/images/v2/moment-01.webp", fragment: "Una duda." },
  { image: "/images/v2/moment-02.webp", fragment: "Un recordatorio." },
  { image: "/images/v2/moment-03.webp", fragment: "Un profesional." },
  { image: "/images/v2/moment-04.webp", fragment: "Algo que comió." },
  { image: "/images/v2/moment-05.webp", fragment: "Una vacuna." },
  { image: "/images/v2/moment-06.webp", fragment: "Una cita." },
  { image: "/images/v2/moment-07.webp", fragment: "Un cambio de comportamiento." },
  { image: "/images/v2/moment-08.webp", fragment: "Una noche que no te deja tranquilo." },
  { image: "/images/v2/moment-09.webp", fragment: "Una nueva rutina." },
  { image: "/images/v2/moment-10.webp", fragment: "Un momento juntos." },
] as const;

function savesData(): boolean {
  return Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
}

export function SignatureHero() {
  const rootRef = useRef<HTMLElement>(null);
  const [staticMode, setStaticMode] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 767px)").matches;
    const dataSaver = savesData();

    if (reduced || dataSaver) {
      const timer = window.setTimeout(() => setStaticMode(true), 0);
      track("sticky_story_skipped", { reason: reduced ? "reduced_motion" : "save_data" });
      return () => window.clearTimeout(timer);
    }

    let disposed = false;
    let cleanup = () => {};
    const start = async () => {
      const [{ gsap }, scrollModule] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (disposed) return;
      const ScrollTrigger = scrollModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        const moments = gsap.utils.toArray<HTMLElement>(".v21-hero-moment");
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: compact ? 0.45 : 0.8,
            invalidateOnRefresh: true,
            onEnter: () => track("sticky_story_entered", { section_id: "signature_hero" }),
            onLeave: () => track("sticky_story_completed", { section_id: "signature_hero" }),
          },
        });

        if (compact) {
          timeline
            .to(moments, { xPercent: (i) => [28, -32, 18, -24, 34, -18][i] ?? 0, yPercent: (i) => [26, -18, 34, -28, 16, -16][i] ?? 0, scale: (i) => 1 + (i % 3) * 0.04, duration: 1.1, stagger: 0.035, ease: "none" }, 0)
            .to(".v21-hero-opening", { opacity: 0, yPercent: -8, duration: 0.42 }, 0.48)
            .to(".v21-beat-life", { opacity: 1, y: 0, duration: 0.32 }, 0.62)
            .to(".v21-hero-fragment", { opacity: 1, y: 0, duration: 0.22, stagger: 0.04 }, 0.72)
            .to(".v21-beat-life", { opacity: 0, y: -16, duration: 0.26 }, 1.02)
            .to(moments, { xPercent: (i) => (i % 2 ? 74 : -74), yPercent: (i) => (i % 3 - 1) * 18, scale: 0.86, opacity: 0.5, duration: 0.58, ease: "power2.inOut" }, 1.08)
            .to(".v21-hero-fragment", { opacity: 0, duration: 0.18 }, 1.14)
            .to(".v21-beat-resolve", { opacity: 1, y: 0, duration: 0.36 }, 1.26)
            .to(".v21-beat-resolve", { opacity: 0, y: -14, duration: 0.25 }, 1.72)
            .to(".v21-beat-bridge", { opacity: 1, y: 0, duration: 0.32 }, 1.82)
            .to(".v21-hero-exit", { opacity: 1, duration: 0.34 }, 1.9);
        } else {
          timeline
            .to(moments, { xPercent: (i) => [-10, 8, 6, -7, 11, -8, 7, -10, 8, -6][i], yPercent: (i) => [-28, 36, -21, 29, -34, 24, -19, 32, -26, 21][i], scale: (i) => 1 + (i % 4) * 0.025, duration: 1.6, stagger: 0.035, ease: "none" }, 0)
            .to(".v21-hero-opening", { opacity: 0, yPercent: -10, duration: 0.52 }, 0.64)
            .to(".v21-beat-life", { opacity: 1, y: 0, duration: 0.42 }, 0.78)
            .to(".v21-beat-life", { opacity: 0, y: -20, duration: 0.34 }, 1.4)
            .to(".v21-hero-fragment", { opacity: 1, y: 0, duration: 0.24, stagger: 0.055 }, 1.16)
            .to(moments, { xPercent: (i) => [-22, 20, 28, -26, 17, -18, 25, -21, 23, -17][i], yPercent: (i) => [8, -16, 13, -12, 17, -9, 14, -15, 9, -11][i], scale: (i) => 0.94 + (i % 3) * 0.025, rotation: (i) => (i % 2 ? 1.2 : -1.2), duration: 0.9, stagger: 0.018, ease: "power1.inOut" }, 1.42)
            .to(".v21-beat-fragment", { opacity: 1, y: 0, duration: 0.4 }, 1.6)
            .to(".v21-beat-fragment", { opacity: 0, y: -18, duration: 0.34 }, 2.18)
            .to(".v21-hero-fragment", { opacity: 0, duration: 0.24 }, 2.16)
            .to(moments, { xPercent: (i) => (i % 2 ? 86 : -86), yPercent: (i) => (i % 4 - 1.5) * 12, scale: (i) => 0.76 + (i % 2) * 0.06, rotation: 0, opacity: 0.46, duration: 0.9, ease: "power2.inOut" }, 2.12)
            .to(".v21-beat-resolve", { opacity: 1, y: 0, duration: 0.48 }, 2.5)
            .to(".v21-beat-resolve", { opacity: 0, y: -20, duration: 0.34 }, 3.28)
            .to(".v21-beat-bridge", { opacity: 1, y: 0, duration: 0.42 }, 3.46)
            .to(".v21-hero-exit", { opacity: 1, duration: 0.44 }, 3.58);
        }
      }, root);
      cleanup = () => context.revert();
    };

    void start();
    return () => { disposed = true; cleanup(); };
  }, []);

  return (
    <section className={`v21-signature-hero ${staticMode ? "is-static" : ""}`} ref={rootRef} data-header-theme="on-light" aria-labelledby="v21-hero-title">
      <div className="v21-hero-stage">
        <div className="v21-hero-media" aria-hidden="true">
          {MOMENTS.map((moment, index) => (
            <figure className={`v21-hero-moment v21-hero-moment-${index + 1}`} key={moment.image}>
              <img src={moment.image} alt="" width="1200" height="1500" fetchPriority={index < 3 ? "high" : undefined} loading={index < 3 ? "eager" : "lazy"} />
              <figcaption className="v21-hero-fragment">{moment.fragment}</figcaption>
            </figure>
          ))}
        </div>
        <div className="v21-hero-opening v2-shell">
          <p className="v2-kicker"><span />{MARKETING_V2.stage}</p>
          <h1 id="v21-hero-title">Tu mascota cuenta contigo.<span>Tú puedes contar con Chombly.</span></h1>
          <p className="v21-hero-descriptor">{MARKETING_V2.home.descriptor}</p>
          <div className="v21-hero-actions">
            <TrackedLink className="v2-button" href="/es-co/join?audience=owner" eventProperties={{ cta_id: "hero_owner_interest", placement: "hero", audience: "owner" }}>{MARKETING_V2.ctas.owner}<ArrowRight aria-hidden="true" size={18} /></TrackedLink>
            <TrackedLink className="v2-text-link" href="/es-co/join?audience=professional" eventProperties={{ cta_id: "hero_b2b_interest", placement: "hero", audience: "professional" }}>{MARKETING_V2.ctas.b2b}<ArrowUpRight aria-hidden="true" size={17} /></TrackedLink>
          </div>
          <p className="v21-hero-microcopy">{MARKETING_V2.ctas.ownerMicrocopy}</p>
        </div>
        <div className="v21-hero-beat v21-beat-life" aria-hidden="true"><p>Una mascota.</p><strong>Miles de momentos.</strong></div>
        <div className="v21-hero-beat v21-beat-fragment" aria-hidden="true"><strong>Cuidar también es conectar lo que hoy está separado.</strong></div>
        <div className="v21-hero-beat v21-beat-resolve" aria-hidden="true"><strong>Chombly reúne lo que necesitas<br />para que tú te concentres en lo importante.</strong><em>Tu mascota.</em></div>
        <div className="v21-hero-beat v21-beat-bridge" aria-hidden="true"><strong>Aclara tus dudas.</strong><strong>Encuentra ayuda.</strong><strong>Sigue cuidando.</strong></div>
        <div className="v21-hero-exit" aria-hidden="true" />
      </div>
    </section>
  );
}
