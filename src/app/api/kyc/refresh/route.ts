import { NextResponse } from "next/server";
import { refetchKycStatus } from "@/lib/fractal";
import { getAddressForSession, getServerSession } from "@/lib/session";

export async function GET() {
  try {
    const session = await getServerSession();
    const verificationCaseStatus = await refetchKycStatus(
      getAddressForSession(session),
    );

    if (!verificationCaseStatus) throw new Error("No verification case found");

    if (
      verificationCaseStatus.status === "done" &&
      verificationCaseStatus.credential === "approved"
    ) {
      session.isKycVerified = true;
      await session.save();
    }

    return NextResponse.json(verificationCaseStatus);
  } catch (error) {
    return NextResponse.json({ ok: false });
  }
}
