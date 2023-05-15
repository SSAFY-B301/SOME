import { EventSourcePolyfill } from "event-source-polyfill";


export const sendNotification = async (title : string, body : string) => {
    const registration = await navigator.serviceWorker.getRegistration();

    const showNotification = (title: string, body: string) => {
        
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
};


export const sendNotification2 = async () => {
  
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
};
  
const showNotification = async (body : string) => {
  const registration = await navigator.serviceWorker.getRegistration();
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
        console.log(parseMsg);
        if (parseMsg.type === "SNS") {
            sendNotification("SNS 공유 요청", parseMsg.content);
        }
        else if (parseMsg.type === "INVITE"){
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