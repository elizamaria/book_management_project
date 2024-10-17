import {
  Grid,
  Typography,
  Container,
  Button,
  Stack,
  useTheme,
  List,
  ListItemButton,
} from "@mui/material";
import { BookType } from "../types";
import { CreateModal } from "../common/book-modal";
import { useModalContext } from "../modals/modal-context";
import { useBooks } from "../../api/useBooks";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { ErrorMessage } from "../common/error-message";
export const BookList = (props: {
  setSelectedBook: (bookId: number) => void;
}) => {
  const theme = useTheme();
  const { handleModal } = useModalContext();
  const { books, isError, isLoading } = useBooks();

  const renderList = () => {
    if (isError)
      return <ErrorMessage message={"Failed to fetch the list of books"} />;

    if (isLoading) return <Typography variant="caption">Loading...</Typography>;

    return (
      <List sx={{ gap: "8px", width: "100%" }}>
        {books?.map((book: BookType) => (
          <ListItemButton key={book.id}>
            <Typography
              sx={{ cursor: "pointer" }}
              role=""
              onClick={() => props.setSelectedBook(book.id)}
            >
              {book.title}
            </Typography>
          </ListItemButton>
        ))}
      </List>
    );
  };

  return (
    <Grid
      xs={4}
      item
      alignItems={"flex-start"}
      flexDirection={"column"}
      padding={theme.spacing(2)}
      gap={theme.spacing(3)}
      display={"flex"}
      sx={{
        borderRadius: "32px",
        backgroundColor: "#F0EBE3",
      }}
    >
      <Stack
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        gap={3}
      >
        <MenuBookIcon fontSize="large" color={"primary"} />
        <Typography variant="h5" component={"h2"}>
          Book list
        </Typography>
      </Stack>

      <Container
        style={{ borderBottom: `1px solid ${theme.palette.grey[800]}` }}
      ></Container>

      <Button
        variant="outlined"
        sx={{ ml: "16px" }}
        onClick={() => {
          handleModal(<CreateModal />);
        }}
      >
        Create
      </Button>
      {renderList()}
    </Grid>
  );
};
