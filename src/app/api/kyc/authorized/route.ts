import {
  BASE_URL,
  FRACTAL_AUTH_URL,
  FRACTAL_CLIENT_ID,
  FRACTAL_RESOURCE_URL,
  LAUNCH_DATE,
} from "@/lib/constants";
import { sessionOptions } from "@/lib/session/config";
import { SessionData } from "@/lib/session/types";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const FRACTAL_CLIENT_SECRET = process.env.FRACTAL_CLIENT_SECRET;

if (!FRACTAL_CLIENT_SECRET) throw new Error("FRACTAL_CLIENT_SECRET is not set");

const REDIRECT_URL = `${BASE_URL}/api/kyc/authorized`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  let authResponse;

  if (error === "access_denied") {
    return NextResponse.redirect(new URL("/?status=denied", request.url));
  }

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
        redirect_uri: REDIRECT_URL,
      }),
    });

    authResponse = await res.json();
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const { access_token } = authResponse;
    const res = await fetch(`${FRACTAL_RESOURCE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const theResJson = await res.json();
    const { verification_cases } = theResJson;

    // Find a case which matches our requirements and return the status
    const validCase = verification_cases.find(
      ({
        journey_completed,
        level,
      }: {
        journey_completed: boolean;
        level: string;
      }) => journey_completed && level === "basic+liveness+wallet-eth",
    );

    if (!validCase) {
      // This will only happen if a user is some how redirected to us without having completed the process
      return NextResponse.redirect(new URL("/", request.url));
    }

    const status = validCase.status;
    const approvalStatus = validCase.credential;

    if (status === "pending") {
      return NextResponse.redirect(new URL("/kyc-pending", request.url));
    }

    if (approvalStatus === "rejected") {
      return NextResponse.redirect(new URL("/kyc-rejected", request.url));
    }
    const session = await getIronSession<SessionData>(
      cookies(),
      sessionOptions,
    );

    const hasLaunchStarted = new Date() > new Date(LAUNCH_DATE);

    const redirectUrl = hasLaunchStarted ? "/claim" : "/alloacation";

    session.isKycVerified = true;
    await session.save();
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
