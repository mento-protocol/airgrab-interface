"use client";

import {
  RainbowKitSiweIronSessionProvider,
  useSession,
} from "@/contexts/rainbowkit-siwe-iron-session-provider";
import useRefreshKYCStatus from "@/hooks/use-refresh-kyc-status";
import { SessionData } from "@/lib/session/types";
import { chains, config } from "@/lib/wagmi";
import { RainbowKitProvider, useConnectModal } from "@rainbow-me/rainbowkit";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
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
  const { chain } = useNetwork();
  const pathname = usePathname();
  const router = useRouter();
  const { status, data: session } = useSession();
  const isConnectedWithNoSession = status === "unauthenticated" && isConnected;
  const isLoggingInViaModal = connectModalOpen;
  const hasSessionButNoConnection = status === "authenticated" && !isConnected;
  const isConnectedWithSession = status === "authenticated" && isConnected;

  // const isPastLaunchDate = new Date(LAUNCH_DATE).getTime() < Date.now();
  const isHomePage = pathname === "/";
  const isClaimPage = pathname.startsWith("/claim");
  const isAllocationPage = pathname.startsWith("/allocation");
  const hasSession = status === "authenticated";

  const { isLoading } = useRefreshKYCStatus({
    isPaused: () => {
      const sess = session as SessionData;

      if (!sess) return true;
      if (sess.isKycVerified || sess.hasClaimed || sess.allocation === "0")
        return true;

      return false;
    },
  });

  React.useEffect(() => {
    if (status === "loading" || isLoading) return;
    // every route except home requires a session
    if (!isHomePage && !hasSession) {
      return router.push("/");
    } else if (isHomePage && hasSession) {
      return router.push("/allocation");
    }

    // Redirect to claim page if user is on allocation page and has a session and is past launch date and is kyc verified or has claimed
    if (
      isAllocationPage &&
      // isPastLaunchDate &&
      ((session as SessionData)?.isKycVerified ||
        (session as SessionData).hasClaimed)
    ) {
      return router.push("/claim");
    }

    if (
      isClaimPage &&
      !(session as SessionData)?.isKycVerified &&
      !(session as SessionData).hasClaimed
    ) {
      router.push("/");
    }
  }, [
    hasSession,
    isAllocationPage,
    isClaimPage,
    isHomePage,
    router,
    session,
    status,
  ]);

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
