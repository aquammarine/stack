import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { searchNote } from "../api";

export const useSearchQuery = (query: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => searchNote(query),
    enabled: query.length >= 2,
    placeholderData: keepPreviousData,
  });
};
