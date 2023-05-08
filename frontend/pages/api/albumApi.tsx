import { AxiosError } from "axios";

import {
  UseMutationResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

import {
  CurrentAlbumType,
  FavoriteAlbumType,
  TotalAlbumType,
  AlbumInfoType,
  PhotoType,
  requestPhotosType,
  requestPartType,
  usePutAlbumNameType,
} from "@/types/AlbumTypes";
import useCustomAxios from "@/features/customAxios";

const { customBoyAxios } = useCustomAxios();

// 남사친 페이지
/**
 * [GET] 최근 앨범
 * @returns
 */
export const useGetCurrent = () => {
  const getCurrent: CurrentAlbumType[] = [];
  const getCurrentIsLoading = true;
  return { getCurrent, getCurrentIsLoading };
};

/**
 * [GET] 즐겨찾는 앨범
 * @returns
 */
export const useGetFavorite = () => {
  const queryKey = `album/list/fav`;

  const { data, isLoading: getFavoriteIsLoading } = useQuery(
    ["favorite"],
    () => customBoyAxios.get(queryKey),
    {
      cacheTime: 5000,
      refetchInterval: 5000,
    }
  );
  let getFavorite: FavoriteAlbumType[] | undefined;
  if (data) {
    getFavorite = data.data.data.myFavAlbumList;
  }
  return { getFavorite, getFavoriteIsLoading };
};

/**
 * [GET] 전체 앨범
 * @returns
 */
export const useGetTotal = () => {
  const queryKey = `album/list/whole`;

  const { data, isLoading: getTotalIsLoading } = useQuery(
    ["total"],
    () => customBoyAxios.get(queryKey),
    {
      cacheTime: 5000,
      refetchInterval: 5000,
    }
  );
  let getTotal: TotalAlbumType[] | undefined;
  if (data) {
    getTotal = data.data.data.albumWholeList;
  }

  return { getTotal, getTotalIsLoading };
};

// 앨범 상세 페이지
/**
 * [GET] 앨범 상세 정보
 * @returns
 */
export const useGetDetail = (albumId: number) => {
  const queryKey = `album/detail/${albumId}`;

  const { data, isLoading: getDetailIsLoading } = useQuery(
    ["detail", albumId],
    () => customBoyAxios.get(queryKey)
  );

  let getDetail: AlbumInfoType | undefined;
  if (data) {
    getDetail = data.data.data.albumDetail;
  }

  return { getDetail, getDetailIsLoading };
};

/**
 * [GET] 사진 정보
 * @returns
 */
export const useGetPhotos = (
  Requests: requestPhotosType,
  page?: number,
  size?: number
) => {
  const queryKey = `/photo/album/list?albumId=${Requests.albumId}&userId=${
    Requests.userId
  }&${Requests.categoryId !== 0 && `categoryId=${Requests.categoryId}`}`;

  const {
    data,
    isLoading: getPhotosIsLoading,
    refetch,
  } = useQuery(
    ["photos", Requests.albumId],
    () => customBoyAxios.get(queryKey),
    {
      cacheTime: 5000,
      refetchInterval: 5000,
      onSuccess: (data) => {},
    }
  );

  let getPhotos: PhotoType[] | undefined;
  let getTotal: number | undefined;
  let getTotalId: number[] | undefined;
  if (data) {
    getPhotos = data.data.data.albumPhotoList.content;
    getTotal = data.data.data.totalPhotoCnt;
    getTotalId = data.data.data.totalPhotoId;
  }

  return { getPhotos, getTotal, getTotalId, getPhotosIsLoading, refetch };
};

export const useInfinitePhotos = (
  Requests: requestPhotosType,
  page: number = 0,
  size: number = 27
) => {
  const queryKey = `/photo/album/list?albumId=${Requests.albumId}&userId=${
    Requests.userId
  }&${
    Requests.categoryId !== 0 && `categoryId=${Requests.categoryId}`
  }&size=${size}`;

  const { data, fetchNextPage, hasNextPage, isLoading, isError, refetch } =
    useInfiniteQuery(
      ["photos", Requests.albumId, Requests.categoryId, Requests.userId],
      ({ pageParam = page }) => {
        const temp = customBoyAxios.get(queryKey + `&page=${pageParam}`);
        return temp.then((data) => data.data.data);
      },
      {
        // cacheTime: 5000,
        // refetchInterval: 5000,
        onSuccess: (data) => {},
        getNextPageParam: (lastPage, allPosts) => {
          return lastPage.number !== allPosts[0].totalPages
            ? lastPage.number + 1
            : undefined;
        },
      }
    );

  return { data, fetchNextPage, hasNextPage, isLoading, isError };
};

export function Mutations() {
  const queryClient = useQueryClient();
  /**
   * [PUT] 앨범 즐겨찾기
   * @returns
   */
  function usePutFav(
    page: string,
    albumId?: number
  ): UseMutationResult<boolean, AxiosError, number> {
    return useMutation(
      (albumId) => customBoyAxios.put(`/album/fav/${albumId}`),
      {
        onSuccess: () => {
          switch (page) {
            case "favorite":
              queryClient.invalidateQueries(["favorite"]);
            case "album":
              queryClient.invalidateQueries(["detail", albumId]);
            case "total":
              queryClient.invalidateQueries(["total"]);
          }
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  }

  function useDeletePhotos(
    albumId: number
  ): UseMutationResult<boolean, AxiosError, number[]> {
    return useMutation(
      (photos) => customBoyAxios.put(`/photo/delete`, { photoId: photos }),
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["photos", albumId]);
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  }

  function usePutAlbumName(
    albumId: number
  ): UseMutationResult<boolean, AxiosError, usePutAlbumNameType> {
    return useMutation(
      (body) => customBoyAxios.put(`/album/modify/name`, body),
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["detail", albumId]);
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  }

  function usePostPhoto(
    albumId: number,
    setUploadCount: React.Dispatch<React.SetStateAction<number>>
  ): UseMutationResult<boolean, AxiosError, requestPartType> {
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    return useMutation(
      (requestData) =>
        customBoyAxios.post(
          `/photo/upload/${requestData.albumId}`,
          requestData.formData,
          { headers }
        ),
      {
        onSuccess: (data) => {
          setUploadCount((prev) => prev + 1);
          // queryClient.invalidateQueries(["photos", albumId]);
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  }
  return {
    usePutFav,
    usePostPhoto,
    useDeletePhotos,
    usePutAlbumName,
  };
}
