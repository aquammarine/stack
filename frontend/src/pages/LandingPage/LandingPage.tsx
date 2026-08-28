import { Link } from "@tanstack/react-router";

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <p>Sign in or create an account to get started.</p>
      <Link to="/signin">Sign in</Link>
      <Link to="/signup">Sign up</Link>
    </div>
  );
};

export { LandingPage };
