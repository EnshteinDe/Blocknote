import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import type { NoteType } from "../../types/notesType"
import NoteItem from "./NoteItem"
import { useAppDispatch } from "../../redux/hooks"
import { deleteBlocknoteThunk } from "../../redux/slices/blocknotes/BlocknotesThunk"


type BlocknoteItemProps = {
    title: string
    id: number
    notes: NoteType[]
}

export default function BlocknoteItem({title, id, notes}: BlocknoteItemProps) {

    const dispatch = useAppDispatch()
    
    function handlerClick() {
        dispatch(deleteBlocknoteThunk({id}))
    }
    return (
        <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography><Link to={'/blocknotes/' + id}>{title}</Link></Typography>
          <button onClick={handlerClick}>X</button>
        </AccordionSummary>
        <AccordionDetails>
            {notes?.map(note => {
                return <div key={note.id}><NoteItem note={note}/></div>
            })}
        </AccordionDetails>
      </Accordion>
    )
}