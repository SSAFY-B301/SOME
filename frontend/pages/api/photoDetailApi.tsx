import useCustomAxios from "@/features/customAxios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const { customBoyAxios } = useCustomAxios();

function getPhoto() {
  const { data: queryData, isLoading } = useQuery(["photo"], () =>
    customBoyAxios.get(
      process.env.NEXT_PUBLIC_FRIEND_BOY_URL + "/photo/detail?photoId=75"
    )
  );

  const resultData = queryData?.data.data.albumPhotoDetail;

  return { resultData, isLoading };
}

function likePhoto() {
  const queryClient = useQueryClient();

  const { mutate: likeMutation } = useMutation(
    (photoId) => customBoyAxios.put("/photo/like?photoId=" + photoId),
    {
      onSuccess: () => {
        console.log("success");
        queryClient.invalidateQueries("photo"); // queryKey 유효성 제거
      },
    }
  );

  return { likeMutation };
}

export { getPhoto, likePhoto };
