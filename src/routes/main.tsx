import { Container, Grid, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { BookList } from "../modules/book-list";
import { BookDetails } from "../modules/book-details";

export default function Main() {
  const [selectedBook, setSelectedBook] = useState<number | null>(null);

  const [openDrawer, setOpenDrawer] = useState(false);
  const matchesSmallQuery = useMediaQuery("(max-width:600px)");

  return (
    <Container
      disableGutters
      sx={{
        height: "100vh",
        display: "flex",
        padding: "24px",
      }}
    >
      <Grid container columnGap={3} sx={{ margin: 0 }} flexWrap={"nowrap"}>
        <BookList
          setSelectedBook={setSelectedBook}
          drawerStatus={openDrawer}
          setOpenDrawer={setOpenDrawer}
          matchesSmallQuery={matchesSmallQuery}
        />
        <BookDetails
          selectedBookId={selectedBook}
          setSelectedBook={setSelectedBook}
          matchesSmallQuery={matchesSmallQuery}
          setOpenDrawer={setOpenDrawer}
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
