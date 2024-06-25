import { useNetwork } from "wagmi";
import { EstimateContractGasParameters, createPublicClient, http } from "viem";
import React from "react";

export const useEstimateGas = (tx: EstimateContractGasParameters | null) => {
  console.log({ tx });
  const { chain } = useNetwork();
  const [gasPrice, setGasPrice] = React.useState<bigint | null>(null);

  const publicClient = createPublicClient({
    chain,
    transport: http(),
  });

  React.useEffect(() => {
    const getGas = async () => {
      if (!tx) return;
      const gasEstimate = await publicClient.estimateContractGas(tx);
      setGasPrice(gasEstimate);
    };

    if (tx) {
      getGas();
    }
  }, [publicClient, tx]);

  return gasPrice;
};
