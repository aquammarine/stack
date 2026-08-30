import {
  NotesHeader,
  NotesGrid,
  EmptyState,
  NotesSkeleton,
  NotesError,
} from "@/modules/notes/components";
import { useDebounce } from "@/modules/notes/hooks/useDebounce";
import { useNotesQuery } from "@/modules/notes/hooks/useNotesQuery";
import { useSearchQuery } from "@/modules/notes/hooks/useSearchQuery";
import { useState } from "react";

const NotesPage = () => {
  const [search, setSearch] = useState<string>("");
  const notesQuery = useNotesQuery();
  const debounceSearch = useDebounce(search, 400);
  const searchQuery = useSearchQuery(debounceSearch);

  const isSearching = debounceSearch.length >= 2;
  const activeQuery = isSearching ? searchQuery : notesQuery;

  const renderContent = () => {
    if (activeQuery.isPending) return <NotesSkeleton />;
    if (activeQuery.isError)
      return <NotesError onRetry={() => activeQuery.refetch()} />;
    if (activeQuery.data.length === 0) return <EmptyState />;
    return <NotesGrid notes={activeQuery.data} />;
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <NotesHeader search={search} onChange={setSearch} />

      <div className="mt-8">{renderContent()}</div>
    </div>
  );
};

export { NotesPage };
