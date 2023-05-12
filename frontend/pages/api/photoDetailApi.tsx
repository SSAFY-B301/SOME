import useCustomAxios from "@/features/customAxios";
import { PhotoType } from "@/types/AlbumTypes";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";

const { customBoyAxios } = useCustomAxios();

function getPhoto() {
  const router = useRouter();
  const photoId = router.query.photo_id;

  const { data: queryData, isLoading } = useQuery(["photo", photoId], () =>
    customBoyAxios.get(
      "/photo/detail?photoId=" +
        photoId
    )
  );

  const photoDetail = queryData?.data.data.albumPhotoDetail;
  const noReplyFriends = queryData?.data.data.noreplyList;
  const declineFriends = queryData?.data.data.declineList;
  const acceptFriends = queryData?.data.data.acceptList;
  const isSnsAgree = queryData?.data.data.isSnsAgree;
  const isSnsRequest = queryData?.data.data.isSnsRequest;
  return {
    photoDetail,
    noReplyFriends,
    declineFriends,
    acceptFriends,
    isSnsAgree,
    isSnsRequest,
    isLoading,
  };
}

function getSnsPhoto(photoId: number | undefined) {
  let snsResultData: PhotoType;
  const { data: snsPhotoData } = useQuery(["sns", photoId], () =>
    customBoyAxios.get(
      "/photo/detail?photoId="+photoId
    )
  );

  snsResultData = snsPhotoData?.data.data.albumPhotoDetail;
  return { snsResultData };
}

function useMutationPhoto() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const photoId = router.query.photo_id;
  const { mutate: likeMutation } = useMutation(
    () => customBoyAxios.put("/photo/like?photoId=" + photoId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("photo"); // queryKey 유효성 제거
      },
    }
  );

  const { mutate: deleteMutation } = useMutation(
    () =>
      customBoyAxios.put("/photo/delete", {
        photoId: [photoId],
      }),
    {
      onSuccess: () => {
        alert("사진 삭제 성공");

        router.back();
      },
    }
  );

  return { likeMutation, deleteMutation };
}

export { getPhoto, getSnsPhoto, useMutationPhoto };
