"use client";
import useSWR from "swr";
import { useAccount, useNetwork, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import useSWRMutation from "swr/mutation";
import { SessionData } from "@/lib/session/types";
import { defaultSession } from "@/lib/session/constants";
import { useRouter } from "next/navigation";

const sessionApiRoute = "/api/auth";

const fetchNonce = async (url: string) => {
   const response = await fetch(url, {
      cache: "no-store",
      next: { revalidate: 0 },
      method: "GET",
   });
   const data = await response.json();
   return data.nonce;
};

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

const useSession = () => {
   const { address, isConnected } = useAccount();
   const { chain } = useNetwork();
   const { signMessageAsync, isLoading: isSignMessageLoading } =
      useSignMessage();

   const router = useRouter();

   const {
      data: session,
      isLoading: isSessionLoading,
      mutate: mutateSession,
   } = useSWR(sessionApiRoute, fetchJson<SessionData>, {
      fallbackData: defaultSession,
      enabled: isConnected,
   });

   const {
      data: nonce,
      error: nonceError,
      isLoading: isNonceLoading,
      mutate: mutateNonce,
   } = useSWR("/api/auth?action=nonce", fetchNonce);

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

   async function doLogin() {
      const chainId = chain?.id;
      // Create SIWE message and sign with wallet
      const message = new SiweMessage({
         domain: window.location.host,
         address,
         statement: `I hereby confirm that the wallet address ${address} belongs to me.`,
         uri: window.location.origin,
         version: "1",
         chainId,
         nonce,
      });

      const signature = await signMessageAsync({
         message: message.prepareMessage(),
      });

      // Verify signature
      return fetchJson<SessionData>(sessionApiRoute, {
         method: "POST",
         body: JSON.stringify({ signature, message }),
      });
   }

   const { trigger: login } = useSWRMutation(sessionApiRoute, doLogin, {
      revalidate: true,
   });

   const { trigger: logout } = useSWRMutation(sessionApiRoute, doLogout, {
      onSuccess: async () => {
         router.push("/");
         mutateNonce();
      },
   });

   return {
      login,
      logout,
      session,
      isSessionLoading,
   };
};

export default useSession;
