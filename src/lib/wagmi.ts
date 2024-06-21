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
import { Valora } from "@celo/rainbowkit-celo/wallets";

// Import CELO chain information
import { Alfajores, Celo } from "@celo/rainbowkit-celo/chains";

const isVercelProduction =
  process.env.NODE_ENV === "production" &&
  process.env.VERCEL_ENV === "production";
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? "";
const chainList = [...(isVercelProduction ? [Celo] : [Alfajores, Celo])];
const { chains, publicClient } = configureChains(chainList, [
  jsonRpcProvider({
    rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
  }),
]);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended with CELO",
    wallets: [
      Valora({ chains, projectId }),
      frameWallet({ chains, projectId }),
      metaMaskWallet({ chains, projectId }),
      omniWallet({ chains, projectId }),
      walletConnectWallet({ chains, projectId }),
    ],
  },
]);

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { config, chains };
