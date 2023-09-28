import ClaimCard from "@/components/claim-card";
import FAQ from "@/components/faq";
import { ConnectButton } from "@/components/connect-button";
import { Allocation } from "@/components/allocations";
import { WhenConnected } from "@/components/when-connected";


export default function Home() {
  return (
    <main className="flex-grow flex flex-col items-center justify-around">
      <ClaimCard>
        <WhenConnected behavior="hide">
          <ConnectButton />
        </WhenConnected>
        <WhenConnected behavior="show">
          <Allocation />
        </WhenConnected>
      </ClaimCard>
      <FAQ />
    </main>
  );
}
