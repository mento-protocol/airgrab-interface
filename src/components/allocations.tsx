import React from "react";
import { AllocationDisplay } from "./allocation-display";
import { getAllocationList } from "@/utils/merkle";


export async function Allocation() {
  const allocations = await getAllocationList();

  return allocations ? <AllocationDisplay allocations={allocations} /> : null;
}
