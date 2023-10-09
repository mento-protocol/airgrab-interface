import React, { ReactNode } from "react";

import { getAllocationList } from "@/utils/merkle";
import AuthorizationProvider from "./authorization-provider.client";

export function Authorization({ children }: { children?: ReactNode }) {
  const allocations = getAllocationList();

  return (
    <AuthorizationProvider allocations={allocations}>
      {children}
    </AuthorizationProvider>
  );
}
