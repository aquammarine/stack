import { create } from "zustand";
import { createAuthSlice, type AuthSlice } from "./authSlice";

type StoreState = AuthSlice;

const useStore = create<StoreState>()((...args) => ({
  ...createAuthSlice(...args),
}));

export { useStore, type StoreState };
