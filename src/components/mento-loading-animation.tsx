"use client";
import React from "react";
import { MentoIcon } from "./svgs";

const MentoLoadingAnimation = () => {
  return (
    <div className="w-[124px] h-[124px] mx-auto my-6">
      <MentoIcon className="animate-spin-slow" />
    </div>
  );
};

export default MentoLoadingAnimation;
