import { useEffect, useState } from "react"
import { setAccessToken } from "@/features/authSlice";
import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";

export default function AuthRedirect() {
    //로그인 완료 페이지니까 리덕스에 state 저장해주고 이동할 수 있도록
    const dispatch = useAppDispatch();
    const [authCode, setAuthCode] = useState<string | null>();
    const router = useRouter();
    const {accessToken} = useSelector((state:RootState) => state.auth);

    async function getFriends() {
        // 친구 목록 가져오기 : access_token 필요
        // Query String
        // offset : 친구목록 시작지점, 초기값 0
        // limit : 한 페이지에 가져올 친구 수
        // order : 정렬.. 오름차순(asc, 기본값), 내림차순(desc)
        // friend_order : 기준 설정.. 기본 값 - favorite, 닉네임 순서로 할거면 - nickname  
        const friends = await axios.get("https://kapi.kakao.com/v1/api/talk/friends?offset=0&limit=3&order=asc",
            {
                headers : {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
        )
        console.log(friends.data);
        
        //사용자 정보 가져오기 : access_token 필요
        const userInfo = await axios.get("https://kapi.kakao.com/v1/oidc/userinfo",
        {
            headers : {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        console.log(userInfo)

    }

    
    async function getToken(paramAuthCode : string) {
        //카카오 토큰 가져오기 : authorization code 필요
        const tokenResult = await axios.post("https://kauth.kakao.com/oauth/token", 
            {
                grant_type : "authorization_code",
                //
                redirect_uri : process.env.NEXT_PUBLIC_REDIRECT_URI,
                client_id :  process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY,    
                code : paramAuthCode,
            },
            {
                headers:{
                    "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
                }
            });
        console.log(tokenResult.data)
        dispatch(setAccessToken(tokenResult.data.access_token));
        
    }

    async function getUserInfo(paramAuthCode : string){
        const userResult = await axios.post(`${process.env.NEXT_PUBLIC_SOME_AUTH_URL}/auth/member/kakao`,{},
            {
                headers : {
                    "authorization_code" : paramAuthCode,
                },
            });
        console.log(userResult);
        console.log(userResult.data);
    }
    useEffect(() => {
        if (authCode !== null && authCode !== undefined) {
            getUserInfo(authCode);
        }
    }, [authCode])

    useEffect(() => {
        if (accessToken !== ""){
            console.log(accessToken);
            getFriends();
        }
    }, [accessToken])
    
    //authorization code URL에서 파싱해오기
    useEffect(() => {
      const params = new URL(document.location.toString()).searchParams;
      const paramsAuthCode = params.get("code");
      setAuthCode(paramsAuthCode);
    //   dispatch(setAccessToken(access_token));
      return () => {}
    }, [])

    return(
        <div className="flex items-center justify-center h-screen">
            <p>로그인 중입니다...</p>
        </div>
    )
};
