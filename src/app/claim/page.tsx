"use client";

import { PrimaryButton, TertiaryButton } from "@/components/button";
import { Locked } from "@/components/svgs";
import { useAuthorization } from "@/contexts/authorization-provider.client";
import Link from "next/link";
import React from "react";

export default function Claim() {
  const [hasClaimed, setHasClaimed] = React.useState(false);
  const { allocation } = useAuthorization();
  const claim = () => {
    setHasClaimed(true);
  };

  if (hasClaimed) {
    return (
      <div className="flex items-center justify-center flex-col gap-8 text-center px-20">
        <Locked className="h-[248px] w-[251px]" />
        <span className="font-fg font-normal text-xl">
          You claimed and locked{" "}
          <span className="font-medium font-fg">{allocation} MNTO</span> for{" "}
          <span className="font-medium font-fg">24 months</span>
        </span>
        <PrimaryButton fullWidth>Check another wallet</PrimaryButton>
        <TertiaryButton fullWidth>Go to app</TertiaryButton>
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
          months.
          <span className="inline-block md:inline">
            You can&apos;t withdraw, but you can participate in governance of
            the protocol and receiving rewards.
          </span>
        </span>
      </p>
      <PrimaryButton onClick={() => claim()}>
        Claim & Lock {allocation} MNTO
      </PrimaryButton>
      <LockingFAQLink />
    </div>
  );
}

export const LockingFAQLink = () => {
  return (
    <Link
      className="text-primary-blue underline font-fg text-xl"
      href="#lock-tokens"
    >
      Why do I need to lock tokens?
    </Link>
  );
};
