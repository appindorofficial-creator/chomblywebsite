import { settings } from "@/db/raw";
import { SITE } from "@/config/site";
import type { LeadInput } from "@/lib/leads/schema";

export type LeadMailContext = Pick<
  LeadInput,
  | "audience"
  | "name"
  | "email"
  | "phone"
  | "city"
  | "market"
  | "contactPreference"
  | "organization"
  | "source"
  | "route"
> & {
  leadId: string;
  role?: string | null;
};

export type LeadMailResult = {
  confirmation: "sent" | "skipped" | "failed";
  alert: "sent" | "skipped" | "failed";
};

type MailMessage = {
  to: string;
  subject: string;
  text: string;
};

function localeFromRoute(route: string): "es-co" | "en-us" {
  return route.startsWith("/en-us") ? "en-us" : "es-co";
}

function audienceLabel(audience: LeadInput["audience"], en: boolean): string {
  const map = {
    owner: en ? "Family" : "Familia",
    professional: en ? "Professional" : "Profesional",
    clinic: en ? "Clinic" : "Clínica",
    partner: en ? "Partner" : "Aliado",
  } as const;
  return map[audience];
}

function buildConfirmation(lead: LeadMailContext): MailMessage | null {
  const email = lead.email?.trim();
  if (!email) return null;
  const en = localeFromRoute(lead.route) === "en-us";

  if (en) {
    if (lead.audience === "owner") {
      return {
        to: email,
        subject: "We received your Chombly details",
        text: [
          `Hi ${lead.name},`,
          "",
          "Thanks for writing to Chombly. The app is available whenever you want to explore it. We may also contact you through the channel you preferred.",
          "",
          `Audience: ${audienceLabel(lead.audience, true)}`,
          `City: ${lead.city}`,
          "",
          "If you did not send this request, you can ignore this message.",
          "",
          "— Chombly",
        ].join("\n"),
      };
    }
    return {
      to: email,
      subject: "We received your Chombly interest",
      text: [
        `Hi ${lead.name},`,
        "",
        "Thanks for writing to Chombly. We received your request and our team may contact you through the channel you preferred.",
        "",
        `Audience: ${audienceLabel(lead.audience, true)}`,
        `City: ${lead.city}`,
        "",
        "If you did not send this request, you can ignore this message.",
        "",
        "— Chombly",
      ].join("\n"),
    };
  }

  if (lead.audience === "owner") {
    return {
      to: email,
      subject: "Recibimos tus datos en Chombly",
      text: [
        `Hola ${lead.name},`,
        "",
        "Gracias por escribirnos. La app ya está disponible cuando quieras explorarla. También podremos contactarte por el medio que preferiste.",
        "",
        `Audiencia: ${audienceLabel(lead.audience, false)}`,
        `Ciudad: ${lead.city}`,
        "",
        "Si no enviaste esta solicitud, puedes ignorar este mensaje.",
        "",
        "— Chombly",
      ].join("\n"),
    };
  }

  return {
    to: email,
    subject: "Recibimos tu interés en Chombly",
    text: [
      `Hola ${lead.name},`,
      "",
      "Gracias por escribirnos. Recibimos tu solicitud y el equipo podrá contactarte por el medio que preferiste.",
      "",
      `Audiencia: ${audienceLabel(lead.audience, false)}`,
      `Ciudad: ${lead.city}`,
      "",
      "Si no enviaste esta solicitud, puedes ignorar este mensaje.",
      "",
      "— Chombly",
    ].join("\n"),
  };
}

function buildOpsAlert(lead: LeadMailContext, alertTo: string): MailMessage {
  const lines = [
    "Nuevo lead en Chombly",
    "",
    `id: ${lead.leadId}`,
    `audience: ${lead.audience}`,
    `name: ${lead.name}`,
    `email: ${lead.email || "—"}`,
    `phone: ${lead.phone || "—"}`,
    `preference: ${lead.contactPreference}`,
    `city: ${lead.city}`,
    `market: ${lead.market}`,
    `role: ${lead.role || "—"}`,
    `organization: ${lead.organization || "—"}`,
    `source: ${lead.source}`,
    `route: ${lead.route}`,
  ];
  return {
    to: alertTo,
    subject: `[Chombly lead] ${lead.audience} · ${lead.name}`,
    text: lines.join("\n"),
  };
}

async function sendWithResend(
  apiKey: string,
  from: string,
  message: MailMessage,
): Promise<boolean> {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [message.to],
        subject: message.subject,
        text: message.text,
      }),
      signal: AbortSignal.timeout(8_000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Sends lead confirmation (when email present) + ops alert.
 * No-ops when CHOMBLY_EMAIL_ADAPTER is not `resend` or credentials are missing.
 * Never throws — lead persistence must not depend on mail delivery.
 */
export async function notifyLeadEmails(
  lead: LeadMailContext,
): Promise<LeadMailResult> {
  const config = settings();
  if (config.CHOMBLY_EMAIL_ADAPTER !== "resend") {
    return { confirmation: "skipped", alert: "skipped" };
  }

  const apiKey = config.CHOMBLY_RESEND_API_KEY?.trim();
  const from = config.CHOMBLY_EMAIL_FROM?.trim();
  if (!apiKey || !from) {
    return { confirmation: "skipped", alert: "skipped" };
  }

  const alertTo =
    config.CHOMBLY_LEADS_ALERT_EMAIL?.trim() ||
    SITE.operationalEmail ||
    "Chomblypet@gmail.com";

  const confirmation = buildConfirmation(lead);
  const alert = buildOpsAlert(lead, alertTo);

  const [confirmationOk, alertOk] = await Promise.all([
    confirmation
      ? sendWithResend(apiKey, from, confirmation)
      : Promise.resolve(null),
    sendWithResend(apiKey, from, alert),
  ]);

  return {
    confirmation:
      confirmationOk === null ? "skipped" : confirmationOk ? "sent" : "failed",
    alert: alertOk ? "sent" : "failed",
  };
}
