"use client";

import { useState, useEffect, useCallback } from "react";
import { useDisconnect, useNetwork, useSwitchNetwork } from "wagmi";
import { toast } from "sonner";
import useRefreshKYCStatus from "@/hooks/use-refresh-kyc-status";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { useWatchChainOrAccountChange } from "@/hooks/use-watch-chain-or-account-change";

const supportedChains = [42220, 44787]; // Celo Mainnet (42220) and Alfajores (44787)

const ConnectionGuard = ({ children }: { children: React.ReactNode }) => {
  const { disconnect } = useDisconnect();
  const { isLoading } = useRefreshKYCStatus();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const [isSwitching, setIsSwitching] = useState(false);

  useRequireAuth({ enabled: !isLoading });

  const handleUnsupportedChain = useCallback(async () => {
    if (chain && !supportedChains.includes(chain.id)) {
      if (switchNetwork) {
        try {
          setIsSwitching(true);
          await switchNetwork(supportedChains[0]);
        } catch (error) {
          toast.error(
            "Failed to switch chain. Please switch to Celo Mainnet or Alfajores manually.",
          );
          disconnect();
        } finally {
          setIsSwitching(false);
        }
      } else {
        toast.error("Please switch to Celo Mainnet or Alfajores manually.");
        disconnect();
      }
    }
  }, [chain, switchNetwork, disconnect]);

  useEffect(() => {
    handleUnsupportedChain();
  }, [handleUnsupportedChain]);

  useWatchChainOrAccountChange({
    onAccountChange: () => disconnect(),
    onChainChange: () => {
      if (!isSwitching) {
        handleUnsupportedChain();
      }
    },
  });

  return <>{children}</>;
};

export default ConnectionGuard;
