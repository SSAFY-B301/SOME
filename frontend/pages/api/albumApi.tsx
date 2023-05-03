import axios, { AxiosError, AxiosResponse } from "axios";

import { UseMutationResult, useMutation, useQuery } from "react-query";

import {
  CurrentAlbumType,
  FavoriteAlbumType,
  TotalAlbumType,
  AlbumInfoType,
  PhotoType,
} from "@/types/AlbumTypes";
import useCustomAxios from "@/features/customAxios";

const URL = "http://localhost:8080";

const { customBoyAxios } = useCustomAxios();

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
  // const queryKey = `${URL}/whole`;
  const queryKey = `album/list/whole`;

  const { data: getTotal, isLoading: getTotalIsLoading } = useQuery<
    AxiosResponse<TotalAlbumType[]>
  >(["total"], () => customBoyAxios.get(queryKey));
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
  const { data: getDetail, isLoading: getDetailIsLoading } = useQuery<
    AxiosResponse<AlbumInfoType>
  >(["detail"], () => axios.get(queryKey));

  return { getDetail, getDetailIsLoading };
};

/**
 * [PUT] 앨범 상세 정보
 * @returns
 */
export function usePutDetail(): UseMutationResult<
  AlbumInfoType,
  AxiosError,
  AlbumInfoType
> {
  return useMutation((value) => axios.put(`${URL}/detail`, value), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

/**
 * [GET] 사진 정보
 * @returns
 */
export const useGetPhotos = () => {
  const queryKey = `${URL}/photos`;
  // const queryKey = `/photo/album/list`;

  const { data: getPhotos, isLoading: getPhotosIsLoading } = useQuery<
    AxiosResponse<PhotoType[]>
  >(["photos"], () => axios.get(queryKey));

  return { getPhotos, getPhotosIsLoading };
};

/**
 * [PUT] 앨범 즐겨찾기
 * @returns
 */
export function usePutFav(): UseMutationResult<boolean, AxiosError, boolean> {
  return useMutation((albumId) => axios.put(`/album/fav?photoId=${albumId}`), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

/**
 * [POST] 사진 업로드
 * @returns
 */
// export function usePostPhoto(): UseMutationResult<boolean, AxiosError, boolean> {
//   return useMutation((params) => axios.put(`/album/fav?photoId=${params.multipartFile}`), {
//     onSuccess: (data) => {
//       console.log(data);
//     },
//     onError: (error) => {
//       console.error(error);
//     },
//   });
// }
