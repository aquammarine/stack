import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/auth.api";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate({ to: "/" });
    },
    onError: (error) =>
      toast.error("Logout failed: " + (error as Error).message),
  });
};

export { useLogout };
