import { CurrentAlbumType } from "@/types/AlbumTypes";
import useCustomAxios from "@/features/customAxios";
import { useQuery } from "react-query";

const { customBoyAxios , customNotiAxios } = useCustomAxios();

export const useGetCurrent = () => {

    const { data , isLoading: getCurrentIsLoading } = useQuery(
        ["current"],
        () => customBoyAxios.get('/noti/list/upload'),
        {
            refetchInterval : 5000
        }
    );
    
    const getCurrent = data?.data.data;        
    console.log(data);
    console.log(getCurrent);

    return { getCurrent, getCurrentIsLoading };
  };