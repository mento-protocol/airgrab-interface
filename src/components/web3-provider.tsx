"use client";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import * as React from "react";
import { WagmiConfig } from "wagmi";

import { chains, config } from "@/lib/wagmi";

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider
        appInfo={{ appName: "Mento Airgrab Interface" }}
        chains={chains}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
