import { MESSAGE } from "@/lib/constants";
import React from "react";
import { useAccount, useSignMessage } from "wagmi";
import { watchAccount } from "wagmi/actions";
import { useLocalStorage } from "./useLocalStorage";

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

export const useKYCProof = ({ enabled }: { enabled?: boolean }) => {
  const [proof, setProof] = useLocalStorage("proof", "");
  const [proofStatus, setProofStatus] = React.useState<string>("");
  const {
    data: signature,
    variables,
    signMessage,
    isLoading: isLoadingSignature,
    reset,
  } = useSignMessage({ message: MESSAGE });
  const { address } = useAccount();

  const isLoadingProof = proofStatus === "loading";

  // Reset state when account changes
  React.useEffect(() => {
    const unwatch = watchAccount((account) => {
      if (account.address !== address) {
        setProof("");
        reset();
      }
    });

    return () => {
      unwatch();
    };
  }, [address]);

  // Try to get a proof if we have a signature
  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const loadProof = async () => {
      if (variables?.message && signature && enabled) {
        try {
          setProofStatus("loading");
          const { proof, error } = await fetchProof(
            signature,
            variables?.message
          );

          if (signal.aborted) return; // Ensure component is still mounted

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
    };

    loadProof();

    return () => {
      controller.abort(); // Abort fetch request if component is unmounted
    };
  }, [signature, variables?.message, enabled]);

  return {
    proof,
    proofStatus,
    isLoadingProof,
    signMessage,
    isLoadingSignature,
    signature,
  };
};
