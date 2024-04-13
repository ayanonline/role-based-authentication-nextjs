import { create } from "zustand";

export type State = {
  loading: boolean;
  isLoggedIn: boolean;
  user: any;
};

export type Action = {
  setLoading: (value: boolean) => void;
  setIsLoggedIn: (value: boolean) => void;
  setUser: (value: any) => void;
};

export type AuthStore = State & Action;

// Auth Store create function
export const createAuthStore = () => {
  return create<AuthStore>()((set) => ({
    loading: true,
    isLoggedIn: false,
    user: null,

    setLoading: (value) => set((state) => ({ loading: value })),
    setIsLoggedIn: (value) => set((state) => ({ isLoggedIn: value })),
    setUser: (value) => set((state) => ({ user: value })),
  }));
};
