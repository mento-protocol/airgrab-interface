"use client";
import React from "react";

const onFAQClick = ({ elementID }: { elementID: string }) => {
  const el =
    document.getElementById(elementID) ??
    document.getElementById(`${elementID}-open`);

  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }

  if (!el?.getAttribute("id")?.includes("-open")) {
    el?.click();
  }
};

export const FaqNavLink = ({
  text,
  elementID,
}: {
  text: string;
  elementID: string;
}) => {
  return (
    <a
      className="font-fg text-primary-blue underline text-sm cursor-pointer"
      onClick={() => {
        onFAQClick({ elementID });
      }}
    >
      {text}
    </a>
  );
};
