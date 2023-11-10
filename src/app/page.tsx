"use client";

import { useAccount } from "wagmi";
import { PrimaryButton } from "@/components/button";
import { ConnectButton } from "@/components/connect-button";
import { useAuthorization } from "@/contexts/authorization-provider.client";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isLoadingProof, isLoadingSignature, signature, signMessage, proof } =
    useAuthorization();
  const router = useRouter();
  const { address, isConnecting } = useAccount();

  if (isConnecting) {
    return <>loading...</>;
  }

  if (!address) {
    return (
      <div className="flex flex-col gap-8 items-center justify-center">
        <h3 className="font-fg font-medium text-2xl">
          Connect wallet to check your eligibility to claim MNTO token
        </h3>
        <ConnectButton />
      </div>
    );
  }

  if (isLoadingSignature) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 text-center">
        <h3 className="font-fg font-medium text-2xl">
          Please continue in your wallet to confirm the transaction
        </h3>
      </div>
    );
  }

  if (isLoadingProof) {
    return (
      <div className="flex flex-col gap-8">
        <h3 className="font-fg font-medium text-2xl">
          Trying to fetch fractal proof for your wallet
        </h3>
      </div>
    );
  }

  if (!signature && !proof) {
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
      </div>
    );
  }

  if (signature || proof) {
    router.push("/allocation", { scroll: false });
  }

  return (
    <div className="flex flex-col gap-8">
      <h3 className="font-fg font-medium text-2xl">
        Trying to fetch fractal proof for your wallet
      </h3>
    </div>
  );
}
