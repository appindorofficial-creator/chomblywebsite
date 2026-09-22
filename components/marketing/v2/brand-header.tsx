"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/marketing/v2/brand-logo";
import { TrackedLink } from "@/components/tracked-link";
import { LanguageToggle } from "@/components/marketing/language-toggle";
import { useLocale, useMarketing } from "@/components/marketing/locale-context";
import { SITE } from "@/config/site";
import { localizePath, t } from "@/lib/locale";

export function BrandHeader() {
  const locale = useLocale();
  const copy = useMarketing();
  const [onDark, setOnDark] = useState(false);
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const primaryNavigation = [
    [localizePath(locale, "/pet-owners"), copy.navigation.families],
    [localizePath(locale, "/professionals"), copy.navigation.professionals],
    [localizePath(locale, "/about"), copy.navigation.about],
  ] as const;

  const organizationNavigation = [
    [localizePath(locale, "/clinics"), copy.navigation.clinics],
    [localizePath(locale, "/businesses"), copy.navigation.businesses],
    [localizePath(locale, "/partners"), copy.navigation.partners],
  ] as const;

  const mobileNavigation = [
    primaryNavigation[0],
    primaryNavigation[1],
    ...organizationNavigation,
    primaryNavigation[2],
  ] as const;

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setSolid(window.scrollY > 30);
      const x = Math.min(window.innerWidth - 24, Math.max(24, window.innerWidth / 2));
      const elements = document.elementsFromPoint(x, 92);
      const themed = elements
        .map((element) => element.closest<HTMLElement>("[data-header-theme]"))
        .find(Boolean);
      setOnDark(themed?.dataset.headerTheme === "on-dark");
    };
    const queue = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("v2-menu-open", menuOpen);
    return () => document.body.classList.remove("v2-menu-open");
  }, [menuOpen]);

  return (
    <header className={`v2-header ${solid ? "is-solid" : ""} ${onDark || menuOpen ? "is-on-dark" : ""} ${menuOpen ? "is-menu-open" : ""}`}>
      <div className="v2-shell v2-header-row">
        <BrandLogo tone={onDark || menuOpen ? "light" : "dark"} />
        <nav className="v2-desktop-nav" aria-label={t(locale, "Navegación principal", "Main navigation")}>
          {primaryNavigation.slice(0, 2).map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
          <details className="v2-nav-group">
            <summary>
              {copy.navigation.organizations}
              <ChevronDown aria-hidden="true" size={14} />
            </summary>
            <div>
              {organizationNavigation.map(([href, label]) => (
                <Link key={href} href={href}>
                  {label}
                  <ArrowUpRight aria-hidden="true" size={13} />
                </Link>
              ))}
            </div>
          </details>
          <Link href={primaryNavigation[2][0]}>{primaryNavigation[2][1]}</Link>
        </nav>
        <div className="v2-header-actions">
          <TrackedLink
            className="v2-button v2-button-compact v2-header-cta"
            href={SITE.appWelcomeUrl}
            target="_blank"
            rel="noopener noreferrer"
            eventProperties={{ cta_id: "header_open_app", placement: "header", audience: "owner" }}
          >
            {t(locale, "Quiero Chombly", "I want Chombly")}{" "}
            <ArrowUpRight aria-hidden="true" size={16} />
          </TrackedLink>
          <LanguageToggle />
          <button
            className="v2-menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="v2-mobile-menu"
            aria-label={menuOpen ? t(locale, "Cerrar menú", "Close menu") : t(locale, "Abrir menú", "Open menu")}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <div id="v2-mobile-menu" className={`v2-mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label={t(locale, "Navegación móvil", "Mobile navigation")}>
          {mobileNavigation.map(([href, label], index) => (
            <Link key={href} href={href} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>
              <span>0{index + 1}</span>
              {label}
            </Link>
          ))}
          <TrackedLink
            className="v2-button"
            href={SITE.appWelcomeUrl}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => setMenuOpen(false)}
            eventProperties={{ cta_id: "mobile_menu_open_app", placement: "mobile_menu", audience: "owner" }}
          >
            {copy.ctas.owner} <ArrowUpRight aria-hidden="true" size={18} />
          </TrackedLink>
        </nav>
      </div>
    </header>
  );
}
