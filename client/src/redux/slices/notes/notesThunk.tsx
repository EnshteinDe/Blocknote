import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deleteNote as deleteNoteService,
  updateNote,
  getNotes,
  submitNote,
  getNotesByBlocknoteId,
  getNoteById,
  searchNotes,
} from '../../../services/notesService';
import type { NoteFormType, NoteType } from '../../../types/notesType';

export const getNotesThunk = createAsyncThunk<NoteType[]>('notes/getNotesThunk', async () =>
  getNotes(),
);

export const getNotesByBlocknoteIdThunk = createAsyncThunk<NoteType[], number>(
  'notes/getNotesByBlocknoteIdThunk',
  async (blocknoteId: number) => getNotesByBlocknoteId(blocknoteId),
);

export const getNoteByIdThunk = createAsyncThunk<NoteType, number>(
  'notes/getNoteByIdThunk',
  async (noteId: number) => getNoteById(noteId),
);

export const searchNotesThunk = createAsyncThunk<NoteType[], string>(
  'notes/searchNotesThunk',
  async (text: string) => searchNotes(text),
);

export const addNoteThunk = createAsyncThunk<NoteType, number>(
  'notes/addNoteThunk',
  async (blocknoteId: number) => submitNote(blocknoteId),
);

export const updateNoteThunk = createAsyncThunk<NoteType, NoteType>(
  'notes/updateNoteThunk',
  async (note: NoteType) => {
    const { id, ...formData } = note;
    return updateNote(id, formData);
  },
);

export const deleteNoteThunk = createAsyncThunk<NoteType['id'], { id: NoteType['id'] }>(
  'deleteNotehunk',
  async ({ id }) => deleteNoteService(id),
);
