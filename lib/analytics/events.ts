export const ANALYTICS_EVENTS = [
  "page_viewed",
  "section_viewed",
  "audience_selected",
  "ecosystem_mode_selected",
  "cta_clicked",
  "experiment_exposed",
  "sticky_story_entered",
  "sticky_story_completed",
  "sticky_story_skipped",
  "route_transition_started",
  "form_started",
  "form_submitted",
  "form_submission_failed",
  "app_store_clicked",
  "easter_egg_revealed",
] as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[number];

export type AnalyticsProperties = {
  route?: string;
  locale?: string;
  market?: string;
  audience?: string;
  cta_id?: string;
  form_id?: string;
  placement?: string;
  section_id?: string;
  ecosystem_mode?: string;
  experiment_id?: string;
  thesis_id?: string;
  variant_id?: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  device_class?: string;
  reduced_motion?: string;
  consent_state?: string;
  reason?: string;
  site_mode?: string;
};

const ALLOWED_PROPERTY_KEYS = new Set<keyof AnalyticsProperties>([
  "route",
  "locale",
  "market",
  "audience",
  "cta_id",
  "form_id",
  "placement",
  "section_id",
  "ecosystem_mode",
  "experiment_id",
  "thesis_id",
  "variant_id",
  "source",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "device_class",
  "reduced_motion",
  "consent_state",
  "reason",
  "site_mode",
]);

export function sanitizeProperties(
  properties: AnalyticsProperties,
): AnalyticsProperties {
  return Object.fromEntries(
    Object.entries(properties).filter(
      ([key, value]) =>
        ALLOWED_PROPERTY_KEYS.has(key as keyof AnalyticsProperties) &&
        typeof value === "string" &&
        value.length <= 160,
    ),
  ) as AnalyticsProperties;
}
