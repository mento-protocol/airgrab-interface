"use client";

import React, { ReactNode, createContext, useContext } from "react";
import { formatUnits } from "viem";
import { useKYCProof } from "@/hooks/useKYCProof";
import { useAccount } from "wagmi";
import { useRedirectWhenUnauthenticated } from "@/hooks/useRedirectWhenUnauthenticated";

interface AllocationsType {
  allocation: string;
  proof: string | null;
  proofStatus: string;
  isLoading?: boolean;
  isLoadingProof: boolean;
  isLoadingSignature: boolean;
  signature: `0x${string}` | undefined;
  signMessage: () => void;
}

type AuthorizationContextValue = AllocationsType;

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
  const { isConnected, address } = useAccount();
  const allocationForConnectedAddress = address && allocations[address];

  const {
    proof,
    proofStatus,
    isLoadingProof,
    isLoadingSignature,
    signature,
    signMessage,
  } = useKYCProof({ enabled: Boolean(allocationForConnectedAddress) });

  //TODO: Handle this case 
  // const connectedWalletNotVerified = !proof && approvalStatus === "approved";

  useRedirectWhenUnauthenticated({
    publicPages: ["/", "/kyc-pending", "/kyc-rejected"],
    isAuthed: (!!signature || !!proof) && isConnected,
  });

  return (
    <AuthorizationContext.Provider
      value={{
        allocation: formatUnits(BigInt(allocationForConnectedAddress ?? 0), 18),
        proof,
        proofStatus,
        isLoadingProof,
        isLoadingSignature,
        signature,
        signMessage,
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
