import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "@/shared/components/Navbar";
import { SessionActions } from "@/modules/auth/components/SessionActions";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Navbar actions={<SessionActions />} />
      <Outlet />
    </>
  );
}
