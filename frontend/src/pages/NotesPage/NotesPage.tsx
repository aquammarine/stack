import { NotesHeader, NotesGrid, EmptyState } from "@/modules/notes/components";
import { useNotesQuery } from "@/modules/notes/hooks/useNotesQuery";

const NotesPage = () => {
  const { data, isPending } = useNotesQuery();

  if (isPending) {
    return <div>Loading</div>;
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <NotesHeader />

      <div className="mt-8">
        {!data || data.length === 0 ? (
          <EmptyState />
        ) : (
          <NotesGrid notes={data} />
        )}
      </div>
    </div>
  );
};

export { NotesPage };
