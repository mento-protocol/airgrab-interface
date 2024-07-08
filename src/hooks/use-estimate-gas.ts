import { useNetwork } from "wagmi";
import { EstimateContractGasParameters, createPublicClient, http } from "viem";
import React from "react";
import useSWR from "swr";
import * as Sentry from "@sentry/nextjs";

export const useEstimateGas = (tx: EstimateContractGasParameters | null) => {
  const { chain } = useNetwork();

  const publicClient = React.useMemo(() => {
    if (!chain) return null;
    return createPublicClient({
      chain,
      transport: http(),
    });
  }, [chain]);

  return useSWR(
    "estimate-gas",
    async () => {
      try {
        if (!tx) throw new Error("No transaction provided");
        if (!publicClient) throw new Error("No public client available");
        const gas = await publicClient.estimateContractGas(tx);
        return gas;
      } catch (error) {
        // log error then rethrow it to be caught by SWR
        Sentry.captureException(error);
        throw error;
      }
    },
    { revalidateOnFocus: false },
  );
};
