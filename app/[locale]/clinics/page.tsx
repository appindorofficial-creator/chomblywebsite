import { AudiencePage } from "@/components/marketing/audience-page";
import { metadataFor } from "@/lib/seo";
import { isLocale, localizePath, t } from "@/lib/locale";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return metadataFor(
    t(raw, "Para clínicas", "For clinics"),
    t(
      raw,
      "Un nuevo canal para acercar tu clínica a más familias.",
      "A new channel to bring your clinic closer to more families.",
    ),
    localizePath(raw, "/clinics"),
    { locale: raw },
  );
}

export default function ClinicsPage() {
  return <AudiencePage kind="clinics" />;
}
