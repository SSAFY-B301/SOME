// axios 사용
import axios from "axios";

// Redux 관련
import { RootState } from "@/store/configureStore";
import { useSelector } from "react-redux";

function useCustomAxios() {

    //redux에서 access token 받아오기
    const {userInfo} = useSelector((state : RootState) => state.auth);

    const customBoyAxios = axios.create({
        baseURL: process.env.NEXT_PUBLIC_FRIEND_BOY_URL,
        headers: {
            "access_token" : userInfo.access_token
        }
    });

    const customGirlAxios = axios.create({
        baseURL: process.env.NEXT_PUBLIC_FRIEND_GIRL_URL,
        headers: {
            "access_token" : userInfo.access_token
        }
    });
    
    return {customBoyAxios, customGirlAxios}
}

export default useCustomAxios;