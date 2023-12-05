import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { SessionData } from "@/lib/session/types";
import { sessionOptions } from "@/lib/session/config";
import { defaultSession } from "@/lib/session/constants";
import { SiweMessage, generateNonce } from "siwe";

// /api/auth
export async function POST(request: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  try {
    const { message, signature } = await request.json();
    const siweMessage = new SiweMessage(message);
    const fields = await siweMessage.verify({ signature });

    console.log({ fields, session, signature, message });
    if (fields.data.nonce !== session.nonce) {
      return NextResponse.json({ message: "Invalid nonce." }, { status: 422 });
    }

    session.siwe = fields;
    await session.save();

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false });
  }
}

// GET /api/auth
export async function GET(request: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  const action = new URL(request.url).searchParams.get("action");

  if (action === "nonce") {
    session.nonce = generateNonce();
    await session.save();
    return NextResponse.json({ nonce: session.nonce }, { status: 200 });
  }

  if (!session.siwe?.success) {
    return NextResponse.json(defaultSession);
  }

  return NextResponse.json(session);
}

// DELETE /api/auth
export async function DELETE() {
  try {
    const session = await getIronSession<SessionData>(
      cookies(),
      sessionOptions
    );

    console.log("logging out", session);
    session.destroy();

    return NextResponse.json(defaultSession, { status: 200 });
  } catch (error) {
    // Session deletion error
    return NextResponse.json({ ok: false });
  }
}
