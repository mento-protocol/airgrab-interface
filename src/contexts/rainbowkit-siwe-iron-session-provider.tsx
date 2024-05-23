"use client";
import { defaultSession } from "@/lib/session/constants";
import { SessionData } from "@/lib/session/types";
import { fetchJson } from "@/lib/utils";
import {
  RainbowKitAuthenticationProvider,
  createAuthenticationAdapter,
} from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";

import React from "react";
import { SiweMessage } from "siwe";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useDisconnect } from "wagmi";

type UnconfigurableMessageOptions = {
  address: string;
  chainId: number;
  nonce: string;
};

type ConfigurableMessageOptions = Partial<
  Omit<SiweMessage, keyof UnconfigurableMessageOptions>
> & {
  [_Key in keyof UnconfigurableMessageOptions]?: never;
};

export type GetSiweMessageOptions = () => ConfigurableMessageOptions;

interface RainbowKitSiweIronSessionProviderProps {
  enabled?: boolean;
  getSiweMessageOptions?: GetSiweMessageOptions;
  children: React.ReactNode;
}

const sessionApiRoute = "/api/auth";

export function RainbowKitSiweIronSessionProvider({
  children,
  getSiweMessageOptions,
}: RainbowKitSiweIronSessionProviderProps) {
  const { login, logout, status } = useSession();

  const adapter = React.useMemo(
    () =>
      createAuthenticationAdapter({
        createMessage: ({ address, chainId, nonce }) => {
          const defaultConfigurableOptions: ConfigurableMessageOptions = {
            domain: window.location.host,
            statement: `I hereby confirm that the wallet with address ${address} belongs to me`,
            uri: window.location.origin,
            version: "1",
          };

          const unconfigurableOptions: UnconfigurableMessageOptions = {
            address,
            chainId,
            nonce,
          };

          return new SiweMessage({
            ...defaultConfigurableOptions,

            // Spread custom SIWE message options provided by the consumer
            ...getSiweMessageOptions?.(),

            // Spread unconfigurable options last so they can't be overridden
            ...unconfigurableOptions,
          });
        },

        getMessageBody: ({ message }) => message.prepareMessage(),

        getNonce: fetchNonce,

        signOut: logout,
        verify: (arg: { message: SiweMessage; signature: string }) => {
          return login(arg);
        },
      }),
    [getSiweMessageOptions, logout, login],
  );

  return (
    <RainbowKitAuthenticationProvider adapter={adapter} status={status}>
      {children}
    </RainbowKitAuthenticationProvider>
  );
}

const fetchNonce = async () => {
  const response = await fetch("api/auth?action=nonce", {
    cache: "no-store",
    next: { revalidate: 0 },
    method: "GET",
  });
  const data = await response.json();
  return data.nonce;
};

export const useSession = () => {
  const sessionResponse = useSWR(sessionApiRoute, fetchJson<SessionData>, {
    fallbackData: defaultSession,
  });

  const router = useRouter();
  const { disconnect } = useDisconnect();

  async function doLogout(url: string) {
    const result = await fetchJson<SessionData>(url, { method: "DELETE" });
    router.prefetch("/");
    if (!(result instanceof Response)) {
      sessionResponse.mutate(result);
    }
  }

  async function doLogin(
    url: string,
    {
      arg: { signature, message },
    }: {
      arg: { signature: string; message: SiweMessage };
    },
  ) {
    router.prefetch("/allocation");
    // Verify signature
    const { ok } = await fetchJson<{ ok: boolean }>(url, {
      method: "POST",
      body: JSON.stringify({ signature, message }),
    });
    return ok;
  }

  const { trigger: login } = useSWRMutation(sessionApiRoute, doLogin, {
    optimisticData: true,
    onSuccess: async () => {
      router.push("/allocation");
    },
  });

  const { trigger: logout } = useSWRMutation(sessionApiRoute, doLogout, {
    onSuccess: () => {
      router.push("/");
      disconnect();
    },
  });

  const { data: session, isLoading: isSessionLoading } = sessionResponse;

  const status: "loading" | "authenticated" | "unauthenticated" =
    React.useMemo(() => {
      return isSessionLoading
        ? "loading"
        : (session as SessionData)?.siwe?.success
          ? "authenticated"
          : "unauthenticated";
    }, [session, isSessionLoading]);

  return { login, logout, status, ...sessionResponse };
};
