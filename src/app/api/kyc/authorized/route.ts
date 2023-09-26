import { NextResponse } from "next/server";

let BASE_URL: string | undefined;

if (process.env.NODE_ENV === "development") {
  BASE_URL = process.env.BASE_URL;
  if (!BASE_URL) throw new Error("BASE_URL is not set");
} else {
  // preview & production
  BASE_URL = process.env.VERCEL_URL;
  if (!BASE_URL) throw new Error("VERCEL_URL is not set");
}

const FRACTAL_AUTH_URL = process.env.FRACTAL_AUTH_URL;
const FRACTAL_CLIENT_ID = process.env.NEXT_PUBLIC_FRACTAL_CLIENT_ID;
const FRACTAL_CLIENT_SECRET = process.env.FRACTAL_CLIENT_SECRET;

if (!FRACTAL_AUTH_URL) throw new Error("FRACTAL_AUTH_URL is not set");
if (!FRACTAL_CLIENT_ID) throw new Error("FRACTAL_CLIENT_ID is not set");
if (!FRACTAL_CLIENT_SECRET) throw new Error("FRACTAL_CLIENT_SECRET is not set");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  let authResponse;

  try {
    const res = await fetch(`${FRACTAL_AUTH_URL}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: FRACTAL_CLIENT_ID,
        client_secret: FRACTAL_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: `${BASE_URL}/api/kyc/authorized`,
      }),
    });

    authResponse = await res.json();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const { access_token } = authResponse;
    const res = await fetch(`${process.env.FRACTAL_RESOURCE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const { verification_cases } = await res.json();

    // Find a case which matches our requirements and return the status
    const validCase = verification_cases.find(
      ({
        journey_completed,
        level,
      }: {
        journey_completed: boolean;
        level: string;
      }) => journey_completed && level === "basic+liveness+wallet-eth"
    );

    if (!validCase) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.redirect(
      new URL(`/?status=${validCase.credential}`, request.url)
    );
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}
