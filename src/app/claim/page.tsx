"use client";

import { PrimaryButton, TertiaryButton } from "@/components/button";
import { Locked } from "@/components/svgs";
import { useAuthorization } from "@/contexts/authorization-provider.client";
import { shortenAddress } from "@/lib/addresses";
import Link from "next/link";
import React from "react";
import { useAccount } from "wagmi";

export default function Claim() {
   const [hasClaimed, setHasClaimed] = React.useState(false);
   const { allocation } = useAuthorization();
   const { address } = useAccount();
   const shortAddress = address ? shortenAddress(address) : "";
   const claim = () => {
      setHasClaimed(true);
   };

   if (hasClaimed) {
      return (
         <div className="flex items-center justify-center flex-col gap-8 text-center px-20">
            <Locked className="h-[248px] w-[251px]" />
            <span className="font-fg font-normal text-xl">
               You claimed and locked{" "}
               <span className="font-medium font-fg">{allocation} MENTO</span>{" "}
               for <span className="font-medium font-fg">24 months</span>{" "}
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
      <div className="flex items-center justify-center flex-col gap-8 text-center">
         <h3 className="font-fg font-medium text-base text-center flex flex-col gap-8">
            <span>
               Congratulations, wallet address{" "}
               <span className="text-primary-blue">{shortAddress}</span> is
               elligible to receive
            </span>
            <span className="text-2xl">{allocation} MENTO</span>
         </h3>

         <p className="flex flex-col gap-8 font-fg">
            <span className="text-xl">
               To claim your MENTO, you are required to lock them as veMENTO for{" "}
               <br />
               24 months. You can&apos;t withdraw, but you can participate in{" "}
               <br />
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
