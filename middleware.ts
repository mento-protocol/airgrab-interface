import { NextResponse, type NextRequest } from "next/server";
import { getServerSession } from "@/lib/session";

export const config = {
  matcher: ["/claim/:path*", "/allocation/:path*", "/"],
};

export async function middleware(request: NextRequest) {
  const session = await getServerSession();
  const isHomePage = request.nextUrl.pathname === "/";
  if (!session?.success && !isHomePage) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}