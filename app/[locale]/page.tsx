import { HomePage } from "@/components/marketing/home-page";
import { jsonLd, metadataFor, organizationGraph } from "@/lib/seo";

export const metadata = metadataFor(
  "Tu mascota cuenta contigo",
  "Una app para resolver dudas, encontrar profesionales, clínicas y servicios pet, y llevar contigo lo importante de su cuidado.",
  "/es-co",
);

export default function LocaleHomePage() {
  return (
    <>
      <HomePage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(organizationGraph()) }}
      />
    </>
  );
}
