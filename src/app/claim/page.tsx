import ClientOnly from "@/components/client-only";
import Loading from "@/components/loading";
import VerifyAndClaim from "@/components/verify-and-claim";
import {
  getAllocationForAddress,
  getProofForAddress,
  getTree,
} from "@/lib/merkle/merkle";
import { getAddressForSession, getServerSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { formatUnits } from "viem";

export default async function Claim() {
  const session = await getServerSession();
  if (!session?.isKycVerified && !session?.hasClaimed) {
    redirect("/");
  }

  const fullAddress = getAddressForSession(session);
  const allocation = await getAllocationForAddress(fullAddress);
  const merkleProof = getProofForAddress(fullAddress, await getTree());

  return (
    <ClientOnly fallback={<Loading />}>
      <VerifyAndClaim
        allocation={formatUnits(BigInt(allocation ?? 0), 18)}
        address={fullAddress}
        merkleProof={merkleProof}
      />
    </ClientOnly>
  );
}
