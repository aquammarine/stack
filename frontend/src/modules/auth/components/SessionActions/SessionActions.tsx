import { Button } from "@/shared/ui";
import { useSessionQuery } from "../../hooks/useSessionQuery";
import { useLogout } from "../../hooks/useLogoutMutation";
import { Link } from "@tanstack/react-router";

const SessionActions = () => {
  const { data } = useSessionQuery();
  const { mutate: logout, isPending } = useLogout();

  if (!data?.user) {
    return (
      <>
        <Button variant="ghost" render={<Link to="/signin" />}>
          Sign in
        </Button>
        <Button variant="default" render={<Link to="/signup" />}>
          Sign up
        </Button>
      </>
    );
  }

  return (
    <>
      <span>{data.user.name}</span>
      <Button variant="ghost" onClick={() => logout()} disabled={isPending}>
        Sign out
      </Button>
    </>
  );
};

export { SessionActions };
