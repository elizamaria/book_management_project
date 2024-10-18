import useSWRMutation from "swr/mutation";
import { axiosInstance } from "./utils";
import { API_URL } from "../modules/constants";

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
  const { trigger, error } = useSWRMutation(API_URL, createBook);

  return {
    triggerCreate: trigger,
    createErr: error,
  };
}
