import { Container, Grid } from "@mui/material";
import { useState } from "react";
import { BookList } from "../modules/book-list";
import { BookDetails } from "../modules/book-details";

export default function Main() {
  const [selectedBook, setSelectedBook] = useState<number | null>(null);

  return (
    <Container
      disableGutters
      sx={{
        height: "100vh",
        display: "flex",
        color: "white",
      }}
    >
      <Grid container spacing={2} sx={{ margin: 0 }}>
        <BookList setSelectedBook={setSelectedBook} />
        <BookDetails
          selectedBookId={selectedBook}
          setSelectedBook={setSelectedBook}
        />
      </Grid>

      {/* <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        onClose={() => setOpen(false)}
        message="Book was successfully created"
      /> */}
    </Container>
  );
}
