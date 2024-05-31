import { useChainModal } from "@rainbow-me/rainbowkit";
import React from "react";
import { ConnectorData, useAccount, useDisconnect } from "wagmi";

const useWatchChainOrAccountChange = ({
  onChainChange,
  onAccountChange,
}: {
  onChainChange?: () => void;
  onAccountChange?: () => void;
}) => {
  const { connector: activeConnector } = useAccount();
  const { disconnect } = useDisconnect();
  const { openChainModal } = useChainModal();

  React.useEffect(() => {
    const handleConnectorUpdate = ({ account, chain }: ConnectorData) => {
      if (chain?.unsupported) {
        openChainModal?.();
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
  }, [activeConnector, disconnect, onAccountChange, onChainChange, openChainModal]);
};

export { useWatchChainOrAccountChange };
