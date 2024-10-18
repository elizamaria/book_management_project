import useSWRMutation from "swr/mutation";
import { axiosInstance } from "./utils";
import { BookType } from "../modules/types";

async function createBook(
  url: string,
  {
    arg,
  }: {
    arg: { title: string; author: string; description: string; type: string };
  }
) {
  return await axiosInstance
    .post(url, {
      ...arg,
    })
    .then((res) => res.data);
}
export function useCreateBook() {
  const { trigger, error } = useSWRMutation("/books", createBook);

  return {
    triggerCreate: trigger,
    createErr: error,
  };
}
