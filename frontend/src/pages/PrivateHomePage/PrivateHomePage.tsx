import { Link } from "@tanstack/react-router";
import { useStore } from "@/shared/stores";
import { Button, Card, CardContent, CardTitle } from "@/shared/ui";

const PrivateHomePage = () => {
  const session = useStore((state) => state.session);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        Welcome back, {session?.name}
      </h1>
      <p className="mt-2 text-muted-foreground">
        Pick up where you left off.
      </p>

      <Card className="mt-8">
        <CardContent className="flex items-center justify-between gap-4 py-6">
          <div>
            <CardTitle className="text-lg">Notes</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Browse and manage everything you've saved.
            </p>
          </div>
          <Button variant="default" render={<Link to="/notes" />}>
            Open notes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export { PrivateHomePage };
