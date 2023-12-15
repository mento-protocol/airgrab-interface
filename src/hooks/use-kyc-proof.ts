"use client";
import useSWR from "swr";
import { useSignMessage } from "wagmi";
import { UserRejectedRequestError } from "viem";
import { toast } from "sonner";

import { MESSAGE } from "@/lib/constants";
import { fetchJson } from "@/lib/utils";

export type FractalVerificationDetails = {
  proof: `0x${string}` | undefined;
  validUntil: number | undefined;
  approvedAt: number | undefined;
  id: string | undefined;
};

const fetchProof = async (
  url: string,
  signature: `0x${string}`,
  message: string | undefined,
) => {
  return fetchJson<FractalVerificationDetails>(url, {
    method: "POST",
    body: JSON.stringify({ signature, message }),
  }) as any;
};

export const useKYCProof = () => {
  const signature = useSignMessage({
    message: MESSAGE,
    onSettled: (data: `0x${string}` | undefined, e: Error | null) => {
      if (e instanceof Error) {
        if (!(e instanceof UserRejectedRequestError)) {
          toast.error(e.message);
        }
      }
    },
  });
  const { data, variables } = signature;

  const kyc = useSWR(
    data && variables?.message
      ? ["api/kyc/proof", data, variables?.message]
      : null,
    ([url, signature, message]) => fetchProof(url, signature, message),
    {
      onError: (e) => {
        if (e instanceof Error) {
          toast.error(e.message);
        }
      },
      revalidateOnFocus: false,
      defaultData: {
        fractalProof: "0x" as `0x${string}`,
        fractalProofValidUntil: 0,
        fractalProofApprovedAt: 0,
        fractalId: "",
      },
    },
  );

  return {
    kyc: {
      isLoadingSignature: signature.isLoading,
      isLoadingProof: kyc.isLoading,
      isSuccess: !kyc.error && signature.isSuccess,
      data: kyc.data,
      error: signature.error || kyc.error,
      signMessage: signature.signMessage,
    },
  };
};
