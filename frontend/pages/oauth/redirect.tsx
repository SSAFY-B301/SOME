import { useEffect } from "react"
import { setAccessToken } from "@/features/authSlice";
import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Kakao() {
    //로그인 완료 페이지니까 리덕스에 state 저장해주고 이동할 수 있도록
    const dispatch = useAppDispatch();
    const router = useRouter();
    const {accessToken} = useSelector((state:RootState) => state.auth);
    useEffect(() => {
        if (accessToken !== "") {
            router.push('/')
        }
    }, [accessToken])
    
    useEffect(() => {
      const params = new URL(document.location.toString()).searchParams;
      const access_token = params.get("token");
      dispatch(setAccessToken(access_token));
      return () => {}
    }, [])
    

    return(
        <div className="flex items-center justify-center h-screen">
            <p>로그인 중입니다...</p>
        </div>
    )
};
