import { useQuery } from "react-query";
import axios from "axios";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import useCustomAxios from "@/features/customAxios";

// 남사친 페이지
/**
 * [GET] 친구 목록
 * @returns
 */
export const useGetFriends = () => {
  const queryKey = "/album/list/friend";

  const { customBoyAxios } = useCustomAxios();

  const { isLoading: getIsLoading, data: Friends } = useQuery(
    ["friends"],
    () => customBoyAxios.get(queryKey),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      refetchOnWindowFocus: false,
    }
  );

  return { Friends, getIsLoading };
};

interface AlbumCreateType {
  album_name: string | string[] | undefined;
  invite_friend: number[];
}

export const createAlbum = () => {
  const queryKey = "/album/create";

  const { customBoyAxios } = useCustomAxios();

  return useMutation(
    (newAlbum: AlbumCreateType) => {
      return customBoyAxios.post(queryKey, newAlbum);
    },
    {
      onMutate: (variable) => {
        console.log("onMutate ", variable);
      },
      onError: (error, variable, context) => {
        //error
      },
      onSuccess: (data, variables, context) => {
        console.log("success", data, variables, context);
      },
      onSettled: () => {
        console.log("end");
      },
    }
  );
};
