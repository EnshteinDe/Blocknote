import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deleteBlocknote as deleteBlocknoteService,
  updateBlocknote,
  getBlocknotes,
  submitBlocknote,
} from '../../../services/blocknotesService';
import type { BlocknoteFormType, BlocknoteType } from '../../../types/blocknotesType';

export const getBlocknotesThunk = createAsyncThunk<BlocknoteType[]>(
  'blocknotes/getBlocknotesThunk',
  async () => getBlocknotes(),
);

export const addBlocknoteThunk = createAsyncThunk<BlocknoteType, BlocknoteFormType>(
  'blocknotes/addBlocknoteThunk',
  async (formData) => submitBlocknote(formData),
);

export const updateBlocknoteThunk = createAsyncThunk<
  BlocknoteType,
  { id: BlocknoteType['id']; formData: BlocknoteFormType }
>('blocknotes/updateBlocknoteThunk', async ({ id, formData }) => updateBlocknote(id, formData));

export const deleteBlocknoteThunk = createAsyncThunk<
  BlocknoteType['id'],
  { id: BlocknoteType['id'] }
>('deleteBlocknoteThunk', async ({ id }) => deleteBlocknoteService(id));
