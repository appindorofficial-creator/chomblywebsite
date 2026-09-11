import { AudiencePage } from "@/components/marketing/audience-page";
import { metadataFor } from "@/lib/seo";

export const metadata = metadataFor(
  "Para clínicas y equipos",
  "Un nuevo canal para acercar tu clínica a más familias y mantener la relación presente.",
  "/es-co/clinics",
);

export default function ClinicsPage() { return <AudiencePage kind="clinics" />; }
