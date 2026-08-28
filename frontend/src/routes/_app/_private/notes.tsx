import { createFileRoute } from "@tanstack/react-router";
import { NotesPage } from "@/pages/NotesPage";

export const Route = createFileRoute("/_app/_private/notes")({
  component: RouteComponent,
});

function RouteComponent() {
  return <NotesPage />;
}
