"use client";
import React from "react";
import { Button, type ButtonColor } from "./button";
import { useDisconnect } from "wagmi";

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
    <Button onClick={() => disconnect()} width={width} color={color}>
      {children}
    </Button>
  );
};
