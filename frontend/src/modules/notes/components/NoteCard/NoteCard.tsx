import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogTrigger,
} from "@/shared/ui";
import type { Note } from "@/modules/notes/types";
import { formatUpdateTime } from "@/modules/notes/utils/formatUpdateTime";
import { NoteDetailDialog } from "@/modules/notes/components/NoteDetailDialog";

type NoteCardProps = {
  note: Note;
};

const NoteCard = ({ note }: NoteCardProps) => {
  const { title, noteType, content, updatedAt } = note;
  const formattedUpdateTime = formatUpdateTime(updatedAt);

  return (
    <Dialog>
      <Card className="h-44 transition-colors hover:ring-foreground/20">
        <DialogTrigger
          render={<div className="flex flex-1 cursor-pointer flex-col" />}
        >
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="line-clamp-2">{title}</CardTitle>
              <Badge>{noteType}</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {content}
            </p>
          </CardContent>
        </DialogTrigger>
        <CardFooter className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Updated {formattedUpdateTime}
          </span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Edit
            </Button>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </div>
        </CardFooter>
      </Card>

      <NoteDetailDialog note={note} />
    </Dialog>
  );
};

export { NoteCard };
export type { NoteCardProps };
