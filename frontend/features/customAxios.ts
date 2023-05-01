// axios 사용
import axios from "axios";

// Redux 관련
import { RootState } from "@/store/configureStore";
import { useSelector } from "react-redux";

import userInfo from "features/TokenService";

//redux에서 access token 받아오기
// const { userInfo } = useSelector((state: RootState) => state.auth);

const a = userInfo();

// 남사친 API 커스텀
export const customBoyAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FRIEND_BOY_URL,
  headers: {
    access_token: a.userInfo.access_token,
  },
});

// 여사친 API 커스텀
export const customGirlAxios = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_FRIEND_GIRL_URL,
    headers: {
      access_token: userInfo.access_token,
    },
  });
};
