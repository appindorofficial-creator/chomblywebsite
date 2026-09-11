import type { Metadata } from "next";
import { PageViewBeacon } from "@/components/analytics-beacon";
import { SITE, SITE_MODE } from "@/config/site";
import { BRAND_DESCRIPTION } from "@/lib/seo";
import "./globals.css";
import "./v2.css";
import "./v2-1.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.baseUrl),
  title: {
    default: "Chombly | Tu mascota cuenta contigo",
    template: "%s | Chombly",
  },
  description: BRAND_DESCRIPTION,
  robots: { index: SITE.indexingEnabled, follow: SITE.indexingEnabled },
  icons: { icon: "/brand/chombly-mark.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO">
      <body>
        <a className="skip-link" href="#main-content">
          Saltar al contenido
        </a>
        <PageViewBeacon siteMode={SITE_MODE} />
        {children}
      </body>
    </html>
  );
}
