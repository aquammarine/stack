import { createFileRoute } from "@tanstack/react-router";
import { StudyPage } from "@/pages/StudyPage";

export const Route = createFileRoute("/_app/_private/study")({
  component: RouteComponent,
});

function RouteComponent() {
  return <StudyPage />;
}
