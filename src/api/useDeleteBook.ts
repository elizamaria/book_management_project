import useSWRMutation from "swr/mutation";
import { API_URL } from "../modules/constants";
import { axiosInstance } from "./utils";

async function deleteBook(url: string, id?: string) {
  return await axiosInstance.delete(`${url}/${id}`, {}).then((res) => res.data);
}

// TODO: Implement useDeleteBook
export function useDeleteBook(id: number | null) {
  const { trigger, error, isMutating } = useSWRMutation(
    [API_URL, id?.toString()], //+ "/" +,
    ([url, id]) => deleteBook(url, id)
  );

  return {
    triggerDelete: trigger,
    deleteErr: error,
    isMutatingDelete: isMutating,
  };
}
