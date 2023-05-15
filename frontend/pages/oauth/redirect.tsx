import { useEffect, useState } from "react"
// axios
import axios from "axios";


// next Hooks
import { useRouter } from "next/router";
import { EventSourcePolyfill } from "event-source-polyfill";

//로그인 완료 페이지니까 리덕스에 state 저장해주고 이동할 수 있도록
export default function AuthRedirect() {
    // router 객체 생성
    const router = useRouter();
    const [token, setToken] = useState("");

    function saveAccessToken(_access_token : string) {
        const accessTokenObj = { access_token : _access_token};
        window.localStorage.setItem("access_token", JSON.stringify(accessTokenObj));
    }
    // 인가 코드로 서버에서 사용자 토큰 받아오기
    async function getUserToken(paramAuthCode : string | null){
        if (paramAuthCode !== null){
            const userResult = await axios.post(`${process.env.NEXT_PUBLIC_SOME_AUTH_URL}/user/kakao`,{},
                {
                    headers : {
                        "redirect_base" : process.env.NEXT_PUBLIC_FRONT_BASE,
                        "authorization_code" : paramAuthCode,
                    },
                });
            const responseAccessToken = userResult.data.data;
            
            if (responseAccessToken !== null){
                saveAccessToken(responseAccessToken);
                setToken(responseAccessToken);
                
            }
        }
        
    }
    async function showNotification(title : string, body : string) {
        const registration = await navigator.serviceWorker.getRegistration();
        
        const payload = {
            body
        };

        if (registration !== undefined) {
            if('showNotification' in registration) {
                registration.showNotification(title, payload);
            }
            else {
                new Notification(title, payload);
            }
        }
    }
    async function sendNoti(title : string, body : string) {
        
        if(Notification.permission === 'granted') {
            showNotification(title, body);
        }
        else {
            if(Notification.permission !== 'denied') {
                const permission = await Notification.requestPermission();
            
                if(permission === 'granted') {
                showNotification(title, body);
                }
            }
        }
    }
    function SseConnect() {
        const sse = new EventSourcePolyfill(`${process.env.NEXT_PUBLIC_SOME_NOTI_URL}/noti/subscribe`, {
            headers: {
                "access_token" : token,
            },
        });
        sse.onopen = function () {
            console.log("Notification Server Connected..");
          };
        sse.onerror = function (error) {
            console.log("SSE Error Occured : ", error);
            sse.close();
        };
        sse.onmessage = (event) => {
            const parseMsg = JSON.parse(event.data);
            console.log(parseMsg);
            if (parseMsg.type === "SNS") {
                sendNoti("SNS 공유 요청", parseMsg.content);
            }
            else if (parseMsg.type === "INVITE"){
                sendNoti("새로운 앨범 초대", parseMsg.content);
            }
        }
    };
    async function notificationPermission() {
        const permission = await Notification.requestPermission();
    }
    
    useEffect(() => {
      if (token !== "") {
          SseConnect();
          router.push("/boy-home");
      }
      return () => {
      }
    }, [token])
    
    // 렌더링 되면 authorization code URL에서 파싱
    useEffect(() => {
      notificationPermission();  
      // authorization code URL에서 파싱해오기
      const params = new URL(document.location.toString()).searchParams;
      const paramsAuthCode = params.get("code");

      // 인가 코드로 유저 데이터 받아오기
      getUserToken(paramsAuthCode);
      return () => {}
    }, [])

    return(
        <div className="flex items-center justify-center h-screen">
            <p>로그인 중입니다...</p>
        </div>
    )
};
