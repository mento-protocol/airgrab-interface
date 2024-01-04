export const links = {
  discord: "https://discord.com/invite/Zszgng9NdF",
  github: "https://github.com/mento-protocol",
  twitter: "https://twitter.com/MentoLabs",
  docs: "https://docs.mento.org/mento/mento-protocol/readme",
  mento2: "https://forum.celo.org/t/towards-mento-2-0/3473",
  gcp61: "https://celo.stake.id/#/proposal/62",
  app: "https://app.mento.org/",
  roadmap: "https://mento.canny.io/",
  forum: "https://forum.celo.org/c/mento/33",
  mentolabs: "https://www.mentolabs.xyz/team",
  cookiePolicy:  "/files/cookie-policy.pdf",
};

export const MESSAGE = `I authorize Airgrab (${process.env.NEXT_PUBLIC_FRACTAL_CLIENT_ID}) to get a proof from Fractal that:
- I passed KYC level basic+liveness`;

// Ensuring the environment variables are set
if (!process.env.NEXT_PUBLIC_FRACTAL_AUTH_URL) {
  throw new Error("FRACTAL_AUTH_URL is not set");
}
if (!process.env.NEXT_PUBLIC_FRACTAL_CLIENT_ID) {
  throw new Error("FRACTAL_CLIENT_ID is not set");
}
if (!process.env.NEXT_PUBLIC_FRACTAL_APP_URL) {
  throw new Error("FRACTAL_CLIENT_ID is not set");
}
if (!process.env.NEXT_PUBLIC_FRACTAL_RESOURCE_URL) {
  throw new Error("FRACTAL_CLIENT_ID is not set");
}
if (!process.env.NEXT_PUBLIC_BASE_URL) {
  throw new Error("FRACTAL_CLIENT_ID is not set");
}

export const AIRGRAB_CONTRACT_ADDRESS =
  "0x5edfB3C267e0D3aF1f6564D1d8Db5ead943e3fCD";

// Exporting the variables
export const FRACTAL_APP_URL = process.env.NEXT_PUBLIC_FRACTAL_APP_URL;
export const FRACTAL_AUTH_URL = process.env.NEXT_PUBLIC_FRACTAL_AUTH_URL;
export const FRACTAL_RESOURCE_URL =
  process.env.NEXT_PUBLIC_FRACTAL_RESOURCE_URL;
export const FRACTAL_CLIENT_ID = process.env.NEXT_PUBLIC_FRACTAL_CLIENT_ID;
export const FRACTAL_CRED_URL = process.env.NEXT_PUBLIC_FRACTAL_CRED_URL;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
