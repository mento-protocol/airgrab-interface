import { processFractalAuthCode } from "@/lib/fractal";
import { getAddressForSession, getServerSession } from "@/lib/session";
import { NextResponse } from "next/server";

// This route is used to handle the callback from Fractal ID after the user has completed the KYC process.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error === "access_denied") {
    return NextResponse.redirect(new URL("/?status=denied", request.url));
  }

  try {
    if (!code) throw new Error("No code provided");

    const session = await getServerSession();
    const verificationCaseStatus = await processFractalAuthCode(
      code,
      getAddressForSession(session),
    );

    if (!verificationCaseStatus) throw new Error("No verification case found");

    switch (verificationCaseStatus?.status) {
      case "contacted":
        return NextResponse.redirect(
          new URL("/kyc-pending?contacted=true", request.url),
        );
      case "pending":
        return NextResponse.redirect(new URL("/kyc-pending", request.url));
      case "done":
        switch (verificationCaseStatus.credential) {
          case "approved":
            const session = await getServerSession();
            session.isKycVerified = true;
            await session.save();
            return NextResponse.redirect(new URL("/allocation", request.url));
          case "pending":
            return NextResponse.redirect(new URL("/kyc-pending", request.url));
          case "rejected":
            return NextResponse.redirect(new URL("/kyc-rejected", request.url));
        }
      default:
        return NextResponse.redirect(new URL("/allocation", request.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
