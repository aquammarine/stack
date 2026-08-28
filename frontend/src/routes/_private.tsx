import {
  createFileRoute,
  redirect,
  isRedirect,
  Outlet,
} from "@tanstack/react-router";
import { sessionQueryOptions } from "@/modules/auth/queries/sessionQueryOptions";

export const Route = createFileRoute("/_private")({
  beforeLoad: async ({ context }) => {
    try {
      const isLoggedIn =
        context.queryClient.ensureQueryData(sessionQueryOptions);
      if (!isLoggedIn) {
        throw redirect({ to: "/signin" });
      }
    } catch (err) {
      if (isRedirect(err)) throw err;
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
