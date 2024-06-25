"use client";
import { Button } from "@/components/button";
import { useClaimMento } from "@/hooks/use-claim-mento";
import { shortenAddress } from "@/lib/addresses";
import Link from "next/link";
import React from "react";
import { Locked } from "./svgs";
import { useCooldown } from "@/hooks/use-cool-down";
import Loading from "./loading";
import { useNetwork } from "wagmi";
import { useChainModal } from "@rainbow-me/rainbowkit";
import { links } from "@/lib/constants";
import { useAddTokens } from "@/hooks/use-add-tokens";
import { useSession } from "@/contexts/rainbowkit-siwe-iron-session-provider";

const ClaimText = () => {
  return (
    <>
      The MENTO you claim will be automatically locked as veMENTO for a period
      of <br className="hidden sm:block" />
      24 months.
    </>
  );
};

const LockingFAQLink = () => {
  return (
    <Link
      className="text-primary-blue underline font-fg text-xl"
      href="#what-vemento"
    >
      What is veMENTO?
    </Link>
  );
};
const KYCFAQLink = () => {
  return (
    <Link
      className="text-primary-blue underline font-fg text-xl"
      href="#why-verify-identity"
    >
      Why is this required?
    </Link>
  );
};

export default function VerifyAndClaim({
  address,
  allocation,
  merkleProof,
}: {
  address: `0x${string}`;
  allocation: string;
  merkleProof: string[] | undefined;
}) {
  const shortAddress = address ? shortenAddress(address) : "";

  const { claim, kyc, prepare, claimStatus } = useClaimMento({
    allocation,
    merkleProof,
    address,
  });
  const { chain } = useNetwork();
  const { openChainModal } = useChainModal();

  const claimErrorCooldown = useCooldown(claim.isError, 5000);
  const kycErrorCooldown = useCooldown(kyc.error, 5000);
  const preparationErrorCooldown = useCooldown(prepare.isError, 5000);

  const isPreparingKycOrClaim = prepare.isLoading || kyc.isLoadingProof;
  const isAwaitingUserSignature = kyc.isLoadingSignature || claim.isLoading;
  const hasClaimed = claim.hasClaimed;

  if (claimStatus.isRefetching) {
    <Loading />;
  }

  if (hasClaimed) {
    return <ClaimConfirmation allocation={allocation} />;
  }

  const signMessage = () => {
    if (!kyc.isLoadingProof && !kyc.isLoadingSignature) {
      kyc.signMessage();
    }
  };

  const claimMento = () => {
    if (!claim.isLoading && claim.write) {
      claim.write();
    }
  };

  const renderOverview = () => {
    if (kyc.isSuccess) {
      return <ClaimAndLockOverview />;
    }

    if (kyc.isLoadingSignature || kyc.isLoadingProof) {
      return <KYCOverview />;
    }

    return (
      <ClaimOverview shortAddress={shortAddress} allocation={allocation} />
    );
  };

  const renderButton = () => {
    if (chain?.unsupported) {
      return (
        <>
          <Button onClick={() => openChainModal?.()} color="blue">
            Switch to Celo
          </Button>
          <span className="text-red-500">
            Wrong network detected, please connect to Celo to claim your MENTO
          </span>
        </>
      );
    }
    if (claimErrorCooldown.isCoolingDown) {
      return (
        <Button color="blue" disabled>
          Try again in {claimErrorCooldown.timeLeft}s
        </Button>
      );
    }

    if (kycErrorCooldown.isCoolingDown) {
      return (
        <Button color="blue" disabled>
          Try again in {kycErrorCooldown.timeLeft}s
        </Button>
      );
    }

    if (preparationErrorCooldown.isCoolingDown) {
      return (
        <Button color="blue" disabled>
          Try again in {preparationErrorCooldown.timeLeft}s
        </Button>
      );
    }

    if (prepare.isError) {
      return (
        <Button color="blue" onClick={() => prepare.refetch()}>
          Try again
        </Button>
      );
    }

    if (claimStatus.isError) {
      return (
        <span className="text-red-500">
          Error Fetching Claim status, ensure you are connected to the correct
          network{" "}
        </span>
      );
    }

    if (isPreparingKycOrClaim) {
      return (
        <Button color="blue" disabled>
          Loading...
        </Button>
      );
    }

    if (isAwaitingUserSignature) {
      return (
        <Button color="blue" disabled>
          Continue in wallet
        </Button>
      );
    }

    if (claim.isConfirmationLoading) {
      return (
        <Button color="blue" disabled>
          Awaiting confirmation...
        </Button>
      );
    }

    if (!kyc.isSuccess) {
      return (
        <Button color="blue" onClick={signMessage}>
          Claim Your MENTO
        </Button>
      );
    }

    return (
      <Button color="blue" onClick={claimMento}>
        <>Claim & Lock Your MENTO</>
      </Button>
    );
  };

  return (
    <ClaimWrapper>
      {renderOverview()}
      {renderButton()}
      <LockingFAQLink />
    </ClaimWrapper>
  );
}

