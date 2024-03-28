import { Button, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { addBlocknoteThunk } from '../../redux/slices/blocknotes/BlocknotesThunk';
import type { BlocknoteFormType } from '../../types/blocknotesType';
import { useAppDispatch } from '../../redux/hooks';

export default function BlocknoteForm() {
  const [blocknote, setBlocknote] = useState<BlocknoteFormType>({ title: '' });

  const dispatch = useAppDispatch();

  function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    dispatch(addBlocknoteThunk(blocknote));

    setBlocknote({ ...blocknote, title: '' });
  }

  function handlgeChange(event: ChangeEvent<HTMLInputElement>) {
    setBlocknote({ ...blocknote, title: event.target.value });
  }

  return (
    <form onSubmit={submitHandler}>
      <TextField sx={{width: '100%'}} value={blocknote.title} placeholder="Put the name" onChange={handlgeChange} />
      <Button type="submit">Create</Button>
    </form>
  );
}
