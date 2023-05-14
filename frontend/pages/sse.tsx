import {useEffect, useState} from "react";
import { EventSourcePolyfill, MessageEvent, Event } from "event-source-polyfill";




function Sse() {
    const [message, setMessage] = useState();   
    function notiPermission() {
        Notification.requestPermission().then((result) => {
            if (result === "granted") {
                alert("노티 설정 완료"+result);
            }
          });
    }       
    function connectHandler() {
        const parseToken = JSON.parse(window.localStorage.getItem("access_token") || '{}').access_token;
        sendNoti("새로운 사진 등록", "정상민 님이 새로운 사진을 등록하셨습니다.");
        const sse = new EventSourcePolyfill(`${process.env.NEXT_PUBLIC_SOME_NOTI_URL}/noti/subscribe`, {
            headers: {
                "access_token" : parseToken,
            }
        });
        sse.onopen = function () {
            console.log("SSE 연결!!");
          };
        sse.onerror = function (error) {
            console.log("SSE 에러", error, sse);
            sse.close();
        };
        sse.onmessage = (event) => {
            const parseMsg = JSON.parse(event.data);
            console.log(parseMsg.type)
            console.log(parseMsg.content)
        }
        console.log(sse);
    };
    async function sendNoti(title : string, body : string) {
        const registration = await navigator.serviceWorker.getRegistration();
        const showNotification = (body : any) => {
            const title = 'What PWA Can Do Today';
            
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
        };
        if(Notification.permission === 'granted') {
            showNotification("msg");
          }
          else {
            if(Notification.permission !== 'denied') {
              const permission = await Notification.requestPermission();
          
              if(permission === 'granted') {
                showNotification("msg");
              }
            }
        }
    }
    useEffect(() => {
        
        return () => {

        };
      }, []);

  return (
    <div>
        <button onClick={() => notiPermission()}>노티 허가 요청</button>
        <button onClick={() => connectHandler()}>connect 요청</button>
        <div>{message}</div>
    </div>
  );
}

export default Sse;