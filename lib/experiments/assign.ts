import { createHash } from "node:crypto";
import type { ExperimentId } from "@/config/experiments";

export type ExperimentVariant = "control" | "challenger";

export function assignVariant(
  experimentId: ExperimentId,
  anonymousId: string,
): ExperimentVariant {
  const digest = createHash("sha256")
    .update(`${experimentId}:${anonymousId}`)
    .digest();
  return digest[0] % 2 === 0 ? "control" : "challenger";
}

export function safeAnonymousId(value: string | undefined): string {
  return value && /^[a-f0-9-]{16,64}$/i.test(value)
    ? value
    : "00000000-0000-4000-8000-000000000000";
}

