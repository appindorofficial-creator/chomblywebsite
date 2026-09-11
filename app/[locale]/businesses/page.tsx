import { AudiencePage } from "@/components/marketing/audience-page";
import { metadataFor } from "@/lib/seo";
import { isLocale, localizePath, t } from "@/lib/locale";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return metadataFor(
    t(raw, "Para negocios pet", "For pet businesses"),
    t(
      raw,
      "Acerca tus servicios a personas que buscan mejores formas de cuidar a sus mascotas.",
      "Bring your services to people looking for better ways to care for their pets.",
    ),
    localizePath(raw, "/businesses"),
    { locale: raw },
  );
}

export default function BusinessesPage() {
  return <AudiencePage kind="businesses" />;
}
