import useCustomAxios from "@/features/customAxios";
import { useMutation, useQuery } from "react-query";


function getPhoto(){

    const {customBoyAxios} = useCustomAxios();
    
    const {data : queryData} = useQuery(['photo'], () => customBoyAxios.get(process.env.NEXT_PUBLIC_FRIEND_BOY_URL+"/photo/detail?photoId=75"));
    
    console.log(queryData?.data.data.albumPhotoDetail)

    return queryData?.data.data.albumPhotoDetail;
}

function likePhoto(){
    const { customBoyAxios } = useCustomAxios();
    
    const likePhoto = useMutation((photoId) => customBoyAxios.post('/photo/like?photoId='+photoId));

}

export {getPhoto, likePhoto}