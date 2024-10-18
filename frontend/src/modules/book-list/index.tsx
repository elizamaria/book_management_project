import {
  Grid,
  Typography,
  Button,
  Stack,
  useTheme,
  List,
  ListItemButton,
  Box,
  SwipeableDrawer,
} from "@mui/material";
import { BookType } from "../types";
import { CreateModal } from "../common/book-modal";
import { useModalContext } from "../modals/modal-context";
import { useBooks } from "../../api/useBooks";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { ErrorMessage } from "../common/error-message";
import { preload } from "swr";
import { fetcherById } from "../../api/useBookById";

export const BookList = (props: {
  drawerStatus: boolean;
  matchesSmallQuery: boolean;
  setOpenDrawer: (status: boolean) => void;
  setSelectedBook: (bookId: number) => void;
}) => {
  const theme = useTheme();
  const { handleModal } = useModalContext();
  const { books, isError, isLoading } = useBooks();

  const handlePrefetching = (id: number) => {
    preload(["/books", id.toString()], fetcherById);
  };

  const renderList = () => {
    if (isError)
      return <ErrorMessage message={"Failed to fetch the list of books"} />;

    if (isLoading) return <Typography variant="caption">Loading...</Typography>;

    const onClickItem = (book: BookType) => {
      console.log("set book", book.id);
      props.setSelectedBook(book.id);
      props.setOpenDrawer(false);
    };

    if (!books?.length) return <Typography>No books found</Typography>;

    return (
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          width: "100%",
        }}
      >
        {books?.map((book: BookType) => (
          <ListItemButton
            key={book.id}
            onClick={() => onClickItem(book)}
            onMouseEnter={() => handlePrefetching(book.id)}
          >
            <Typography sx={{ cursor: "pointer" }} role="">
              {book.title}
            </Typography>
          </ListItemButton>
        ))}
      </List>
    );
  };

  if (props.matchesSmallQuery) {
    return (
      <SwipeableDrawer
        anchor="bottom"
        open={props.drawerStatus}
        onClose={() => props.setOpenDrawer(false)}
        onOpen={() => props.setOpenDrawer(true)}
        swipeAreaWidth={56}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box padding={3}>{renderList()}</Box>
      </SwipeableDrawer>
    );
  }

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

      <Box
        style={{
          borderBottom: `1px solid ${theme.palette.grey[800]}`,
          width: "100%",
        }}
      ></Box>

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
