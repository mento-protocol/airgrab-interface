"use client";

import { Button } from "@/components/button";
import { ConnectButton } from "@/components/connect-button";
import { EligibilityFAQLink } from "@/components/eligibility-faq-link";
import { useSession } from "@/contexts/rainbowkit-siwe-iron-session-provider";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import React from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected, isConnecting, isReconnecting, address } = useAccount();
  const { status } = useSession();
  const { openConnectModal } = useConnectModal();
  const hasMounted = useIsMounted();

  if (!hasMounted) {
    return (
      <div className="flex flex-col gap-8 items-center justify-center text-center">
        <h3 className="font-fg font-medium text-[18px] md:text-base bg-gray-300 animate-pulse text-gray-300 rounded-md">
          Connect wallet to check your eligibility to claim MENTO token
        </h3>
        <div className="h-[63px] min-w-[260px] py-[16px] !pl-[20px] !pr-[24px] sm:px-4 rounded-lg bg-gray-300 animate-pulse" />
        <EligibilityFAQLink />
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col gap-8 items-center justify-center text-center">
        <h3 className="font-fg font-medium text-[18px] md:text-base">
          Connect wallet to check your eligibility to claim MENTO token
        </h3>
        <ConnectButton color="blue" />
        <EligibilityFAQLink />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col gap-8 items-center justify-center text-center">
        <h3 className="font-fg font-medium text-[18px] md:text-base">
          Sign a message to confirm ownership of your wallet
        </h3>
        <Button color="blue" onClick={openConnectModal}>
          Verify Ownership
        </Button>
        <EligibilityFAQLink />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 items-center justify-center text-center">
      <h3 className="font-fg font-medium text-[18px] md:text-base">
        Continue to check your eligibility to claim MENTO token
      </h3>
      <Button color="blue" href={"/allocation"}>
        Check eligibility
      </Button>
      <EligibilityFAQLink />
    </div>
  );
}

export function useIsMounted() {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}
