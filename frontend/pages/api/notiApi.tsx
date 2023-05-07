import useCustomAxios from "@/features/customAxios";
import { AlbumInviteRequestType, NotiType, SnsRequestType } from "@/types/NotiType";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";

const { customNotiAxios } = useCustomAxios();

function getAlarms() {

  const { data: queryData, isLoading } = useQuery(["alarm"], () =>
    customNotiAxios.get(
      process.env.NEXT_PUBLIC_FRIEND_NOTI_URL + "/noti/list?page=0&size=6"
    )
  );

  const resultData : NotiType[] = queryData?.data.data.notiList;
  return { resultData, isLoading };
}

function useMutationNoti() {
  const queryClient = useQueryClient();
  const router = useRouter();
  
  const { mutate: inviteMutation, isSuccess : inviteSuccess } = useMutation(
    (requestData : AlbumInviteRequestType) => customNotiAxios.put(
      process.env.NEXT_PUBLIC_FRIEND_NOTI_URL + "/noti/invite", requestData),
    {
      onSuccess : () => {
        queryClient.invalidateQueries("alarm"); // queryKey 유효성 제거
      }
    }
  );
  
  /** SNS 공유 요청 수락/ 거절 API */
  const { mutate: snsMutation, isSuccess : snsSuccess } = useMutation(
    (requestData : SnsRequestType) => customNotiAxios.put(
      process.env.NEXT_PUBLIC_FRIEND_NOTI_URL + "/noti/sns", requestData),
    {
      onSuccess : () => {
        console.log("SNS 공유 요청 응답 성공");
        queryClient.invalidateQueries("alarm"); // queryKey 유효성 제거
      }
    }
  );
  
  const { mutate: statusMutation } = useMutation(
    (requestData) => customNotiAxios.put("/noti/status", requestData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("alarm"); // queryKey 유효성 제거
      },
    }
  );

  return { inviteMutation, snsMutation, inviteSuccess, statusMutation };
}

export { getAlarms, useMutationNoti };
