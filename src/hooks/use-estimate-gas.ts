import { useNetwork } from "wagmi";
import { EstimateContractGasParameters, createPublicClient, http } from "viem";
import React from "react";
import { toast } from "sonner";

export const useEstimateGas = (tx: EstimateContractGasParameters | null) => {
  const { chain } = useNetwork();
  const [gasPrice, setGasPrice] = React.useState<bigint | null>(null);

  const publicClient = React.useMemo(() => {
    if (!chain) return null;
    return createPublicClient({
      chain,
      transport: http(),
    });
  }, [chain]);

  React.useEffect(() => {
    const getGas = async () => {
      try {
        if (!tx) return;
        if (!publicClient) return;
        const gasEstimate = await publicClient.estimateContractGas(tx);
        setGasPrice(gasEstimate);
      } catch (error) {
        const err = error as Error;
        toast.error(err.message);
      }
    };
    getGas();
  }, [publicClient, tx]);

  return gasPrice;
};
