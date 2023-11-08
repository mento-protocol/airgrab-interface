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

export default function Allocation() {
  const { allocation } = useAuthorization();
  const { address, isConnecting } = useAccount();
  const [kycProof, setKYCProof] = React.useState<boolean>(false);
  const [mentoAllocation, setMentoAllocation] =
    React.useState<string>(allocation);

  const hasMounted = useHasMounted();
  const isLoading = useDelay(1500);
  const shortAddress = address ? shortenAddress(address) : "";

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
      {hasAllocation ? (
        <button
          onClick={() => {
            setKYCProof((prevState) => !prevState);
          }}
        >
          {`Pretend we ${kycProof ? "are not" : "are"} verified`}
        </button>
      ) : null}
      <button
        onClick={() => {
          setMentoAllocation((prevState) =>
            prevState === "0" ? "100000" : "0"
          );
        }}
      >
        {`Pretend we ${hasAllocation ? "don't have" : "have"} an allocation`}
      </button>
    </div>
  );
}

const NoAllocation = ({ address }: { address: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <p className="font-fg font-regular text-[22px] ">
        Sorry, wallet address{" "}
        <span className="text-primary-blue">{address}</span> is not elligible to
        receive MNTO
      </p>
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
  kycProof,
  address,
}: {
  allocation: string;
  kycProof: string | null | boolean;
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
      {kycProof ? (
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
