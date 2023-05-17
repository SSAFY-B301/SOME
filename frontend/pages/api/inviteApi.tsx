import { useQuery } from "react-query";
import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import useCustomAxios from "@/features/customAxios";
import { useRouter } from "next/router";
import { setALbumIdState } from "@/features/albumStatusSlice";

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
      onSuccess: (data) => {},
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
  additional_invited_friend: number[];
}

export const albumMutation = () => {
  const { customBoyAxios } = useCustomAxios();
  const router = useRouter();
  const dispatch = useDispatch();
  // [POST] 앨범 생성
  const { mutate: createAlbum } = useMutation(
    (newAlbum: AlbumCreateType) => {
      return customBoyAxios.post("/album/create", newAlbum);
    },
    {
      onMutate: (variable) => {},
      onError: (error, variable, context) => {
        //error
      },
      onSuccess: (data, variables, context) => {
        dispatch(setALbumIdState(data.data.data.album_id));
        router.push(`/album/${data.data.data.album_id}`);
      },
      onSettled: () => {},
    }
  );

  // [POST] 친구 추가 초대
  const { mutate: additionalInviteFriends } = useMutation(
    (inviteInfo: InviteFriendType) => {
      return customBoyAxios.post("/album/friend/invite", inviteInfo);
    },
    {
      onMutate: (variable) => {},
      onError: (error, variable, context) => {},
      onSuccess: (data, variables, context) => {
        router.push(`/album/${variables.album_id}`);
      },
      onSettled: () => {},
    }
  );

  return {
    createAlbum,
    additionalInviteFriends,
  };
};
