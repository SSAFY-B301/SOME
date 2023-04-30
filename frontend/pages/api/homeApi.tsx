import axios from "axios";
import { Query, QueryOptions, useQuery } from "react-query";

const URL = "http://localhost:8080";

export const useGetFavorite = () => {
  const queryKey = `${URL}/favorite`;

  const { data: getFavorite, isLoading: getFavoriteIsLoading } = useQuery(
    ["favorite"],
    () => axios.get(queryKey)
  );

  return { getFavorite, getFavoriteIsLoading };
};

export const useGetCurrent = () => {
  const queryKey = `${URL}/current`;

  const { data: getCurrent, isLoading: getCurrentIsLoading } = useQuery(
    ["favorite"],
    () => axios.get(queryKey)
  );

  return { getCurrent, getCurrentIsLoading };
};
