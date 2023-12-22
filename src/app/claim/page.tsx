import VerifyAndClaim from "@/components/verify-and-claim";
import {
  getAllocationForAddress,
  getProofForAddress,
  getTree,
} from "@/lib/merkle/merkle";
import { getAddressForSession, getServerSession } from "@/lib/session";
import { formatUnits } from "viem";

export default async function Claim() {
  const session = await getServerSession();
  const fullAddress = getAddressForSession(session);
  const allocation = getAllocationForAddress(fullAddress);
  const merkleProof = getProofForAddress(fullAddress, getTree());

  return (
    <VerifyAndClaim
      allocation={formatUnits(BigInt(allocation ?? 0), 18)}
      address={fullAddress}
      merkleProof={merkleProof}
    />
  );
}
