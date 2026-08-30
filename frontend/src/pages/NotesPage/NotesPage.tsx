import { NotesHeader, NotesGrid } from "@/modules/notes/components";

const NotesPage = () => {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <NotesHeader />

      <div className="mt-8">
        <NotesGrid />
      </div>
    </div>
  );
};

export { NotesPage };
