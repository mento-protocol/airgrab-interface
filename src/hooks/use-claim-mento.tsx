"use client";
import {
  useAccount,
  useReadContract,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Airdrop } from "@/abis/Airdrop";
import { toast } from "sonner";
import {
  BaseError,
  UserRejectedRequestError,
  type SimulateContractParameters,
} from "viem";

import * as Sentry from "@sentry/nextjs";
import Link from "next/link";
import { useKYCProof } from "./use-kyc-proof";
import * as mento from "@mento-protocol/mento-sdk";

export const useClaimMento = ({
  address,
  allocation,
  merkleProof,
}: {
  allocation: string | undefined;
  merkleProof: string[] | undefined;
  address: `0x${string}` | undefined;
}) => {
  const { chain } = useAccount();
  const kyc = useKYCProof();
  const { data: { proof, validUntil, approvedAt, fractalId } = {} } = kyc;

  const claimStatus = useReadContract({
    address: AIRDROP_CONTRACT_ADDRESS,
    abi: MOCK_CONTRACT_HAS_CLAIMED_ABI,
    functionName: "checkHasClaimed",
    args: [address!],
  });

  const hasClaimed = claimStatus.data === true;
  const shouldPrepareClaim = Boolean(
    kyc.data && allocation && merkleProof && !hasClaimed,
  );

  const simulation = useSimulateContract({
    address: AIRDROP_CONTRACT_ADDRESS,
    abi: Airdrop,
    functionName: "claim",
    query: { enabled: shouldPrepareClaim },
    args: shouldPrepareClaim
      ? prepareArgs({
          allocation,
          address,
          merkleProof,
          proof,
          validUntil,
          approvedAt,
          fractalId,
        })
      : undefined,
  });

  const {
    data,
    error,
    isError,
    refetch: refetchSimulation,
    isLoading,
  } = simulation;

  const {
    writeContract,
    data: hash,
    isPending: isAwaitingUserSignature,
  } = useWriteContract({
    mutation: {
      onSuccess: async (hash) => {
        await claimStatus.refetch();

        if (hash) {
          toast.success(<TransactionSuccessMessage transactionHash={hash} />);
        }
      },
      onError: (e) => {
        if (e instanceof Error && !(e instanceof UserRejectedRequestError)) {
          toast.error(<ErrorMessage error={e} />);
        }
      },
    },
  });

  const TransactionSuccessMessage = ({
    transactionHash,
  }: {
    transactionHash: string;
  }) => {
    return (
      <div className="flex flex-col text-lg">
        Mento claimed successfully!
        <br />
        <Link
          className="text-primary-blue underline"
          target="_blank"
          rel="noopener noreferrer"
          href={`${chain?.blockExplorers?.default?.url}/tx/${transactionHash}`}
        >
          view the transaction here
        </Link>
      </div>
    );
  };

  const ErrorMessage = ({ error }: { error: Error }) => {
    const title = error.name;
    let description =
      error instanceof BaseError ? error.shortMessage : error.message;

    description +=
      "\r\n Please try again, if the issue persists please send a message in the Mento discord support channel.";

    return (
      <div className="flex flex-col text-lg gap-4">
        <span className="font-bold">{title}</span>
        <span>{description}</span>
      </div>
    );
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
      query: {},
    });

  const claim = () => {
    if (data?.request) {
      writeContract(data.request);
    }
  };

  return {
    hasClaimed,
    error,
    isError,
    claim,
    isConfirmed,
    isConfirming,
    isAwaitingUserSignature,
    refetchSimulation,
    simulation,
    kyc: {
      ...kyc,
      error: kyc.error && !(kyc.error instanceof UserRejectedRequestError),
    },
    claimStatus,
  };
};

function prepareArgs({
  allocation,
  address,
  merkleProof,
  proof,
  validUntil,
  approvedAt,
  fractalId,
}: {
  allocation: string | undefined;
  address: `0x${string}` | undefined;
  merkleProof: string[] | undefined;
  proof: `0x${string}` | undefined;
  validUntil: number | undefined;
  approvedAt: number | undefined;
  fractalId: string | undefined;
}): SimulateContractParameters<typeof Airdrop, "claim">["args"] | undefined {
  if (
    !allocation ||
    !address ||
    !merkleProof ||
    !proof ||
    !validUntil ||
    !approvedAt ||
    !fractalId
  ) {
    if (process.env.NODE_ENV === "development") {
      //TODO: Sentry error in production
      console.log("missing args", {
        allocation,
        address,
        merkleProof,
        proof,
        validUntil,
        approvedAt,
        fractalId,
      });
    }
    return;
  }

  if (process.env.NODE_ENV === "development") {
    console.log({
      allocation,
      address,
      merkleProof,
      proof,
      validUntil,
      approvedAt,
      fractalId,
    });
  }

  return [
    parseEther(allocation),
    address,
    merkleProof as `0x${string}`[],
    proof,
    BigInt(validUntil),
    BigInt(approvedAt),
    fractalId,
  ];
}
