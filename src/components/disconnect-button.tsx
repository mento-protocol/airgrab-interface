import React from "react";
import { PrimaryButton } from "./button";
import { useDisconnect } from "wagmi";

export const DisconnectButton = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { disconnect } = useDisconnect();
  return <PrimaryButton onClick={() => disconnect()}>{children}</PrimaryButton>;
};
