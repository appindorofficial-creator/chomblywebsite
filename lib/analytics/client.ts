"use client";

import type {
  AnalyticsEventName,
  AnalyticsProperties,
} from "@/lib/analytics/events";
import { sanitizeProperties } from "@/lib/analytics/events";

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void;
    };
    __CHOMBLY_ANALYTICS__?: {
      name: string;
      properties: AnalyticsProperties;
      at: number;
    }[];
  }
}

export function track(
  name: AnalyticsEventName,
  properties: AnalyticsProperties = {},
): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const routeLocale = window.location.pathname.split("/")[1];
  const context: AnalyticsProperties = {
    locale: /^[a-z]{2}-[a-z]{2}$/.test(routeLocale || "") ? routeLocale : "es-co",
    market: "CO",
    route: window.location.pathname,
    device_class:
      window.innerWidth < 600
        ? "mobile"
        : window.innerWidth < 900
          ? "tablet"
          : "desktop",
    reduced_motion: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "true"
      : "false",
    consent_state: "not_applicable",
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
    utm_content: params.get("utm_content") || undefined,
    utm_term: params.get("utm_term") || undefined,
  };
  const safe = sanitizeProperties({ ...context, ...properties });

  window.__CHOMBLY_ANALYTICS__ ??= [];
  window.__CHOMBLY_ANALYTICS__.push({ name, properties: safe, at: Date.now() });

  if (window.posthog?.capture) {
    window.posthog.capture(name, safe);
  }
}
