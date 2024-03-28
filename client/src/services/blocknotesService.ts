import type { BlocknoteFormType, BlocknoteType } from '../types/blocknotesType';
import apiService from './config';

export const getBlocknotes = async (): Promise<BlocknoteType[]> => {
  const { data } = await apiService<BlocknoteType[]>('/blocknotes');
  return data;
};

export const submitBlocknote = async (formData: BlocknoteFormType): Promise<BlocknoteType> => {
  const { data } = await apiService.post<BlocknoteType>('/blocknotes', formData);
  return data;
};

export const updateBlocknote = async (
  id: number,
  formData: BlocknoteFormType,
): Promise<BlocknoteType> => {
  const { data } = await apiService.patch<BlocknoteType>(`/blocknotes/${id}`, formData);
  return data;
};

export const deleteBlocknote = async (id: BlocknoteType['id']): Promise<BlocknoteType['id']> => {
  await apiService.delete(`/blocknotes/${id}`);
  return id;
};
