import { Mutations } from "@/pages/api/albumApi";
import { useDispatch, useSelector } from "react-redux";
import { startUpload } from "./photoUploadSlice";
import { StateType } from "@/types/StateType";
import { requestPartType } from "@/types/AlbumTypes";
import { UseMutateFunction } from "react-query";
import { AxiosError } from "axios";

/**
 * * 사진 업로드
 */

export const upload = (
  inputPhoto: File[],
  mutate: UseMutateFunction<
    boolean,
    AxiosError<unknown, any>,
    requestPartType,
    unknown
  >,
  albumId: number
) => {
  
  inputPhoto.forEach((file) => {
    let formData = new FormData();
    formData.append("multipartFile", file);
    const requestData: requestPartType = {
      formData: formData,
      albumId: albumId,
    };
    mutate(requestData);
  });
};
