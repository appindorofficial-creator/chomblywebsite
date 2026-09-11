"use client";

import Link from "next/link";
import { useLocale } from "@/components/marketing/locale-context";
import { localizePath } from "@/lib/locale";

type BrandLogoProps = {
  tone?: "dark" | "light" | "lime";
  markOnly?: boolean;
  className?: string;
};

export function BrandLogo({
  tone = "dark",
  markOnly = false,
  className = "",
}: BrandLogoProps) {
  const locale = useLocale();
  const src = markOnly
    ? tone === "lime"
      ? "/brand/v2/chombly-mark-lime.png"
      : tone === "dark"
        ? "/brand/v2/chombly-mark-dark.png"
        : "/brand/v2/chombly-mark.png"
    : tone === "light"
      ? "/brand/v2/chombly-wordmark-light.png"
      : tone === "lime"
        ? "/brand/v2/chombly-wordmark-lime.png"
        : "/brand/v2/chombly-wordmark-dark.png";

  return (
    <Link
      className={`v2-brand-logo ${markOnly ? "is-mark" : ""} ${className}`}
      href={localizePath(locale)}
      aria-label="Chombly"
    >
      <img
        src={src}
        alt="Chombly"
        width={markOnly ? 400 : 800}
        height={markOnly ? 420 : 453}
      />
    </Link>
  );
}
