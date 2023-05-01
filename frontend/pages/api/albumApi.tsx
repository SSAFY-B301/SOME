import axios, { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";

import {
  CurrentAlbumType,
  FavoriteAlbumType,
  TotalAlbumType,
  AlbumInfoType,
} from "@/types/AlbumTypes";

const URL = "http://localhost:8080";

// 남사친 페이지
/**
 * [GET] 최근 앨범
 * @returns
 */
export const useGetCurrent = () => {
  const queryKey = `${URL}/current`;

  const { data: getCurrent, isLoading: getCurrentIsLoading } = useQuery<
    AxiosResponse<CurrentAlbumType[]>
  >(["current"], () => axios.get(queryKey));

  return { getCurrent, getCurrentIsLoading };
};

/**
 * [GET] 즐겨찾는 앨범
 * @returns
 */
export const useGetFavorite = () => {
  const queryKey = `${URL}/favorite`;

  const { data: getFavorite, isLoading: getFavoriteIsLoading } = useQuery(
    ["favorite"],
    () => axios.get(queryKey)
  );

  return { getFavorite, getFavoriteIsLoading };
};

/**
 * [GET] 전체 앨범
 * @returns
 */
export const useGetTotal = () => {
  const queryKey = `${URL}/whole`;

  const { data: getTotal, isLoading: getTotalIsLoading } = useQuery<
    AxiosResponse<TotalAlbumType[]>
  >(["total"], () => axios.get(queryKey));

  return { getTotal, getTotalIsLoading };
};

// 앨범 상세 페이지
/**
 * [GET] 앨범 정보
 * @returns
 */
export const useGetDetail = () => {
  const queryKey = `${URL}/detail`;

  const { data: getDetail, isLoading: getDetailIsLoading } = useQuery<
    AxiosResponse<AlbumInfoType>
  >(["detail"], () => axios.get(queryKey));

  return { getDetail, getDetailIsLoading };
};
