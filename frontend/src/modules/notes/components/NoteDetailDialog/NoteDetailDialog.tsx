import {
  Badge,
  Button,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Separator,
} from "@/shared/ui";
import type { Note } from "@/modules/notes/types";
import { formatUpdateTime } from "@/modules/notes/utils/formatUpdateTime";
type NoteDetailDialogProps = {
  note: Note;
  setConfirmOpen: (open: boolean) => void;
};

const NoteDetailDialog = ({ note, setConfirmOpen }: NoteDetailDialogProps) => {
  const { title, noteType, content, sourceUrl, updatedAt } = note;
  const formattedUpdatedAt = formatUpdateTime(updatedAt);

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <div className="flex items-start justify-between gap-3 pr-8">
          <DialogTitle className="text-base">{title}</DialogTitle>
          <Badge variant="outline" className="shrink-0">
            {noteType}
          </Badge>
        </div>
        <DialogDescription>Updated {formattedUpdatedAt} ago</DialogDescription>
      </DialogHeader>

      <Separator />

      <p className="max-h-72 overflow-y-auto text-sm leading-relaxed whitespace-pre-wrap text-foreground">
        {content}
      </p>

      {sourceUrl && (
        <>
          <Separator />
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">
              Source
            </span>
            <a
              href={sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="truncate text-xs text-primary underline underline-offset-4"
            >
              {sourceUrl}
            </a>
          </div>
        </>
      )}

      <DialogFooter>
        <Button variant="outline" size="sm">
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setConfirmOpen(true)}
        >
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export { NoteDetailDialog };
export type { NoteDetailDialogProps };
