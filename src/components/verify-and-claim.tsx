"use client"

import React from "react";
import { PrimaryButton, TertiaryButton } from "./button";
import Link from "next/link";
import { Locked } from "./svgs";
import { shortenAddress } from "@/lib/addresses";

export default function VerifyAndClaim({
  allocation,
  address,
}: {
  allocation: string;
  address: string;
}) {
  const [hasClaimed, setHasClaimed] = React.useState(false);

  const shortAddress = address ? shortenAddress(address) : "";
  const claim = () => {
    setHasClaimed(true);
  };

  if (hasClaimed) {
    return (
       <div className="flex items-center justify-center flex-col gap-8 text-center px-20">
          <Locked className="h-[178px] w-[176px] sm:h-[248px] sm:w-[251px]" />
          <span className="font-fg font-normal text-sm sm:text-xl">
             You claimed and locked <br className="block sm:hidden" />
             <span className="font-medium font-fg">
                {allocation} MENTO
             </span> for <span className="font-medium font-fg">24 months</span>{" "}
          </span>
          <div className="flex flex-col gap-[18px]">
             <PrimaryButton internal href="/" fullWidth>
                Check another wallet
             </PrimaryButton>
             <TertiaryButton href="https://app.mento.org" fullWidth>
                Go to app
             </TertiaryButton>
          </div>
       </div>
    );
  }

  return (
    <div className="flex items-center justify-center flex-col gap-8 text-center">
      <h3 className="font-fg font-medium text-sm sm:text-base text-center flex flex-col gap-8">
        <span>
          Congratulations, wallet address{" "}
          <span className="text-primary-blue">{shortAddress}</span> is elligible
          to receive
        </span>
        <span className="text-base sm:text-2xl">{allocation} MENTO</span>
      </h3>

      <p className="flex flex-col gap-8 font-fg">
        <span className="text-sm sm:text-xl">
          To claim your MENTO, you are required to lock them as veMENTO for{" "}
          <br className="hidden sm:block" />
          24 months. You can&apos;t withdraw, but you can participate in{" "}
          <br className="hidden sm:block" />
          governance of the protocol and receiving rewards.
        </span>
      </p>
      <PrimaryButton onClick={() => claim()}>
        Claim & Lock {allocation} MENTO
      </PrimaryButton>
      <LockingFAQLink />
    </div>
  );
}

const LockingFAQLink = () => {
  return (
    <Link
      className="text-primary-blue underline font-fg text-sm"
      href="#lock-tokens"
    >
      Why do I need to lock tokens?
    </Link>
  );
};
