import { useRouter } from "next/router";
import useSWR from "swr";

const useRefreshKYCStatus = ({ isPaused }: { isPaused?: () => boolean }) => {
  const router = useRouter();

  return useSWR("refresh-kyc", () => fetch("/api/kyc/refresh"), {
    onSuccess: async (data) => {
      const verificationCaseStatus = await data.json();
      switch (verificationCaseStatus?.status) {
        case "contacted":
          return router.push("/?kyc_status=contacted");
        case "pending":
          return router.push("/kyc-pending");
        case "done":
          switch (verificationCaseStatus.credential) {
            case "approved":
              return router.push("/allocation");
            case "pending":
              return router.push("/kyc-pending");
            case "rejected":
              return router.push("/kyc-rejected");
          }
        default:
          return router.push("/");
      }
    },
    isPaused,
    refreshInterval: 1000 * 60 * 15,
    // Refresh KYC every 15 minutes if the user is authenticated and not kyc verified
  });
};

export default useRefreshKYCStatus;
