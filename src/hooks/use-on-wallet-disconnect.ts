import React from "react";
import { useAccount } from "wagmi";
import { watchAccount } from "wagmi/actions";

type CallbackFunction = () => void;

const useOnWalletDisconnect = (onDisconnect: CallbackFunction) => {
  const { address } = useAccount();

  React.useEffect(() => {
    if (typeof onDisconnect !== "function") {
      console.error("onDisconnect must be a function");
      return;
    }

    const unwatch = watchAccount((account) => {
      if (account.address !== address) {
        onDisconnect();
      }
    });

    // Clean up the listener when the component is unmounted or dependencies change
    return () => {
      unwatch();
    };
  }, [address, onDisconnect]);
};

export default useOnWalletDisconnect;
