"use client"; // Error components must be Client Components
import { Button } from "@/components/button";
import { useSession } from "@/contexts/rainbowkit-siwe-iron-session-provider";
import * as Sentry from "@sentry/nextjs";
import Link from "next/link";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    Sentry.captureException(error);
  }, [error]);
  const { logout } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <h3 className="font-fg font-medium text-sm sm:text-base text-center flex flex-col gap-8">
        Unexpected Error
      </h3>
      <p className="font-fg text-center text-sm sm:text-base">
        An unexpected error has occurred. We apologize for the inconvenience.{" "}
        <br /> Please click the button below to disconnect your wallet & restart
        the process.
        <br /> If the issue persists, please open a support ticket in the{" "}
        <Link
          className="text-[#4D62F0]"
          href="https://discord.com/invite/Zszgng9NdF"
          target="_blank"
        >
          Mento discord
        </Link>{" "}
        for assistance.
      </p>
      <Button
        color="blue"
        onClick={() => {
          logout();
          reset();
        }}
      >
        Try again
      </Button>
    </div>
  );
}
