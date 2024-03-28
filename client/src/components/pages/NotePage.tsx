import { Grid, TextField } from "@mui/material";
import ReactQuill from 'react-quill'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { resetSearchedNotes } from "../../redux/slices/notes/notesSlice";
import { useParams } from "react-router-dom";
import { getNoteByIdThunk, updateNoteThunk } from "../../redux/slices/notes/notesThunk";
import { setTitle, setText } from "../../redux/slices/notes/notesSlice";


export default function NotePage() {
    const params = useParams<{id: string}>().id
    const dispatch = useAppDispatch()
    const noteSlice = useAppSelector((store) => store.notes)
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      
        [{ 'indent': '-1'}, { 'indent': '+1' }],          
        [{ 'direction': 'rtl' }],                         
      
        [{ 'size': ['small', false, 'large', 'huge'] }], 
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': ['red', 'black', 'yellow','green','blue'] }, { 'background': ['red', 'black', 'yellow','green','blue'] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': ['center', 'left', 'right'] }],
      
        ['clean']                                         
      ];

    function handlerChangeInput(title: string) {
        dispatch(setTitle(title))
    }

    function handlerChangeTextArea(text: string) {
        dispatch(setText(text))
    }

    function handlerBlur() {
        dispatch(updateNoteThunk(noteSlice.note))
    }

    useEffect(() => {
        dispatch(getNoteByIdThunk(+params!))
    },[])

    useEffect(() => {
        dispatch(resetSearchedNotes())
    }, [])
    return (
        <Grid item xl={10}>
            <TextField 
            value={noteSlice.note.title}
            onBlur={handlerBlur}
            onChange={(event) => handlerChangeInput(event.target.value)} 
            
            />
            <ReactQuill 
            modules={{toolbar:toolbarOptions}} 
            value={noteSlice.note.text}
            onBlur={handlerBlur}
            onChange={(text) =>handlerChangeTextArea(text)}
            />
        </Grid>
    )
}