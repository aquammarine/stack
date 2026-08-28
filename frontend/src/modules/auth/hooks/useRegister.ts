import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth.api";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useStore } from "@/shared/stores";

const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      email,
      password,
      name,
    }: {
      email: string;
      password: string;
      name: string;
    }): Promise<{ user: { id: string; name: string } }> =>
      register(email, password, name),
    onSuccess: (data) => {
      useStore
        .getState()
        .setSession({ id: data.user.id, name: data.user.name });
      navigate({ to: "/" });
    },
    onError: (error) =>
      toast.error("Registration failed: " + (error as Error).message),
  });
};

export { useRegister };
