"use client";

import { RainbowKitSiweIronSessionProvider } from "@/contexts/rainbowkit-siwe-iron-session-provider";
import useRefreshKYCStatus from "@/hooks/use-refresh-kyc-status";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { useWatchChainOrAccountChange } from "@/hooks/use-watch-chain-or-account-change";
import { chains, config } from "@/lib/wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";
import { WagmiConfig } from "wagmi";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitSiweIronSessionProvider>
        <RainbowKitProvider
          appInfo={{ appName: "Mento Airdrop UI" }}
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
  const { isLoading } = useRefreshKYCStatus();
  useRequireAuth({ enabled: !isLoading });
  useWatchChainOrAccountChange();

  return <>{children}</>;
};
