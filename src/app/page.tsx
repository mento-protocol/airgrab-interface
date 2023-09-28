import ClaimCard from "@/components/claim-card";
import FAQ from "@/components/faq";
import { ConnectButton } from "@/components/connect-button";
import { WhenConnected } from "@/components/when-connected";
import KYC from "@/components/kyc";

export default function Home() {
  return (
    <main className="flex-grow flex flex-col items-center justify-around">
      <ClaimCard>
        <WhenConnected behavior="hide">
          <ConnectButton />
        </WhenConnected>
        <WhenConnected behavior="show">
          <KYC>
            <>Claim</>
          </KYC>
        </WhenConnected>
      </ClaimCard>
      <FAQ />
    </main>
  );
}
