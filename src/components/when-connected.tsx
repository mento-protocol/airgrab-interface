"use client";

import { useAccount } from "wagmi";

interface Props {
  children: React.ReactNode;
  behavior: "show" | "hide";
}

export function WhenConnected({ children, behavior }: Props) {
  const { isConnected } = useAccount();

  if (behavior === "show" && !isConnected) return null;
  if (behavior === "hide" && isConnected) return null;

  return <>{children}</>;
}
