import axios, { AxiosError } from "axios";

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
  requestPhotosType,
  requestPartType,
  usePutAlbumNameType,
  PhotoPageType,
  ThumbnailBodyType,
  SnsRequestType,
} from "@/types/AlbumTypes";
import useCustomAxios from "@/features/customAxios";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/types/StateType";
import { countUpload } from "@/features/photoUploadSlice";

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
 */
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

  let getTotal: number | undefined;
  let getTotalId: number[] | undefined;
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
        onSuccess: (data) => {
          getTotal = data.pages[0].totalPhotoCnt;
          getTotalId = data.pages[0].totalPhotoId;
        },
        getNextPageParam: (
          lastPage: PhotoPageType,
          allPosts: PhotoPageType[]
        ) => {
          return lastPage.now_page !== allPosts[0].total_page
            ? lastPage.now_page + 1
            : undefined;
        },
      }
    );

  return {
    data,
    getTotal,
    getTotalId,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    refetch,
  };
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
  /**
   * [DELETE] 사진 삭제
   * @returns
   */
  function useDeletePhotos(): UseMutationResult<boolean, AxiosError, number[]> {
    const albumId = useSelector(
      (state: StateType) => state.albumStatus.albumId
    );
    const categoryId = useSelector(
      (state: StateType) => state.albumStatus.categoryId
    );
    const userId = useSelector((state: StateType) => state.albumStatus.userId);
    return useMutation(
      (photos) => customBoyAxios.put(`/photo/delete`, { photoId: photos }),
      {
        onSuccess: () => {
          queryClient.invalidateQueries([
            "photos",
            albumId,
            categoryId,
            Array.from(userId).toString(),
          ]);
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  }

  /**
   * [PUT] 앨범 이름 변경
   * @param albumId
   * @returns
   */
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

  /**
   * [POST] 사진 업로드
   * @param setUploadCount
   * @returns
   */
  function usePostPhoto(): UseMutationResult<
    boolean,
    AxiosError,
    requestPartType
  > {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    let dispatch = useDispatch();
    const getPhotosKey = useSelector((state: StateType) => state.albumStatus);
    return useMutation(
      (requestData) =>
        customBoyAxios.post(
          `/photo/upload/${requestData.albumId}`,
          requestData.formData,
          { headers }
        ),
      {
        onSuccess: () => {
          dispatch(countUpload());
          queryClient.invalidateQueries([
            "photos",
            getPhotosKey.albumId,
            getPhotosKey.categoryId,
            Array.from(getPhotosKey.userId).toString(),
          ]);
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  }

  function usePutThumbnail(): UseMutationResult<
    boolean,
    AxiosError,
    ThumbnailBodyType
  > {
    return useMutation((body) =>
      customBoyAxios.put(`album/modify/thumbnail`, body)
    );
  }

  function usePostSns(): UseMutationResult<
    boolean,
    AxiosError,
    SnsRequestType
  > {
    return useMutation((body) => customBoyAxios.post(`noti/sns`, body));
  }

  return {
    usePutFav,
    usePostPhoto,
    useDeletePhotos,
    usePutAlbumName,
    usePutThumbnail,
    usePostSns,
  };
}

export function useDownload(imageUrl: string) {
  axios({
    url: imageUrl,
    method: "GET",
    responseType: "blob",
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "image.jpg");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
