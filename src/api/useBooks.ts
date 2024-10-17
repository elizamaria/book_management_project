import useSWR, { Fetcher } from "swr";
import { API_URL } from "../modules/constants";
import { BookType } from "../modules/types";
import { axiosInstance } from "./utils";

const fetcher: Fetcher<BookType[], string> = async (url: string) => {
  return await axiosInstance.get(url).then((res) => res.data);
};

export function useBooks() {
  const { data, error, isLoading } = useSWR(API_URL, fetcher);

  return {
    books: data,
    isLoading,
    isError: error,
  };
}
