"use client";

import React from "react";
import { useAccount } from "wagmi";
import { PrimaryButton } from "./button";

const FRACTAL_APP_URL = process.env.NEXT_PUBLIC_FRACTAL_APP_URL;
if (!FRACTAL_APP_URL) throw new Error("FRACTAL_APP_URL is not set");

const FRACTAL_CLIENT_ID = process.env.NEXT_PUBLIC_FRACTAL_CLIENT_ID;
if (!FRACTAL_CLIENT_ID) throw new Error("FRACTAL_CLIENT_ID is not set");

let BASE_URL: string | undefined;

if (process.env.NODE_ENV === "development") {
  BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  if (!BASE_URL) throw new Error("BASE_URL is not set");
} else {
  // preview & production
  BASE_URL = "https://" + process.env.VERCEL_BRANCH_URL;
  if (!BASE_URL) throw new Error("VERCEL_BRANCH_URL is not set");
}

const REDIRECT_URL = BASE_URL + "/api/kyc/authorized";

function buildFractalUrl(wallet?: string): string {
  if (!FRACTAL_APP_URL || !FRACTAL_CLIENT_ID || !REDIRECT_URL) {
    throw new Error(
      "Missing FRACTAL_APP_URL, FRACTAL_CLIENT_ID, or REDIRECT_URL. Please check your .env file."
    );
  }

  const url = new URL(FRACTAL_APP_URL + "/authorize");
  if (wallet) url.searchParams.append("wallet", wallet);
  url.searchParams.append("client_id", FRACTAL_CLIENT_ID);
  url.searchParams.append("redirect_uri", REDIRECT_URL);
  url.searchParams.append("response_type", "code");
  url.searchParams.append(
    "scope",
    "contact:read verification.basic:read verification.basic.details:read verification.liveness:read verification.liveness.details:read verification.wallet-eth:read"
  );
  return url.toString();
}

export const KYCButton = () => {
  const { address } = useAccount();
  const url = buildFractalUrl(address);

  return (
    <PrimaryButton fullWidth href={url}>
      Verify via Fractal ID
    </PrimaryButton>
  );
};

export default KYCButton;
