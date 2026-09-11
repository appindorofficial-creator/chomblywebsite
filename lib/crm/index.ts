import { settings } from "@/db/raw";
import type { LeadInput } from "@/lib/leads/schema";

export type CrmLeadEnvelope = Pick<
  LeadInput,
  | "audience"
  | "name"
  | "email"
  | "phone"
  | "city"
  | "market"
  | "organization"
  | "source"
  | "route"
  | "experimentId"
  | "thesisId"
  | "variantId"
  | "consentResearch"
  | "consentUpdates"
> & {
  leadId: string;
  structuredAttributes: Record<string, string>;
};

export type CrmSyncStatus = "local_only" | "synced" | "pending_retry";

function safeWebhookUrl(value: string | undefined): URL | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

export async function syncLeadToCrm(
  lead: CrmLeadEnvelope,
): Promise<CrmSyncStatus> {
  const config = settings();
  if (config.CHOMBLY_CRM_ADAPTER !== "webhook") return "local_only";

  const url = safeWebhookUrl(config.CHOMBLY_CRM_WEBHOOK_URL);
  const token = config.CHOMBLY_CRM_WEBHOOK_TOKEN;
  if (!url || !token) return "pending_retry";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Idempotency-Key": lead.leadId,
      },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(5_000),
    });
    return response.ok ? "synced" : "pending_retry";
  } catch {
    return "pending_retry";
  }
}

