import type { Metadata } from "next";
import { PageViewBeacon } from "@/components/analytics-beacon";
import { PostHogInit } from "@/components/posthog-init";
import { SITE, SITE_MODE } from "@/config/site";
import { BRAND_DESCRIPTION, DEFAULT_OG_IMAGE } from "@/lib/seo";
import "./globals.css";
import "./v2.css";
import "./v2-1.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.baseUrl),
  title: {
    default: "Chombly | App para el cuidado de mascotas en Colombia",
    template: "%s | Chombly",
  },
  description: BRAND_DESCRIPTION["es-co"],
  applicationName: SITE.brandName,
  category: "pets",
  robots: { index: SITE.indexingEnabled, follow: SITE.indexingEnabled },
  icons: { icon: "/brand/chombly-mark.png" },
  openGraph: {
    type: "website",
    siteName: SITE.brandName,
    title: "Chombly",
    description: BRAND_DESCRIPTION["es-co"],
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chombly",
    description: BRAND_DESCRIPTION["es-co"],
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO">
      <body>
        <a className="skip-link" href="#main-content">
          Saltar al contenido
        </a>
        <PostHogInit />
        <PageViewBeacon siteMode={SITE_MODE} />
        {children}
      </body>
    </html>
  );
}
