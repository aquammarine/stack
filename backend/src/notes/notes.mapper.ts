import { Note, Prisma } from '../generated/client';

type NoteWithTags = Prisma.NoteGetPayload<{
  include: { tag: { include: { tag: true } } };
}>;

export class NotesMapper {
  static toResponse(note: NoteWithTags) {
    return {
      id: note.id,
      title: note.title,
      content: note.content,
      noteType: note.noteType,
      sourceUrl: note.sourceUrl,
      tags: note.tag.map((nt) => ({
        id: nt.tag.id,
        name: nt.tag.name,
        color: nt.tag.color,
      })),
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    };
  }

  static toResponseList(notes: NoteWithTags[]) {
    return notes.map((n) => this.toResponse(n));
  }
}
