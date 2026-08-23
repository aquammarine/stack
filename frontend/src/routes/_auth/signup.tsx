import { RegisterPage } from "@/pages/auth/RegisterPage/RegisterPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return <RegisterPage />;
}
