"use client";
import React from "react";
import { Button, type ButtonColor } from "./button";
import { useDisconnect } from "wagmi";
import ClientOnly from "./client-only";

export const DisconnectButton = ({
  width,
  color = "white",
  children,
}: {
  width?: string;
  color: ButtonColor;
  children: React.ReactNode;
}) => {
  const { disconnect } = useDisconnect();
  return (
    <ClientOnly>
      <Button onClick={() => disconnect()} width={width} color={color}>
        {children}
      </Button>
    </ClientOnly>
  );
};
