import { Button } from "@/components/button";
import { FRACTAL_APP_URL } from "@/lib/constants";

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
          ? "Your KYC Verification is pending, you have been contacted by Fractal ID for more information. For an update please check your email or visit your dashboard."
          : "Fractal ID team is reviewing the documents you have uploaded. You can check current status in the dashboard."}
      </span>
      <Button target="_blank" color="blue" href={FRACTAL_APP_URL}>
        Go to Fractal ID
      </Button>
    </div>
  );
}
