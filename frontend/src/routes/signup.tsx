import { RegisterPage } from "@/pages/RegisterPage/RegisterPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return <RegisterPage />;
}
