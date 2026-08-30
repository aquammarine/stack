import axios, { type AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let refreshPromise: Promise<AxiosResponse> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status !== 401 || error.config._retry) {
      return Promise.reject(error);
    }
    error.config._retry = true;

    refreshPromise ??= api
      .post("/auth/refresh")
      .finally(() => (refreshPromise = null));
    await refreshPromise;
    return api(error.config);
  },
);
