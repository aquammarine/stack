import {
  Button,
  Field,
  FieldLabel,
  FieldError,
  Input,
  Card,
  CardTitle,
} from "@/shared/ui/";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type loginFormValues, loginSchema } from "../../schemas/login.schema";
import { useLogin } from "../../hooks/useLogin";

const LoginForm = () => {
  const { mutate: loginUser } = useLogin();

  const loginForm = useForm<loginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: loginFormValues) {
    try {
      loginUser({
        email: values.email,
        password: values.password,
      });
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md px-10">
      <form
        onSubmit={loginForm.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl py-10"
      >
        <h1 className="text-5xl font-bold text-center font-mono">STACK</h1>
        <CardTitle className="text-2xl">Sign In</CardTitle>

        <Field data-invalid={!!loginForm.formState.errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="johndoe@example.com"
            autoComplete="email"
            aria-invalid={!!loginForm.formState.errors.email}
            aria-describedby="email-error"
            {...loginForm.register("email")}
          />
          {loginForm.formState.errors.email && (
            <FieldError
              id="email-error"
              errors={[loginForm.formState.errors.email]}
            />
          )}
        </Field>

        <Field data-invalid={!!loginForm.formState.errors.password}>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="●●●●●●●●●●●●"
            autoComplete="new-password"
            aria-invalid={!!loginForm.formState.errors.password}
            aria-describedby="password-error"
            {...loginForm.register("password")}
          />
          {loginForm.formState.errors.password && (
            <FieldError
              id="password-error"
              errors={[loginForm.formState.errors.password]}
            />
          )}
        </Field>

        <Button
          type="submit"
          disabled={loginForm.formState.isSubmitting}
          className="w-full"
          size="lg"
        >
          Submit
        </Button>

        <p className="text-sm text-center text-zinc-500 mt-6">
          Don't have an account yet?{" "}
          <Link
            to="/signup"
            className="text-orange-400 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </Card>
  );
};

export { LoginForm };
