import { defaultSession } from "@/lib/session/constants";
import { SessionData } from "@/lib/session/types";
import {
  RainbowKitAuthenticationProvider,
  createAuthenticationAdapter,
} from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";

import React from "react";
import { SiweMessage } from "siwe";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

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
  const router = useRouter();

  const {
    data: session,
    isLoading: isSessionLoading,
    mutate: mutateSession,
  } = useSWR(sessionApiRoute, fetchJson<SessionData>, {
    fallbackData: defaultSession,
  });

  const status = React.useMemo(() => {
    return isSessionLoading
      ? "loading"
      : (session as SessionData)?.siwe?.success
      ? "authenticated"
      : "unauthenticated";
  }, [session, isSessionLoading]);

  async function doLogout(url: string) {
    const result = await fetchJson<SessionData>(url, { method: "DELETE" });

    if (!(result instanceof Response)) {
      // Now TypeScript knows result is of type SessionData
      mutateSession(result);
    } else {
      // Handle the response case, if needed
      // For example, you might want to check response.status
      // to determine if the request was successful
    }
  }

  async function doLogin(
    url: string,
    {
      arg: { signature, message },
    }: {
      arg: { signature: string; message: SiweMessage };
    }
  ) {
    // Verify signature
    const { ok } = await fetchJson<{ ok: boolean }>(url, {
      method: "POST",
      body: JSON.stringify({ signature, message }),
    });
    return ok;
  }

  const { trigger: login } = useSWRMutation(sessionApiRoute, doLogin, {
    onSuccess: async () => {
      router.push("/allocation");
    },
  });
  const { trigger: signOut } = useSWRMutation(sessionApiRoute, doLogout, {
    onSuccess: async () => {
      router.refresh();
    },
  });

  const adapter = React.useMemo(
    () =>
      createAuthenticationAdapter({
        createMessage: ({ address, chainId, nonce }) => {
          const defaultConfigurableOptions: ConfigurableMessageOptions = {
            domain: window.location.host,
            statement: "Sign in with Ethereum to the app.",
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

        signOut: signOut,
        verify: async (arg: { message: SiweMessage; signature: string }) => {
          return login(arg);
        },
      }),
    [getSiweMessageOptions]
  );

  return (
    <RainbowKitAuthenticationProvider adapter={adapter} status={status}>
      {children}
    </RainbowKitAuthenticationProvider>
  );
}

async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON | Response> {
  const response = await fetch(input, {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    ...init,
  });

  try {
    // Attempt to parse the response as JSON
    const data = await response.json();
    return data;
  } catch (error) {
    // If JSON parsing fails, return the original response
    return response;
  }
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
