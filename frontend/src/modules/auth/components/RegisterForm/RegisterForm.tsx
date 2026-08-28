import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Field, FieldLabel, FieldError } from "@/shared/ui/field";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/modules/auth/schemas/register.schema";
import { Card, CardTitle } from "@/shared/ui/card";
import { Link } from "@tanstack/react-router";
import { useRegister } from "../../hooks/useRegisterMutation";

function RegisterForm() {
  const { mutate: registerUser } = useRegister();

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: RegisterFormValues) {
    try {
      registerUser({
        email: values.email,
        password: values.password,
        name: values.name,
      });
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md px-10">
      <form
        onSubmit={registerForm.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl py-10"
      >
        <h1 className="text-5xl font-bold text-center font-mono">STACK</h1>
        <CardTitle className="text-2xl">Create Account</CardTitle>

        <Field data-invalid={!!registerForm.formState.errors.name}>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            placeholder="John Doe"
            autoComplete="name"
            aria-invalid={!!registerForm.formState.errors.name}
            aria-describedby="name-error"
            {...registerForm.register("name")}
          />
          {registerForm.formState.errors.name && (
            <FieldError
              id="name-error"
              errors={[registerForm.formState.errors.name]}
            />
          )}
        </Field>

        <Field data-invalid={!!registerForm.formState.errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="johndoe@example.com"
            autoComplete="email"
            aria-invalid={!!registerForm.formState.errors.email}
            aria-describedby="email-error"
            {...registerForm.register("email")}
          />
          {registerForm.formState.errors.email && (
            <FieldError
              id="email-error"
              errors={[registerForm.formState.errors.email]}
            />
          )}
        </Field>

        <Field data-invalid={!!registerForm.formState.errors.password}>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="●●●●●●●●●●●●"
            autoComplete="new-password"
            aria-invalid={!!registerForm.formState.errors.password}
            aria-describedby="password-error"
            {...registerForm.register("password")}
          />
          {registerForm.formState.errors.password && (
            <FieldError
              id="password-error"
              errors={[registerForm.formState.errors.password]}
            />
          )}
        </Field>

        <Field data-invalid={!!registerForm.formState.errors.confirmPassword}>
          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="●●●●●●●●●●●●"
            autoComplete="new-password"
            aria-invalid={!!registerForm.formState.errors.confirmPassword}
            aria-describedby="confirmPassword-error"
            {...registerForm.register("confirmPassword")}
          />
          {registerForm.formState.errors.confirmPassword && (
            <FieldError
              id="confirmPassword-error"
              errors={[registerForm.formState.errors.confirmPassword]}
            />
          )}
        </Field>

        <Button
          type="submit"
          disabled={registerForm.formState.isSubmitting}
          className="w-full"
          size="lg"
        >
          Submit
        </Button>

        <p className="text-sm text-center text-zinc-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-orange-400 font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </Card>
  );
}

export { RegisterForm };
