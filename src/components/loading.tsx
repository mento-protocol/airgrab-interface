import React from "react";
import MentoLoadingAnimation from "./mento-loading-animation";

const Loading = () => {
  return (
    <div className="flex flex-col gap-8">
      <h3 className="font-fg font-medium text-2xl">Loading... Please wait</h3>
      <MentoLoadingAnimation />
    </div>
  );
};

export default Loading;
