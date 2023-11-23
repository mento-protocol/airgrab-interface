"use client";

import React from "react";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";
import { useRedirectWhenUnauthenticated } from "@/hooks/useRedirectWhenUnauthenticated";
import { TriggerWithoutArgs } from "swr/mutation";
import { SessionData } from "@/lib/session/types";
import useOnWalletDisconnect from "@/hooks/use-on-wallet-disconnect";
import useSession from "@/hooks/use-session";
import { useRouter } from "next/navigation";

type AllocationsType = {
  allocation: string;
  login: TriggerWithoutArgs;
  logout: TriggerWithoutArgs;
  session: SessionData;
  isSessionLoading: boolean;
  isLoggedIn: boolean;
};

type AuthorizationContextValue = AllocationsType;

const AuthorizationContext =
  React.createContext<AuthorizationContextValue | null>(null);

const AuthorizationProvider = ({
  children,
  allocations,
}: {
  children: React.ReactNode;
  allocations: { [key: string]: string };
}) => {
  const { address, isConnected } = useAccount();
  const allocationForConnectedAddress = address && allocations[address];
  const { login, session, isSessionLoading, logout } = useSession();
  const isLoggedIn = (session as SessionData).siwe.success;
  const router = useRouter();

  //TODO: Handle this case
  // const connectedWalletNotVerified = !proof && approvalStatus === "approved";

  useRedirectWhenUnauthenticated({
    publicPages: ["/", "/kyc-pending", "/kyc-rejected"],
    isAuthed: (isLoggedIn || isSessionLoading) && isConnected,
  });

  useOnWalletDisconnect(() => {
    router.replace("/");
    logout();
  });

  return (
    <AuthorizationContext.Provider
      value={{
        allocation: formatUnits(BigInt(allocationForConnectedAddress ?? 0), 18),
        login,
        logout,
        session: session as SessionData,
        isSessionLoading,
        isLoggedIn,
      }}
    >
      {children}
    </AuthorizationContext.Provider>
  );
};

const useAuthorization = () => {
  const context = React.useContext(AuthorizationContext);

  if (!context) {
    throw new Error(
      "useAuthorization must be used within an AuthorizationProvider"
    );
  }

  return context;
};

export { useAuthorization };

export default AuthorizationProvider;
