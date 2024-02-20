"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { RainbowKitProvider, useConnectModal } from "@rainbow-me/rainbowkit";
import { WagmiConfig, useAccount, useDisconnect, useNetwork } from "wagmi";
import { chains, config } from "@/lib/wagmi";
import type { ThemeProviderProps } from "next-themes/dist/types";
import {
  RainbowKitSiweIronSessionProvider,
  useSession,
} from "@/contexts/rainbowkit-siwe-iron-session-provider";
import { useRouter } from "next/navigation";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitSiweIronSessionProvider>
        <RainbowKitProvider
          appInfo={{ appName: "Mento Airgrab Interface" }}
          chains={chains}
        >
          <ConnectionGuard>
            <NextThemesProvider forcedTheme="light" {...props}>
              {children}
            </NextThemesProvider>
          </ConnectionGuard>
        </RainbowKitProvider>
      </RainbowKitSiweIronSessionProvider>
    </WagmiConfig>
  );
}

const ConnectionGuard = ({ children }: { children: React.ReactNode }) => {
  const { connectModalOpen } = useConnectModal();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const { status } = useSession();
  const isConnectedWithNoSession = status === "unauthenticated" && isConnected;
  const isLoggingInViaModal = connectModalOpen;
  const hasSessionButNoConnection = status === "authenticated" && !isConnected;
  const isConnectedWithSession = status === "authenticated" && isConnected;
  const { chain } = useNetwork();

  React.useEffect(() => {
    if (isConnectedWithNoSession && !isLoggingInViaModal) {
      disconnect();
    }
    if (hasSessionButNoConnection) {
      disconnect();
    }
    const isOnCelo = chains.some((chn) => chn.id === chain?.id);

    if (Boolean(!isOnCelo && isConnectedWithSession)) {
      disconnect();
    }
  }, [
    isConnectedWithNoSession,
    isLoggingInViaModal,
    disconnect,
    hasSessionButNoConnection,
    router,
    isConnectedWithSession,
    chain,
  ]);
  return <>{children}</>;
};
