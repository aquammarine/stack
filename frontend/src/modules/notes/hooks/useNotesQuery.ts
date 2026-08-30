import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../api";

export const useNotesQuery = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: async () => getNotes(),
    staleTime: 5 * 60 * 1000,
  });
};
