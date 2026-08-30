import { Button } from "@/shared/ui";
import { AlertTriangle } from "lucide-react";

type NotesErrorProps = {
  onRetry: () => void;
};

const NotesError = ({ onRetry }: NotesErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-none border border-dashed border-destructive/30 bg-destructive/5 py-24 text-center">
      <div className="flex size-10 items-center justify-center rounded-none bg-destructive/10">
        <AlertTriangle className="size-5 text-destructive" />
      </div>
      <p className="text-sm font-medium">Couldn't load your notes</p>
      <p className="max-w-xs text-sm text-muted-foreground">
        Something went wrong on our end. Check your connection and try again.
      </p>
      <Button variant="outline" size="sm" className="mt-2" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
};

export { NotesError };
export type { NotesErrorProps };
