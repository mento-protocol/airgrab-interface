"use client";
import { useAuthorization } from "@/contexts/authorization-provider.client";

export function AllocationDisplay() {
  const { allocation } = useAuthorization();

  return (
    <div>{`Congrats! You're qualified to receive ${allocation} $MENTO Tokens`}</div>
  );
}
