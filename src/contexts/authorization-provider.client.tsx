"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
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

const AuthorizationContext = createContext<AuthorizationContextValue | null>(
  null
);

const AuthorizationProvider = ({
  children,
  allocations,
}: {
  children: ReactNode;
  allocations: { [key: string]: string };
}) => {
  const _signMessageReturn = useSignMessage({ message: "MESSAGE" });
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

  return (
    <AuthorizationContext.Provider
      value={{
        ..._signMessageReturn,
        allocation: formatUnits(BigInt(allocation), 18),
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
