"use client";

import { useAuthStore } from "@/providers/auth-store-provider";
import { redirect } from "next/navigation";
import React, { FC, ReactNode, useEffect } from "react";
/**
 * This is an HOC to check client-side page-level authentication
 * if user is not authenticated then it will redirect user to Home/Dashboard page
 * @param Component (React functional componenct)
 *
 * @returns (React functional component)
 *
 * @call export default IsAuth(page_name);
 */

const Protected = (Component: FC) => {
  return function IsAuth(props: any) {
    const { loading, isLoggedIn } = useAuthStore((state) => state);

    if (loading) return null;

    if (!loading && !isLoggedIn) {
      return redirect("/login");
    }

    return <Component {...props} />;
  };
};

export default Protected;
