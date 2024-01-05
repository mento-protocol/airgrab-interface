import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerSession } from "./lib/session";
import { LAUNCH_DATE } from "./lib/constants";

export const config = {
  matcher: ["/claim/:path*", "/allocation/:path*", "/"],
};

export async function middleware(request: NextRequest) {
  const session = await getServerSession();
  const hasLaunchStarted = new Date(LAUNCH_DATE).getTime() > Date.now();
  const redirectUrl = hasLaunchStarted ? "/claim" : "/allocation";
  const isHomePage = request.nextUrl.pathname === "/";
  const isClaimPage = request.nextUrl.pathname.startsWith("/claim");
  const hasSession = session?.siwe?.success;

  if (!redirectUrl && session?.isKycVerified) {
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  if (isClaimPage && !session?.isKycVerified) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isHomePage && !hasSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isHomePage && hasSession) {
    return NextResponse.redirect(new URL("/allocation", request.url));
  }
}
