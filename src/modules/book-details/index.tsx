import { Grid, Typography, Container, Stack, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useBookById } from "../../api/useBookById";
import { useDeleteBook } from "../../api/useDeleteBook";
import { ModeEditOutline } from "@mui/icons-material";
import { useModalContext } from "../modals/modal-context";
import { CreateModal } from "../common/book-modal";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { ErrorMessage } from "../common/error-message";

export const BookDetails = (props: {
  selectedBookId: number | null;
  setSelectedBook: (id: number | null) => void;
}) => {
  const { selectedBookId } = props;
  const theme = useTheme();
  const { handleModal } = useModalContext();

  const { book, isError, isLoading } = useBookById(selectedBookId);
  const { triggerDelete, isMutatingDelete } = useDeleteBook();

  const renderDetails = () => {
    if (!book) return <Typography>No book selected</Typography>;
    if (isError)
      return <ErrorMessage message={"Failed to fetch book details"} />;
    if (isLoading) return <h2>Fetching book details...</h2>;

    return (
      <Container>
        <Stack display={"flex"} flexDirection={"row"} gap={3}>
          <img src="book.png" width="300px" style={{ width: "150px" }} />
          <Stack spacing={2}>
            <Typography variant="h4">{book.title}</Typography>
            <Typography variant="h5">{book.author}</Typography>
            <div
              style={{
                backgroundColor: theme.palette.primary.light,
                padding: "4px 8px",
                borderRadius: "4px",
                alignSelf: "flex-start",
              }}
            >
              <Typography variant="subtitle2">{book.type}</Typography>
            </div>
          </Stack>
        </Stack>

        <Stack display="flex" gap={3} margin="32px 0px">
          <Typography variant="h6" fontStyle={"italic"}>
            {book.description}
          </Typography>
        </Stack>

        <Stack display="flex" flexDirection="row" alignItems={"center"} gap={3}>
          <IconButton
            aria-label="delete"
            tabIndex={0}
            color="primary"
            onClick={async () => {
              try {
                if (isMutatingDelete || !selectedBookId) {
                  return;
                }
                await triggerDelete({
                  id: selectedBookId,
                });
                props.setSelectedBook(null);
              } catch (e) {
                console.error(e);
              }
            }}
          >
            <DeleteOutlineIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            color="primary"
            tabIndex={0}
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
          >
            <ModeEditOutline />
          </IconButton>
        </Stack>
      </Container>
    );
  };

  return (
    <Grid
      xs={8}
      item
      display={"flex"}
      padding={theme.spacing(2)}
      gap={theme.spacing(3)}
      flexDirection={"column"}
      sx={{
        borderRadius: "32px",
        backgroundColor: "#F0EBE3",
        alignItems: "flex-start",
      }}
    >
      <Stack
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        gap={3}
      >
        {" "}
        <TextSnippetIcon fontSize="large" color={"primary"} />
        <Typography variant="h5" component={"h2"}>
          Book Details
        </Typography>
      </Stack>

      <Container
        style={{ borderBottom: `1px solid ${theme.palette.grey[800]}` }}
      ></Container>

      {renderDetails()}
    </Grid>
  );
};
