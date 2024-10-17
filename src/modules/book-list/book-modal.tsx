import { Box, Button, Stack, Typography } from "@mui/material";
import { TextField } from "formik-mui";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import useSWRMutation from "swr/mutation";
import { API_URL } from "../constants";
import { useModalContext } from "../modals/modal-context";
import { axiosInstance } from "../../api/utils";
import { updateBook, useUpdateBookById } from "../../api/useUpdateBook";
import { BookType } from "../../routes/types";
import { useSWRConfig } from "swr";
import { useBooks } from "../../api/useBooks";

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
    .max(150, "Too Long!")
    .required("Required"),
});

async function createBook(
  url: string,
  { arg }: { arg: { title: string; author: string } }
) {
  return await axiosInstance
    .post(url, {
      title: arg.title,
      author: arg.author,
    })
    .then((res) => res.data);
}

export const CreateModal = (props: {
  bookData?: {
    id: number;
    title?: string;
    author?: string;
    description?: string;
  };
}) => {
  const { bookData } = props;
  const { handleModal } = useModalContext();
  const { trigger, data, error, isMutating } = useSWRMutation(
    API_URL,
    createBook
  );
  const { triggerUpdate } = useUpdateBookById();
  const { cache, mutate } = useSWRConfig();

  const isUpdatingBook = props.bookData?.id;
  return (
    <Box sx={{}} className="modal" display="flex" flexDirection="column">
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
          description: "",
          // year: 20
        }}
        validationSchema={BookSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            if (isUpdatingBook && bookData?.id) {
              const book = await triggerUpdate({
                ...values,
                id: bookData.id,
              });

              mutate([API_URL, bookData.id.toString()], book);
            } else {
              await trigger({
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
        {({ values, submitForm, resetForm, isSubmitting, touched, errors }) => (
          <Form>
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
