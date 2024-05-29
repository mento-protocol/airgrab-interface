"use client";

import { useCallback, useEffect, useState } from "react";
import { Address } from "viem";
import * as Sentry from "@sentry/nextjs";

const CHAIN_CONTEXT = "web3-data";

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
  const updateContext = useCallback(
    (contextPartial: ISentryContext) => {
      setContext({
        ...activeContext,
        ...contextPartial,
      });
    },
    [activeContext],
  );

  useEffect(() => {
    Sentry.setContext(CHAIN_CONTEXT, activeContext);
  }, [activeContext]);

  return {
    setContext,
    updateContext,
    clearContext,
  };
};

export { useSentryContext };
