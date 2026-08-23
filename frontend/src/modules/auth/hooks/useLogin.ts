import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth.api";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<{ token: string }> => login(email, password),
    onSuccess: () => {
      navigate({ to: "/" });
    },
    onError: (error) =>
      toast.error("Login failed: " + (error as Error).message),
  });
};

export { useLogin };
