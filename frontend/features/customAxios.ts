// axios 사용
import axios from "axios";

function useCustomAxios() {
    let parseToken = "";
    if(typeof window !== 'undefined'){
        parseToken = JSON.parse(window.localStorage.getItem("access_token") || '{}').access_token;
    }
    const customBoyAxios = axios.create({
        baseURL: process.env.NEXT_PUBLIC_FRIEND_BOY_URL,
        headers: {
            "access_token" : parseToken,
        }
    });
    const customGirlAxios = axios.create({
        baseURL: process.env.NEXT_PUBLIC_FRIEND_GIRL_URL,
        headers: {
            "access_token" : parseToken,
        }
    });
    const customAuthAxios = axios.create({
        baseURL: process.env.NEXT_PUBLIC_SOME_AUTH_URL,
        headers: {
            "access_token" : parseToken,
        }
    });
    return {customBoyAxios, customGirlAxios, customAuthAxios}
}

export default useCustomAxios;