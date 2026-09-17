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
  return metadataForSeoPage(raw, "businesses");
}

export default async function BusinessesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  return (
    <>
      <AudiencePage kind="businesses" />
      <JsonLd data={marketingPageGraph(raw, "businesses")} />
    </>
  );
}
