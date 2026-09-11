"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics/client";

export function SectionBeacon({ sectionId }: { sectionId: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        track("section_viewed", { section_id: sectionId });
        observer.disconnect();
      },
      { threshold: 0.45 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [sectionId]);

  return <span className="v2-section-beacon" ref={ref} aria-hidden="true" />;
}
