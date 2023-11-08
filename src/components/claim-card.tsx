import { ReactNode } from "react";

export default function ClaimCard({ children }: { children: ReactNode }) {
  return (
    <div className="w-full md:min-h-[350px] md:min-w-[846px] flex items-center justify-center px-12 py-12 bg-white shadow-md rounded-2xl overflow-visible border border-primary-dark">
      {children}
    </div>
  );
}
