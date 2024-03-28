import { Button, Card, CardActions, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useParams } from "react-router-dom";
import { createRef, useEffect, useState } from "react";
import { deleteNoteThunk, getNoteByIdThunk, getNotesByBlocknoteIdThunk } from "../../redux/slices/notes/notesThunk";
import CreateNoteButton from "../ui/CreateNoteButton";
import NoteFormEdit from "../ui/NoteFormEdit";
import NoteCard from "../ui/NoteCard";



export default function BlocknotePage() {
    const blocknoteId = useParams<{id: string}>().id

    const notesSlice = useAppSelector((store) => store.notes)
    const dispatch = useAppDispatch()



    useEffect(() =>{
        if(blocknoteId) {
            dispatch(getNotesByBlocknoteIdThunk(+blocknoteId))
        }
    },[])
    return (
        <Grid item xl={10}>
            <CreateNoteButton blocknoteId={+blocknoteId! || 0} />
            <ul>
                {notesSlice.notes.map(note => {
                    return <NoteCard key={note.id} note={note}/>
                    
                })}
            </ul>

            <NoteFormEdit/>
        </Grid>
    )
}