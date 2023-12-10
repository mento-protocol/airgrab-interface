import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { Airgrab } from "@/abis/Airgrab";
import { AIRGRAB_CONTRACT_ADDRESS } from "@/lib/constants";
import { PrepareWriteContractConfig } from "wagmi/actions";
import { UserRejectedRequestError } from "viem";
import { toast } from "sonner";

import { useKYCProof } from "./use-kyc-proof";
import Link from "next/link";
import React from "react";

export const useClaimMento = ({
  address,
  allocation,
  merkleProof,
}: {
  allocation: string | undefined;
  merkleProof: string[] | undefined;
  address: `0x${string}` | undefined;
}) => {
  const { chain } = useNetwork();
  const { kyc } = useKYCProof();
  const { data: { proof, validUntil, approvedAt, fractalId } = {} } = kyc;
  const [claimed, setClaimed] = React.useState(false);

  const prepare = usePrepareContractWrite({
    address: AIRGRAB_CONTRACT_ADDRESS,
    abi: Airgrab,
    functionName: "claim",
    enabled: Boolean(kyc.data && allocation && merkleProof),
    args: prepareArgs({
      allocation,
      address,
      merkleProof,
      proof,
      validUntil,
      approvedAt,
      fractalId,
    }),
  });

  const contractWrite = useContractWrite(prepare.config);

  const Message = ({ transactionHash }: { transactionHash: string }) => {
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
          view the trasnasction here
        </Link>
      </div>
    );
  };

  const wait = useWaitForTransaction({
    hash: contractWrite?.data?.hash,
    onSuccess: (data) => {
      //TODO: update claim status on the server & check has claimed
      setClaimed(true);

      if (data) {
        toast.success(<Message transactionHash={data.transactionHash} />, {
          unstyled: true,
          duration: 3000,
          position: "bottom-center",
          classNames: {
            toast:
              "border font-fg border-primary-dark flex items-center justify-center bg-white text-black rounded-lg shadow-md transition-all duration-300 py-[16px] px-[20px] gap-4",
          },
        });
      }
    },
    onError: (e) => {
      if (e instanceof Error) {
        if (!(e instanceof UserRejectedRequestError)) {
          toast.error("Error", {
            duration: 2000,
            position: "bottom-center",
            description: "Error claiming MENTO",
            unstyled: true,
            classNames: {
              toast:
                "border font-fg border-primary-dark flex items-center justify-center bg-white text-black rounded-lg shadow-md transition-all duration-300 py-[16px] px-[20px] gap-4",
            },
          });
        }
      }
    },
  });

  return {
    prepare,
    claim: { ...contractWrite, claimed },
    kyc,
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
}): PrepareWriteContractConfig<typeof Airgrab, "claim">["args"] | undefined {
  if (
    !allocation ||
    !address ||
    !merkleProof ||
    !proof ||
    !validUntil ||
    !approvedAt ||
    !fractalId
  ) {
    console.log("missing args", {
      allocation,
      address,
      merkleProof,
      proof,
      validUntil,
      approvedAt,
      fractalId,
    });
    return;
  }

  return [
    BigInt(allocation),
    address,
    merkleProof as `0x${string}`[],
    proof,
    BigInt(validUntil),
    BigInt(approvedAt),
    fractalId,
  ];
}
