"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/marketing/v2/brand-logo";
import { TrackedLink } from "@/components/tracked-link";
import { MARKETING_V2 } from "@/config/marketing-content-v2";

const primaryNavigation = [
  ["/es-co/pet-owners", MARKETING_V2.navigation.families],
  ["/es-co/professionals", MARKETING_V2.navigation.professionals],
  ["/es-co/about", MARKETING_V2.navigation.about],
] as const;

const organizationNavigation = [
  ["/es-co/clinics", "Clínicas"],
  ["/es-co/businesses", "Negocios pet"],
  ["/es-co/partners", "Partners"],
] as const;

const mobileNavigation = [primaryNavigation[0], primaryNavigation[1], ...organizationNavigation, primaryNavigation[2]] as const;

export function BrandHeader() {
  const [onDark, setOnDark] = useState(false);
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        <nav className="v2-desktop-nav" aria-label="Navegación principal">
          {primaryNavigation.slice(0, 2).map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
          <details className="v2-nav-group">
            <summary>{MARKETING_V2.navigation.organizations}<ChevronDown aria-hidden="true" size={14} /></summary>
            <div>{organizationNavigation.map(([href, label]) => <Link key={href} href={href}>{label}<ArrowUpRight aria-hidden="true" size={13} /></Link>)}</div>
          </details>
          <Link href={primaryNavigation[2][0]}>{primaryNavigation[2][1]}</Link>
        </nav>
        <TrackedLink
          className="v2-button v2-button-compact v2-header-cta"
          href="/es-co/join?audience=owner"
          eventProperties={{ cta_id: "header_owner_interest", placement: "header", audience: "owner" }}
        >
          Quiero Chombly <ArrowUpRight aria-hidden="true" size={16} />
        </TrackedLink>
        <button
          className="v2-menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="v2-mobile-menu"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <div id="v2-mobile-menu" className={`v2-mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Navegación móvil">
          {mobileNavigation.map(([href, label], index) => (
            <Link key={href} href={href} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>
              <span>0{index + 1}</span>{label}
            </Link>
          ))}
          <TrackedLink
            className="v2-button"
            href="/es-co/join?audience=owner"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => setMenuOpen(false)}
            eventProperties={{ cta_id: "mobile_menu_owner_interest", placement: "mobile_menu", audience: "owner" }}
          >
            {MARKETING_V2.ctas.owner} <ArrowUpRight aria-hidden="true" size={18} />
          </TrackedLink>
        </nav>
      </div>
    </header>
  );
}
