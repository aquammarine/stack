import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth.api";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useStore } from "@/shared/stores";

const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<{ user: { id: string; name: string } }> =>
      login(email, password),
    onSuccess: (data) => {
      useStore
        .getState()
        .setSession({ id: data.user.id, name: data.user.name });
      navigate({ to: "/" });
    },
    onError: (error) =>
      toast.error("Login failed: " + (error as Error).message),
  });
};

export { useLogin };
