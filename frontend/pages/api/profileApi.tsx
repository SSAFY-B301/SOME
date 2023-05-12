import useCustomAxios from "@/features/customAxios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { MyPageDataType, NotiOptionRequestType } from "@/types/UserType";

const { customBoyAxios } = useCustomAxios();

export const getMyPageData = () => {

    const { data , status } = useQuery(
        ["profile"],
        () => customBoyAxios.get('/user/mypage'),
    );
    
    const profileData : MyPageDataType = data?.data.data;        
    console.log(profileData);

    return { profileData, status };
};

export function useNotiOptionMutation(){
    const queryClient = useQueryClient();
    const {mutate, status} = useMutation(
        (requestData : NotiOptionRequestType) => customBoyAxios.put('/user/noti/option', requestData),
        {
            onError : (err) => {
                console.log(err)
            },
            onSuccess : () => {
                queryClient.invalidateQueries("profile"); // queryKey 유효성 제거
            }
        }
    );
    return {mutate, status};
}