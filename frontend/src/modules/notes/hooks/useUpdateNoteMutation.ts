import { useMutation } from "@tanstack/react-query";
import { updateNote } from "../api";
import type { UpdateNote } from "../types";
import { queryClient } from "@/shared/lib";

export const useUpdateNoteMutation = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateNote }) =>
      updateNote(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });
};
