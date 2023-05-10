import useCustomAxios from "@/features/customAxios";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";

const { customGirlAxios } = useCustomAxios();

function getGrilPhotoDetail() {
  const router = useRouter();
  const photoId = router.query.photo_id;

  const { data: queryData, isLoading } = useQuery(["photo"], () =>
    customGirlAxios.get("/photo/detail/" + photoId)
  );

  const resultData = queryData?.data;
  console.log(resultData);
  return { resultData, isLoading };
}

interface LocationType {
  lat : number,
  lng : number
} 
function useMutationGirl(){
  const queryClient = useQueryClient();
  const headers = {
    "Content-Type" : "multipart/form-data",
  }

  const { mutate: girlUploadMutation } = useMutation(
    (location : LocationType) => customGirlAxios.post("/album/upload?latitude=" + location.lat +"&longitude="+ location.lng, 
    {
      
    }, {headers}),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("photo"); // queryKey 유효성 제거
      },
    }
  );
  return { girlUploadMutation }
}

export { getGrilPhotoDetail, useMutationGirl };
