import type { NoteType } from './notesType';

export type BlocknoteType = {
  id: number;
  title: string;
  Notes: NoteType[];
};

export type BlocknoteFormType = Omit<BlocknoteType, 'id' | 'Notes'>;
