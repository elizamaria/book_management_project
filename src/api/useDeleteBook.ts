import useSWRMutation from "swr/mutation";
import { axiosInstance } from "./utils";

async function deleteBook(url: string, { arg }: { arg: { id: number } }) {
  return await axiosInstance
    .delete(`${url}/${arg.id}`, {})
    .then((res) => res.data);
}

export function useDeleteBook() {
  const { trigger, error, isMutating } = useSWRMutation("/books", deleteBook);

  return {
    triggerDelete: trigger,
    deleteErr: error,
    isMutatingDelete: isMutating,
  };
}
