import { CurrentAlbumType } from "@/types/AlbumTypes";
import useCustomAxios from "@/features/customAxios";
import { useQuery } from "react-query";
import { storyApiDataType } from "@/types/ApiTypes";

const { customBoyAxios, customNotiAxios } = useCustomAxios();

export const useGetCurrent = () => {
  const { data, isLoading: getCurrentIsLoading } = useQuery(
    ["current"],
    () => customBoyAxios.get("/noti/list/upload"),
    {
      refetchInterval: 5000,
    }
  );

  const getCurrent: storyApiDataType[] = data?.data.data;

  return { getCurrent, getCurrentIsLoading };
};
