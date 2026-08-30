import { useQuery } from "@tanstack/react-query";
import { sessionQueryOptions } from "../queries/sessionQueryOptions";

const useSessionQuery = () => {
  return useQuery(sessionQueryOptions);
};

export { useSessionQuery };
