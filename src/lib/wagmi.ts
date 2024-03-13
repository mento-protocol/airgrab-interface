import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  omniWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "wagmi";
import { valora } from "@/lib/wagmi/wallets/valora";
import { celo, celoAlfajores } from "viem/chains";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended for Celo chains",
      wallets: [
        metaMaskWallet,
        walletConnectWallet,
        valora,
        omniWallet,
        trustWallet,
      ],
    },
  ],
  {
    appName: "Mento Airdrop",
    projectId:
      process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "123123123123123123",
  },
);

export const wagmiConfig = createConfig({
  chains: [celo, celoAlfajores],
  transports: {
    [celo.id]: http(celo.rpcUrls.default.http[0]),
    [celoAlfajores.id]: http(celoAlfajores.rpcUrls.default.http[0]),
  },
  connectors,
});
