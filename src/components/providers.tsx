"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { chains, config } from "@/lib/wagmi";
import type { ThemeProviderProps } from "next-themes/dist/types";
import { RainbowKitSiweIronSessionProvider } from "@/contexts/rainbowkit-siwe-iron-session-provider";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitSiweIronSessionProvider>
        <RainbowKitProvider
          appInfo={{ appName: "Mento Airgrab Interface" }}
          chains={chains}
        >
          <NextThemesProvider forcedTheme="light" {...props}>
            {children}
          </NextThemesProvider>
        </RainbowKitProvider>
      </RainbowKitSiweIronSessionProvider>
    </WagmiConfig>
  );
}
