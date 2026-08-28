import { createFileRoute } from "@tanstack/react-router";
import { TestPage } from "@/pages/TestPage";

const Route = createFileRoute("/test")({
  component: () => {
    return <TestPage />;
  },
});

export { Route };
