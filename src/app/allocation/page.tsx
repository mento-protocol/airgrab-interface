"use client";
import { useAuthorization } from "@/contexts/authorization-provider.client";
import KYCButton from "@/components/kyc-button";
import useDelay from "@/hooks/use-delay";
import MentoLoadingAnimation from "@/components/mento-loading-animation";
import { FractalIDLogo } from "@/components/svgs";
import { PrimaryButton } from "@/components/button";
import { EligibilityFAQLink } from "@/components/eligibility-faq-link";
import { useAccount } from "wagmi";
import { shortenAddress } from "@/lib/addresses";
import React from "react";
import Loading from "@/components/loading";

export default function Allocation() {
  const { allocation } = useAuthorization();
  const { address, isConnecting } = useAccount();
  const [proof, setProof] = React.useState<boolean>(false);

  const isLoading = useDelay(1500);
  const shortAddress = address ? shortenAddress(address) : "";

  if (isConnecting) {
    return <Loading />;
  }

  if (isLoading) {
    return <LoadingAllocation address={shortAddress} />;
  }

  return (
    <div className="flex flex-col gap-4">
      {allocation !== "0" ? (
        <WithAllocation
          proof={proof}
          allocation={allocation}
          address={shortAddress}
        />
      ) : (
        <NoAllocation address={shortAddress} />
      )}
      <button
        onClick={() => {
          setProof((prevState) => !prevState);
        }}
      >
        {`Pretend we ${proof ? "don't" : "do"} have proof`}
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
          <PrimaryButton href={"/claim"}>Claim Your MNTO</PrimaryButton>
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
