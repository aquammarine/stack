import { useSessionQuery } from "@/modules/auth/hooks/useSessionQuery";
import { PrivateHomePage } from "@/pages/PrivateHomePage";
import { LandingPage } from "@/pages/LandingPage";

const HomePage = () => {
  const { data, isLoading } = useSessionQuery();

  if (isLoading) return null;

  return data?.user ? <PrivateHomePage /> : <LandingPage />;
};

export { HomePage };
