import { db, guarded, input, now, respond } from "@/lib/server";
import { leadSchema, structuredLeadPayload } from "@/lib/leads/schema";
import { syncLeadToCrm } from "@/lib/crm";
import { notifyLeadEmails } from "@/lib/email/leads";
import { createServerId } from "@/lib/ids";

export const dynamic = "force-dynamic";

function normalizedContact(email?: string, phone?: string): string {
  return email?.trim().toLowerCase() || phone?.replace(/\D/g, "") || "";
}

export async function POST(request: Request) {
  return guarded(async () => {
    const parsed = leadSchema.safeParse(await input(request));
    if (!parsed.success) {
      return respond(
        {
          error: "FIELDS",
          fields: parsed.error.issues.map((issue) => issue.path[0]).filter(Boolean),
        },
        422,
      );
    }

    const data = parsed.data;
    const existing = await db()
      .prepare("SELECT id FROM leads WHERE idempotency_key=?")
      .bind(data.idempotencyKey)
      .first<{ id: string }>();
    if (existing) return respond({ id: existing.id, accepted: true });

    const contact = normalizedContact(data.email, data.phone);
    if (!contact) return respond({ error: "CONTACT_REQUIRED" }, 422);

    const column = data.email ? "lower(email)" : "replace(replace(replace(replace(phone,' ',''),'-',''),'(',''),')','')";
    const count = await db()
      .prepare(`SELECT COUNT(*) AS total FROM leads WHERE ${column}=? AND created_at>?`)
      .bind(contact, now() - 3600)
      .first<{ total: number }>();
    if ((count?.total || 0) >= 5) return respond({ error: "RATE_LIMIT" }, 429);

    const leadId = createServerId();
    const structuredAttributes = structuredLeadPayload(data);
    const role = data.professionalRole || data.clinicRole || null;
    await db()
      .prepare(
        "INSERT INTO leads(id,idempotency_key,audience,name,email,phone,city,market,role,organization,payload,source,route,experiment_id,thesis_id,variant_id,consent_research,consent_updates,status,crm_status,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, 'new','local_only',?) ON CONFLICT(idempotency_key) DO NOTHING",
      )
      .bind(
        leadId,
        data.idempotencyKey,
        data.audience,
        data.name,
        data.email || null,
        data.phone || null,
        data.city,
        data.market,
        role,
        data.organization || null,
        JSON.stringify(structuredAttributes),
        data.source,
        data.route,
        data.experimentId || null,
        data.thesisId || null,
        data.variantId || null,
        1,
        data.consentUpdates ? 1 : 0,
        now(),
      )
      .run();

    const crmStatus = await syncLeadToCrm({
      leadId,
      audience: data.audience,
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      market: data.market,
      organization: data.organization,
      source: data.source,
      route: data.route,
      experimentId: data.experimentId,
      thesisId: data.thesisId,
      variantId: data.variantId,
      consentResearch: data.consentResearch,
      consentUpdates: data.consentUpdates,
      structuredAttributes,
    });

    if (crmStatus !== "local_only") {
      await db()
        .prepare("UPDATE leads SET crm_status=? WHERE id=?")
        .bind(crmStatus, leadId)
        .run();
    }

    // Best-effort mail; never block acceptance on provider errors.
    try {
      await notifyLeadEmails({
        leadId,
        audience: data.audience,
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        market: data.market,
        contactPreference: data.contactPreference,
        organization: data.organization,
        source: data.source,
        route: data.route,
        role,
      });
    } catch (error) {
      console.error("[leads.email]", error);
    }

    return respond({ id: leadId, accepted: true }, 201);
  });
}
