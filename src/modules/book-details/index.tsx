import { Grid, Typography, Container, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useBookById } from "../../api/useBookById";
import { useDeleteBook } from "../../api/useDeleteBook";
import { ModeEditOutline } from "@mui/icons-material";
import { useModalContext } from "../modals/modal-context";
import { CreateModal } from "../book-list/book-modal";
import { useSWRConfig } from "swr";

export const BookDetails = (props: {
  selectedBookId: number | null;
  setSelectedBook: (id: number | null) => void;
}) => {
  const { selectedBookId } = props;
  const theme = useTheme();
  const { handleModal } = useModalContext();

  const { book, isError, isLoading } = useBookById(selectedBookId);
  const { cache, mutate } = useSWRConfig();
  const { triggerDelete, isMutatingDelete } = useDeleteBook(selectedBookId);

  const renderDetails = () => {
    if (!book) return <div>Please select a book</div>;
    if (isError) return <div>Failed to fetch book</div>;
    if (isLoading) return <h2>Loading...</h2>;

    return (
      <Container>
        <Typography variant="subtitle2" style={{ color: "white" }}>
          {book.title}
        </Typography>
        <Typography variant="subtitle2" style={{ color: "white" }}>
          {book.author}
        </Typography>
        <Typography variant="subtitle2" style={{ color: "white" }}>
          {book.year}
        </Typography>
        <Typography variant="subtitle2" style={{ color: "white" }}>
          {book.type}
        </Typography>
        <Typography variant="subtitle2" style={{ color: "white" }}>
          {book.description}
        </Typography>

        <Stack display="flex" flexDirection="row" alignItems={"center"} gap={3}>
          <DeleteOutlineIcon
            fontSize="medium"
            aria-label="delete"
            role="button"
            sx={{ cursor: "pointer" }}
            onClick={async () => {
              try {
                if (!isMutatingDelete) {
                  return;
                }
                await triggerDelete();
                props.setSelectedBook(null);
              } catch (e) {
                console.error(e);
              }
            }}
          />
          <ModeEditOutline
            aria-label="edit"
            role="button"
            fontSize="medium"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              handleModal(
                <CreateModal
                  bookData={{
                    title: book.title,
                    author: book.author,
                    description: book.description,
                    id: book.id,
                  }}
                />
              );
            }}
          />
        </Stack>
      </Container>
    );
  };

  return (
    <Grid
      sm={8}
      item
      display={"flex"}
      padding={theme.spacing(2)}
      gap={theme.spacing(3)}
      flexDirection={"column"}
    >
      <Typography variant="subtitle1" color={"primary"}>
        Selected Book
      </Typography>
      <Container
        style={{ borderBottom: `1px solid ${theme.palette.grey[800]}` }}
      ></Container>

      {renderDetails()}
    </Grid>
  );
};
