import {
  Grid,
  Typography,
  Container,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import { BookType } from "../../routes/types";
import { CreateModal } from "./book-modal";
import { useModalContext } from "../modals/modal-context";
import { useBooks } from "../../api/useBooks";

export const BookList = (props: {
  setSelectedBook: (bookId: number) => void;
}) => {
  const theme = useTheme();
  const { handleModal } = useModalContext();
  const { books, isError, isLoading } = useBooks();

  const renderList = () => {
    if (isError) return <div>Failed to fetch books</div>;
    if (isLoading) return <h2>Loading...</h2>;

    return (
      <Stack spacing={2}>
        {books?.map((book: BookType) => (
          <Typography
            key={book.id}
            variant="subtitle2"
            onClick={() => props.setSelectedBook(book.id)}
          >
            {book.title}
          </Typography>
        ))}
      </Stack>
    );
  };

  return (
    <Grid
      sm={4}
      item
      alignItems={"flex-start"}
      flexDirection={"column"}
      padding={theme.spacing(2)}
      gap={theme.spacing(3)}
      display={"flex"}
      sx={{ borderRight: `1px solid ${theme.palette.grey[800]}` }}
    >
      <Typography variant="subtitle1" color={"primary"}>
        Book list
      </Typography>
      <Container
        style={{ borderBottom: `1px solid ${theme.palette.grey[800]}` }}
      ></Container>
      <Button
        variant="outlined"
        onClick={() => {
          handleModal(<CreateModal />);
        }}
      >
        Create new book{" "}
      </Button>
      {renderList()}
    </Grid>
  );
};
