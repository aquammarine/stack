import { api } from "@/shared/lib/axios";
import { useStore } from "@/shared/stores";

const login = async (
  email: string,
  password: string,
): Promise<{ token: string }> => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

const register = async (
  email: string,
  password: string,
  name: string,
): Promise<{ token: string }> => {
  const response = await api.post("/auth/register", { email, password, name });
  return response.data;
};

const logout = async (): Promise<void> => {
  useStore.getState().clearSession();
  await api.post("/auth/logout");
};

export { login, register, logout };
