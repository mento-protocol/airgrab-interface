"use client";

import React from "react";
import { useAccount } from "wagmi";
import { PrimaryButton } from "./button";

const FRACTAL_APP_URL = process.env.NEXT_PUBLIC_FRACTAL_APP_URL;
const FRACTAL_CLIENT_ID = process.env.NEXT_PUBLIC_FRACTAL_CLIENT_ID;
const REDIRECT_URL = process.env.NEXT_PUBLIC_REDIRECT_URL;

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

  return <PrimaryButton href={url}>KYC with Fractal ID</PrimaryButton>;
};

export default KYCButton;
