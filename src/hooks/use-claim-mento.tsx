"use client";
import {
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { Airdrop } from "@/abis/Airdrop";
import { Alfajores, Celo } from "@celo/rainbowkit-celo/chains";
import { toast } from "sonner";
import { Address, BaseError, UserRejectedRequestError, parseEther } from "viem";
import { PrepareWriteContractConfig } from "wagmi/actions";

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
  address: Address | undefined;
}) => {
  const { chain } = useNetwork();
  const { kyc } = useKYCProof();
  const { data: { proof, validUntil, approvedAt, fractalId } = {} } = kyc;

  let chainId = Alfajores.id;

  if (chain && chain.id === Celo.id) {
    chainId = Celo.id;
  }

  const addresses = mento.addresses[chainId];

  const claimStatus = useContractRead({
    address: addresses.Airgrab as Address,
    abi: Airdrop,
    functionName: "claimed",
    args: [address!],
  });

  const hasClaimed = claimStatus.data === true;
  const shouldPrepareClaim = Boolean(
    kyc.data && allocation && merkleProof && !hasClaimed,
  );

  const prepare = usePrepareContractWrite({
    address: addresses.Airgrab as Address,
    abi: Airdrop,
    functionName: "claim",
    enabled: shouldPrepareClaim,
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
    onError: (e) => {
      Sentry.captureException(e);
      if (e instanceof Error && !(e instanceof UserRejectedRequestError)) {
        toast.error(<ErrorMessage error={e} />);
      }
    },
  });

  const contractWrite = useContractWrite(prepare.config);

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

  const wait = useWaitForTransaction({
    hash: contractWrite?.data?.hash,
    onSuccess: async (data) => {
      await claimStatus.refetch();

      if (data) {
        toast.success(
          <TransactionSuccessMessage transactionHash={data.transactionHash} />,
        );
      }
    },
    onError: (e) => {
      if (e instanceof Error && !(e instanceof UserRejectedRequestError)) {
        toast.error(<ErrorMessage error={e} />);
      }
    },
  });

  return {
    prepare: {
      ...prepare,
      isError:
        prepare.isError && !(prepare.error instanceof UserRejectedRequestError),
    },
    confirmation: wait,
    claim: {
      ...contractWrite,
      hasClaimed,
      isConfirmationLoading: wait.isLoading,
      isError:
        contractWrite.isError &&
        !(contractWrite.error instanceof UserRejectedRequestError),
    },
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
  address: Address | undefined;
  merkleProof: string[] | undefined;
  proof: Address | undefined;
  validUntil: number | undefined;
  approvedAt: number | undefined;
  fractalId: string | undefined;
}): PrepareWriteContractConfig<typeof Airdrop, "claim">["args"] | undefined {
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
    merkleProof as Address[],
    proof,
    BigInt(validUntil),
    BigInt(approvedAt),
    fractalId,
  ];
}
