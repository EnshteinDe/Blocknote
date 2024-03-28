import { createSlice } from '@reduxjs/toolkit';
import type { NoteType } from '../../../types/notesType';
import {
  addNoteThunk,
  updateNoteThunk,
  deleteNoteThunk,
  getNotesThunk,
  getNotesByBlocknoteIdThunk,
  getNoteByIdThunk,
  searchNotesThunk,
} from './notesThunk';

type NotesState = {
  notes: NoteType[];
  searchedNotes: NoteType[];
  searchText: string;
  note: NoteType;
};

const initialState: NotesState = {
  notes: [],
  searchedNotes: [],
  searchText: '',
  note: {
    id: 0,
    title: '',
    text: '',
    blocknoteId: 0,
  },
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState: initialState as NotesState,
  reducers: {
    setTitle: (state, action) => {
      state.note = { ...state.note, title: action.payload };
    },
    setText: (state, action) => {
      state.note = { ...state.note, text: action.payload };
    },
    resetSearchedNotes: (state) => {
      state.searchedNotes = [];
      state.searchText = '';
    },
    setSearchingText: (state, action) => {
      state.searchText = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getNotesThunk.fulfilled, (state, action) => {
      state.notes = action.payload;
    });
    builder.addCase(getNotesThunk.rejected, (state, action) => {
      state.notes = [];
    });

    builder.addCase(getNotesByBlocknoteIdThunk.fulfilled, (state, action) => {
      state.notes = action.payload;
    });
    builder.addCase(getNotesByBlocknoteIdThunk.rejected, (state, action) => {
      state.notes = [];
    });

    builder.addCase(getNoteByIdThunk.fulfilled, (state, action) => {
      state.note = action.payload;
    });
    builder.addCase(getNoteByIdThunk.rejected, (state, action) => {
      state.note = initialState.note;
    });

    builder.addCase(searchNotesThunk.fulfilled, (state, action) => {
      state.searchedNotes = action.payload;
    });

    builder.addCase(searchNotesThunk.rejected, (state, action) => {
      state.searchedNotes = [];
    });

    builder.addCase(addNoteThunk.fulfilled, (state, action) => {
      state.notes = [action.payload, ...state.notes];
    });
    builder.addCase(addNoteThunk.rejected, (state, action) => state);

    builder.addCase(updateNoteThunk.fulfilled, (state, action) => {
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });
    });

    builder.addCase(deleteNoteThunk.fulfilled, (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      state.note = initialState.note;
    });
    builder.addCase(deleteNoteThunk.rejected, (state, action) => state);
  },
});

export const { setTitle, setText, resetSearchedNotes, setSearchingText } = notesSlice.actions;
export default notesSlice.reducer;
