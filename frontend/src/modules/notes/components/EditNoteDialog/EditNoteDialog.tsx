import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldError,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/shared/ui";
import { NoteType } from "@/modules/notes/types";
import type { Note } from "@/modules/notes/types";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateNoteSchema,
  type UpdateNoteFormValues,
} from "../../schemas/note.schema";
import { useUpdateNoteMutation } from "../../hooks/useUpdateNoteMutation";
import { useState } from "react";

type EditNoteDialogProps = {
  note: Note;
};

const EditNoteDialog = ({ note }: EditNoteDialogProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { mutate } = useUpdateNoteMutation();

  const form = useForm<UpdateNoteFormValues>({
    resolver: zodResolver(updateNoteSchema),
    defaultValues: {
      title: note.title,
      noteType: note.noteType,
      content: note.content,
      sourceUrl: note.sourceUrl,
    },
  });

  const onSubmit = (values: UpdateNoteFormValues) =>
    mutate(
      {
        id: note.id,
        data: { ...values, sourceUrl: values.sourceUrl || undefined },
      },
      { onSuccess: () => setOpen(false) },
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>
        Edit
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit note</DialogTitle>
          <DialogDescription>Update this note's details.</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <Field data-invalid={!!form.formState.errors.title}>
            <FieldLabel htmlFor="edit-note-title">Title</FieldLabel>
            <Input
              {...form.register("title")}
              id="edit-note-title"
              aria-invalid={!!form.formState.errors.title}
            />
            {form.formState.errors.title && (
              <FieldError errors={[form.formState.errors.title]} />
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="edit-note-type">Type</FieldLabel>
            <Controller
              control={form.control}
              name="noteType"
              render={({ field }) => (
                <Select
                  defaultValue={note.noteType}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger id="edit-note-type" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    <SelectItem value={NoteType.TEXT}>Text</SelectItem>
                    <SelectItem value={NoteType.LINK}>Link</SelectItem>
                    <SelectItem value={NoteType.QUOTE}>Quote</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </Field>

          <Field data-invalid={!!form.formState.errors.content}>
            <FieldLabel htmlFor="edit-note-content">Content</FieldLabel>
            <Textarea
              {...form.register("content")}
              id="edit-note-content"
              className="min-h-28"
              aria-invalid={!!form.formState.errors.content}
            />
            {form.formState.errors.content && (
              <FieldError errors={[form.formState.errors.content]} />
            )}
          </Field>

          <Field data-invalid={!!form.formState.errors.sourceUrl}>
            <FieldLabel htmlFor="edit-note-source-url">
              Source URL (optional)
            </FieldLabel>
            <Input
              {...form.register("sourceUrl")}
              id="edit-note-source-url"
              type="url"
              placeholder="https://developer.mozilla.org/..."
              aria-invalid={!!form.formState.errors.sourceUrl}
            />
            {form.formState.errors.sourceUrl && (
              <FieldError errors={[form.formState.errors.sourceUrl]} />
            )}
          </Field>

          <DialogFooter>
            <Button type="submit" variant="default">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { EditNoteDialog };
export type { EditNoteDialogProps };
