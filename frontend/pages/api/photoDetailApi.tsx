import useCustomAxios from "@/features/customAxios";
import { PhotoType } from "@/types/AlbumTypes";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";

const { customBoyAxios } = useCustomAxios();

function getPhoto() {
  const router = useRouter();
  const photoId = router.query.photo_id;

  const { data: queryData, isLoading } = useQuery(["photo"], () =>
    customBoyAxios.get(
      "/photo/detail?photoId=" +
        photoId
    )
  );

  const resultData = queryData?.data.data.albumPhotoDetail;
  // console.log(resultData);
  return { resultData, isLoading };
}

function getSnsPhoto(photoId: number | undefined) {
  let snsResultData: PhotoType;
  const { data: snsPhotoData } = useQuery(["sns"], () =>
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
