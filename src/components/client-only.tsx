"use client";

// Imports
// ========================================================
import React, { useState, useEffect } from "react";

// Page
// ========================================================
export default function ClientOnly({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  // State / Props
  const [hasMounted, setHasMounted] = useState(false);

  // Hooks
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Render
  if (!hasMounted) return fallback;

  return <>{children}</>;
}
