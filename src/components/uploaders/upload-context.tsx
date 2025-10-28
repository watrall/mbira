"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";

export interface UploadContextValue {
  bucket: string;
  pathPrefix?: string;
}

const UploadContext = createContext<UploadContextValue | null>(null);

export function UploadProvider({
  value,
  children,
}: {
  value: UploadContextValue;
  children: ReactNode;
}) {
  return <UploadContext.Provider value={value}>{children}</UploadContext.Provider>;
}

export function useUploadContext() {
  const ctx = useContext(UploadContext);
  if (!ctx) {
    throw new Error("useUploadContext must be used within an UploadProvider");
  }
  return ctx;
}
