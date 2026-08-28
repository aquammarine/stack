import { useStore } from "@/shared/stores";

const PrivateHomePage = () => {
  const session = useStore((state) => state.session);

  return (
    <div>
      <h1>Welcome, {session?.name}</h1>
    </div>
  );
};

export { PrivateHomePage };
