import { db, respond } from "@/lib/server";
import { settings } from "@/db/raw";

export const dynamic = "force-dynamic";

type LeadRow = {
  id: string;
  audience: string;
  name: string;
  email: string | null;
  phone: string | null;
  city: string;
  market: string;
  role: string | null;
  organization: string | null;
  payload: string;
  source: string;
  route: string;
  experiment_id: string | null;
  thesis_id: string | null;
  variant_id: string | null;
  consent_updates: number;
  status: string;
  crm_status: string;
  created_at: number;
};

function authorized(request: Request): boolean {
  const expected = settings().CHOMBLY_LEADS_ADMIN_TOKEN?.trim();
  if (!expected || expected.length < 16) return false;

  const header = request.headers.get("authorization");
  if (header === `Bearer ${expected}`) return true;

  const url = new URL(request.url);
  return url.searchParams.get("token") === expected;
}

function toCsv(rows: LeadRow[]): string {
  const headers = [
    "id",
    "created_at",
    "audience",
    "name",
    "email",
    "phone",
    "city",
    "market",
    "role",
    "organization",
    "source",
    "route",
    "status",
    "crm_status",
    "consent_updates",
    "payload",
  ];
  const escape = (value: string | number | null | undefined) => {
    const raw = value == null ? "" : String(value);
    return `"${raw.replaceAll('"', '""')}"`;
  };
  const lines = [
    headers.join(","),
    ...rows.map((row) =>
      [
        row.id,
        new Date(row.created_at * 1000).toISOString(),
        row.audience,
        row.name,
        row.email,
        row.phone,
        row.city,
        row.market,
        row.role,
        row.organization,
        row.source,
        row.route,
        row.status,
        row.crm_status,
        row.consent_updates,
        row.payload,
      ]
        .map(escape)
        .join(","),
    ),
  ];
  return `${lines.join("\n")}\n`;
}

export async function GET(request: Request) {
  if (!authorized(request)) return respond({ error: "FORBIDDEN" }, 403);

  const url = new URL(request.url);
  const limit = Math.min(
    500,
    Math.max(1, Number(url.searchParams.get("limit") || 100) || 100),
  );

  const result = await db()
    .prepare(
      "SELECT id,audience,name,email,phone,city,market,role,organization,payload,source,route,experiment_id,thesis_id,variant_id,consent_updates,status,crm_status,created_at FROM leads ORDER BY created_at DESC LIMIT ?",
    )
    .bind(limit)
    .all<LeadRow>();

  const leads = result.results || [];
  if (url.searchParams.get("format") === "csv") {
    return new Response(toCsv(leads), {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="chombly-leads.csv"',
        "Cache-Control": "no-store",
      },
    });
  }

  return respond({ leads, count: leads.length });
}
