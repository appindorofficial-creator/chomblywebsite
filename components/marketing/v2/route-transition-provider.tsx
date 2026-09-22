"use client";

import { useEffect, useRef, useState } from "react";
import { FEATURE_FLAGS } from "@/config/site";
import { track } from "@/lib/analytics/client";

const INTRO_KEY = "chombly:v2:intro-seen";

export function RouteTransitionProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState<boolean>(FEATURE_FLAGS.brandIntro);
  const moving = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = window.sessionStorage.getItem(INTRO_KEY) === "1";
    if (!FEATURE_FLAGS.brandIntro || seen) {
      const timer = window.setTimeout(() => setVisible(false), 0);
      return () => window.clearTimeout(timer);
    }
    window.sessionStorage.setItem(INTRO_KEY, "1");
    const timer = window.setTimeout(() => setVisible(false), reduced ? 120 : 480);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!FEATURE_FLAGS.routeTransitions) return;

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) return;

      const target = event.target instanceof Element ? event.target.closest("a") : null;
      const href = target?.getAttribute("href");
      const targetMode = target?.getAttribute("target");
      if (
        !href ||
        targetMode === "_blank" ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        /^https?:\/\//i.test(href)
      ) {
        return;
      }

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname && url.search === window.location.search) return;

      event.preventDefault();
      if (moving.current) return;
      moving.current = true;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      track("route_transition_started", { route: url.pathname });
      setVisible(true);
      window.setTimeout(() => {
        window.location.assign(`${url.pathname}${url.search}${url.hash}`);
      }, reduced ? 20 : 180);
    };

    const onPopState = () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setVisible(true);
      window.setTimeout(() => setVisible(false), reduced ? 40 : 220);
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  return (
    <>
      <div
        className={`v2-transition-overlay ${visible ? "is-visible" : ""}`}
        aria-hidden="true"
      >
        <img src="/brand/v2/chombly-mark.png" alt="" width="400" height="420" />
      </div>
      {children}
    </>
  );
}
