import { PrimaryButton } from "@/components/button";
import { FRACTAL_APP_URL } from "@/lib/constants";
import Link from "next/link";

export default function KYCPending({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const contacted = searchParams.contacted === "true";
  return (
    <div className="flex text-center flex-col items-center gap-6">
      <h3 className="font-fg font-medium text-base">
        KYC Verification Pending
      </h3>
      <span className="text-lg text-center flex flex-col">
        {contacted
          ? "Your KYC Verification is pending, you have been contacted by Fractal ID for more information. For an update please check your email or visits your"
          : "Your KYC Verification is pending, for an update on your verification status visit your"}{" "}
        <Link className="text-primary-blue" href={FRACTAL_APP_URL}>
          Fractal ID Dashboard
        </Link>
      </span>
      <PrimaryButton href="/">Return to Home</PrimaryButton>
    </div>
  );
}
