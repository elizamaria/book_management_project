import useSWR, { Fetcher } from "swr";
import { API_URL } from "../modules/constants";
import { BookType } from "../routes/types";
import { axiosInstance } from "./utils";
import useSWRMutation from "swr/mutation";

export async function updateBook(
  url: string,
  {
    arg,
  }: { arg: { id: number; title: string; author: string; description: string } }
) {
  return await axiosInstance
    .put(`${url}/${arg.id.toString()}`, {
      ...arg,
    })
    .then((res) => res.data);
}

export function useUpdateBookById() {
  const { trigger, data, error, isMutating } = useSWRMutation(
    API_URL,
    updateBook
  );

  return {
    triggerUpdate: trigger,
    book: data,
    isMutating,
    isError: error,
  };
}
