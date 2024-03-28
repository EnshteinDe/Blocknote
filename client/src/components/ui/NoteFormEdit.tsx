import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setText, setTitle } from '../../redux/slices/notes/notesSlice';
import { updateNoteThunk } from '../../redux/slices/notes/notesThunk';

export default function NoteFormEdit() {
  const noteSlice = useAppSelector((store) => store.notes);

  const dispatch = useAppDispatch();

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],

    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [
      { color: ['red', 'black', 'yellow', 'green', 'blue'] },
      { background: ['red', 'black', 'yellow', 'green', 'blue'] },
    ], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: ['center', 'left', 'right'] }],

    ['clean'],
  ];

  function handlerChangeInput(title: string) {
    dispatch(setTitle(title));
  }

  function handlerChangeTextArea(text: string) {
    dispatch(setText(text));
  }

  function handlerBlur() {
    dispatch(updateNoteThunk(noteSlice.note));
  }
  return (
    <div>
      <TextField
        value={noteSlice.note.title}
        onBlur={handlerBlur}
        onChange={(event) => handlerChangeInput(event.target.value)}
        placeholder="Enter title"
      />

      <ReactQuill
        value={noteSlice.note.text}
        modules={{ toolbar: toolbarOptions }}
        onBlur={handlerBlur}
        onChange={(text) => handlerChangeTextArea(text)}
      />
    </div>
  );
}
