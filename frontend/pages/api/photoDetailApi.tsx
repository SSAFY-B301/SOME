import useCustomAxios from "@/features/customAxios";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";

const { customBoyAxios } = useCustomAxios();

function getPhoto() {

  const router = useRouter();
  const photoId = router.query.photo_id;

  const { data: queryData, isLoading } = useQuery(["photo"], () =>
    customBoyAxios.get(
      process.env.NEXT_PUBLIC_FRIEND_BOY_URL + "/photo/detail?photoId="+photoId
    )
  );

  const resultData = queryData?.data.data.albumPhotoDetail;

  return { resultData, isLoading };
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
    () => customBoyAxios.put("/photo/delete", {
      "photoId" : [photoId],
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

export { getPhoto, useMutationPhoto };
