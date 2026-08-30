import {
  Badge,
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
import { useDeleteNoteMutation } from "../../hooks/useDeleteNoteMutation";
import { DeleteNoteAlertDialog } from "@/modules/notes/components/DeleteNoteAlertDialog";
import { EditNoteDialog } from "@/modules/notes/components/EditNoteDialog";

type NoteCardProps = {
  note: Note;
};

const NoteCard = ({ note }: NoteCardProps) => {
  const { id, title, noteType, content, updatedAt } = note;
  const formattedUpdateTime = formatUpdateTime(updatedAt);
  const { mutate } = useDeleteNoteMutation();

  const onDelete = () => {
    mutate({ id });
  };

  return (
    <Card className="h-44 transition-colors hover:ring-foreground/20">
      <Dialog>
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

        <NoteDetailDialog note={note} />
      </Dialog>

      <CardFooter className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Updated {formattedUpdateTime} ago
        </span>
        <div className="flex items-center gap-2">
          <EditNoteDialog note={note} />
          <DeleteNoteAlertDialog onConfirm={onDelete} />
        </div>
      </CardFooter>
    </Card>
  );
};

export { NoteCard };
export type { NoteCardProps };
