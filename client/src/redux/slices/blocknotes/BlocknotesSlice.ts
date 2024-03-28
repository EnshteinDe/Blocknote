import { createSlice } from '@reduxjs/toolkit';
import type { BlocknoteType } from '../../../types/blocknotesType';
import {
  addBlocknoteThunk,
  updateBlocknoteThunk,
  deleteBlocknoteThunk,
  getBlocknotesThunk,
} from './BlocknotesThunk';

type BlocknotesState = BlocknoteType[];
const initialState: BlocknotesState = [];

export const blocknotesSlice = createSlice({
  name: 'blocknotes',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getBlocknotesThunk.fulfilled, (state, action) => action.payload);
    builder.addCase(getBlocknotesThunk.rejected, (state, action) => []);

    builder.addCase(addBlocknoteThunk.fulfilled, (state, action) => [action.payload, ...state]);
    builder.addCase(addBlocknoteThunk.rejected, (state, action) => state);

    builder.addCase(updateBlocknoteThunk.fulfilled, (state, action) =>
      state.map((blocknote) => (blocknote.id === action.payload.id ? action.payload : blocknote)),
    );
    builder.addCase(updateBlocknoteThunk.rejected, (state, action) => state);

    builder.addCase(deleteBlocknoteThunk.fulfilled, (state, action) =>
      state.filter((el) => el.id !== action.payload),
    );
    builder.addCase(deleteBlocknoteThunk.rejected, (state, action) => state);
  },
});

export default blocknotesSlice.reducer;
