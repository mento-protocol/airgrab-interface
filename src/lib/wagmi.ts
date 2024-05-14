import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  omniWallet,
  walletConnectWallet,
  frameWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

// Import known recommended wallets
import { Valora, CeloWallet } from "@celo/rainbowkit-celo/wallets";

// Import CELO chain information
import { Alfajores, Baklava, Celo } from "@celo/rainbowkit-celo/chains";

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? "";

const { chains, publicClient } = configureChains(
  [Alfajores, Celo, Baklava],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ],
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended with CELO",
    wallets: [
      Valora({ chains, projectId }),
      CeloWallet({ chains, projectId }),
      metaMaskWallet({ chains, projectId }),
      omniWallet({ chains, projectId }),
      walletConnectWallet({ chains, projectId }),
      frameWallet({ chains, projectId }),
    ],
  },
]);

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { config, chains };
