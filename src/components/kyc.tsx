"use client";

import React from "react";
import { useAccount, useSignMessage } from "wagmi";
import { useSearchParams } from "next/navigation";
import { watchAccount } from "wagmi/actions";
import Link from "next/link";
import { MESSAGE } from "@/config/constants";
import { PrimaryButton } from "./button";

const FRACTAL_APP_URL = process.env.NEXT_PUBLIC_FRACTAL_APP_URL;

if (!FRACTAL_APP_URL) {
  throw new Error("FRACTAL_APP_URL not set correctly");
}

const fetchProof = async (signature: string, message: string) => {
  try {
    const res = await fetch("api/kyc/proof", {
      method: "POST",
      body: JSON.stringify({ signature, message }),
    });

    return await res.json();
  } catch (err) {
    throw err instanceof Error ? err : new Error("unexpected_error");
  }
};

export default function KYC({ children }: { children: React.ReactNode }) {
  const [proof, setProof] = React.useState<string | null>(null);
  const [proofStatus, setProofStatus] = React.useState<string>("");

  const params = useSearchParams();
  const status = params.get("status");
  const approvalStatus = params.get("approvalStatus");

  const {
    data: signature,
    variables,
    error,
    isLoading,
    signMessage,
  } = useSignMessage({ message: MESSAGE });

  const { address } = useAccount();

  // reset proof if user changes wallet
  React.useEffect(() => {
    const unwatch = watchAccount((account) => {
      if (account.address !== address) {
        setProof("");
        setProofStatus("");
      }
    });

    return () => {
      unwatch();
    };
  }, [address]);

  // Try to get a proof if we have a signature
  React.useEffect(() => {
    (async () => {
      if (variables?.message && signature) {
        try {
          const { proof, error } = await fetchProof(
            signature,
            variables.message
          );

          if (error) {
            setProofStatus(error);
          } else {
            setProof(proof);
            setProofStatus("success");
          }
        } catch (err) {
          setProofStatus(
            err instanceof Error ? err.message : "unexpected_error"
          );
        }
      }
    })();
  }, [signature, variables?.message]);

  const isPending = proofStatus === "user_pending" || status === "pending";
  const isRejected = approvalStatus === "rejected";
  const connectedWalletNotVerified = !proof && approvalStatus === "approved";

  if (!address) {
    return null;
  }

  if (isLoading) {
    return <>Please continue in your wallet to confirm the transaction.</>;
  }

  // Case when user is verified with fractal, but the connected wallet cannot get a proof
  if (connectedWalletNotVerified) {
    return (
      <div className="flex flex-col">
        <span>
          Wallet address not verified, please make sure this wallet has been
          added to your Fractal ID account
        </span>
        <Link className="text-primary-blue" href={FRACTAL_APP_URL!}>
          Visit Fractal ID Dashboard
        </Link>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex flex-col items-center gap-6">
        <span className="text-lg">
          Your KYC Verification is still pending, for update visit your
        </span>
        <Link className="text-primary-blue" href={FRACTAL_APP_URL!}>
          Fractal ID Dashboard
        </Link>
      </div>
    );
  }

  if (proofStatus === "") {
    return (
      <div>
        <button onClick={() => signMessage()}>Sign Message</button> <br />
        {error && <>error signing, please try again</>}
      </div>
    );
  }

  if (proofStatus === "user_not_found") {
    return <KYCButton wallet={address} />;
  }

  if (isRejected) {
    return (
      <div className="flex flex-col items-center gap-6">
        <span className="text-lg">
          Your KYC Verification been rejected visit your Fractal ID dashboard
          for more details
        </span>
        <Link className="text-primary-blue" href={FRACTAL_APP_URL!}>
          Visit Fractal ID Dashboard
        </Link>
      </div>
    );
  }

  if (proof) {
    return (
      <div className="flex gap-4 items-center flex-col justify-center overflow-hidden ">
        <span>{children}</span>
        <span className="text-ellipsis">{proof}</span>
      </div>
    );
  }
}

function KYCButton({ wallet }: { wallet: `0x${string}` }) {
  return (
    <PrimaryButton href={`api/kyc?wallet=${wallet}`}>
      KYC with Fractal ID
    </PrimaryButton>
  );
}
