import useCustomAxios from "@/features/customAxios";
import { storyApiDataType } from "@/types/ApiTypes";
import { useQuery } from "react-query";

const { customBoyAxios } = useCustomAxios();

export const useStory = () => {
  const queryKey = `noti/list/upload`;
  const { data: getStoryData, isLoading: getStoryIsLoading } = useQuery<
    storyApiDataType[],
    unknown,
    storyApiDataType[],
    string[]
  >(
    ["story"],
    () => {
      const response = customBoyAxios.get(queryKey);
      return response.then((data) => data.data.data);
    },
    {
      cacheTime: 5000,
      refetchInterval: 5000,
    }
  );

  return { getStoryData, getStoryIsLoading };
};
