import { KYCButton } from "@/components/kyc-button";
import { FractalIDLogo } from "@/components/svgs";
import { PrimaryButton } from "@/components/button";
import { EligibilityFAQLink } from "@/components/eligibility-faq-link";
import { DisconnectButton } from "@/components/disconnect-button";
import { getAllocationForAddress } from "@/lib/merkle/merkle";
import { getAddressForSession, getServerSession } from "@/lib/session";
import { shortenAddress } from "@/lib/addresses";
import { formatUnits } from "viem";

export default async function Allocation() {
  const session = await getServerSession();
  const fullAddress = getAddressForSession(session);
  const shortAddress = fullAddress ? shortenAddress(fullAddress) : "";
  const allocation = getAllocationForAddress(fullAddress);
  const hasAllocation = allocation && allocation !== "0";

  if (!hasAllocation) {
    return <NoAllocation address={shortAddress} />;
  }

  if (!session?.isKycVerified) {
    return (
      <NoKYC
        allocation={formatUnits(BigInt(allocation ?? 0), 18)}
        shortAddress={shortAddress}
        fullAdress={fullAddress}
      />
    );
  }

  return (
    <HasKYC
      allocation={formatUnits(BigInt(allocation ?? 0), 18)}
      address={shortAddress}
    />
  );
}

const NoAllocation = ({ address }: { address: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <p className="font-fg font-regular text-sm sm:text-base font-medium">
        Sorry, the wallet address{" "}
        <span className="text-primary-blue">{address}</span> is not elligible
        {" :("}
      </p>
      <DisconnectButton color="blue">
        Disconnect & try another wallet
      </DisconnectButton>
      <EligibilityFAQLink />
    </div>
  );
};

const NoKYC = ({
  allocation,
  shortAddress,
  fullAdress,
}: {
  allocation: string;
  shortAddress: string;
  fullAdress: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <h3 className="font-fg font-medium text-sm sm:text-base text-center flex flex-col gap-8">
        <span>
          Congratulations, wallet address{" "}
          <span className="text-primary-blue">{shortAddress}</span> is elligible
          to receive
        </span>
        <span className="text-base sm:text-2xl">{allocation} MENTO</span>
      </h3>
      <p className="font-fg text-center text-sm sm:text-base">
        To comply with regulations we kindly ask you to verify your identity.
        <br className="hidden sm:block" /> The check will be conducted by our
        partner Fractal ID and your data deleted immediately{" "}
        <br className="block sm:hidden" />
        after.
      </p>
      <FractalIDLogo className="h-[27px] w-[120px] sm:h-[44px] sm:w-[200px]" />
      <KYCButton address={fullAdress} />
      <EligibilityFAQLink />
    </div>
  );
};

const HasKYC = ({
  allocation,
  address,
}: {
  allocation: string;
  address: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <h3 className="font-fg font-medium text-sm sm:text-base text-center flex flex-col gap-8">
        <span>
          Congratulations, wallet address{" "}
          <span className="text-primary-blue">{address}</span> is elligible to
          receive
        </span>
        <span className="text-base sm:text-2xl">{allocation} MENTO</span>
      </h3>
      <p className="text-center max-w-[500px]">
        We have confirmed your verificaion with Fractal ID, please continue to
        claim your MENTO
      </p>
      <PrimaryButton internal href={"/claim"}>
        Claim Your MENTO
      </PrimaryButton>
      <EligibilityFAQLink />
    </div>
  );
};
