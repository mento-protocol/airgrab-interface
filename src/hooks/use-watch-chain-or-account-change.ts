import { useSession } from "@/contexts/rainbowkit-siwe-iron-session-provider";
import React from "react";
import { ConnectorData, useAccount, useDisconnect } from "wagmi";

const useWatchChainOrAccountChange = ({
  onChainChange,
  onAccountChange,
}: {
  onChainChange?: () => void;
  onAccountChange?: () => void;
} = {}) => {
  const { connector: activeConnector } = useAccount();
  const { disconnect } = useDisconnect();
  const { logout } = useSession();

  React.useEffect(() => {
    const handleConnectorUpdate = ({ account, chain }: ConnectorData) => {
      if (chain?.unsupported) {
        logout();
      }
      if (account) {
        onAccountChange && onAccountChange();
      } else if (chain) {
        onChainChange && onChainChange();
      }
    };

    if (activeConnector) {
      activeConnector.on("change", handleConnectorUpdate);
    }

    return () => {
      activeConnector?.off("change", handleConnectorUpdate);
    };
  }, [activeConnector, disconnect, logout, onAccountChange, onChainChange]);
};

export { useWatchChainOrAccountChange };
