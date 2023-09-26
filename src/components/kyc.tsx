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

  if (!address) {
    return null;
  }

  if (isLoading) {
    return <>Please continue in your wallet to confirm the transaction.</>;
  }

  // Case when user is verified with fractal, but the connected wallet cannot get a proof
  if (!proof && status === "done") {
    return <>wallet address not verified</>;
  }

  if (proofStatus === "") {
    return (
      <div>
        <button onClick={() => signMessage()}>Sign Message</button> <br />
        {error && <>error signing, please try again</>}
      </div>
    );
  }

  if (isPending) {
    <>
      Your KYC Verification is still pending, for update visit
      <Link href={FRACTAL_APP_URL!}>your Fractal ID dashboard</Link>
    </>;
  }

  if (proofStatus === "user_not_found") {
    return <KYCButton wallet={address} />;
  }

  return (
    <div className="flex gap-4 items-center flex-col justify-center overflow-hidden ">
      <span>{children}</span>
      <span className="text-ellipsis">{proof}</span>
    </div>
  );
}

function KYCButton({ wallet }: { wallet: `0x${string}` }) {
  return (
    <PrimaryButton href={`api/kyc?wallet=${wallet}`}>
      KYC with Fractal ID
    </PrimaryButton>
  );
}
