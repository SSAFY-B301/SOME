import useCustomAxios from "@/features/customAxios";
import { UserInfoType } from "@/types/UserType";
import { useQuery } from "react-query";

const { customAuthAxios } = useCustomAxios();

export const userQuery = () => {
    // TODO : API 나오면 CONTEXT PATH
    const queryKey = "/user/info";
    
    const { data : queryData, isLoading: getUserIsLoading } = useQuery(["userInfo"], () =>
        customAuthAxios.get(queryKey)
    );
    let getUserInfo: UserInfoType | undefined;
    if (queryData) {
        getUserInfo = queryData.data.data;
    }
    return { getUserInfo, getUserIsLoading };
  };