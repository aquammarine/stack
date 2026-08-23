import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth.api";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

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
    }): Promise<{ token: string }> => register(email, password, name),
    onSuccess: () => {
      navigate({ to: "/" });
    },
    onError: (error) =>
      toast.error("Registration failed: " + (error as Error).message),
  });
};

export { useRegister };
