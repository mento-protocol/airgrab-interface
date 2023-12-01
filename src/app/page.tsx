"use client";
export const dynamic = "force-dynamic";

import { useAccount } from "wagmi";
import { PrimaryButton } from "@/components/button";
import { ConnectButton } from "@/components/connect-button";
import { EligibilityFAQLink } from "@/components/eligibility-faq-link";
import { useAuthorization } from "@/contexts/authorization-provider.client";
import { redirect } from "next/navigation";
import React from "react";
import { useHasMounted } from "@/hooks/use-has-mounted";
import Loading from "@/components/loading";

// I think it would be more readable to move if (signature) check above, then check for if (!address) and remove the last last if (address) and just return

export default function Home() {
   const { address, isReconnecting } = useAccount();
   const { signMessage, data: signature } = useAuthorization();

   const hasMounted = useHasMounted();

   if (!hasMounted || isReconnecting) {
      return <Loading />;
   }

   if (signature) {
      redirect("/allocation");
   }

   if (!address) {
      return (
         <div className="flex flex-col gap-8 items-center justify-center text-center">
            <h3 className="font-fg font-medium text-[18px] md:text-base">
               Connect wallet to check your eligibility to claim MNTO token
            </h3>
            <ConnectButton color="blue" />
            <EligibilityFAQLink />
         </div>
      );
   }

   return (
      <div className="flex flex-col gap-8 items-center justify-center text-center">
         <h3 className="font-fg font-medium text-2xl">
            To get started, please sign a message with your wallet.
         </h3>
         <p>
            We use this to verify if you are the owner of the wallet & to check
            your wallet's KYC status with our partner Fractal ID.
         </p>
         <PrimaryButton onClick={() => signMessage()}>
            Sign a Message
         </PrimaryButton>
         <EligibilityFAQLink />
      </div>
   );
}
