import { PrimaryButton } from "@/components/button";
import Link from "next/link";

const FRACTAL_APP_URL = process.env.NEXT_PUBLIC_FRACTAL_APP_URL;

if (!FRACTAL_APP_URL) {
  throw new Error("FRACTAL_APP_URL not found. Set 'FRACTAL_APP_URL' env var");
}

export default function KYCPending() {
  return (
    <div className="flex flex-col items-center gap-6">
      <span className="text-lg text-center flex flex-col">
        Your KYC Verification is pending, for an update on your verification
        status visit your{" "}
        <Link className="text-primary-blue" href={FRACTAL_APP_URL!}>
          Fractal ID Dashboard
        </Link>
      </span>

      <PrimaryButton internal href="/">
        Return to Home
      </PrimaryButton>
    </div>
  );
}
