import useSWR, { Fetcher } from "swr";
import { BookType } from "../modules/types";
import { axiosInstance } from "./utils";

const fetcher: Fetcher<BookType[], string> = async (url: string) => {
  return await axiosInstance.get(url).then((res) => res.data);
};

export function useBooks() {
  const { data, error, isLoading } = useSWR<BookType[]>("/books", fetcher);

  return {
    books: data,
    isLoading,
    isError: error,
  };
}
