"use client";

<<<<<<< HEAD
import { AllocationMap } from "@/utils/merkle";
import { redirect } from "next/navigation";
=======
import { AllocationMap } from "@/lib/merkle/merkle";
import { ConnectButton } from "@rainbow-me/rainbowkit";
>>>>>>> 52eb648 (chore: restructure project directories)
import React, { ReactNode, createContext, useContext } from "react";
import { formatUnits } from "viem";
import { useAccount, useSignMessage } from "wagmi";
import { SignMessageArgs } from "wagmi/actions";

interface SignMessageReturnType {
  data?: `0x${string}`;
  error?: Error | null;
  isError: boolean;
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  signMessage: (args?: SignMessageArgs) => void;
  signMessageAsync: (args?: SignMessageArgs) => Promise<string>;
  reset: () => void;
  status: "idle" | "error" | "loading" | "success";
}

interface AllocationsType {
  allocation: string;
}

type AuthorizationContextValue = SignMessageReturnType & AllocationsType;

const MESSAGE = `I authorize Airgrab (${process.env.NEXT_PUBLIC_FRACTAL_CLIENT_ID}) to get a proof from Fractal that:
- I passed KYC level basic+liveness`;

const AuthorizationContext = createContext<AuthorizationContextValue | null>(
  null
);

const AuthorizationProvider = ({
  children,
  allocations,
}: {
  children: ReactNode;
  allocations: AllocationMap;
}) => {
<<<<<<< HEAD
  const _signMessageReturn = useSignMessage({ message: "MESSAGE" });
  const { address } = useAccount({
    onDisconnect: () => {
      redirect("/");
    },
  });
  const allocationForConnectedAddress = address && allocations[address];
=======
  const _signMessageReturn = useSignMessage({ message: MESSAGE });
  const { address } = useAccount();
  const { data: signature, signMessage } = _signMessageReturn;

  if (!address) {
    return <ConnectButton />;
  }

  if (!signature) {
    return <button onClick={() => signMessage()}>Sign a Message</button>;
  }

  const allocation = allocations[address];

  if (!allocation) {
    return <div>Sorry, you do not have an allocation</div>;
  }
>>>>>>> 52eb648 (chore: restructure project directories)

  return (
    <AuthorizationContext.Provider
      value={{
        ..._signMessageReturn,
        allocation: formatUnits(BigInt(allocationForConnectedAddress ?? 0), 18),
      }}
    >
      {children}
    </AuthorizationContext.Provider>
  );
};

const useAuthorization = () => {
  const context = useContext(AuthorizationContext);

  if (!context) {
    throw new Error(
      "useAuthorization must be used within an AuthorizationProvider"
    );
  }

  return context;
};

export { useAuthorization };

export default AuthorizationProvider;
