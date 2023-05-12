import useCustomAxios from "@/features/customAxios";
import { RootState } from "@/store/configureStore";
import { GirlResultType, GirlRequestPartType, GirlListDetailResultType, PhotoDetailType, GirlLikeRequestType } from "@/types/GirlType";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";

const { customGirlAxios } = useCustomAxios();

function getGirlList() {
  const location = useSelector((state : RootState) => state.location)
  const { data : queryData, isLoading : isGirlListLoading} = useQuery(["girlList", location], () => 
  customGirlAxios.get(`/album/list?latitude=${location.lat}&longitude=${location.lng}`)
  ,)
  const resultData : GirlResultType = queryData?.data.data;
  
  return { resultData, isGirlListLoading}
}

function getGirlListDetail() {
  const location = useSelector((state : RootState) => state.location)
  const girlListDetailState = useSelector((state : RootState) => state.girlListDetailState);
  const { data : queryData, isLoading : isGirlListLoading} = useQuery([`girlListDetail`, girlListDetailState], () => 
    customGirlAxios.get(`/album/list/detail?latitude=${location.lat}&longitude=${location.lng}&section=${girlListDetailState.section}&sort=${girlListDetailState.order}&page=${girlListDetailState.page}&size=${girlListDetailState.size}`)
  , {
  })
  const resultData : GirlListDetailResultType = queryData?.data.data;
  return { resultData, isGirlListLoading}
}

function getGirlPhotoDetail() {
  const router = useRouter();
  const photoId = router.query.photo_id;

  const { data: queryData, isLoading, status : girlDetailStatus } = useQuery(["girlDetail", photoId], () =>
    customGirlAxios.get("/photo/detail/" + photoId)
  );
  const resultData : PhotoDetailType = queryData?.data.data.albumPhotoDetail;
  return { resultData, isLoading, girlDetailStatus };
}

function useMutationGirl(){
  const location = useSelector((state : RootState) => state.location)
  const queryClient = useQueryClient();
  
  const headers = {
    "Content-Type" : "multipart/form-data",
  }

  const { mutate: girlUploadMutation } = useMutation(
    (requestData : GirlRequestPartType) => customGirlAxios.post("/album/upload?latitude=" + location.lat +"&longitude="+ location.lng, 
    requestData.formData,
    {headers}),
    {
      onSuccess: (data) => {
        alert("사진이 등록되었습니다!");
        queryClient.invalidateQueries("girlList"); // queryKey 유효성 제거
        queryClient.invalidateQueries("girlListDetail"); // queryKey 유효성 제거
        queryClient.invalidateQueries("girlDetail"); // queryKey 유효성 제거
      },
    }
  );

  const { mutate : girlLikeMutation } = useMutation(
    (requestData : GirlLikeRequestType) => customGirlAxios.put("/photo/like", requestData),
    {
      onSuccess : () => {
        queryClient.invalidateQueries("girlList"); // queryKey 유효성 제거
        queryClient.invalidateQueries("girlListDetail"); // queryKey 유효성 제거
        queryClient.invalidateQueries("girlDetail"); // queryKey 유효성 제거
      }
    } 
  )

  return { girlUploadMutation, girlLikeMutation }
}

export { getGirlList, getGirlListDetail, getGirlPhotoDetail, useMutationGirl };
