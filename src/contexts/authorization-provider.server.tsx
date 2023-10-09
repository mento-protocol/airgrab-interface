import React, { ReactNode } from "react";

import { getAllocationList, getTree } from "@/utils/merkle";
import AuthorizationProvider from "./authorization-provider.client";

export function Authorization({ children }: { children?: ReactNode }) {
  const allocations = getAllocationList(getTree());

  return (
    <AuthorizationProvider allocations={allocations}>
      {children}
    </AuthorizationProvider>
  );
}