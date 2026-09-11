import { HomePage } from "@/components/marketing/home-page";
import { jsonLd, metadataFor, organizationGraph } from "@/lib/seo";
import { isLocale, localizePath, t } from "@/lib/locale";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return metadataFor(
    t(raw, "Tu mascota cuenta contigo", "Your pet counts on you"),
    t(
      raw,
      "Una app para resolver dudas, encontrar profesionales, clínicas y servicios pet, y llevar contigo lo importante de su cuidado.",
      "An app to answer questions, find professionals, clinics, and pet services, and carry what matters about their care with you.",
    ),
    localizePath(raw),
    { locale: raw },
  );
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(organizationGraph(raw)),
        }}
      />
    </>
  );
}
