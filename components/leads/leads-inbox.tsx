"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useLocale } from "@/components/marketing/locale-context";
import { t } from "@/lib/locale";

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
  source: string;
  route: string;
  status: string;
  crm_status: string;
  created_at: number;
};

const STORAGE_KEY = "chombly_leads_admin_token";

export function LeadsInbox() {
  const locale = useLocale();
  const [token, setToken] = useState("");
  const [draft, setDraft] = useState("");
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = window.sessionStorage.getItem(STORAGE_KEY) || "";
    if (saved) {
      setToken(saved);
      setDraft(saved);
    }
  }, []);

  const load = useCallback(
    async (authToken: string) => {
      if (!authToken.trim()) return;
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/leads/admin?limit=200", {
          headers: { Authorization: `Bearer ${authToken.trim()}` },
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error(
            response.status === 403
              ? t(locale, "Token inválido o no configurado.", "Invalid or missing token.")
              : t(locale, "No pudimos cargar los leads.", "We could not load leads."),
          );
        }
        const data = (await response.json()) as { leads?: LeadRow[] };
        setLeads(data.leads || []);
        window.sessionStorage.setItem(STORAGE_KEY, authToken.trim());
        setToken(authToken.trim());
      } catch (err) {
        setLeads([]);
        setError(err instanceof Error ? err.message : "ERROR");
      } finally {
        setLoading(false);
      }
    },
    [locale],
  );

  useEffect(() => {
    if (token) void load(token);
  }, [token, load]);

  function unlock(event: FormEvent) {
    event.preventDefault();
    void load(draft);
  }

  function clearSession() {
    window.sessionStorage.removeItem(STORAGE_KEY);
    setToken("");
    setDraft("");
    setLeads([]);
    setError(null);
  }

  async function downloadCsv() {
    setError(null);
    try {
      const response = await fetch("/api/leads/admin?format=csv&limit=500", {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(t(locale, "No pudimos exportar.", "Export failed."));
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "chombly-leads.csv";
      anchor.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "ERROR");
    }
  }

  if (!token) {
    return (
      <form className="leads-gate" onSubmit={unlock}>
        <h1>{t(locale, "Inbox de leads", "Leads inbox")}</h1>
        <p>
          {t(
            locale,
            "Usa el token de administración configurado en el servidor.",
            "Use the admin token configured on the server.",
          )}
        </p>
        <label htmlFor="leads-token">{t(locale, "Token", "Token")}</label>
        <input
          id="leads-token"
          type="password"
          autoComplete="current-password"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          required
          minLength={16}
        />
        {error ? <p className="leads-error">{error}</p> : null}
        <button type="submit" className="button" disabled={loading}>
          {loading
            ? t(locale, "Entrando…", "Opening…")
            : t(locale, "Abrir inbox", "Open inbox")}
        </button>
      </form>
    );
  }

  return (
    <div className="leads-inbox">
      <header className="leads-inbox-header">
        <div>
          <p className="eyebrow">{t(locale, "Operaciones", "Operations")}</p>
          <h1>{t(locale, "Leads recientes", "Recent leads")}</h1>
          <p>
            {t(locale, "Mostrando", "Showing")} {leads.length}{" "}
            {t(locale, "registros", "records")}
          </p>
        </div>
        <div className="leads-inbox-actions">
          <button type="button" className="button" onClick={() => void downloadCsv()}>
            {t(locale, "Exportar CSV", "Export CSV")}
          </button>
          <button type="button" className="button leads-secondary" onClick={clearSession}>
            {t(locale, "Cerrar sesión", "Sign out")}
          </button>
          <button
            type="button"
            className="button leads-secondary"
            onClick={() => void load(token)}
            disabled={loading}
          >
            {t(locale, "Actualizar", "Refresh")}
          </button>
        </div>
      </header>
      {error ? <p className="leads-error">{error}</p> : null}
      <div className="leads-table-wrap">
        <table className="leads-table">
          <thead>
            <tr>
              <th>{t(locale, "Fecha", "Date")}</th>
              <th>{t(locale, "Audiencia", "Audience")}</th>
              <th>{t(locale, "Nombre", "Name")}</th>
              <th>{t(locale, "Contacto", "Contact")}</th>
              <th>{t(locale, "Ciudad", "City")}</th>
              <th>{t(locale, "País", "Country")}</th>
              <th>{t(locale, "Rol", "Role")}</th>
              <th>CRM</th>
              <th>{t(locale, "Fuente", "Source")}</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td>{new Date(lead.created_at * 1000).toLocaleString(locale === "en-us" ? "en-US" : "es-CO")}</td>
                <td>{lead.audience}</td>
                <td>{lead.name}</td>
                <td>{lead.email || lead.phone || "—"}</td>
                <td>{lead.city}</td>
                <td>{lead.market}</td>
                <td>{lead.role || lead.organization || "—"}</td>
                <td>{lead.crm_status}</td>
                <td>
                  {lead.source}
                  <br />
                  <small>{lead.route}</small>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && leads.length === 0 ? (
          <p className="leads-empty">
            {t(locale, "Aún no hay leads registrados.", "No leads registered yet.")}
          </p>
        ) : null}
      </div>
    </div>
  );
}
