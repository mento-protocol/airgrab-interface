"use client";
import React from "react";
import Lottie from "lottie-react";
import mentoLoaderBlue from "@/animations/Mentoloader_blue.json";

const MentoLoadingAnimation = () => {
  return (
    <div className="w-[124px] h-[124px] mx-auto my-6">
      <Lottie height={200} animationData={mentoLoaderBlue} />
    </div>
  );
};

export default MentoLoadingAnimation;
