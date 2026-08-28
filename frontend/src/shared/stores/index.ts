import { create } from "zustand";
import { createSessionSlice, type SessionSlice } from "./sessionSlice";

type StoreState = SessionSlice;

const useStore = create<StoreState>()((...args) => ({
  ...createSessionSlice(...args),
}));

export { useStore, type StoreState };
