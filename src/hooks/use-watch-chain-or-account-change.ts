import { useSession } from "@/contexts/rainbowkit-siwe-iron-session-provider";
import { useSentryContext } from "@/hooks/use-sentry-context";
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
  const { clearContext, setContext } = useSentryContext();

  React.useEffect(() => {
    const handleConnectorUpdate = ({ account, chain }: ConnectorData) => {
      if (chain?.unsupported) {
        clearContext();
        logout();
      }
      if (account) {
        setContext({
          chain: chain?.id,
          account,
        });
        onAccountChange && onAccountChange();
      } else if (chain) {
        setContext({
          chain: chain?.id,
          account,
        });
        onChainChange && onChainChange();
      }
    };

    if (activeConnector) {
      activeConnector.on("change", handleConnectorUpdate);
    }

    return () => {
      activeConnector?.off("change", handleConnectorUpdate);
    };
  }, [
    activeConnector,
    clearContext,
    disconnect,
    logout,
    onAccountChange,
    onChainChange,
    setContext,
  ]);
};

export { useWatchChainOrAccountChange };
