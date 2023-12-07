"use client";
import { MESSAGE } from "@/lib/constants";
import { useSignMessage } from "wagmi";
import useSWR from "swr";
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
  message: string | undefined
) => {
  return fetchJson<FractalVerificationDetails>(url, {
    method: "POST",
    body: JSON.stringify({ signature, message }),
  }) as any;
};

export const useKYCProof = () => {
  const signature = useSignMessage({ message: MESSAGE });
  const { data, variables } = signature;

  const kyc = useSWR(
    data && variables?.message
      ? ["api/kyc/proof", data, variables?.message]
      : null,
    ([url, signature, message]) => fetchProof(url, signature, message),
    {
      revalidateOnFocus: false,
      defaultData: {
        fractalProof: "0x" as `0x${string}`,
        fractalProofValidUntil: 0,
        fractalProofApprovedAt: 0,
        fractalId: "",
      },
    }
  );

  return {
    kyc: {
      isLoadingSignature: signature.isLoading,
      isLoadingProof: kyc.isLoading,
      isSuccess: !kyc.error && signature.isSuccess,
      data: kyc.data,
      error: kyc.error || signature.error,
      signMessage: signature.signMessage,
    },
  };
};
