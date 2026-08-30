import { NoteCard } from "@/modules/notes/components/NoteCard";
import { type Note } from "@/modules/notes/types";

interface NotesGridProps {
  notes: Note[];
}

const NotesGrid = ({ notes }: NotesGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note: Note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
};

export { NotesGrid };
