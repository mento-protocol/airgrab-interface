import ClaimCard from "@/components/claim-card";
import FAQ from "@/components/faq";
import { AllocationDisplay } from "@/components/allocation-display";
import { Authorization } from "@/contexts/authorization-provider.server";


export default function Home() {
  return (
    <main className="flex-grow flex flex-col items-center justify-around">
      <ClaimCard>
        <Authorization>
          <AllocationDisplay />
        </Authorization>
      </ClaimCard>
      <FAQ />
    </main>
  );
}
