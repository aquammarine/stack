import { api } from "@/shared/lib/axios";
import { useStore } from "@/shared/stores";

const login = async (
  email: string,
  password: string,
): Promise<{ user: { id: string; name: string } }> => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

const register = async (
  email: string,
  password: string,
  name: string,
): Promise<{ user: { id: string; name: string } }> => {
  const response = await api.post("/auth/register", { email, password, name });
  return response.data;
};

const logout = async (): Promise<void> => {
  useStore.getState().clearSession();
  await api.post("/auth/logout");
};

const getMe = async (): Promise<{
  user: { id: string; name: string } | null;
}> => {
  const response = await api.get("/auth/me");
  return response.data;
};

export { login, register, logout, getMe };
