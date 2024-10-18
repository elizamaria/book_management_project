import { Box, Button, Stack, Typography } from "@mui/material";
import { TextField } from "formik-mui";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useModalContext } from "../modals/modal-context";
import { useUpdateBookById } from "../../api/useUpdateBook";
import { useSWRConfig } from "swr";
import { BookType } from "../types";
import { ErrorMessage } from "./error-message";
import { useCreateBook } from "../../api/useCreateBook";

const BookSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  author: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(10, "Too Short!")
    .max(450, "Too Long!")
    .required("Required"),
  type: Yup.string().required("Required"), // TODO: better to have this as a select input
});

export const CreateModal = (props: { bookData?: BookType }) => {
  const { bookData } = props;
  const { handleModal } = useModalContext();
  const { triggerUpdate, updateErr } = useUpdateBookById();
  const { triggerCreate, createErr } = useCreateBook();
  const { mutate } = useSWRConfig();

  const isUpdatingBook = props.bookData?.id;

  return (
    <Box className="modal" display="flex" flexDirection="column">
      <Typography id="modal-modal-title" variant="h5" component="h2">
        {isUpdatingBook ? "Update book" : "Create a book"}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Please provide the necessary information for a book item
      </Typography>
      <Formik
        initialValues={{
          title: bookData?.title || "",
          author: bookData?.author || "",
          description: bookData?.description || "",
          type: bookData?.type || "",
        }}
        validationSchema={BookSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            if (isUpdatingBook && bookData?.id) {
              const book = await triggerUpdate({
                ...values,
                id: bookData.id,
              });

              // updates book details cache
              mutate(["/books", bookData.id.toString()], book);
            } else {
              await triggerCreate({
                ...values,
              });
            }

            handleModal(null);
          } catch (e) {
            console.error(e);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ submitForm, isSubmitting, touched, errors }) => (
          <Form style={{ marginTop: "24px" }}>
            <Stack display="flex" flexDirection="column" gap={"24px"}>
              <Field
                component={TextField}
                name="title"
                label="Title"
                error={errors.title && touched.title}
                helperText={errors.title && touched.title ? errors.title : ""}
              />
              <Field
                component={TextField}
                name="author"
                label="Author"
                error={errors.author && touched.author}
                helperText={
                  errors.author && touched.author ? errors.author : ""
                }
              />
              <Field
                component={TextField}
                multiline
                maxRows={4}
                name="description"
                label="Description"
                error={errors.description && touched.description}
                helperText={
                  errors.description && touched.description
                    ? errors.description
                    : ""
                }
              />
              <Field
                component={TextField}
                maxRows={4}
                name="type"
                label="Type"
                error={errors.type && touched.type}
                helperText={errors.type && touched.type ? errors.type : ""}
              />
              {createErr || updateErr ? (
                <ErrorMessage
                  message={"There was an error completing your request"}
                />
              ) : null}
            </Stack>

            <Stack
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              marginTop="32px"
            >
              <Button
                variant="outlined"
                color="primary"
                disabled={isSubmitting}
                onClick={() => handleModal(null)}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                disabled={isSubmitting}
                color="primary"
                onClick={submitForm}
              >
                Save
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
