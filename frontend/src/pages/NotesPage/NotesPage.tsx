import {
  NotesHeader,
  NotesGrid,
  EmptyState,
  NotesSkeleton,
  NotesError,
} from "@/modules/notes/components";
import { useNotesQuery } from "@/modules/notes/hooks/useNotesQuery";

const NotesPage = () => {
  const { data, isPending, isError, refetch } = useNotesQuery();

  const renderContent = () => {
    if (isPending) return <NotesSkeleton />;
    if (isError) return <NotesError onRetry={() => refetch()} />;
    if (data.length === 0) return <EmptyState />;
    return <NotesGrid notes={data} />;
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <NotesHeader />

      <div className="mt-8">{renderContent()}</div>
    </div>
  );
};

export { NotesPage };
