import { api } from "@/shared/lib/axios";
import { useStore } from "@/shared/stores";

const login = async (
  email: string,
  password: string,
): Promise<{ token: string }> => {
  const response = await api.post("/auth/login", { email, password });
  useStore
    .getState()
    .setSession({ id: "test-id", username: "test-name" }, response.data);
  return response.data;
};

const register = async (
  email: string,
  password: string,
  username: string,
): Promise<{ token: string }> => {
  const response = await api.post("/auth/register", { email, password, username });
  useStore
    .getState()
    .setSession({ id: "test-id", username: "test-name" }, response.data);
  return response.data;
};

const logout = async (): Promise<void> => {
  useStore.getState().clearSession();
  await api.post("/auth/logout");
};

export { login, register, logout };
