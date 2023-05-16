import { EventSourcePolyfill } from "event-source-polyfill";



export const sendNotification = async (title: string, content : string) => {
  
  const registration = await navigator.serviceWorker.getRegistration();
  if (registration !== undefined) {
    if('showNotification' in registration) {
      registration.showNotification(title, {
        body : content
      });
    }
  }
};
  
export function SseConnect(token : string) {
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
        if (parseMsg.type === "SNS") {
            console.log(parseMsg);
            sendNotification("SNS 공유 요청", parseMsg.content);
        }
        else if (parseMsg.type === "INVITE"){
            console.log(parseMsg);
            sendNotification("새로운 앨범 초대", parseMsg.content);
        }
    }
};
export async function notificationPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
        console.log("Notification Permission Accept");
    }
    else if (permission === "denied"){
        Notification.requestPermission();
    }
}