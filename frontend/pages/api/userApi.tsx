import useCustomAxios from "@/features/customAxios";
import { UserInfoType } from "@/types/UserType";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const { customAuthAxios } = useCustomAxios();

export const userQuery = () => {
    // TODO : API 나오면 CONTEXT PATH
    const router = useRouter();
    const queryKey = "/user/info";
    
    const { data : queryData } = useQuery(["userInfo"], () =>
        customAuthAxios.get(queryKey),
        {
            onSuccess: (data) => {
                if (data.data.status_code === 450) {
                    window.localStorage.removeItem('access_token');
                    router.push("/login")
                }
            }
        }
    );
    let getUserInfo: UserInfoType | undefined;
    if (queryData?.data.status_code) {
        getUserInfo = queryData.data.data;
    }
    return { getUserInfo };
  };