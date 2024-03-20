"use client";
import useSWR from "swr";
import { useSignMessage } from "wagmi";
import { UserRejectedRequestError } from "viem";
import { toast } from "sonner";

import { fetchJson } from "@/lib/utils";
import { createFractalAuthMessage } from "@/lib/authMessage";

export type FractalVerificationDetails = {
  proof: `0x${string}` | undefined;
  validUntil: number | undefined;
  approvedAt: number | undefined;
  fractalId: string | undefined;
};

const DEFAULT_FRACTAL_VERIFICATION_DETAILS = {
  fractalProof: "0x" as `0x${string}`,
  fractalProofValidUntil: 0,
  fractalProofApprovedAt: 0,
  fractalId: "",
};

const fetchProof = async (
  url: string,
  signature: `0x${string}`,
  message: string | undefined,
) => {
  return fetchJson<FractalVerificationDetails>(url, {
    method: "POST",
    body: JSON.stringify({ signature, message }),
  }) as Promise<FractalVerificationDetails>;
};

export const useKYCProof = () => {
  const signature = useSignMessage({
    message: createFractalAuthMessage(),
    onSettled: (data: `0x${string}` | undefined, e: Error | null) => {
      if (e instanceof Error && !(e instanceof UserRejectedRequestError)) {
        toast.error(e.message);
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
      defaultData: DEFAULT_FRACTAL_VERIFICATION_DETAILS,
    },
  );

  return {
    kyc: {
      isLoadingSignature: signature.isLoading,
      isLoadingProof: kyc.isLoading,
      isSuccess: !kyc.error && signature.isSuccess,
      data: kyc.data,
      error: signature.error || kyc.error,
      isError: signature.isError || kyc.error,
      signMessage: signature.signMessage,
    },
  };
};
