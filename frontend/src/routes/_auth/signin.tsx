import { sessionQueryOptions } from "@/modules/auth/queries/sessionQueryOptions";
import { LoginPage } from "@/pages/auth/LoginPage/LoginPage";
import { createFileRoute, isRedirect, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/signin")({
  beforeLoad: async ({ context }) => {
    try {
      await context.queryClient.ensureQueryData(sessionQueryOptions);
      throw redirect({ to: "/" });
    } catch (err) {
      if (isRedirect(err)) throw err;
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginPage />;
}
