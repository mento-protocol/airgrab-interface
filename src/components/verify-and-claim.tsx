"use client";
import { useClaimMento } from "@/hooks/use-claim-mento";
import React from "react";
import { PrimaryButton, TertiaryButton } from "./button";
import Link from "next/link";
import { shortenAddress } from "@/lib/addresses";
import { Locked } from "./svgs";

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
      Why is this requird?
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

  const { prepare, claim, kyc } = useClaimMento({
    allocation,
    merkleProof,
    address,
  });
  const renderOverview = () => {
    if (kyc.isSuccess && claim.write) {
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
    if (kyc.isSuccess && claim.write) {
      return (
        <PrimaryButton onClick={() => claim?.write!()}>
          {claim.isLoading ? (
            <>Continue in wallet</>
          ) : (
            <>Claim & Lock {allocation} MENTO</>
          )}
        </PrimaryButton>
      );
    }
    return (
      <PrimaryButton onClick={() => kyc.signMessage()}>
        {kyc.isLoadingSignature ? (
          <>Continue in wallet</>
        ) : kyc.isLoadingProof ? (
          <>Loading...</>
        ) : (
          <>Claim & Lock {allocation} MENTO</>
        )}
      </PrimaryButton>
    );
  };

  return (
    <div className="flex items-center justify-center flex-col gap-8 text-center">
      {claim.claimed ? (
        <Claimed allocation={allocation} />
      ) : (
        <>
          {renderOverview()}
          {renderButton()}
        </>
      )}
    </div>
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
        <span className="text-primary-blue">{shortAddress}</span> is elligible
        to receive
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
  <div className="flex items-center justify-center flex-col gap-8 text-center px-20">
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
  </div>
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
