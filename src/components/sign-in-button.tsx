"use client";

import { useAuthorization } from "@/contexts/authorization-provider.client";

export function SignInButton() {
  const { login, isSessionLoading } = useAuthorization();

  return (
    <button disabled={isSessionLoading} onClick={() => login()}>
      Sign-In with Ethereum
    </button>
  );
}