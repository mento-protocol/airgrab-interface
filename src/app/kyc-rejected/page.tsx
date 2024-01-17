import { PrimaryButton } from "@/components/button";
import { EligibilityFAQLink } from "@/components/eligibility-faq-link";

const FRACTAL_APP_URL = process.env.NEXT_PUBLIC_FRACTAL_APP_URL;

if (!FRACTAL_APP_URL) {
  throw new Error("FRACTAL_APP_URL not found. Set 'FRACTAL_APP_URL' env var");
}

export default function KYCRejected() {
  return (
    <div className="flex text-center text-base font-fg flex-col items-center gap-6">
      <h3 className="font-medium">
        Unfortunately, you didn&apos;t meet the criteria
      </h3>
      <div className="flex flex-col items-center gap-6">
        <span>Please see the FAQ section to learn more about the criteria</span>
      </div>
      <PrimaryButton href={FRACTAL_APP_URL}>
        Go to Fractal ID dashboard
      </PrimaryButton>
      <EligibilityFAQLink />
    </div>
  );
}
