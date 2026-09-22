"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { track } from "@/lib/analytics/client";
import type { AnalyticsProperties } from "@/lib/analytics/events";

type Props = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    eventProperties: AnalyticsProperties;
  };

function isExternalHref(href: LinkProps["href"]): boolean {
  const value = typeof href === "string" ? href : href.pathname || "";
  return /^https?:\/\//i.test(value);
}

export function TrackedLink({
  eventProperties,
  onClick,
  href,
  target,
  rel,
  ...props
}: Props) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    track("cta_clicked", eventProperties);
    onClick?.(event);
  }

  // Native anchor for absolute URLs so target=_blank reliably opens a new tab.
  if (isExternalHref(href)) {
    const externalTarget = target ?? "_blank";
    const externalRel =
      rel ??
      (externalTarget === "_blank" ? "noopener noreferrer" : undefined);
    return (
      <a
        {...props}
        href={typeof href === "string" ? href : String(href)}
        target={externalTarget}
        rel={externalRel}
        onClick={handleClick}
      />
    );
  }

  return (
    <Link href={href} target={target} rel={rel} {...props} onClick={handleClick} />
  );
}
