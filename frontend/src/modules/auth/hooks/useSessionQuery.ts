import { getMe } from "../api/auth.api";

const useSessionQuery = {
  queryKey: ["me"],
  queryFn: async () => getMe(),
  staleTime: 5 * 60 * 1000,
};

export { useSessionQuery };
