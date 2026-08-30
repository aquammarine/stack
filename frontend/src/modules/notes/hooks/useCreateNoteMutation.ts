import { useMutation } from "@tanstack/react-query";
import type { CreateNote, Note } from "../types";
import { createNote } from "../api";
import { queryClient } from "@/shared/lib";

export const useCreateNoteMutation = () => {
  return useMutation({
    mutationFn: ({ data }: { data: CreateNote }): Promise<Note> =>
      createNote(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });
};
