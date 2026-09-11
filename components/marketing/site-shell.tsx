import { BrandHeader } from "@/components/marketing/v2/brand-header";
import { BrandFooter } from "@/components/marketing/v2/brand-footer";
import { RouteTransitionProvider } from "@/components/marketing/v2/route-transition-provider";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <RouteTransitionProvider>
      <div className="v2-site-frame">
        <BrandHeader />
        {children}
        <BrandFooter />
      </div>
    </RouteTransitionProvider>
  );
}
