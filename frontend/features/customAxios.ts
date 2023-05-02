// axios 사용
import axios from "axios";

// Redux 관련
import { RootState } from "@/store/configureStore";
import { useSelector } from "react-redux";

function useCustomAxios() {
    let parseAccessToken;
    const storageAccessToken = window.localStorage.getItem("access_token");

    if (storageAccessToken) {
        parseAccessToken = JSON.parse(storageAccessToken);
    }

    const customBoyAxios = axios.create({
        baseURL: process.env.NEXT_PUBLIC_FRIEND_BOY_URL,
        headers: {
            "access_token" : parseAccessToken.access_token,
        }
    });

    const customGirlAxios = axios.create({
        baseURL: process.env.NEXT_PUBLIC_FRIEND_GIRL_URL,
        headers: {
            "access_token" : parseAccessToken.access_token,
        }
    });
    
    return {customBoyAxios, customGirlAxios}
}

export default useCustomAxios;
