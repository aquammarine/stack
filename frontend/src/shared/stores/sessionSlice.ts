import { type StateCreator } from "zustand";

type SessionSlice = {
  session: { id: string; name: string } | null;
  setSession: (user: { id: string; name: string }) => void;
  clearSession: () => void;
};

const createSessionSlice: StateCreator<SessionSlice> = (set) => ({
  session: null,
  setSession: (user) => set({ session: user }),
  clearSession: () => set({ session: null }),
});

export { createSessionSlice, type SessionSlice };
