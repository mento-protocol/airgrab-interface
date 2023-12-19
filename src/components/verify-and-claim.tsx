"use client";
import { PrimaryButton, TertiaryButton } from "@/components/button";
import { useClaimMento } from "@/hooks/use-claim-mento";
import { shortenAddress } from "@/lib/addresses";
import Link from "next/link";
import React from "react";
import { Locked } from "./svgs";
import { useCooldown } from "@/hooks/use-cool-down";
import { UserRejectedRequestError } from "viem";

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
const KYCFAQLink = () => {
  return (
    <Link
      className="text-primary-blue underline font-fg text-xl"
      href="#verify"
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

  const { claim, kyc, prepare } = useClaimMento({
    allocation,
    merkleProof,
    address,
  });

  const claimErrorCooldown = useCooldown(claim.isError, 5000);
  const kycErrorCooldown = useCooldown(kyc.error, 5000);
  const preparationErrorCooldown = useCooldown(
    prepare.isError && !(prepare.error instanceof UserRejectedRequestError),
    5000,
  );

  if (prepare.isError) {
    console.log({ error: prepare.error });
  }

  const isPreparingKycOrClaim = prepare.isLoading || kyc.isLoadingProof;
  const isAwaitingUserSignature = kyc.isLoadingSignature || claim.isLoading;
  const hasClaimed = claim.hasClaimed;

  if (hasClaimed) {
    return <Claimed allocation={allocation} />;
  }

  const signMessage = () => {
    if (!kyc.isLoadingProof && !kyc.isLoadingSignature) {
      kyc.signMessage();
    }
  };

  const claimMento = () => {
    if (!claim.isLoading && claim.write) {
      claim.write();
    }
  };

  const renderOverview = () => {
    if (kyc.isSuccess) {
      return <ClaimAndLockOverview />;
    }

    if (kyc.isLoadingSignature || kyc.isLoadingProof) {
      return <KYCOverview />;
    }

    return (
      <ClaimOverview shortAddress={shortAddress} allocation={allocation} />
    );
  };

  const renderButton = () => {
    if (claimErrorCooldown.isCoolingDown) {
      return (
        <PrimaryButton>
          Try again in {claimErrorCooldown.timeLeft}s
        </PrimaryButton>
      );
    }

    if (kycErrorCooldown.isCoolingDown) {
      return (
        <PrimaryButton>Try again in {kycErrorCooldown.timeLeft}s</PrimaryButton>
      );
    }

    if (preparationErrorCooldown.isCoolingDown) {
      return (
        <PrimaryButton>
          Try again in {preparationErrorCooldown.timeLeft}s
        </PrimaryButton>
      );
    }

    if (prepare.isError) {
      return <PrimaryButton onClick={prepare.refetch}>Try again</PrimaryButton>;
    }

    if (isPreparingKycOrClaim) {
      return <PrimaryButton>Loading...</PrimaryButton>;
    }

    if (isAwaitingUserSignature) {
      return <PrimaryButton>Continue in wallet</PrimaryButton>;
    }

    if (!kyc.isSuccess) {
      return (
        <PrimaryButton onClick={signMessage}>
          Claim {allocation} MENTO
        </PrimaryButton>
      );
    }

    return (
      <PrimaryButton onClick={claimMento}>
        <>Claim & Lock {allocation} MENTO</>
      </PrimaryButton>
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

const Claimed = ({ allocation }: { allocation: string }) => (
  <ClaimWrapper>
    <Locked className="h-[248px] w-[251px]" />
    <span className="font-fg font-normal text-sm sm:text-xl">
      You claimed and locked <br className="block sm:hidden" />
      <span className="font-medium font-fg">{allocation} MENTO</span> for{" "}
      <span className="font-medium font-fg">24 months</span>{" "}
    </span>
    <div className="flex flex-col gap-[18px]">
      <PrimaryButton internal href="/" fullWidth>
        Check another wallet
      </PrimaryButton>
      <TertiaryButton href="https://app.mento.org" fullWidth>
        Go to app
      </TertiaryButton>
    </div>
  </ClaimWrapper>
);

const ClaimHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h3 className="font-fg font-medium text-sm sm:text-base text-center flex flex-col gap-8">
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
