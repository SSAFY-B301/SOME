import axios, { AxiosResponse } from "axios";
import { customBoyAxios } from "@/features/customAxios";
import { useQuery } from "react-query";

// Redux 관련
import { RootState } from "@/store/configureStore";
import { useSelector } from "react-redux";

import {
  CurrentAlbumType,
  FavoriteAlbumType,
  TotalAlbumType,
  AlbumInfoType,
  PhotoType,
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
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const custom = axios.create({
    baseURL: process.env.NEXT_PUBLIC_FRIEND_BOY_URL,
    headers: {
      access_token: userInfo.access_token,
    },
  });

  const queryKey = `${URL}/whole`;
  // const queryKey = `album/list/whole`;

  const { data: getTotal, isLoading: getTotalIsLoading } = useQuery<
    AxiosResponse<TotalAlbumType[]>
  >(["total"], () => axios.get(queryKey));
  console.log(getTotal);
  return { getTotal, getTotalIsLoading };
};

// 앨범 상세 페이지
/**
 * [GET] 앨범 정보
 * @returns
 */
export const useGetDetail = () => {
  const queryKey = `${URL}/detail`;
  // console.log("Detail API 호출");
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { data: getDetail, isLoading: getDetailIsLoading } = useQuery<
    AxiosResponse<AlbumInfoType>
  >(["detail"], () => axios.get(queryKey));

  return { getDetail, getDetailIsLoading };
};

/**
 * [GET] 앨범 정보
 * @returns
 */
export const useGetPhotos = () => {
  const queryKey = `${URL}/photos`;

  const { data: getPhotos, isLoading: getPhotosIsLoading } = useQuery<
    AxiosResponse<PhotoType[]>
  >(["photos"], () => axios.get(queryKey));

  return { getPhotos, getPhotosIsLoading };
};
