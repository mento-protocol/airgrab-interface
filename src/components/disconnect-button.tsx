"use client";
import React from "react";
import { PrimaryButton } from "./button";
import { useDisconnect } from "wagmi";
import ClientOnly from "./client-only";

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
  <ClientOnly>
      <PrimaryButton onClick={() => disconnect()} width={width} color={color}>
         {children}
      </PrimaryButton>
    </ClientOnly>
   );
};
