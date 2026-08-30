import { Button, Input } from "@/shared/ui";

const NotesHeader = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Notes</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Everything you've saved, in one place.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Input placeholder="Search notes..." className="w-56" />
        <Button variant="outline">Study</Button>
        <Button variant="default">Add card</Button>
      </div>
    </div>
  );
};

export { NotesHeader };
