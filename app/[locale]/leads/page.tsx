import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LeadsInbox } from "@/components/leads/leads-inbox";
import { isLocale, t } from "@/lib/locale";
import type { LocaleCode } from "@/config/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "es-co") as LocaleCode;
  return {
    title: t(locale, "Inbox de leads", "Leads inbox"),
    robots: { index: false, follow: false },
  };
}

export default async function LeadsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <main id="main-content" className="leads-page">
      <div className="v2-shell">
        <LeadsInbox />
      </div>
    </main>
  );
}
