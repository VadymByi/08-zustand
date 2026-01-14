import type { Note, NoteTag } from '../types/note';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

interface FetchNotesParams {
  search?: string;
  tag?: NoteTag;
  page?: number;
  perPage?: number;
  sortBy?: 'created' | 'updated';
}
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export type CreateNotePayload = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;

export async function fetchNotes(params: FetchNotesParams): Promise<FetchNotesResponse> {
  // console.log("Checking token:", process.env.NEXT_PUBLIC_NOTEHUB_TOKEN);
  // throw new Error("Simulated error: Invalid token.");

  const response = await api.get<FetchNotesResponse>('/notes', {
    params: {
      search: params.search,
      tag: params.tag,
      page: params.page,
      perPage: params.perPage,
      sortBy: params.sortBy,
    },
  });

  return response.data;
}

export async function createNote(note: CreateNotePayload): Promise<Note> {
  const response = await api.post<Note>('/notes', note);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}