const ClaimOverview = ({
  shortAddress,
  allocation,
}: {
  shortAddress: string;
  allocation: string;
}) => (
  <>
    <ClaimHeading>
      <span>
        Congratulations, wallet address{" "}
        <span className="text-primary-blue">{shortAddress}</span> is eligible to
        receive
      </span>
      <span className="text-base sm:text-2xl">
        {Number(allocation).toFixed(3)} MENTO
      </span>
    </ClaimHeading>
    <ClaimDescription>
      <span className="text-sm sm:text-xl">
        <ClaimText />
      </span>
    </ClaimDescription>
  </>
);

const KYCOverview = () => (
  <>
    <ClaimHeading>Sign to confirm KYC</ClaimHeading>
    <ClaimDescription>
      <span className="text-sm sm:text-xl">
        To claim your MENTO, sign a message to verify your Fractal KYC.{" "}
        <br className="hidden sm:block" />
        This signature helps us confirm your KYC on-chain with Fractal ID.
      </span>
      <KYCFAQLink />
    </ClaimDescription>
  </>
);

const ClaimAndLockOverview = () => (
  <>
    <ClaimHeading>Claim & Lock MENTO</ClaimHeading>
    <ClaimDescription>
      <span className="text-sm sm:text-xl">
        <ClaimText />
      </span>
    </ClaimDescription>
  </>
);

const ClaimConfirmation = ({ allocation }: { allocation: string }) => {
  const { addVeMento } = useAddTokens();
  const { logout } = useSession();

  return (
    <ClaimWrapper>
      <Locked className="h-[248px] w-[251px]" />
      <div className="font-fg font-normal text-xl flex flex-col items-center gap-8">
        <div className="flex flex-col">
          <p className="">
            You claimed and locked <br className="block sm:hidden" />
            <span className="font-medium font-fg">
              {Number(allocation).toFixed(3)} MENTO
            </span>{" "}
            for <span className="font-medium font-fg">24 months</span>
          </p>
          <button
            onClick={addVeMento}
            className="text-primary-blue text-sm leading-none m-0 p-0"
          >
            Add veMENTO to your wallet
          </button>
        </div>
        <p className="text-center max-w-[500px]">
          Welcome to the <br className="md:hidden" /> Mento community! <br />
          <a
            className="text-primary-blue text-sm"
            href={links.welcomeToCommunityPost}
            target="_blank"
          >
            {" "}
            Learn More{" "}
          </a>
        </p>
      </div>
      <div className="flex flex-col  md:flex-row gap-[18px]">
        <Button color="blue" onClick={() => logout()} fullWidth>
          Check another wallet
        </Button>
        <Button color="blush" href="https://governance.mento.org" fullWidth>
          Go to Governance app
        </Button>
      </div>
    </ClaimWrapper>
  );
};

const ClaimHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h3 className=" font-fg font-medium text-sm sm:text-base text-center flex flex-col gap-8">
      {children}
    </h3>
  );
};

const ClaimDescription = ({ children }: { children: React.ReactNode }) => {
  return <p className="flex flex-col gap-8 font-fg">{children}</p>;
};

const ClaimWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center flex-col gap-8 text-center">
      {children}
    </div>
  );
};
