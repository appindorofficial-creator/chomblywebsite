"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics/client";

type StoryMoment = {
  label: string;
  detail: string;
  image: string;
  alt: string;
  mobile: boolean;
};

const STORY_MOMENTS: readonly StoryMoment[] = [
  {
    label: "Una nueva llegada",
    detail: "Adopción y primeros días",
    image: "/images/dev-owner.webp",
    alt: "Persona compartiendo en casa con un perro y un gato",
    mobile: true,
  },
  {
    label: "Lo cotidiano",
    detail: "Rutinas que crean contexto",
    image: "/images/dev-walk.webp",
    alt: "Persona paseando con su perro",
    mobile: false,
  },
  {
    label: "Documentos al día",
    detail: "Vacunas e información útil",
    image: "/images/dev-vet.webp",
    alt: "Profesional veterinaria atendiendo a distancia",
    mobile: true,
  },
  {
    label: "Juego y paseo",
    detail: "Hábitos, energía y compañía",
    image: "/images/dev-walk.webp",
    alt: "Persona y perro durante un paseo",
    mobile: false,
  },
  {
    label: "Algo cambia",
    detail: "Una señal genera preguntas",
    image: "/images/dev-owner.webp",
    alt: "Persona observando con atención a su perro",
    mobile: true,
  },
  {
    label: "Conversación profesional",
    detail: "El contexto acompaña la consulta",
    image: "/images/dev-vet.webp",
    alt: "Profesional veterinaria conversando junto a un perro",
    mobile: false,
  },
  {
    label: "De vuelta en casa",
    detail: "Recuperación y cuidado diario",
    image: "/images/dev-owner.webp",
    alt: "Persona cuidando a sus mascotas en casa",
    mobile: true,
  },
  {
    label: "Bienestar cotidiano",
    detail: "Higiene y grooming",
    image: "/images/dev-grooming.webp",
    alt: "Perro durante una rutina de cuidado",
    mobile: false,
  },
  {
    label: "La vida se mueve",
    detail: "Viajes y transiciones",
    image: "/images/dev-walk.webp",
    alt: "Persona trasladándose con su perro",
    mobile: false,
  },
  {
    label: "Etapa adulta",
    detail: "Nuevas rutinas, nuevas preguntas",
    image: "/images/dev-owner.webp",
    alt: "Familia acompañando a un perro adulto",
    mobile: false,
  },
  {
    label: "Años mayores",
    detail: "Más cuidado, más continuidad",
    image: "/images/dev-vet.webp",
    alt: "Profesional veterinaria acompañando el cuidado de un perro",
    mobile: true,
  },
] as const;

const MOTION = {
  desktopMinWidth: 900,
  scrub: 0.65,
  revealDuration: 0.75,
  stagger: 0.08,
} as const;

function prefersDataSavings(): boolean {
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  return Boolean(connection?.saveData);
}

export function StickyStory() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const scope = root;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isDesktop = window.matchMedia(
      `(min-width: ${MOTION.desktopMinWidth}px)`,
    ).matches;
    const dataSaver = prefersDataSavings();

    if (reducedMotion || dataSaver || !isDesktop) {
      track("sticky_story_skipped", {
        reason: reducedMotion
          ? "reduced_motion"
          : dataSaver
            ? "save_data"
            : "compact_layout",
        route: window.location.pathname,
      });
      return;
    }

    let disposed = false;
    let cleanup = () => {};
    let observer: IntersectionObserver | null = null;

    async function animate() {
      const [{ gsap }, scrollModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;

      const ScrollTrigger = scrollModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        const moments = gsap.utils.toArray<HTMLElement>(".story-moment");
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: scope,
            start: "top top+=80",
            end: "bottom bottom-=80",
            scrub: MOTION.scrub,
            invalidateOnRefresh: true,
            onEnter: () =>
              track("sticky_story_entered", {
                route: window.location.pathname,
              }),
            onLeave: () =>
              track("sticky_story_completed", {
                route: window.location.pathname,
              }),
          },
        });

        timeline
          .from(moments, {
            y: 90,
            scale: 0.78,
            opacity: 0,
            duration: MOTION.revealDuration,
            stagger: MOTION.stagger,
            ease: "power2.out",
          })
          .from(
            ".story-center-copy > *",
            {
              y: 24,
              opacity: 0,
              duration: 0.55,
              stagger: 0.1,
            },
            "-=0.25",
          )
          .to(
            moments,
            {
              scale: 1.025,
              duration: 0.5,
              stagger: 0.03,
              ease: "none",
            },
            ">",
          );
      }, scope);

      cleanup = () => context.revert();
    }

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer?.disconnect();
          observer = null;
          void animate();
        },
        { rootMargin: "320px 0px" },
      );
      observer.observe(root);
    } else {
      void animate();
    }

    return () => {
      disposed = true;
      observer?.disconnect();
      cleanup();
    };
  }, []);

  return (
    <section ref={rootRef} className="sticky-story" aria-labelledby="story-title">
      <div className="sticky-story-stage">
        <div className="story-intro container">
          <p className="eyebrow light">Una vida entera, no una lista de servicios</p>
          <h2 id="story-title">Una mascota. Muchos momentos.</h2>
        </div>
        <div className="story-canvas container-wide">
          <div className="story-center-copy">
            <span>El cuidado no debería sentirse</span>
            <strong>fragmentado.</strong>
            <p>Un siguiente paso más claro.</p>
          </div>
          {STORY_MOMENTS.map((moment, index) => (
            <figure
              className={`story-moment story-moment-${index}`}
              data-mobile={moment.mobile ? "true" : "false"}
              key={`${moment.label}-${index}`}
            >
              <img
                src={moment.image}
                alt={moment.alt}
                loading={index < 3 ? "eager" : "lazy"}
                decoding="async"
              />
              <figcaption>
                <strong>{moment.label}</strong>
                <span>{moment.detail}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="story-note container">
          Fotografías temporales de desarrollo. El storyboard final contempla
          producción original para cada momento.
        </p>
      </div>
    </section>
  );
}
