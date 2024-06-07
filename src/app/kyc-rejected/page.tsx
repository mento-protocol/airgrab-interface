import { Button } from "@/components/button";
import { EligibilityFAQLink } from "@/components/eligibility-faq-link";
import { FRACTAL_APP_URL } from "@/lib/constants";

export default function KYCRejected() {
  return (
    <div className="flex text-center text-base font-fg flex-col items-center gap-6">
      <h3 className="font-medium">
        Unfortunately, you didn&apos;t meet the criteria
      </h3>
      <div className="flex flex-col items-center gap-6">
        <span>Please see the FAQ section to learn more about the criteria</span>
      </div>
      <Button color="blue" href={FRACTAL_APP_URL}>
        Go to Fractal ID dashboard
      </Button>
      <EligibilityFAQLink />
    </div>
  );
}
