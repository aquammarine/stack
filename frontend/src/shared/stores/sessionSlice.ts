import { type StateCreator } from "zustand";

type SessionSlice = {
  session: { id: string; name: string } | null;
  accessToken: string | null;
  setSession: (user: { id: string; name: string }, accessToken: string) => void;
  clearSession: () => void;
};

const createSessionSlice: StateCreator<SessionSlice> = (set) => ({
  session: null,
  accessToken: null,
  setSession: (user, accessToken) => set({ session: user, accessToken }),
  clearSession: () => set({ session: null, accessToken: null }),
});

export { createSessionSlice, type SessionSlice };
