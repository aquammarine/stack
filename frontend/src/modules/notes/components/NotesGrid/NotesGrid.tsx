import { NoteCard } from "@/modules/notes/components/NoteCard";
import { type Note } from "@/modules/notes/types";
import { useNotesQuery } from "../../hooks/useNotesQuery";
import { EmptyState } from "../EmptyState";

const NotesGrid = () => {
  const { data, isPending } = useNotesQuery();

  if (isPending) {
    return <div>Loading</div>;
  }

  if (!data) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((note: Note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
};

export { NotesGrid };
