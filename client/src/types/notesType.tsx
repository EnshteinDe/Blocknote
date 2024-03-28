export type NoteType = {
  id: number;
  title: string
  text: string;
  blocknoteId: number;
};

export type NoteFormType = Omit<NoteType, 'id'>;
