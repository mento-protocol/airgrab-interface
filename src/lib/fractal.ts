import {
  BASE_URL,
  FRACTAL_AUTH_URL,
  FRACTAL_CLIENT_ID,
  FRACTAL_RESOURCE_URL,
} from "@/lib/constants";
import {
  FRACTAL_KYC_LEVEL,
  FRACTAL_CLIENT_SECRET,
  FRACTAL_TOKEN_COOKIE_NAME,
  SECRET_COOKIE_PASSWORD,
} from "@/lib/constants.server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

const REDIRECT_URL = `${BASE_URL}/api/kyc/authorized`;

class NoCodeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NoCodeError";

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NoCodeError);
    }
  }
}

type WalletCurrency =
  | "ada"
  | "algo"
  | "btc"
  | "eth"
  | "kar"
  | "sol"
  | "substrate"
  | "sui"
  | "xrp";

type Wallet = {
  id: string; // Assuming UUID format, but kept as string for flexibility
  address: string;
  currency: WalletCurrency;
  verified: boolean;
};

type FractalVerificationProcessStatus = "pending" | "contacted" | "done";
type CredentialStatus = "pending" | "approved" | "rejected";

type VerificationCase = {
  level: string;
  journey_completed: boolean;
  status: FractalVerificationProcessStatus;
  credential: CredentialStatus;
  id: string;
};

type FractalUser = {
  uid: string;
  verification_cases: VerificationCase[];
  wallets: Wallet[];
};

export type FractalTokens = {
  accessToken: { token: string; expiresIn: number; createdAt: number };
  refreshToken: string;
};

type FractalTokenCookie = {
  [key: string]: FractalTokens;
};

type FractalTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  created_at: number;
};

export async function processFractalAuthCode(
  authCode: string,
  address: string,
) {
  const tokens = await fetchAccessTokenWithAuthCode(authCode, address);
  if (!tokens) {
    return;
  }
  return processFractalUser(tokens.accessToken.token, address);
}

export async function refetchKycStatus(
  address: string,
): Promise<VerificationCase | undefined> {
  try {
    const fractalTokenCookie = await getFractalTokenCookie();
    const hasKycCookies = fractalTokenCookie[address];

    if (!hasKycCookies) {
      return;
    }
    const tokens = await getOrRefreshFractalTokens(address);
    if (!tokens) {
      return;
    }
    const kycStatus = await processFractalUser(
      tokens.accessToken.token,
      address,
    );
    return kycStatus;
  } catch (error) {
    return;
  }
}

async function processFractalUser(accessToken: string, address: string) {
  const fractalUser = await fetchFractalUser(accessToken);
  if (!fractalUser) {
    throw new Error("No Fractal user found");
  }

  const doesFractalUserIncludeConnectedAddress = fractalUser.wallets.some(
    (wallet) =>
      wallet.address.toLocaleLowerCase() === address.toLocaleLowerCase(),
  );

  if (!doesFractalUserIncludeConnectedAddress) {
    throw new Error("No wallet found for connected address");
  }

  return getFractalVerificationCase(fractalUser, FRACTAL_KYC_LEVEL);
}

async function fetchFractalUser(
  accessToken: string,
): Promise<FractalUser | undefined> {
  try {
    const res = await fetch(`${FRACTAL_RESOURCE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { tags: ["fractal-user"], revalidate: 900 },
    });

    return await res.json();
  } catch (error) {}
}

function getFractalVerificationCase(
  fractalUser: FractalUser | undefined | null,
  requiredLevel: string,
): VerificationCase | undefined {
  try {
    if (!fractalUser) {
      throw new Error(
        "No Fractal user, please include a valid Fractal ID user",
      );
    }

    const matchingCase = fractalUser.verification_cases.find(
      ({ journey_completed, level }) =>
        journey_completed && level === requiredLevel,
    );

    return matchingCase;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error getting Fractal verification case:", error.message);
    }
  }
}

async function getOrRefreshFractalTokens(
  address: string,
): Promise<FractalTokens | undefined> {
  const fractalTokensFromCookie = await getFractalTokenCookie();

  if (!fractalTokensFromCookie[address]) {
    return undefined;
  }

  const { accessToken, refreshToken } = fractalTokensFromCookie[address];
  const isAccessTokenExpired =
    accessToken.createdAt + accessToken.expiresIn < Date.now();

  if (!isAccessTokenExpired) {
    return fractalTokensFromCookie[address];
  }

  const newTokens = await refreshAccessToken(refreshToken, address);
  if (!newTokens) {
    return undefined;
  }

  await updateFractalTokenCookie(
    newTokens.refreshToken,
    newTokens.accessToken,
    address,
  );
  return newTokens;
}

async function fetchAccessTokenWithAuthCode(
  authCode: string | null,
  address: string,
) {
  if (!authCode) throw new Error("No authorization code provided");

  return fetchAccessToken(
    {
      client_id: FRACTAL_CLIENT_ID,
      client_secret: FRACTAL_CLIENT_SECRET,
      code: authCode,
      grant_type: "authorization_code",
      redirect_uri: REDIRECT_URL,
    },
    address,
  );
}

async function refreshAccessToken(refreshToken: string, address: string) {
  if (!refreshToken) throw new Error("No refresh token provided");

  return fetchAccessToken(
    {
      client_id: FRACTAL_CLIENT_ID,
      client_secret: FRACTAL_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    },
    address,
  );
}

function handleError(error: any) {
  if (error instanceof NoCodeError) {
    console.error("Custom NoCodeError caught:", error.message);
  } else if (error instanceof Error) {
    console.error("General error caught:", error.message);
  } else {
    console.error("Unknown error caught:", error);
  }
}

async function fetchAccessToken(
  body: any,
  address: string,
): Promise<FractalTokens | undefined> {
  try {
    const res = await fetch(`${FRACTAL_AUTH_URL}/oauth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const { refresh_token, access_token, expires_in, created_at } =
      (await res.json()) as FractalTokenResponse;

    if (!access_token) throw new Error("No access token found");
    if (!refresh_token) throw new Error("No refresh token found");

    const accessToken = {
      token: access_token,
      expiresIn: expires_in,
      createdAt: created_at,
    };

    await updateFractalTokenCookie(refresh_token, accessToken, address);

    return { accessToken, refreshToken: refresh_token };
  } catch (error) {
    handleError(error);
  }
}

async function updateFractalTokenCookie(
  refreshToken: string,
  accessToken: { token: string; expiresIn: number; createdAt: number },
  address: string,
) {
  const aYearFromTodayInSeconds = 1 * 60 * 60 * 24 * 365;

  const tokenCookie = await getIronSession<FractalTokenCookie>(cookies(), {
    cookieName: FRACTAL_TOKEN_COOKIE_NAME,
    ttl: aYearFromTodayInSeconds,
    password: SECRET_COOKIE_PASSWORD,
  });

  tokenCookie[address] = { refreshToken, accessToken };
  tokenCookie.save();
}

async function getFractalTokenCookie(): Promise<FractalTokenCookie> {
  return await getIronSession<FractalTokenCookie>(cookies(), {
    cookieName: FRACTAL_TOKEN_COOKIE_NAME,
    password: SECRET_COOKIE_PASSWORD,
  });
}
