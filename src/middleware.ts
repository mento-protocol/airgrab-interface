import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerSession } from "./lib/session";

export const config = {
  matcher: ["/claim/:path*", "/allocation/:path*", "/"],
};

export async function middleware(request: NextRequest) {
  const session = await getServerSession();

  const isHomePage = request.nextUrl.pathname === "/";
  const isClaimPage = request.nextUrl.pathname.startsWith("/claim");
  const hasSession = session?.siwe?.success;

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
