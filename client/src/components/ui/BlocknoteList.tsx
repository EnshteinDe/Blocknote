import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import BlocknoteItem from "./BlocknoteItem";
import { getBlocknotesThunk } from "../../redux/slices/blocknotes/BlocknotesThunk";



export default function BlocknoteList() {
    const blocknotes = useAppSelector((store) => store.blocknotes)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getBlocknotesThunk())
    }, [])
    return (
        <Box>
            {blocknotes.map(blocknote => {
                return <BlocknoteItem key={blocknote.id} id={blocknote.id} title={blocknote.title} notes={blocknote.Notes}/>   
            })}
        </Box>
    )
}