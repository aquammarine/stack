export interface Note {
  id: string;
  title: string;
  noteType: NoteType;
  content: string;
  sourceUrl?: string;
  tagIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateNote {
  title: string;
  noteType?: NoteType;
  content: string;
  sourceUrl?: string;
  tagIds?: string[];
}

export interface UpdateNote {
  title?: string;
  noteType?: NoteType;
  content?: string;
  sourceUrl?: string;
  tagIds?: string[];
}

export const NoteType = {
  TEXT: "TEXT",
  LINK: "LINK",
  QUOTE: "QUOTE",
} as const;

export type NoteType = (typeof NoteType)[keyof typeof NoteType];
