"use client";

import {
  RainbowKitSiweIronSessionProvider,
  useSession,
} from "@/contexts/rainbowkit-siwe-iron-session-provider";
import { chains, config } from "@/lib/wagmi";
import { RainbowKitProvider, useConnectModal } from "@rainbow-me/rainbowkit";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import { useRouter } from "next/navigation";
import * as React from "react";
import useSWR from "swr";
import { WagmiConfig, useAccount, useDisconnect, useNetwork } from "wagmi";

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
  const { connectModalOpen } = useConnectModal();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const { status, data: session } = useSession();
  const isConnectedWithNoSession = status === "unauthenticated" && isConnected;
  const isLoggingInViaModal = connectModalOpen;
  const hasSessionButNoConnection = status === "authenticated" && !isConnected;
  const isConnectedWithSession = status === "authenticated" && isConnected;
  const { chain } = useNetwork();

  // Refresh KYC every 15 minutes if the user is authenticated and not kyc verified
  useSWR("refresh-kyc", () => fetch("/api/kyc/refresh"), {
    onSuccess: async (data) => {
      const verificationCaseStatus = await data.json();
      switch (verificationCaseStatus?.status) {
        case "contacted":
          return router.push("/?kyc_status=contacted");
        case "pending":
          return router.push("/kyc-pending");
        case "done":
          switch (verificationCaseStatus.credential) {
            case "approved":
              return router.push("/allocation");
            case "pending":
              return router.push("/kyc-pending");
            case "rejected":
              return router.push("/kyc-rejected");
          }
        default:
          return router.push("/");
      }
    },
    isPaused: () =>
      status !== "authenticated" &&
      !(session instanceof Response) &&
      !session.isKycVerified,
    refreshInterval: 900,
  });

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
