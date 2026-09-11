"use client";

import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { BrandLogo } from "@/components/marketing/v2/brand-logo";
import { FooterEasterEgg } from "@/components/marketing/v2/footer-easter-egg";
import { useLocale, useMarketing } from "@/components/marketing/locale-context";
import { SITE, FEATURE_FLAGS } from "@/config/site";
import { localizePath } from "@/lib/locale";

export function BrandFooter() {
  const locale = useLocale();
  const copy = useMarketing();
  const columns = [
    {
      label: copy.footer.families,
      links: [[copy.footer.forFamilies, localizePath(locale, "/pet-owners")]] as const,
    },
    {
      label: copy.footer.professionalsBusinesses,
      links: [
        [copy.navigation.professionals, localizePath(locale, "/professionals")],
        [copy.navigation.clinics, localizePath(locale, "/clinics")],
        [copy.navigation.businesses, localizePath(locale, "/businesses")],
        [copy.navigation.partners, localizePath(locale, "/partners")],
      ] as const,
    },
    {
      label: "Chombly",
      links: [
        [copy.navigation.about, localizePath(locale, "/about")],
        [copy.footer.contact, localizePath(locale, "/contact")],
      ] as const,
    },
    {
      label: "Legal",
      links: [
        [copy.footer.privacy, localizePath(locale, "/privacy")],
        [copy.footer.terms, localizePath(locale, "/terms")],
      ] as const,
    },
  ] as const;

  return (
    <>
      <footer className="v2-footer" data-header-theme="on-dark">
        <div className="v2-shell v2-footer-top">
          <div className="v2-footer-brand">
            <BrandLogo tone="light" />
            <p>{copy.footer.tagline}</p>
            <a href={`mailto:${SITE.operationalEmail}`}>
              <Mail aria-hidden="true" size={16} />
              {SITE.operationalEmail}
            </a>
          </div>
          <div className="v2-footer-links">
            {columns.map((column) => (
              <div key={column.label}>
                <p>{column.label}</p>
                {column.links.map(([label, href]) => (
                  <Link key={href} href={href}>
                    {label}
                    <ArrowUpRight aria-hidden="true" size={13} />
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="v2-shell v2-footer-bottom">
          <span>© {new Date().getUTCFullYear()} Chombly</span>
          <span>{copy.footer.madeFor}</span>
        </div>
      </footer>
      {FEATURE_FLAGS.mascotFooterEasterEgg ? <FooterEasterEgg /> : null}
    </>
  );
}
