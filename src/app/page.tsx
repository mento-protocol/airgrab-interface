import { ConnectButton } from "@/components/connect-button";
import { FaqNavLink } from "@/components/faq-nav-link";

export default async function Home() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center text-center">
      <h3 className="font-fg font-medium text-[18px] md:text-base">
        Connect wallet to check your eligibility to claim MENTO token
      </h3>
      <ConnectButton color="blue" />
      <FaqNavLink
        text="What are eligibility criteria?"
        elementID="eligibility-criteria"
      />
    </div>
  );
}
