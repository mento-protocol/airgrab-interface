"use client";
import { useAuthorization } from "@/contexts/authorization-provider.client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { redirect } from "next/navigation";
import { useAccount } from "wagmi";

export default function Home() {
  const {
    proof,
    proofStatus,
    isLoadingProof,
    isLoadingSignature,
    signature,
    signMessage,
  } = useAuthorization();
  const { address } = useAccount();

  if (!address) {
    return <ConnectButton />;
  }

  if (isLoadingSignature) {
    return <>Please continue in your wallet to confirm the transaction.</>;
  }

  if (!signature && !proof) {
    return (
      <button onClick={() => signMessage()}>
        Sign a Message with your Wallet
      </button>
    );
  }

  if (isLoadingProof) {
    return <>loading...</>;
  }

  if (proofStatus === "user_pending") {
    redirect("/kyc-pending");
  }

  if (proof) {
    redirect("/allocation");
  }
}
