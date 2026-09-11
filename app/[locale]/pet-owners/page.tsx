import { AudiencePage } from "@/components/marketing/audience-page";
import { metadataFor } from "@/lib/seo";

export const metadata = metadataFor(
  "Para familias con mascotas",
  "Orientación, ayuda profesional y herramientas de cuidado para acompañarte con tu mascota.",
  "/es-co/pet-owners",
);

export default function PetOwnersPage() { return <AudiencePage kind="families" />; }
