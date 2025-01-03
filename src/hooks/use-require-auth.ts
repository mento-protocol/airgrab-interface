"use client";

import { useEffect } from "react";
import { useSession } from "@/contexts/rainbowkit-siwe-iron-session-provider";
import { SessionData } from "@/lib/session/types";
import { usePathname, useRouter } from "next/navigation";
import { LAUNCH_DATE, legalPages } from "@/lib/constants";

const useRequireAuth = ({ enabled }: { enabled?: boolean }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { status, data: session } = useSession();
  const isLegalPage = legalPages.includes(pathname);

  const isHomePage = pathname === "/";
  const isClaimPage = pathname.startsWith("/claim");
  const isAllocationPage = pathname.startsWith("/allocation");
  const hasSession = status === "authenticated";
  const isPastLaunchDate = new Date(LAUNCH_DATE).getTime() < Date.now();

  useEffect(() => {
    if (status === "loading" || !enabled) return;
    // every route except home requires a session
    if (!isHomePage && !hasSession && !isLegalPage) {
      router.push("/");
      return;
    } else if (isHomePage && hasSession) {
      router.push("/allocation");
      return;
    }

    // Redirect to claim page if user is on allocation page and has a session and is past launch date and is kyc verified or has claimed
    if (
      isAllocationPage &&
      isPastLaunchDate &&
      ((session as SessionData)?.isKycVerified ||
        (session as SessionData).hasClaimed)
    ) {
      router.push("/claim");
      return;
    }

    if (
      isClaimPage &&
      !(session as SessionData)?.isKycVerified &&
      !(session as SessionData).hasClaimed
    ) {
      router.push("/");
      return;
    }
  }, [
    enabled,
    hasSession,
    isAllocationPage,
    isClaimPage,
    isHomePage,
    isPastLaunchDate,
    router,
    session,
    status,
  ]);
};

export { useRequireAuth };
