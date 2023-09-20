import ClaimCard from "@/components/claim-card";
import FAQ from "@/components/faq";
import { ConnectButton } from "@/components/connect-button";

export default function Home() {
  return (
    <main className="flex-grow flex flex-col items-center justify-around">
      <ClaimCard>
        <ConnectButton />
      </ClaimCard>
      <FAQ />
    </main>
  );
}
