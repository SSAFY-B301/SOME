import useCustomAxios from "@/features/customAxios";
import {
  AlbumInviteRequestType,
  SnsRequestType,
  statusChangeRequestType,
} from "@/types/NotiType";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";

const { customNotiAxios } = useCustomAxios();

function getAlarms(page: number = 0, size: number = 10) {
  const {
    data: queryData,
    status,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["alarm"],
    ({ pageParam = { page, size } }) => {
      const res = customNotiAxios.get(
        `/noti/list?page=${pageParam.page}&size=${pageParam.size}`
      );
      return res.then((data) => data.data.data);
    },
    {
      getNextPageParam: (lastPage) => {
        return !lastPage.is_last ? lastPage.page + 1 : undefined;
        // return(lastPage.data.data.now_page)
      },
    }
  );
  // return { resultData, isLoading };
  return { status, queryData, fetchNextPage, hasNextPage };
}

function useMutationNoti() {
  const queryClient = useQueryClient();

  const { mutate: inviteMutation, isSuccess: inviteSuccess } = useMutation(
    (requestData: AlbumInviteRequestType) =>
      customNotiAxios.put("/noti/invite", requestData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["current"]);
        queryClient.invalidateQueries("alarm"); // queryKey 유효성 제거
      },
    }
  );

  /** SNS 공유 요청 수락/ 거절 API */
  const { mutate: snsMutation, isSuccess: snsSuccess } = useMutation(
    (requestData: SnsRequestType) =>
      customNotiAxios.put("/noti/sns", requestData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("alarm"); // queryKey 유효성 제거
      },
    }
  );

  /** status 변경 api */
  const { mutate: statusMutation } = useMutation(
    (requestData: statusChangeRequestType) =>
      customNotiAxios.put("/noti/status", requestData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("alarm"); // queryKey 유효성 제거
      },
    }
  );

  return { inviteMutation, snsMutation, inviteSuccess, statusMutation };
}

export { getAlarms, useMutationNoti };
