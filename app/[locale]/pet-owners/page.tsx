import { AudiencePage } from "@/components/marketing/audience-page";
import { metadataFor } from "@/lib/seo";
import { isLocale, localizePath, t } from "@/lib/locale";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return metadataFor(
    t(raw, "Para familias con mascotas", "For pet families"),
    t(
      raw,
      "Orientación, ayuda profesional y herramientas de cuidado para acompañarte con tu mascota.",
      "Guidance, professional help, and care tools to support you with your pet.",
    ),
    localizePath(raw, "/pet-owners"),
    { locale: raw },
  );
}

export default function PetOwnersPage() {
  return <AudiencePage kind="families" />;
}
