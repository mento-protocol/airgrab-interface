"use client";
import { Button } from "@/components/button";
import { useClaimMento } from "@/hooks/use-claim-mento";
import { shortenAddress } from "@/lib/addresses";
import Link from "next/link";
import React from "react";
import { Locked } from "./svgs";
import { useCooldown } from "@/hooks/use-cool-down";
import Loading from "./loading";
import { useDisconnect } from "wagmi";

const LockingFAQLink = () => {
  return (
    <Link
      className="text-primary-blue underline font-fg text-xl"
      href="#what-vemento"
    >
      Why do I need to lock tokens?
    </Link>
  );
};
const KYCFAQLink = () => {
  return (
    <Link
      className="text-primary-blue underline font-fg text-xl"
      href="#why-verify-identity"
    >
      Why is this required?
    </Link>
  );
};

export default function VerifyAndClaim({
  address,
  allocation,
  merkleProof,
}: {
  address: `0x${string}`;
  allocation: string;
  merkleProof: string[] | undefined;
}) {
  const shortAddress = address ? shortenAddress(address) : "";
  const { disconnect } = useDisconnect();
  const {
    claim,
    kyc,
    simulation,
    isError,
    isConfirmed,
    isConfirming,
    isAwaitingUserSignature,
    refetchSimulation,
    claimStatus,
    hasClaimed,
  } = useClaimMento({
    allocation,
    merkleProof,
    address,
  });

  const claimErrorCooldown = useCooldown(isError, 5000);
  const kycErrorCooldown = useCooldown(kyc.error, 5000);
  const preparationErrorCooldown = useCooldown(isError, 5000);

  const isPreparingKycOrClaim = simulation.isLoading || kyc.isLoadingProof;
  // const isAwaitingUserSignature = kyc.isLoadingSignature || claim.;

  if (claimStatus.isRefetching) {
    <Loading />;
  }

  if (hasClaimed) {
    return <ClaimConfirmation allocation={allocation} />;
  }

  const renderOverview = () => {
    if (kyc.isSuccess) {
      return <ClaimAndLockOverview />;
    }

    if (!kyc.isSuccess) {
      return <KYCOverview />;
    }

    return (
      <ClaimOverview shortAddress={shortAddress} allocation={allocation} />
    );
  };

  const renderButton = () => {
    if (claimErrorCooldown.isCoolingDown) {
      return (
        <Button color="blue">
          Try again in {claimErrorCooldown.timeLeft}s
        </Button>
      );
    }

    if (kycErrorCooldown.isCoolingDown) {
      return (
        <Button color="blue">Try again in {kycErrorCooldown.timeLeft}s</Button>
      );
    }

    if (preparationErrorCooldown.isCoolingDown) {
      return (
        <Button color="blue">
          Try again in {preparationErrorCooldown.timeLeft}s
        </Button>
      );
    }

    if (isError) {
      return (
        <Button color="blue" onClick={() => refetchSimulation()}>
          Try again
        </Button>
      );
    }

    if (claimStatus.isError) {
      return (
        <span className="text-red-500">
          Error Fetching Claim status, ensure you are connected to the correct
          network{" "}
        </span>
      );
    }

    if (isPreparingKycOrClaim) {
      return <Button color="blue">Loading...</Button>;
    }

    if (isAwaitingUserSignature) {
      return <Button color="blue">Continue in wallet</Button>;
    }

    if (isConfirming) {
      return <Button color="blue">Awaiting confirmation...</Button>;
    }

    if (!kyc.isSuccess) {
      return (
        <Button color="blue" onClick={kyc.signMessage}>
          Claim {allocation} MENTO
        </Button>
      );
    }

    return (
      <Button color="blue" onClick={claim}>
        <>Claim & Lock {allocation} MENTO</>
      </Button>
    );
  };

  return (
    <ClaimWrapper>
      {renderOverview()}
      {renderButton()}
    </ClaimWrapper>
  );
}

const ClaimOverview = ({
  shortAddress,
  allocation,
}: {
  shortAddress: string;
  allocation: string;
}) => (
  <>
    <ClaimHeading>
      <span>
        Congratulations, wallet address{" "}
        <span className="text-primary-blue">{shortAddress}</span> is eligible to
        receive
      </span>
      <span className="text-base sm:text-2xl">{allocation} MENTO</span>
    </ClaimHeading>
    <ClaimDescription>
      <span className="text-sm sm:text-xl">
        To claim your MENTO, you are required to lock them as veMENTO for{" "}
        <br className="hidden sm:block" />
        24 months. You can&apos;t withdraw, but you can participate in{" "}
        <br className="hidden sm:block" />
        governance of the protocol and receiving rewards.
      </span>
    </ClaimDescription>
  </>
);

const KYCOverview = () => (
  <>
    <ClaimHeading>Sign to confirm KYC</ClaimHeading>
    <ClaimDescription>
      <span className="text-sm sm:text-xl">
        To claim your MENTO, sign a message to verify your Fractal KYC.{" "}
        <br className="hidden sm:block" />
        This signature helps us confirm your KYC on-chain with Fractal ID.
      </span>
      <KYCFAQLink />
    </ClaimDescription>
  </>
);

const ClaimAndLockOverview = () => (
  <>
    <ClaimHeading>Claim & Lock MENTO</ClaimHeading>
    <ClaimDescription>
      <span className="text-sm sm:text-xl">
        To claim your MENTO, you are required to lock them as veMENTO for{" "}
        <br className="hidden sm:block" />
        24 months. You can&apos;t withdraw, but you can participate in{" "}
        <br className="hidden sm:block" />
        governance of the protocol and receiving rewards.
      </span>
      <LockingFAQLink />
    </ClaimDescription>
  </>
);

const ClaimConfirmation = ({ allocation }: { allocation: string }) => {
  const { disconnect } = useDisconnect();
  return (
    <ClaimWrapper>
      <Locked className="h-[248px] w-[251px]" />
      <span className="font-fg font-normal text-sm sm:text-xl">
        You claimed and locked <br className="block sm:hidden" />
        <span className="font-medium font-fg">{allocation} MENTO</span> for{" "}
        <span className="font-medium font-fg">24 months</span>{" "}
      </span>
      <div className="flex flex-col gap-[18px]">
        <Button color="blue" onClick={() => disconnect()} fullWidth>
          Check another wallet
        </Button>
        <Button color="blush" href="https://app.mento.org" fullWidth>
          Go to app
        </Button>
      </div>
    </ClaimWrapper>
  );
};

const ClaimHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h3 className=" font-fg font-medium text-sm sm:text-base text-center flex flex-col gap-8">
      {children}
    </h3>
  );
};

const ClaimDescription = ({ children }: { children: React.ReactNode }) => {
  return <p className="flex flex-col gap-8 font-fg">{children}</p>;
};

const ClaimWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center flex-col gap-8 text-center">
      {children}
    </div>
  );
};
