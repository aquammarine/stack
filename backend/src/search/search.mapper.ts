import { Note, NoteType } from '../generated/client';

export class SearchMapper {
  static toResponse(note: Note) {
    return {
      id: note.id,
      title: note.title,
      noteType: note.noteType,
      content: note.content,
      sourceUrl: note.sourceUrl,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    };
  }

  static toResponseList(notes: Note[]) {
    return notes.map((n) => this.toResponse(n));
  }
}
