import { useState } from "react";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { searchNotesThunk } from "../../redux/slices/notes/notesThunk";
import { resetSearchedNotes, setSearchingText } from "../../redux/slices/notes/notesSlice";



export default function SearchNoteForm() {
    const noteSlice = useAppSelector((store) => store.notes)
    const dispatch = useAppDispatch()
    const [text, setText] = useState('')

    function handlerChange(text: string) {
        dispatch(searchNotesThunk(text))
    }

    function handlerClick() {
        dispatch(resetSearchedNotes())
    }
    
    return (
        <div>
            <form style={{position: 'relative'}}>
                <TextField 
                value={noteSlice.searchText}
                onChange={(event) => {
                    handlerChange(event.target.value)
                    dispatch(setSearchingText(event.target.value))
                }}
                placeholder="Search note"
                />

                {noteSlice.searchedNotes.length > 0 &&
                <div style={
                    {position: 'absolute', 
                    top: '100%', 
                    border: '1px solid black',
                    boxShadow: '1px 1px 10px black',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    zIndex: 10,
                    background: 'white',
                    width: '210px',
                    boxSizing: 'border-box'
                }
                }>
                    {noteSlice.searchedNotes.map(note => {
                        return <Link 
                        onClick={handlerClick}
                        to={`/notes/${note.id}`} 
                        key={note.id}
                        >
                            {note.title}
                        </Link>
                    })}
                </div>
                }
            </form>
        </div>
    )
}