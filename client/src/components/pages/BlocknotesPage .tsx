import {Grid} from "@mui/material";
import BlocknoteForm from "../ui/BlocknoteForm";
import BlocknoteList from "../ui/BlocknoteList";


export default function BlocknotesPage() {


  return (
    <Grid item xl={10}>
      <BlocknoteForm/>

      <BlocknoteList/>
    </Grid>
  )
}