import { api } from "@/shared/lib/axios";
import type { Note, CreateNote, UpdateNote } from "./types";

export const createNote = async (data: CreateNote): Promise<Note> => {
  const response = await api.post("/notes", data);
  return response.data;
};

export const getNotes = async (): Promise<Note[]> => {
  const response = await api.get("/notes");
  return response.data;
};

export const getNoteById = async (id: string): Promise<Note> => {
  const response = await api.get(`/notes/${id}`);
  return response.data;
};

export const updateNote = async (
  id: string,
  data: UpdateNote,
): Promise<Note> => {
  const response = await api.put(`/notes/${id}`, data);
  return response.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};
