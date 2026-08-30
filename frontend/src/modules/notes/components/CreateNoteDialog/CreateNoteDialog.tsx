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
import {
  createNoteSchema,
  type CreateNoteFormValues,
} from "../../schemas/note.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useCreateNoteMutation } from "../../hooks/useCreateNoteMutation";
import { useState } from "react";

const CreateNoteDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<CreateNoteFormValues>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: { title: "", content: "", noteType: NoteType.TEXT },
  });

  const { mutate } = useCreateNoteMutation();

  const onSubmit = (values: CreateNoteFormValues) =>
    mutate(
      { data: { ...values, sourceUrl: values.sourceUrl || undefined } },
      { onSuccess: () => setOpen(false) },
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="default" />}>
        Add card
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>New note</DialogTitle>
          <DialogDescription>Add a note to your collection.</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <Field data-invalid={!!form.formState.errors.title}>
            <FieldLabel htmlFor="note-title">Title</FieldLabel>
            <Input
              {...form.register("title")}
              id="note-title"
              placeholder="What does CSS stand for?"
              aria-invalid={!!form.formState.errors.title}
            />
            {form.formState.errors.title && (
              <FieldError errors={[form.formState.errors.title]} />
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="note-type">Type</FieldLabel>
            <Controller
              control={form.control}
              name="noteType"
              render={({ field }) => (
                <Select
                  defaultValue={NoteType.TEXT}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger id="note-type" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    <SelectItem value={NoteType.TEXT}>Text</SelectItem>
                    <SelectItem value={NoteType.LINK}>Link</SelectItem>
                    <SelectItem value={NoteType.QUOTE}>Quote</SelectItem>
                  </SelectContent>
                </Select>
              )}
            ></Controller>
          </Field>

          <Field data-invalid={!!form.formState.errors.content}>
            <FieldLabel htmlFor="note-content">Content</FieldLabel>
            <Textarea
              {...form.register("content")}
              id="note-content"
              placeholder="Cascading Style Sheets."
              className="min-h-28"
              aria-invalid={!!form.formState.errors.content}
            />
            {form.formState.errors.content && (
              <FieldError errors={[form.formState.errors.content]} />
            )}
          </Field>

          <Field data-invalid={!!form.formState.errors.sourceUrl}>
            <FieldLabel htmlFor="note-source-url">
              Source URL (optional)
            </FieldLabel>
            <Input
              {...form.register("sourceUrl")}
              id="note-source-url"
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
              Create note
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { CreateNoteDialog };
