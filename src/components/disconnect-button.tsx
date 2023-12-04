import React from "react";
import { PrimaryButton } from "./button";
import { useDisconnect } from "wagmi";

export const DisconnectButton = ({
   width,
   color,
   children,
}: {
   width?: string;
   color?: "blush" | "blue";
   children: React.ReactNode;
}) => {
   const { disconnect } = useDisconnect();
   return (
      <PrimaryButton onClick={() => disconnect()} width={width} color={color}>
         {children}
      </PrimaryButton>
   );
};
