import useSWRMutation from "swr/mutation";
import { API_URL } from "../modules/constants";
import { axiosInstance } from "./utils";

async function deleteBook(url: string, { arg }: { arg: { id: number } }) {
  return await axiosInstance
    .delete(`${url}/${arg.id}`, {})
    .then((res) => res.data);
}

// TODO: Implement useDeleteBook
export function useDeleteBook() {
  // const { trigger, error, isMutating } = useSWRMutation(
  //   [API_URL, id?.toString()], //+ "/" +,
  //   ([url, id]) => deleteBook(url, id)
  // );

  const { trigger, error, isMutating } = useSWRMutation(API_URL, deleteBook);

  return {
    triggerDelete: trigger,
    deleteErr: error,
    isMutatingDelete: isMutating,
  };
}
