import { CreateNoteDialog } from "@/modules/notes/components/CreateNoteDialog";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-none border border-dashed py-24 text-center">
      <p className="text-sm font-medium">No notes yet</p>
      <p className="text-sm text-muted-foreground">
        Create your first note to get started.
      </p>
      <div className="mt-4">
        <CreateNoteDialog />
      </div>
    </div>
  );
};

export { EmptyState };
