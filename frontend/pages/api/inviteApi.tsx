import { useQuery } from "react-query";
import axios from "axios";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import useCustomAxios from "@/features/customAxios";
import { useRouter } from "next/router";

// 남사친 페이지
/**
 * [GET] 친구 목록
 * @returns
 */
export const useGetFriends = () => {
  const { customBoyAxios } = useCustomAxios();

  const { isLoading: getIsLoading, data: Friends } = useQuery(
    ["friends"],
    () => customBoyAxios.get("/album/list/friend"),
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

interface InviteFriendType {
  album_id: number;
  additional_invite_friend: number[];
}

export const albumMutation = () => {
  const { customBoyAxios } = useCustomAxios();
  const router = useRouter();

  // [POST] 앨범 생성
  const {
    mutate: createAlbum,
    isSuccess: createAlbumSuccess,
    data: AlbumId,
  } = useMutation(
    (newAlbum: AlbumCreateType) => {
      return customBoyAxios.post("/album/create", newAlbum);
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
        router.push(`/album/${data.data.data.album_id}`);
      },
      onSettled: () => {
        console.log("end");
      },
    }
  );

  // [POST] 친구 추가 초대
  const { mutate: additionalInviteFriends, isSuccess: inviteSuccess } =
    useMutation(
      (inviteInfo: InviteFriendType) => {
        return customBoyAxios.post("/album/friend/invite", inviteInfo);
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
          router.push(`/album/${variables.album_id}`);
        },
        onSettled: () => {
          console.log("end");
        },
      }
    );

  return {
    createAlbum,
    createAlbumSuccess,
    AlbumId,
    additionalInviteFriends,
    inviteSuccess,
  };
};
