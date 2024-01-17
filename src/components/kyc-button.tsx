import React from "react";
import { PrimaryButton } from "./button";
import { FRACTAL_CLIENT_ID, FRACTAL_APP_URL, BASE_URL } from "@/lib/constants";

const REDIRECT_URL = `${BASE_URL}/api/kyc/authorized`;

function buildFractalUrl(wallet?: string): string {
  const url = new URL(FRACTAL_APP_URL + "/authorize");
  if (wallet) url.searchParams.append("wallet", wallet);
  url.searchParams.append("client_id", FRACTAL_CLIENT_ID);
  url.searchParams.append("redirect_uri", REDIRECT_URL);
  url.searchParams.append("response_type", "code");
  url.searchParams.append(
    "scope",
    "contact:read verification.basic:read verification.basic.details:read verification.liveness:read verification.liveness.details:read verification.wallet-eth:read",
  );
  return url.toString();
}

export const KYCButton = ({ address }: { address: string }) => {
  const url = buildFractalUrl(address);

  return (
    <PrimaryButton fullWidth href={url}>
      Verify via Fractal ID
    </PrimaryButton>
  );
};

export default KYCButton;
