import { notFound } from "next/navigation";
import { SiteShell } from "@/components/marketing/site-shell";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "es-co") notFound();
  return <SiteShell>{children}</SiteShell>;
}
