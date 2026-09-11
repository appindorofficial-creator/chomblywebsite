import { NextResponse, type NextRequest } from "next/server";
import { createClientId } from "@/lib/ids";
import { isLocale } from "@/lib/locale";

const ANON_COOKIE = "chombly_anon_id";

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const segment = request.nextUrl.pathname.split("/")[1] || "es-co";
  const locale = isLocale(segment) ? segment : "es-co";
  requestHeaders.set(
    "x-chombly-language",
    locale === "en-us" ? "en-US" : "es-CO",
  );

  const experimentPrefix = `/${locale}/e/`;
  const isExperiment = request.nextUrl.pathname.startsWith(experimentPrefix);
  const existingAnonymousId = request.cookies.get(ANON_COOKIE)?.value;
  const anonymousId = isExperiment
    ? existingAnonymousId || createClientId()
    : undefined;
  if (anonymousId) requestHeaders.set("x-chombly-anon-id", anonymousId);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  if (isExperiment && anonymousId && !existingAnonymousId) {
    response.cookies.set(ANON_COOKIE, anonymousId, {
      httpOnly: true,
      sameSite: "lax",
      secure: request.nextUrl.protocol === "https:",
      maxAge: 60 * 60 * 24 * 180,
      path: "/",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|brand|images|favicon).*)"],
};
