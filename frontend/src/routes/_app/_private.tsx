import {
  createFileRoute,
  redirect,
  isRedirect,
  Outlet,
} from "@tanstack/react-router";
import { sessionQueryOptions } from "@/modules/auth/queries/sessionQueryOptions";

export const Route = createFileRoute("/_app/_private")({
  beforeLoad: async ({ context }) => {
    try {
      const data = await context.queryClient.ensureQueryData(sessionQueryOptions);
      if (!data.user) throw redirect({ to: "/signin" });
    } catch (err) {
      if (isRedirect(err)) throw err;
      throw redirect({ to: "/signin" });
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
