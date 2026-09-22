"use client";

import { useEffect } from "react";
import { FEATURE_FLAGS } from "@/config/site";

/**
 * Boots PostHog when NEXT_PUBLIC_POSTHOG_KEY + HOST are configured.
 * `track()` already forwards to window.posthog.capture once available.
 */
export function PostHogInit() {
  useEffect(() => {
    if (!FEATURE_FLAGS.posthog || typeof window === "undefined") return;
    if (window.posthog?.__loaded) return;

    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST?.replace(/\/$/, "");
    if (!key || !host) return;

    // Official PostHog array.js loader (stub queues calls until ready).
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (function (t: Document, e: any) {
      if (e.__SV) return;
      const w = window as any;
      w.posthog = e;
      e._i = [];
      e.init = function (i: string, s: Record<string, unknown>, a?: string) {
        function g(obj: any, method: string) {
          const parts = method.split(".");
          let target = obj;
          let name = method;
          if (parts.length === 2) {
            target = obj[parts[0]];
            name = parts[1];
          }
          target[name] = function (...args: unknown[]) {
            target.push([name, ...args]);
          };
        }
        const p = t.createElement("script");
        p.type = "text/javascript";
        p.crossOrigin = "anonymous";
        p.async = true;
        p.src = `${String(s.api_host).replace(".i.posthog.com", "-assets.i.posthog.com")}/static/array.js`;
        const r = t.getElementsByTagName("script")[0];
        r?.parentNode?.insertBefore(p, r);
        let u: any = e;
        if (a !== undefined) u = e[a] = [];
        else a = "posthog";
        u.people = u.people || [];
        u.toString = function (this: unknown, includePeople?: boolean) {
          let out = "posthog";
          if (a !== "posthog") out += `.${a}`;
          if (!includePeople) out += " (stub)";
          return out;
        };
        u.people.toString = function () {
          return `${u.toString(1)}.people (stub)`;
        };
        const methods =
          "init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(
            " ",
          );
        for (const method of methods) g(u, method);
        e._i.push([i, s, a]);
      };
      e.__SV = 1;
    })(document, window.posthog || []);
    /* eslint-enable @typescript-eslint/no-explicit-any */

    window.posthog?.init?.(key, {
      api_host: host,
      person_profiles: "identified_only",
      capture_pageview: false,
      capture_pageleave: true,
      persistence: "localStorage+cookie",
    });
    if (window.posthog) window.posthog.__loaded = true;
  }, []);

  return null;
}
