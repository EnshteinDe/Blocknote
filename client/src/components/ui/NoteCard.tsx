import { Card, CardContent, Typography, Button } from "@mui/material"
import { useAppDispatch } from "../../redux/hooks"
import { deleteNoteThunk, getNoteByIdThunk } from "../../redux/slices/notes/notesThunk"
import { createRef, useEffect } from "react";
import { NoteType } from "../../types/notesType";

type NoteCardProps = {
    note: NoteType
}

export default function NoteCard({note}: NoteCardProps) {
    const dispatch = useAppDispatch()

    const noteText = createRef<HTMLDivElement>()

    function getNote(id:number) {
        dispatch(getNoteByIdThunk(id))
    }

    function deleteNote(id: number) {
        dispatch(deleteNoteThunk({id}))
    }

    useEffect(() => {
        if(noteText.current) {
            noteText.current.innerHTML = note.text
        }
    }, [note])
    return (
        <Card onClick={() => getNote(note.id)} key={note.id}>
            <CardContent>
                <Typography>{note.title}</Typography>
                <div ref={noteText}>{note.text}</div>
            </CardContent>
            <Button onClick={() => deleteNote(note.id)}>X</Button>
        </Card>
    )
}