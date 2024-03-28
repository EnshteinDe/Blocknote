import { Button } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { addNoteThunk } from "../../redux/slices/notes/notesThunk";


type CreateNoteProps = {
    blocknoteId: number
}

export default function CreateNoteButton({blocknoteId}: CreateNoteProps) {
    const dispatch = useAppDispatch()

    function handlerClick() {
        dispatch(addNoteThunk(blocknoteId))
    }
    return (
        <Button onClick={handlerClick}>Create note</Button>
    )
}