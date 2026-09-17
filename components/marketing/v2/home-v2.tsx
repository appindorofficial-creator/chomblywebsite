import { SignatureHero } from "@/components/marketing/v2/signature-hero";
import { CareTriad } from "@/components/marketing/v2/care-triad";
import { MidnightMoment } from "@/components/marketing/v2/midnight-moment";
import { EcosystemStage } from "@/components/marketing/v2/ecosystem-stage";
import { EverydayValue } from "@/components/marketing/v2/everyday-value";
import { BrandManifesto } from "@/components/marketing/v2/brand-manifesto";
import { HomeFaq } from "@/components/marketing/v2/home-faq";
import { FinalConversion } from "@/components/marketing/v2/final-conversion";

export function HomeV2() {
  return (
    <main className="v2-home" id="main-content">
      <SignatureHero />
      <CareTriad />
      <MidnightMoment />
      <EcosystemStage />
      <EverydayValue />
      <BrandManifesto />
      <HomeFaq />
      <FinalConversion />
    </main>
  );
}
