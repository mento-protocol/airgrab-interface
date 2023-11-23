"use client";

import React from "react";
import { ConnectButton } from "@/components/connect-button";
import RedirectTo from "@/components/redirect-to";
import { SignInButton } from "@/components/sign-in-button";
import { useAuthorization } from "@/contexts/authorization-provider.client";
import { useAccount } from "wagmi";

export default function Home() {
  const { isLoggedIn, isSessionLoading } = useAuthorization();
  const { address, isConnecting } = useAccount();

  if (isConnecting) {
    return <>loading...</>;
  }

  if (!address) {
    return (
      <div className="flex flex-col gap-8 items-center justify-center">
        <h3 className="font-fg font-medium text-2xl">
          Connect wallet to check your eligibility to claim MNTO token
        </h3>
        <ConnectButton />
      </div>
    );
  }

  if (!isLoggedIn) {
    // Sign in button with dummy error and success handlers
    return <SignInButton />;
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
