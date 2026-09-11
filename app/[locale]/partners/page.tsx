import { AudiencePage } from "@/components/marketing/audience-page";
import { metadataFor } from "@/lib/seo";
import { isLocale, localizePath, t } from "@/lib/locale";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return metadataFor(
    t(raw, "Para aliados", "For partners"),
    t(
      raw,
      "Fundaciones, comunidades y aliados que amplían acceso al cuidado.",
      "Foundations, communities, and partners expanding access to care.",
    ),
    localizePath(raw, "/partners"),
    { locale: raw },
  );
}

export default function PartnersPage() {
  return <AudiencePage kind="partners" />;
}
