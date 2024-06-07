import { useSession } from "@/contexts/rainbowkit-siwe-iron-session-provider";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import React from "react";
import { useAccount, useDisconnect } from "wagmi";

// Some logic to disconnect the user if the session is invalid due to edge cases not handled by RainbowKit
const useDisconnectOnInvalidSession = () => {
  const { status } = useSession();
  const { disconnect } = useDisconnect();
  const { connectModalOpen } = useConnectModal();
  const { isConnected } = useAccount();
  const isConnectedWithNoSession = status === "unauthenticated" && isConnected;
  const isLoggingInViaModal = connectModalOpen;
  const hasSessionButNoConnection = status === "authenticated" && !isConnected;
  const isConnectedWithSession = status === "authenticated" && isConnected;

  React.useEffect(() => {
    if (isConnectedWithNoSession && !isLoggingInViaModal) {
      disconnect();
    }
    if (hasSessionButNoConnection) {
      disconnect();
    }
  }, [
    isConnectedWithNoSession,
    isLoggingInViaModal,
    disconnect,
    hasSessionButNoConnection,
    isConnectedWithSession,
  ]);
};

export { useDisconnectOnInvalidSession };
