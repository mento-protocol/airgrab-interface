"use client";
import useSWR from "swr";
import { useAccount } from "wagmi";
import { SessionData } from "@/lib/session/types";
import { defaultSession } from "@/lib/session/constants";

const sessionApiRoute = "/api/auth";

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
  const { isConnected } = useAccount();

  const { data: session, isLoading: isSessionLoading } = useSWR(
    sessionApiRoute,
    fetchJson<SessionData>,
    {
      fallbackData: defaultSession,
      enabled: isConnected,
    }
  );

  return {
    session,
    isSessionLoading,
  };
};

export default useSession;
