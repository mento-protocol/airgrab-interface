import { getAllocationForAddress } from "@/lib/merkle/merkle";
import { getAddressForSession, getServerSession } from "@/lib/session";
import VerifyAndClaim from "@/components/verify-and-claim";
import { formatUnits } from "viem";

export default async function Claim() {
  const session = await getServerSession();
  const fullAddress = getAddressForSession(session);
  const allocation = getAllocationForAddress(fullAddress);

  return (
    <VerifyAndClaim
      allocation={formatUnits(BigInt(allocation ?? 0), 18)}
      address={fullAddress}
    />
  );
}
