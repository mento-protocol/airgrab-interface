import { useSession } from "@/contexts/rainbowkit-siwe-iron-session-provider";
import { SessionData } from "@/lib/session/types";
import { usePathname, useRouter } from "next/navigation";
import useSWR from "swr";

const useRefreshKYCStatus = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data, status } = useSession();

  const pushIfNotAlreadyOnPage = (page: string) => {
    if (pathname !== page) {
      router.push(page);
    }
  };

  return useSWR(
    "refresh-kyc",
    async () => {
      const response = await fetch("/api/kyc-status");
      const { status, credential } = await response.json();
      return { status, credential };
    },
    {
      onSuccess: async ({ status, credential }) => {
        switch (status) {
          case "contacted":
            pushIfNotAlreadyOnPage("/?kyc_status=contacted");
          case "pending":
            pushIfNotAlreadyOnPage("/kyc-pending");
          case "done":
            switch (credential) {
              case "approved":
                pushIfNotAlreadyOnPage("/allocation");
              case "pending":
                pushIfNotAlreadyOnPage("/kyc-pending");
              case "rejected":
                pushIfNotAlreadyOnPage("/kyc-rejected");
            }
          default:
            pushIfNotAlreadyOnPage("/");
        }
      },
      isPaused: () => {
        const session = data as SessionData;

        if (
          status !== "authenticated" ||
          session.isKycVerified ||
          session.hasClaimed
        )
          return true;

        return false;
      },
      refreshInterval: 1000 * 60 * 15,
      // Refresh KYC every 15 minutes if the user is authenticated and not kyc verified
      // It will also refresh on focus by default
    },
  );
};

export default useRefreshKYCStatus;
