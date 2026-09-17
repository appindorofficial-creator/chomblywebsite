import { HomePage } from "@/components/marketing/home-page";
import { JsonLd } from "@/components/seo/json-ld";
import {
  metadataForSeoPage,
  marketingPageGraph,
  organizationGraph,
} from "@/lib/seo";
import { isLocale } from "@/lib/locale";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return metadataForSeoPage(raw, "home");
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  return (
    <>
      <HomePage />
      <JsonLd data={organizationGraph(raw)} />
      <JsonLd data={marketingPageGraph(raw, "home")} />
    </>
  );
}
