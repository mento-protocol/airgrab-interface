import { Airdrop } from "@/abis/Airdrop";
import { refetchKycStatus } from "@/lib/fractal";
import { getAddressForSession, getServerSession } from "@/lib/session";
import { sessionOptions } from "@/lib/session/config";
import { defaultSession } from "@/lib/session/constants";
import { SessionData } from "@/lib/session/types";
import { Alfajores, Baklava, Celo } from "@celo/rainbowkit-celo/chains";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SiweMessage, generateNonce } from "siwe";
import { createPublicClient, http } from "viem";
import * as mento from "@mento-protocol/mento-sdk";
import { getAllocationForAddress } from "@/lib/merkle/merkle";

// POST /api/auth
export async function POST(request: NextRequest) {
  const session = await getServerSession();

  try {
    const { message, signature } = await request.json();
    const siweMessage = new SiweMessage(message);
    const fields = await siweMessage.verify({ signature });

    if (fields.data.nonce !== session.nonce) {
      return NextResponse.json({ message: "Invalid nonce." }, { status: 422 });
    }

    const allocation = await getAllocationForAddress(fields.data.address);
    session.siwe = fields;
    session.isKycVerified = false;
    session.allocation = allocation || "0";

    const hasClaimed = await checkHasClaimedForWallet(
      fields.data.chainId,
      fields.data.address,
    );

    if (hasClaimed) {
      session.hasClaimed = hasClaimed;
      await session.save();
      return NextResponse.json({ ok: true });
    }

    const kycStatus = await refetchKycStatus(getAddressForSession(session));
    if (
      kycStatus &&
      kycStatus?.status === "done" &&
      kycStatus?.credential === "approved"
    ) {
      session.isKycVerified = true;
    }

    await session.save();

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false });
  }
}

// GET /api/auth
export async function GET(request: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  const action = new URL(request.url).searchParams.get("action");

  if (action === "nonce") {
    session.nonce = generateNonce();
    await session.save();
    return NextResponse.json({ nonce: session.nonce }, { status: 200 });
  }

  if (!session.siwe?.success) {
    return NextResponse.json(defaultSession);
  }

  return NextResponse.json(session);
}

// DELETE /api/auth
export async function DELETE() {
  try {
    const session = await getIronSession<SessionData>(
      cookies(),
      sessionOptions,
    );

    session.destroy();

    return NextResponse.json(defaultSession, { status: 200 });
  } catch (error) {
    // Session deletion error
    return NextResponse.json({ ok: false });
  }
}

async function checkHasClaimedForWallet(chainId: number, address: string) {
  try {
    const chains = { Celo, Alfajores, Baklava };

    let chain;
    for (const [chainName, chainInfo] of Object.entries(chains)) {
      if (chainInfo.id === chainId) {
        chain = chainInfo;
        break;
      }
    }
    const addresses = mento.addresses[chainId];

    const publicClient = createPublicClient({
      chain,
      transport: http(),
    });

    return await publicClient.readContract({
      address: addresses.Airgrab as `0x${string}`,
      abi: Airdrop,
      functionName: "claimed",
      args: [address as `0x${string}`],
    });
  } catch (error) {
    return false;
  }
}
