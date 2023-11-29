"use client";

import { PrimaryButton, TertiaryButton } from "@/components/button";
import { EligibilityFAQLink } from "@/components/eligibility-faq-link";
import RedirectTo from "@/components/redirect-to";
import { Locked } from "@/components/svgs";
import { useAuthorization } from "@/contexts/authorization-provider.client";
import { useKYCProof } from "@/hooks/useKYCProof";
import Link from "next/link";
import React from "react";

export default function Claim() {
  const [hasClaimed, setHasClaimed] = React.useState(false);
  const { allocation, session, isSessionLoading } = useAuthorization();
  const { proof, signMessage } = useKYCProof({ enabled: true });

  const claim = () => {
    setHasClaimed(true);
  };

  if (!session.isKycVerified && !isSessionLoading) {
    return <RedirectTo path="/" />;
  }

  if (!proof) {
    return (
      <div className="flex flex-col gap-8 items-center justify-center text-center">
        <h3 className="font-fg font-medium text-2xl">
          To claim your MENTO, you need to sign a message the verify your
          Fractal KYC based on your wallet is included in your KYC verification.
        </h3>
        <p>
          We use this signature to verify your KYC on chain with our partner
          Fractal ID.
        </p>
        <PrimaryButton onClick={() => signMessage()}>
          Sign a Message
        </PrimaryButton>
        <EligibilityFAQLink />
      </div>
    );
  }

  if (hasClaimed) {
    return (
      <div className="flex items-center justify-center flex-col gap-8 text-center md:px-20">
        <Locked className="h-[248px] w-[251px]" />
        <span className="font-fg font-medium text-2xl">
          You claimed and locked{" "}
          <span className="font-medium font-fg">{allocation} MNTO</span> for{" "}
          <span className="font-medium font-fg">24 months</span>{" "}
        </span>
        <PrimaryButton internal href="/" fullWidth>
          Check another wallet
        </PrimaryButton>
        <TertiaryButton href="https://app.mento.org" fullWidth>
          Go to app
        </TertiaryButton>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center flex-col gap-8 text-center md:px-20">
      <p className="flex flex-col gap-8 font-fg">
        <span className="text-xl">
          You are eligible to claim{" "}
          <span className="font-medium inline-block md:inline">
            {allocation} MNTO
          </span>
        </span>
        <span className="text-xl">
          To claim your MNTO, you are required to lock them as veMNTO for 24
          months.{" "}
          <span className="inline-block md:inline">
            You can&apos;t withdraw, but you can participate in governance of
            the protocol and receiving rewards.
          </span>
        </span>
      </p>
      <PrimaryButton fullWidth onClick={() => claim()}>
        Claim & Lock {allocation} MNTO
      </PrimaryButton>
      <LockingFAQLink />
    </div>
  );
}

const LockingFAQLink = () => {
  return (
    <Link
      className="text-primary-blue underline font-fg text-xl"
      href="#lock-tokens"
    >
      Why do I need to lock tokens?
    </Link>
  );
};
