"use client";
import React from "react";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";

export function AllocationDisplay({
  allocations,
}: {
  allocations: { [key: string]: string };
}) {
  const { address } = useAccount();

  if (!address) return <>loading</>;

  const allocation = allocations[address];

  return allocation ? (
    <div>{`Congrats! You're qualified to receive ${formatUnits(
      BigInt(allocation),
      18
    )} $MENTO Tokens`}</div>
  ) : (
    <div>Sorry, you do not have an allocation</div>
  );
}
