import { NextRequest, NextResponse } from "next/server";

const FRACTAL_APP_URL = process.env.NEXT_PUBLIC_FRACTAL_APP_URL;
if (!FRACTAL_APP_URL) throw new Error("FRACTAL_APP_URL is not set");

const FRACTAL_CLIENT_ID = process.env.NEXT_PUBLIC_FRACTAL_CLIENT_ID;
if (!FRACTAL_CLIENT_ID) throw new Error("FRACTAL_CLIENT_ID is not set");

let BASE_URL: string | undefined;

if (process.env.NODE_ENV === "development") {
  BASE_URL = process.env.BASE_URL;
  if (!BASE_URL) throw new Error("BASE_URL is not set");
} else {
  // preview & production
  BASE_URL = "https://" + process.env.VERCEL_BRANCH_URL;
  if (!BASE_URL) throw new Error("VERCEL_BRANCH_URL is not set");
}

const REDIRECT_URL = BASE_URL + "/api/kyc/authorized";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get("wallet");

  try {
    if (!wallet) {
      throw new Error("Wallet not connected");
    }

    const url = new URL(FRACTAL_APP_URL + "/authorize");
    url.searchParams.append("client_id", FRACTAL_CLIENT_ID!);
    url.searchParams.append("redirect_uri", REDIRECT_URL);
    url.searchParams.append("ensure_wallet", wallet);
    url.searchParams.append("response_type", "code");
    url.searchParams.append(
      "scope",
      "contact:read verification.basic:read verification.basic.details:read verification.liveness:read verification.liveness.details:read verification.wallet-eth:read"
    );

    return NextResponse.redirect(url);
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
 