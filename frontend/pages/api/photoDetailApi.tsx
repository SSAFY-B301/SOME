import useCustomAxios from "@/features/customAxios";
import { PhotoType, SnsPhotoType } from "@/types/AlbumTypes";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";

const { customBoyAxios } = useCustomAxios();

function getPhoto(photoId: number) {
  const router = useRouter();
  const photo_id = String(photoId);

  const { data: queryData, isLoading } = useQuery(["photo", photo_id], () =>
    customBoyAxios.get("/photo/detail?photoId=" + photo_id)
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
  let snsResultData: SnsPhotoType;

  const { data: snsPhotoData, status: snsPhotoStatus } = useQuery(["sns", photoId], () =>
    customBoyAxios.get("/photo/sns/detail?photoId=" + photoId)
  );

  snsResultData = snsPhotoData?.data.data.albumPhotoDetail;
  return { snsResultData,snsPhotoStatus };
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
    (photo_id: number) =>
      customBoyAxios.put("/photo/delete", {
        photoId: [photo_id],
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
