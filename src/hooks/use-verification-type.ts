import { VerificationCase } from "@/lib/fractal";
import useSWR from "swr";

const useVerificationType = () => {
  return useSWR(
    "refresh-kyc",
    async () => {
      const res = await fetch("/api/kyc/refresh");
      const verificationCase: VerificationCase = await res.json();
      return verificationCase?.type;
    },
    { revalidateOnFocus: false },
  );
};

export default useVerificationType;