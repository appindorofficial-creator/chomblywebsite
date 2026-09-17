import { AudiencePage } from "@/components/marketing/audience-page";
import { JsonLd } from "@/components/seo/json-ld";
import { marketingPageGraph, metadataForSeoPage } from "@/lib/seo";
import { isLocale } from "@/lib/locale";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return metadataForSeoPage(raw, "professionals");
}

export default async function ProfessionalsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  return (
    <>
      <AudiencePage kind="professionals" />
      <JsonLd data={marketingPageGraph(raw, "professionals")} />
    </>
  );
}
