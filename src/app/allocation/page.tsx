"use client";

import React from "react";
import { useAccount } from "wagmi";
import KYCButton from "@/components/kyc-button";
import { FractalIDLogo } from "@/components/svgs";
import MentoLoadingAnimation from "@/components/mento-loading-animation";
import { PrimaryButton } from "@/components/button";
import { EligibilityFAQLink } from "@/components/eligibility-faq-link";
import { useAuthorization } from "@/contexts/authorization-provider.client";
import { shortenAddress } from "@/lib/addresses";
import { useHasMounted, useDelay } from "@/hooks";
import { DisconnectButton } from "@/components/disconnect-button";
import { useRouter } from "next/navigation";

export default function Allocation() {
   const { allocation } = useAuthorization();
   const { address, isConnecting } = useAccount();
   const [kycProof, setKYCProof] = React.useState<boolean>(false);
   const [mentoAllocation, setMentoAllocation] =
      React.useState<string>(allocation);

   const hasMounted = useHasMounted();
   const isLoading = useDelay(1500);
   const shortAddress = address ? shortenAddress(address) : "";
   const router = useRouter();

   if (isLoading || !hasMounted || !address || isConnecting) {
      return <LoadingAllocation address={!hasMounted ? "" : shortAddress} />;
   }

   const hasAllocation = mentoAllocation !== "0";

   return (
      <div className="flex flex-col gap-4">
         {hasAllocation ? (
            <WithAllocation
               kycProof={kycProof}
               allocation={mentoAllocation}
               address={shortAddress}
            />
         ) : (
            <NoAllocation address={shortAddress} />
         )}

         {hasAllocation && !kycProof ? (
            <button
               onClick={() => {
                  router.push("/claim");
               }}
            >
               {`Pretend we are verified`}
            </button>
         ) : null}

         <button
            onClick={() => {
               setMentoAllocation((prevState) =>
                  prevState === "0" ? "100000" : "0"
               );
            }}
         >
            {`Pretend we ${
               hasAllocation ? "don't have" : "have"
            } an allocation`}
         </button>
      </div>
   );
}

const NoAllocation = ({ address }: { address: string }) => {
   return (
      <div className="flex flex-col items-center justify-center gap-8 text-center">
         <p className="font-fg font-regular text-sm sm:text-base font-medium">
            Sorry, the wallet address{" "}
            <span className="text-primary-blue">{address}</span> is not
            elligible{" :("}
         </p>
         <DisconnectButton>Disconnect & try another wallet</DisconnectButton>
         <EligibilityFAQLink />
      </div>
   );
};

const LoadingAllocation = ({ address }: { address: string }) => {
   return (
      <div className="flex flex-col items-center justify-center gap-8 text-center">
         <h3 className="font-fg font-medium text-sm sm:text-base">
            Address confirmed, checking token allocation for address{" "}
            <br className="" />
            <span className="text-primary-blue">{address}</span>
            <div className="flex justify-center">
               <MentoLoadingAnimation />
            </div>
         </h3>
      </div>
   );
};

const WithAllocation = ({
   allocation,
   kycProof,
   address,
}: {
   allocation: string;
   kycProof: string | null | boolean;
   address: string;
}) => {
   return (
      <div className="flex flex-col items-center justify-center gap-8 text-center">
         <h3 className="font-fg font-medium text-sm sm:text-base text-center flex flex-col gap-8">
            <span>
               Congratulations, wallet address{" "}
               <span className="text-primary-blue">{address}</span> is elligible
               to receive
            </span>
            <span className="text-base sm:text-2xl">{allocation} MENTO</span>
         </h3>
         {kycProof ? (
            <>
               <p className="text-center max-w-[500px]">
                  We have confirmed your verificaion with Fractal ID, please
                  continue to claim your MENTO
               </p>
               <PrimaryButton internal href={"/claim"}>
                  Claim Your MENTO
               </PrimaryButton>
            </>
         ) : (
            <>
               <p className="font-fg text-center text-sm sm:text-base">
                  To comply with regulations we kindly ask you to verify your
                  identity.
                  <br className="hidden sm:block" /> The check will be conducted
                  by our partner Fractal ID and your data deleted immediately{" "}
                  <br className="block sm:hidden" />
                  after.
               </p>
               <FractalIDLogo className="h-[27px] w-[120px] sm:h-[44px] sm:w-[200px]" />
               <KYCButton />
            </>
         )}
         <EligibilityFAQLink />
      </div>
   );
};
