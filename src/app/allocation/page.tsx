import { Button } from "@/components/button";
import { DisconnectButton } from "@/components/disconnect-button";
import { EligibilityFAQLink } from "@/components/eligibility-faq-link";
import { KYCButton } from "@/components/kyc-button";
import { FractalIDLogo } from "@/components/svgs";
import { shortenAddress } from "@/lib/addresses";
import { LAUNCH_DATE } from "@/lib/constants";
import { getAllocationForAddress } from "@/lib/merkle/merkle";
import { getAddressForSession, getServerSession } from "@/lib/session";
import { NotificationEmailForm } from "@/components/notification-email-form";
import { formatUnits } from "viem";

export default async function Allocation() {
  const session = await getServerSession();
  const fullAddress = getAddressForSession(session);
  const shortAddress = fullAddress ? shortenAddress(fullAddress) : "";
  const hasAllocation = session.allocation && session.allocation !== "0";

  const isBeforeLaunch = new Date(LAUNCH_DATE).getTime() > Date.now();

  if (!hasAllocation) {
    return <NoAllocation address={shortAddress} />;
  }

  if (!session?.isKycVerified) {
    return <NoKYC fullAddress={fullAddress} />;
  }

  if (isBeforeLaunch) {
    return <LaunchForm />;
  }

  return <HasKYC />;
}

const NoAllocation = ({ address }: { address: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <p className="font-fg font-regular text-sm sm:text-base font-medium">
        Sorry, the wallet address{" "}
        <span className="text-primary-blue">{address}</span> is not eligible
        {" :("}
      </p>
      <DisconnectButton color="blue">
        Disconnect & try another wallet
      </DisconnectButton>
      <EligibilityFAQLink />
    </div>
  );
};

const NoKYC = ({ fullAddress }: { fullAddress: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <CongratulationsHeading />
      <p className="font-fg text-center text-sm sm:text-base">
        To comply with regulations we kindly ask you to verify your identity.
        <br className="hidden sm:block" /> The check will be conducted by our
        partner Fractal ID and your data deleted immediately{" "}
        <br className="block sm:hidden" />
        after.
      </p>
      <FractalIDLogo className="h-[27px] w-[120px] sm:h-[44px] sm:w-[200px]" />
      <KYCButton address={fullAddress} />
      <EligibilityFAQLink />
    </div>
  );
};

const HasKYC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <CongratulationsHeading />
      <p className="text-center max-w-[500px]">
        We have confirmed your verification with Fractal ID, please continue to
        claim your MENTO
      </p>
      <Button color="blue" href={"/claim"}>
        Claim Your MENTO
      </Button>
      <EligibilityFAQLink />
    </div>
  );
};

const LaunchForm = () => {
  const defaultMessage = (
    <>
      <CongratulationsHeading />
      <p className="text-center max-w-[500px] text-xl font-fg">
        <LaunchCountdown />
        <span className="block md:inline">
          Complete the form to be notified when tokens are available to be
          claimed
        </span>
      </p>
    </>
  );

  const successMessage = (
    <>
      <h3 className="font-fg font-medium text-base  text-center flex flex-col gap-8">
        <span>
          Great, now you will receive an email when tokens are available!
        </span>
      </h3>
      <span className="font-fg text-base">You&apos;re verified to get</span>
      <AllocationAmount />
      <p className="text-center max-w-[500px] text-xl font-fg">
        <LaunchCountdown />
      </p>
    </>
  );

  return (
    <NotificationEmailForm
      defaultMessage={defaultMessage}
      successMessage={successMessage}
    />
  );
};

const LaunchCountdown = () => {
  const { days, hours } = getDaysAndHoursUntilLaunch();

  return (
    <>
      Tokens will be available in <span className="font-bold">{days}</span> days{" "}
      {hours > 0 ? (
        <>
          {" "}
          <span className="font-bold">{hours}</span> hours
        </>
      ) : null}
      .{" "}
    </>
  );
};

const CongratulationsHeading = async () => {
  const session = await getServerSession();
  const fullAddress = getAddressForSession(session);
  const shortAddress = fullAddress ? shortenAddress(fullAddress) : "";

  return (
    <h3 className="font-fg font-medium text-sm sm:text-base text-center flex flex-col gap-8">
      <span>
        Congratulations, wallet address{" "}
        <span className="text-primary-blue">{shortAddress}</span> is elligible
        to receive
      </span>
      <AllocationAmount />
    </h3>
  );
};

const AllocationAmount = async () => {
  const session = await getServerSession();
  const fullAddress = getAddressForSession(session);
  const allocation = formatUnits(
    BigInt(getAllocationForAddress(fullAddress) ?? 0),
    18,
  );

  return (
    <span className="font-fg text-base font-medium sm:text-2xl">
      {allocation} MENTO
    </span>
  );
};

const getDaysAndHoursUntilLaunch = () => {
  const countDownDate = new Date(LAUNCH_DATE).getTime();
  const now = new Date().getTime();
  const distance = countDownDate - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );

  return { days, hours };
};
