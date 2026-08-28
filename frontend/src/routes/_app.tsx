import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "@/shared/components/Navbar";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
