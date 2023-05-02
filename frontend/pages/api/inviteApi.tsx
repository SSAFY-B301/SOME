import { useQuery } from "react-query";
import axios from "axios";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import useCustomAxios from "@/features/customAxios";

interface AlbumCreateType {
  album_name: string | string[] | undefined;
  invite_friend: string[];
}

// 남사친 페이지
/**
 * [GET] 친구 목록
 * @returns
 */
export const useGetFriends = () => {
  const queryKey = "/album/list/friend";

  const {customBoyAxios} = useCustomAxios();


  const { isLoading: getIsLoading, data: getFriends } = useQuery(
    ["friends"],
    () => customBoyAxios.get(queryKey),
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );
  return { getFriends, getIsLoading };

};

export const createAlbum = (requestData: AlbumCreateType) => {
  const queryKey = "/album/create";

  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    (newAlbum: AlbumCreateType) => {
      return axios.post(queryKey, newAlbum, {
        headers: {
          access_token: "hi",
        },
      });
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

  mutate(requestData);
};
