import { NextResponse, type NextRequest } from "next/server";
import { createClientId } from "@/lib/ids";

const EXPERIMENT_PREFIX = "/es-co/e/";
const ANON_COOKIE = "chombly_anon_id";

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-chombly-language", "es-CO");
  const isExperiment = request.nextUrl.pathname.startsWith(EXPERIMENT_PREFIX);
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
