import { BrandHeader } from "@/components/marketing/v2/brand-header";
import { BrandFooter } from "@/components/marketing/v2/brand-footer";
import { RouteTransitionProvider } from "@/components/marketing/v2/route-transition-provider";
import { LocaleProvider } from "@/components/marketing/locale-context";
import { DocumentLang } from "@/components/seo/document-lang";
import type { LocaleCode } from "@/config/site";

export function SiteShell({
  locale,
  children,
}: {
  locale: LocaleCode;
  children: React.ReactNode;
}) {
  return (
    <LocaleProvider locale={locale}>
      <DocumentLang locale={locale} />
      <RouteTransitionProvider>
        <div className="v2-site-frame" lang={locale === "en-us" ? "en-US" : "es-CO"}>
          <BrandHeader />
          {children}
          <BrandFooter />
        </div>
      </RouteTransitionProvider>
    </LocaleProvider>
  );
}
