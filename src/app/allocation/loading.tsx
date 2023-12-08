import MentoLoadingAnimation from "@/components/mento-loading-animation";
import { shortenAddress } from "@/lib/addresses";
import { getAddressForSession, getServerSession } from "@/lib/session";
import React from "react";

const LoadingPage = async () => {
  const session = await getServerSession();
  const fullAddress = getAddressForSession(session);
  const shortAddress = fullAddress ? shortenAddress(fullAddress) : "";

  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <h3 className="font-fg font-medium text-sm sm:text-base">
        Address confirmed, checking token allocation for address{" "}
        <br className="" />
        <span className="text-primary-blue">{shortAddress}</span>
        <div className="flex justify-center">
          <MentoLoadingAnimation />
        </div>
      </h3>
    </div>
  );
};

export default LoadingPage;
