import { FRACTAL_CRED_URL } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { signature, message } = await request.json();

    const url = new URL(FRACTAL_CRED_URL!);
    url.searchParams.append("message", message);
    url.searchParams.append("signature", signature);

    const res = await fetch(url);
    const resJson = await res.json();
    const { error } = resJson;
    if (error) {
      throw new Error(error);
    }
    // TODO: handle the next type of error (when  user isnt' found)

    return NextResponse.json({ ...resJson, error }, { status: 200 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500, statusText: "Internal Server Error" },
    );
  }
}
