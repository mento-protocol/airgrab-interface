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

  React.useEffect(() => {
    const handleConnectorUpdate = ({ account, chain }: ConnectorData) => {
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
  }, [activeConnector, disconnect, onAccountChange, onChainChange]);
};

export { useWatchChainOrAccountChange };
