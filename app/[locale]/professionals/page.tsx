import { AudiencePage } from "@/components/marketing/audience-page";
import { metadataFor } from "@/lib/seo";
import { isLocale, localizePath, t } from "@/lib/locale";

async function meta(
  params: Promise<{ locale: string }>,
  esTitle: string,
  enTitle: string,
  esDesc: string,
  enDesc: string,
  path: string,
) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return metadataFor(t(raw, esTitle, enTitle), t(raw, esDesc, enDesc), localizePath(raw, path), {
    locale: raw,
  });
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return meta(
    params,
    "Para profesionales veterinarios",
    "For veterinary professionals",
    "Un nuevo punto de encuentro entre profesionales y familias con mascotas.",
    "A new meeting point between professionals and pet families.",
    "/professionals",
  );
}

export default function ProfessionalsPage() {
  return <AudiencePage kind="professionals" />;
}
