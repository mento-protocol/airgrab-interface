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

export default function Allocation() {
  const { allocation, session } = useAuthorization();
  const { address, isConnecting } = useAccount();

  const hasMounted = useHasMounted();
  const isLoading = useDelay(1500);
  const shortAddress = address ? shortenAddress(address) : "";

  if (isConnecting) {
    return <>Loading...</>;
  }

  const hasAllocation = allocation !== "0";

  if (!hasAllocation) {
    return <NoAllocation address={shortAddress} />;
  }

  return (
    <WithAllocation
      proof={session.kyc}
      allocation={allocation}
      address={shortAddress}
    />
  );
}

const NoAllocation = ({ address }: { address: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <h3 className="font-fg font-medium text-2xl">No Allocation Found</h3>
      <p className="font-fg font-regular text-[22px] ">
        Sorry, wallet address{" "}
        <span className="text-primary-blue">{address}</span> is not elligible to
        receive MNTO
      </p>
      <DisconnectButton>Disconnect & try another wallet</DisconnectButton>
      <EligibilityFAQLink />
    </div>
  );
};

const LoadingAllocation = ({ address }: { address: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <h3 className="font-fg font-medium text-2xl">
        Hold on, we are checking token allocation for address{" "}
        <span className="text-primary-blue">{address}</span>
        <MentoLoadingAnimation />
      </h3>
    </div>
  );
};

const WithAllocation = ({
  allocation,
  proof,
  address,
}: {
  allocation: string;
  proof: string | null | boolean;
  address: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <h3 className="font-fg font-medium text-2xl text-center flex flex-col gap-8">
        <span>
          Congratulations, wallet address{" "}
          <span className="text-primary-blue">{address}</span> is elligible to
          receive
        </span>
        <span className="text-3xl">{allocation} MNTO</span>
      </h3>
      {proof ? (
        <>
          <p className="text-center max-w-[500px]">
            We have confirmed your verificaion with Fractal ID, please continue
            to claim your MNTO
          </p>
          <PrimaryButton internal href={"/claim"}>
            Claim Your MNTO
          </PrimaryButton>
        </>
      ) : (
        <>
          <p className="text-center max-w-[500px]">
            To comply with regulations we kindly ask you to verify your
            identity. The check will be conducted by our partner Fractal ID.
          </p>
          <KYCButton />
          <FractalIDLogo className="h-[44px] w-[200px]" />
        </>
      )}
      <EligibilityFAQLink />
    </div>
  );
};
