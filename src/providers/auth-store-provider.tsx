"use client";

import {
  type ReactNode,
  createContext,
  useRef,
  useContext,
  useEffect,
} from "react";
import { type StoreApi, useStore } from "zustand";
import { type AuthStore, createAuthStore } from "@/store/auth-store";
import {
  checkUserSession,
  deleteSession,
  getUserDetails,
} from "@/services/session";

export const AuthStoreContext = createContext<StoreApi<AuthStore> | null>(null);

export interface AuthStoreProviderProps {
  children: ReactNode;
}

export const AuthStoreProvider = ({ children }: AuthStoreProviderProps) => {
  const storeRef = useRef<StoreApi<AuthStore>>();
  if (!storeRef.current) {
    storeRef.current = createAuthStore();
  }

  // Check user session and set authState
  useEffect(() => {
    if (checkUserSession()) {
      const userDetails = getUserDetails();
      storeRef.current?.setState({
        loading: false,
        isLoggedIn: true,
        user: userDetails,
      });
    } else {
      deleteSession();
      storeRef.current?.setState({
        loading: false,
        isLoggedIn: false,
        user: null,
      });
    }
  }, []);

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
};

export const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
  const authStoreContext = useContext(AuthStoreContext);
  if (!authStoreContext) {
    throw new Error(`useAuthStore must be use within AuthStoreProvider`);
  }

  return useStore(authStoreContext, selector);
};
