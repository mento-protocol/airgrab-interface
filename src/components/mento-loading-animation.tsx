"use client";
import React from "react";
import { MentoIcon } from "./svgs";

const MentoLoadingAnimation = () => {
  return (
    <div className="sm:w-[124px] sm:h-[124px] mx-auto sm:my-6 md:my-0">
      <MentoIcon className="animate-spin-slow w-[64px] sm:min-w-full" />
    </div>
  );
};

export default MentoLoadingAnimation;
