import { NextResponse } from "next/server";

const FRACTAL_CRED_URL = process.env.FRACTAL_CRED_URL;

if (!FRACTAL_CRED_URL) throw new Error("FRACTAL_CRED_URL is not set");

export async function POST(request: Request) {
  try {
    const { signature, message } = await request.json();

    const url = new URL(FRACTAL_CRED_URL!);
    url.searchParams.append("message", message);
    url.searchParams.append("signature", signature);

    const res = await fetch(url);
    const { proof, error } = await res.json();

    if (!res.ok)
      return NextResponse.json(
        { error },
        { status: 404, statusText: "User Not Found" }
      );

    return NextResponse.json({ proof }, { status: 200 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}
