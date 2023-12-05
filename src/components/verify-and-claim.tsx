"use client";
import { useClaimMento } from "@/hooks/use-claim-mento";
import { useKYCProof } from "@/hooks/use-kyc-proof";
import React from "react";
import { PrimaryButton } from "./button";
import Link from "next/link";
import { shortenAddress } from "@/lib/addresses";

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

export default function VerifyAndClaim({
  address,
  allocation,
  merkleProof,
}: {
  address: `0x${string}`;
  allocation: string;
  merkleProof: string[] | undefined;
}) {
  const { verificationDetails, signMessage, hasSignedMessage } = useKYCProof();
  const canClaim = Boolean(address && verificationDetails);
  const shortAddress = address ? shortenAddress(address) : "";

  const { claim } = useClaimMento({
    enabled: canClaim,
    merkleProof,
    allocation,
    address,
    kycDetails: verificationDetails as any,
  });

  if (!hasSignedMessage) {
    return (
      <div className="flex items-center justify-center flex-col gap-8 text-center">
        <h3 className="font-fg font-medium text-sm sm:text-base text-center flex flex-col gap-8">
          <span>
            Congratulations, wallet address{" "}
            <span className="text-primary-blue">{shortAddress}</span> is
            elligible to receive
          </span>
          <span className="text-base sm:text-2xl">{allocation} MENTO</span>
        </h3>
        <p className="flex flex-col gap-8 font-fg">
          <span className="text-sm sm:text-xl">
            To claim your MENTO, sign a message to verify your Fractal KYC.{" "}
            <br className="hidden sm:block" />
            This signature helps us confirm your KYC on-chain with Fractal ID.
          </span>
        </p>

        <PrimaryButton onClick={() => signMessage()}>
          Claim & Lock {allocation} MENTO
        </PrimaryButton>
        <LockingFAQLink />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center flex-col gap-8 text-center">
      <h3 className="font-fg font-medium text-sm sm:text-base text-center flex flex-col gap-8">
        <span>
          Congratulations, wallet address{" "}
          <span className="text-primary-blue">{address}</span> is elligible to
          receive
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
      <PrimaryButton onClick={() => claim!()}>
        Claim & Lock {allocation} MENTO
      </PrimaryButton>
      <LockingFAQLink />
    </div>
  );
}
