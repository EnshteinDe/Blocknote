import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { getNotesThunk } from "../../redux/slices/notes/notesThunk";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function NotesPage() {
    const notesSlice = useAppSelector((store) => store.notes)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getNotesThunk())
    },[])
    return (
        <Grid item xl={10}>
            <ul>
                {notesSlice.notes.map(note => {
                    return <p key={note.id}>{note.title}</p>
                })}
            </ul>
        </Grid>
    )
}