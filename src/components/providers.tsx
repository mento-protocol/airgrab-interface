"use client";

import { RainbowKitSiweIronSessionProvider } from "@/contexts/rainbowkit-siwe-iron-session-provider";
import { chains, config } from "@/lib/wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";
import { WagmiConfig } from "wagmi";
import ConnectionGuard from "./connection-guard";

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
