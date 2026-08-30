import { useMutation } from "@tanstack/react-query";
import { deleteNote } from "../api";
import { queryClient } from "@/shared/lib";

export const useDeleteNoteMutation = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteNote(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });
};
