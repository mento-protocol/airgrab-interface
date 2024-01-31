"use client";
import React from "react";
import { TertiaryButton } from "./button";
import { useDisconnect } from "wagmi";
import ClientOnly from "./client-only";

export const DisconnectButton = ({
  width,
  color,
  children,
}: {
  width?: string;
  color: "blush" | "blue" | "white";
  children: React.ReactNode;
}) => {
  const { disconnect } = useDisconnect();
  return (
    <ClientOnly>
      <TertiaryButton onClick={() => disconnect()} width={width} color={color}>
        {children}
      </TertiaryButton>
    </ClientOnly>
  );
};
