import {Link} from "react-router-dom"
import { NoteType } from "../../types/notesType"

type NoteItemType = {
    note: NoteType
}

export default function NoteItem({note}: NoteItemType) {
    return (
        <Link to={'/notes/' + note.id}>{note.title}</Link>
    )
}