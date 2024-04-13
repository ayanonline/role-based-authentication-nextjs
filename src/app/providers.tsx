"use client";

import { AuthStoreProvider } from "@/providers/auth-store-provider";
import { type ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <AuthStoreProvider>{children}</AuthStoreProvider>;
}
