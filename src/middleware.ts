import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerSession } from "./lib/session";
import { LAUNCH_DATE } from "./lib/constants";

export const config = {
  matcher: ["/claim/:path*", "/allocation/:path*", "/"],
};

export async function middleware(request: NextRequest) {
  const session = await getServerSession();
  const isPastLaunchDate = new Date(LAUNCH_DATE).getTime() < Date.now();
  const isHomePage = request.nextUrl.pathname === "/";
  const isClaimPage = request.nextUrl.pathname.startsWith("/claim");
  const isAllocationPage = request.nextUrl.pathname.startsWith("/allocation");
  const hasSession = session?.siwe?.success;

  // every route excpet home requires a session
  if (!isHomePage && !hasSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect to allocation page if user is on home page and has a session
  if (isHomePage && hasSession) {
    return NextResponse.redirect(new URL("/allocation", request.url));
  }

  // Redirect to claim page if user is on allocation page and has a session and is past launch date and is kyc verified or has claimed
  if (
    isAllocationPage &&
    isPastLaunchDate &&
    (session?.isKycVerified || session.hasClaimed)
  ) {
    return NextResponse.redirect(new URL("/claim", request.url));
  }

  if (isClaimPage && !session?.isKycVerified && !session.hasClaimed) {
    console.log({ session: session.hasClaimed });
    return NextResponse.redirect(new URL("/", request.url));
  }
}
