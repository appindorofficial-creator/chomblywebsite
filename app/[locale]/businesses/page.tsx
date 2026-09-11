import { AudiencePage } from "@/components/marketing/audience-page";
import { metadataFor } from "@/lib/seo";

export const metadata = metadataFor("Para negocios pet", "Acerca tus servicios a personas que buscan mejores formas de cuidar a sus mascotas.", "/es-co/businesses");

export default function BusinessesPage() { return <AudiencePage kind="businesses" />; }
