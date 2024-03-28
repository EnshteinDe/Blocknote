import type { NoteFormType, NoteType } from '../types/notesType';
import apiService from './config';

export const getNotes = async (): Promise<NoteType[]> => {
  const { data } = await apiService<NoteType[]>('/notes');
  return data;
};

export const getNotesByBlocknoteId = async (blocknoteId: number): Promise<NoteType[]> => {
  const { data } = await apiService.get<NoteType[]>(`/notes/${blocknoteId}`);
  return data;
};

export const getNoteById = async (noteId: number): Promise<NoteType> => {
  const { data } = await apiService.get<NoteType>(`/notes/get-one/${noteId}`);
  return data;
};

export const searchNotes = async (text: string): Promise<NoteType[]> => {
  const { data } = await apiService.get<NoteType[]>(text ? `/notes/find/${text}` : '/notes/find');
  return data;
};

export const submitNote = async (blocknoteId: number): Promise<NoteType> => {
  const { data } = await apiService.post<NoteType>('/notes', { blocknoteId });
  return data;
};

export const updateNote = async (id: number, formData: NoteFormType): Promise<NoteType> => {
  const { data } = await apiService.patch<NoteType>(`/notes/${id}`, formData);
  return data;
};

export const deleteNote = async (id: NoteType['id']): Promise<NoteType['id']> => {
  await apiService.delete(`/notes/${id}`);
  return id;
};
