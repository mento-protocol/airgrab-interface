import { ReactNode } from "react";

export default function ClaimCard({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center w-1/2 h-1/2 justify-center px-16 py-8 bg-white shadow-md rounded-2xl overflow-visible border border-primary-dark">
      {children}
    </div>
  );
}