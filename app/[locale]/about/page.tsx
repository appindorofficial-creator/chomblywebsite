import { metadataFor } from "@/lib/seo";
import { isLocale, localizePath, t } from "@/lib/locale";
import AboutPage from "./about-client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return metadataFor(
    t(raw, "Sobre Chombly", "About Chombly"),
    t(
      raw,
      "La idea, visión y ecosistema que inspiran una forma más clara de cuidar.",
      "The idea, vision, and ecosystem behind a clearer way to care.",
    ),
    localizePath(raw, "/about"),
    { locale: raw },
  );
}

export default AboutPage;
