import useSWR, { Fetcher } from "swr";
import { BookType } from "../modules/types";
import { axiosInstance } from "./utils";

export const fetcherById: Fetcher<BookType, [string, string]> = async ([
  url,
  id,
]) => {
  return await axiosInstance.put(`${url}/${id}`, {}).then((res) => res.data);
};

export function useBookById(id: number | null) {
  const { data, error, isLoading } = useSWR(
    id ? ["/books", id.toString()] : null,
    fetcherById
  );

  return {
    book: data,
    isLoading,
    isError: error,
  };
}
