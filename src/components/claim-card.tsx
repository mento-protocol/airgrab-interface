import { ReactNode } from "react";

export default function ClaimCard({ children }: { children: ReactNode }) {
  return (
    <div className=" flex items-center justify-center px-12 py-24 bg-white shadow-md rounded-2xl overflow-visible border border-primary-dark">
      {children}
    </div>
  );
}