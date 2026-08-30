import { getMe } from "../api";

const sessionQueryOptions = {
  queryKey: ["me"],
  queryFn: async () => getMe(),
  staleTime: 5 * 60 * 1000,
};

export { sessionQueryOptions };
