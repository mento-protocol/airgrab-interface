"use client";
import { useCallback } from "react";
import * as mento from "@mento-protocol/mento-sdk";
import { Alfajores, Celo } from "@celo/rainbowkit-celo/chains";
import { useNetwork, useWalletClient } from "wagmi";

export const useAddTokens = () => {
  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient();

  let chainId = Alfajores.id;

  if (chain && chain.id === Celo.id) {
    chainId = Celo.id;
  }

  const addMento = useCallback(async () => {
    if (!walletClient) return;

    await walletClient.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: mento.addresses[chainId].MentoToken,
          symbol: "MENTO",
          decimals: 18,
        },
      },
    });
  }, [chainId, walletClient]);

  const addVeMento = useCallback(async () => {
    if (!walletClient) return;

    await walletClient.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: mento.addresses[chainId].Locking,
          symbol: "veMENTO",
          decimals: 18,
        },
      },
    });
  }, [chainId, walletClient]);

  return {
    addMento,
    addVeMento,
  };
};
