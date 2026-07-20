import { type StateCreator } from "zustand";

type AuthSlice = {
  session: { id: string; username: string } | null;
  accessToken: string | null;
  setSession: (
    user: { id: string; username: string },
    accessToken: string,
  ) => void;
  clearSession: () => void;
};

const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  session: null,
  accessToken: null,
  setSession: (user, accessToken) => set({ session: user, accessToken }),
  clearSession: () => set({ session: null, accessToken: null }),
});

export { createAuthSlice, type AuthSlice };
