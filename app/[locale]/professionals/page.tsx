import { AudiencePage } from "@/components/marketing/audience-page";
import { metadataFor } from "@/lib/seo";

export const metadata = metadataFor(
  "Para profesionales veterinarios",
  "Un nuevo punto de encuentro entre profesionales y familias con mascotas.",
  "/es-co/professionals",
);

export default function ProfessionalsPage() { return <AudiencePage kind="professionals" />; }
