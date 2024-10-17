import useSWR, { Fetcher } from "swr";
import { API_URL } from "../modules/constants";
import { BookType } from "../routes/types";
import { axiosInstance } from "./utils";

// const fetcherById: Fetcher<BookType, string> = async (url: string) =>
//   await axiosInstance.put(url, {}).then((res) => res.data);

// export function useBookById(id: number | null) {
//   const { data, error, isLoading } = useSWR(
//     id ? API_URL + "/" + id?.toString() : null,
//     fetcherById
//   );

//   return {
//     book: data,
//     isLoading,
//     isError: error,
//   };
// }

const fetcherById: Fetcher<BookType, [string, string]> = async ([url, id]) => {
  console.log("fetcherById url", url, id);
  return await axiosInstance.put(`${url}/${id}`, {}).then((res) => res.data);
};

export function useBookById(id: number | null) {
  const { data, error, isLoading } = useSWR(
    id ? [API_URL, id.toString()] : null,
    fetcherById
  );

  return {
    book: data,
    isLoading,
    isError: error,
  };
}
