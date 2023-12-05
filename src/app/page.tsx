"use client";

import React from "react";
import { ConnectButton } from "@/components/connect-button";
import RedirectTo from "@/components/redirect-to";
import { useAuthorization } from "@/contexts/authorization-provider.client";
import { useAccount } from "wagmi";
import { EligibilityFAQLink } from "@/components/eligibility-faq-link";

export default function Home() {
  const { isSessionLoading } = useAuthorization();
  const { address, isConnecting } = useAccount();

  if (isConnecting) {
    return <>loading...</>;
  }

  if (!address) {
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

  if (isSessionLoading) {
    return (
      <div className="flex flex-col gap-8">
        <h3 className="font-fg font-medium text-2xl">Signing In</h3>
      </div>
    );
  }

  return <RedirectTo path="/allocation" />;
}
