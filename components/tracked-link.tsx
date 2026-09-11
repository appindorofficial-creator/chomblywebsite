"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { track } from "@/lib/analytics/client";
import type { AnalyticsProperties } from "@/lib/analytics/events";

type Props = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    eventProperties: AnalyticsProperties;
  };

export function TrackedLink({
  eventProperties,
  onClick,
  ...props
}: Props) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    track("cta_clicked", eventProperties);
    onClick?.(event);
  }

  return <Link {...props} onClick={handleClick} />;
}

