"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type {
  AnalyticsEventName,
  AnalyticsProperties,
} from "@/lib/analytics/events";
import { track } from "@/lib/analytics/client";

export function PageViewBeacon({ siteMode }: { siteMode: string }) {
  const pathname = usePathname();

  useEffect(() => {
    track("page_viewed", {
      route: pathname,
      locale: pathname.split("/")[1] || "es-co",
      site_mode: siteMode,
    });
  }, [pathname, siteMode]);

  return null;
}

export function EventBeacon({
  name,
  properties,
}: {
  name: AnalyticsEventName;
  properties: AnalyticsProperties;
}) {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    track(name, properties);
  }, [name, properties]);
  return null;
}

