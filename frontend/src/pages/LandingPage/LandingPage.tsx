import { Link } from "@tanstack/react-router";
import { Button } from "@/shared/ui";

const LandingPage = () => {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <h1 className="font-mono text-5xl font-bold tracking-tight">STACK</h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        Capture what you learn and find it again when you need it.
      </p>

      <div className="mt-8 flex items-center gap-3">
        <Button variant="default" size="lg" render={<Link to="/signup" />}>
          Get started
        </Button>
        <Button variant="ghost" size="lg" render={<Link to="/signin" />}>
          Sign in
        </Button>
      </div>
    </div>
  );
};

export { LandingPage };
