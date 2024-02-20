import React from "react";
import MentoLoadingAnimation from "./mento-loading-animation";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-8 text-center min-h-[335px]">
      <div className="flex flex-col sm:gap-8 sm:px-12 md:px-12">
        <h3 className="font-fg font-medium text-sm sm:text-2xl md:text-2xl">
          Loading... Please wait
        </h3>
        <MentoLoadingAnimation />
      </div>
    </div>
  );
};

export default Loading;
