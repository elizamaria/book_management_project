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
    "/books",
    updateBook
  );

  return {
    triggerUpdate: trigger,
    book: data,
    isMutating,
    updateErr: error,
  };
}
