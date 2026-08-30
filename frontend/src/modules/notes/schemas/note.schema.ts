import z from "zod";
import { NoteType } from "../types";

const noteSchema = z.object({
  title: z.string().min(1).max(200),
  noteType: z.enum(NoteType).optional(),
  content: z.string().min(1),
  sourceUrl: z.union([z.literal(""), z.string().url()]).optional(),
});

export const createNoteSchema = noteSchema;
export const updateNoteSchema = noteSchema.partial();

export type CreateNoteFormValues = z.infer<typeof createNoteSchema>;
export type UpdateNoteFormValues = z.infer<typeof updateNoteSchema>;
