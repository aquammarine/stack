import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useStore } from "@/shared/stores";

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["me"], { user: null });
      useStore.getState().clearSession();
      navigate({ to: "/" });
    },
    onError: (error) =>
      toast.error("Logout failed: " + (error as Error).message),
  });
};

export { useLogout };
