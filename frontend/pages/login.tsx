import { login, logout } from "@/features/authSlice";
import { RootState, useAppDispatch } from "@/store";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";



export default function Login() {

    const dispatch = useAppDispatch();
    const {isLogin} = useSelector((state:RootState) => state.auth);
    const onLogout = useCallback(()=>dispatch(logout()),[]) 
    
    const authBaseURL = process.env.NEXT_PUBLIC_AUTH_BASE_URL;
    const redirectURI = process.env.NEXT_PUBLIC_REDIRECT_URI;
    const oauthURL = authBaseURL+ "oauth2/authorization/kakao?redirect_uri=" + redirectURI;

    function login() {
        window.location.href = oauthURL;
    }

    return(
        <div>
            <div className="flex flex-col items-center h-full gap-y-4">
                <p className="text-5xl text-center">SOME</p>
                <p>함께 만들어가는 앨범</p>
                <img src="/images/onboarding1.PNG" className="rounded-3xl" style={{width : 240}} alt="" />
                {/* <Link href={oauthURL}> */}
                    {!isLogin && <button onClick={login} className="w-56 rounded-md">로그인</button>}
                    {isLogin && <button onClick={onLogout} className="w-56 rounded-md">로그아웃</button>}
                {/* </Link> */}
                <p className="text-white">{isLogin}</p>
            </div>
        </div>
    )    
};
