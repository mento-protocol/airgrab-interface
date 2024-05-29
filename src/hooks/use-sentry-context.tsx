"use client";

import { useCallback, useEffect, useState } from "react";
import { Address } from "viem";
import * as Sentry from "@sentry/nextjs";

const CHAIN_CONTEXT = "web3-data";
const VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV || "local";

export interface ISentryContext {
  address?: Address;
  network?: number;
  allocation?: string;
  isKycVerified?: boolean;
  [key: string]: any;
}

const useSentryContext = () => {
  const [activeContext, setContext] = useState<ISentryContext | null>(null);

  const clearContext = useCallback(() => setContext(null), []);
  const updateContextItem = useCallback(
    (contextPartial: ISentryContext) => {
      setContext({
        env: VERCEL_ENV,
        ...activeContext,
        ...contextPartial,
      });
    },
    [activeContext],
  );

  const removeContextItem = useCallback(
    (key: string) => {
      setContext({
        ...activeContext,
        [key]: undefined,
      });
    },
    [activeContext],
  );

  useEffect(() => {
    Sentry.setContext(CHAIN_CONTEXT, activeContext);
  }, [activeContext]);

  return {
    setContext,
    updateContextItem,
    removeContextItem,
    clearContext,
  };
};

export { useSentryContext };
