import { getIronSession } from "iron-session";
import { SessionData } from "@/lib/session/types";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/session/config";

export async function getServerSession() {
  return await getIronSession<SessionData>(cookies(), sessionOptions);
}

export function getAddressForSession(session: SessionData) {
  return session?.siwe?.data?.address;
}
