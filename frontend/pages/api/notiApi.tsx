import useCustomAxios from "@/features/customAxios";
import { AlbumInviteRequestType, NotiType, SnsRequestType, statusChangeRequestType } from "@/types/NotiType";
import { useMutation, useQuery, useQueryClient } from "react-query";

const { customNotiAxios } = useCustomAxios();

function getAlarms() {

  const { data: queryData, isLoading } = useQuery(["alarm"], () =>
    customNotiAxios.get(
      "/noti/list?page=0&size=10"
    )
  );

  const resultData : NotiType[] = queryData?.data.data.notiList;
  return { resultData, isLoading };
}

function useMutationNoti() {
  const queryClient = useQueryClient();
  
  const { mutate: inviteMutation, isSuccess : inviteSuccess } = useMutation(
    (requestData : AlbumInviteRequestType) => customNotiAxios.put(
      "/noti/invite", requestData),
    {
      onSuccess : () => {
        queryClient.invalidateQueries("alarm"); // queryKey 유효성 제거
      }
    }
  );
  
  /** SNS 공유 요청 수락/ 거절 API */
  const { mutate: snsMutation, isSuccess : snsSuccess } = useMutation(
    (requestData : SnsRequestType) => customNotiAxios.put(
      "/noti/sns", requestData),
    {
      onSuccess : () => {
        queryClient.invalidateQueries("alarm"); // queryKey 유효성 제거
      }
    }
  );
  
  /** status 변경 api */
  const { mutate: statusMutation } = useMutation(
    (requestData : statusChangeRequestType) => customNotiAxios.put(
      "/noti/status", requestData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("alarm"); // queryKey 유효성 제거
      },
    }
  );

  return { inviteMutation, snsMutation, inviteSuccess, statusMutation };
}

export { getAlarms, useMutationNoti };
