import { MESSAGE } from "@/lib/constants";
import { useSignMessage } from "wagmi";
import useSWR from "swr";
import { fetchJson } from "@/lib/utils";

export type FractalVerificationDetails = {
  proof: string | undefined;
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
  });
};

export const useKYCProof = () => {
  const {
    data: signature,
    variables,
    signMessage,
    isLoading: isLoadingSignature,
    error: signMessageError,
  } = useSignMessage({ message: MESSAGE });

  const { data, isLoading } = useSWR(
    signature && variables?.message
      ? ["api/kyc/proof", signature, variables?.message]
      : null,
    ([url, signature, message]) => fetchProof(url, signature, message)
  );

  return {
    hasSignedMessage: Boolean(signature),
    verificationDetails: data,
    isLoadingProof: isLoading,
    signMessage,
    signMessageError,
    isLoadingSignature,
    signature,
  };
};
