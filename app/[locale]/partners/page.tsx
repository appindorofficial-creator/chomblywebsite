import { AudiencePage } from "@/components/marketing/audience-page";
import { metadataFor } from "@/lib/seo";

export const metadata = metadataFor(
  "Para aliados y fundaciones",
  "Fundaciones, comunidades y aliados para ampliar el acceso a mejores opciones de cuidado.",
  "/es-co/partners",
);

export default function PartnersPage() { return <AudiencePage kind="partners" />; }
