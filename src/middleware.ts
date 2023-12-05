import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerSession } from "./lib/session";

export const config = {
  matcher: ["/allocation/:path*", "/claim/:path*"],
};

export async function middleware(request: NextRequest) {
  const session = await getServerSession();

  if (
    request.nextUrl.pathname.startsWith("/claim") &&
    !session?.isKycVerified
  ) {
    return NextResponse.rewrite(new URL("/", request.url));
  }

  if (request.nextUrl.pathname !== "/" && !session?.siwe?.success) {
    return NextResponse.rewrite(new URL("/", request.url));
  }

  if (session?.siwe?.success) {
    return NextResponse.rewrite(new URL("/allocation", request.url));
  }
}
