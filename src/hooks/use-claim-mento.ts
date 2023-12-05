import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import type { FractalVerificationDetails } from "./use-kyc-proof";
import { Airgrab } from "@/abis/Airgrab";
import { AIRGRAB_CONTRACT_ADDRESS } from "@/lib/constants";

export const useClaimMento = ({
  enabled,
  allocation,
  address,
  merkleProof,
  kycDetails,
}: {
  enabled?: boolean;
  allocation: string | undefined;
  address: `0x${string}` | undefined;
  merkleProof: string[] | undefined;
  kycDetails: FractalVerificationDetails | undefined;
}) => {
  const args = {
    amount: BigInt(allocation!),
    delegate: address!,
    merkleProof: merkleProof!,
    fractalProof: kycDetails?.proof! as `0x${string}`,
    fractalProofValidUntil: BigInt(kycDetails?.validUntil!),
    fractalProofApprovedAt: BigInt(kycDetails?.approvedAt!),
    fractalId: kycDetails?.id!,
  };
  /**
   * @dev Allows `msg.sender` to claim `amount` tokens if the merkle proof and kyc is valid.
   * @notice This function can be called by anybody, but the (msg.sender, amount) pair
   * must be in the merkle tree, has to not have claimed yet, and must have
   * an associated KYC signature from Fractal. And the airgrab must not have ended.
   * The tokens will be locked for the cliff and slope configured at the contract level.
   * @param amount The amount of tokens to be claimed.
   * @param delegate The address of the account that gets voting power delegated
   * @param merkleProof The merkle proof for the account.
   * @param fractalProof The Fractal KYC proof for the account.
   * @param fractalProofValidUntil The Fractal KYC proof valid until timestamp.
   * @param fractalProofApprovedAt The Fractal KYC proof approved at timestamp.
   * @param fractalId The Fractal KYC ID.
   */

  const {
    config,
    error: preparationError,
    isLoading: isPrepareLoading,
    isError: isPreparationError,
  } = usePrepareContractWrite({
    address: AIRGRAB_CONTRACT_ADDRESS,
    abi: Airgrab,
    functionName: "claim",
    enabled: enabled,
    args: [
      args.amount,
      args.delegate,
      args.merkleProof as any, // TODO: need to convert this into `0x${string}`[]
      args.fractalProof,
      args.fractalProofValidUntil,
      args.fractalProofApprovedAt,
      args.fractalId,
    ],
  });
  const {
    write: claim,
    data,
    error: claimError,
    isLoading: isClaimLoading,
    isError: isClaimError,
  } = useContractWrite(config);
  const { isLoading: claimIsLoading, isSuccess: claimIsSuccess } =
    useWaitForTransaction({ hash: data?.hash });
  return {
    claim,
    isLoading: Boolean(isClaimLoading || isPrepareLoading),
    isError: Boolean(isClaimError || isPreparationError),
  };
};
