import { EventSourcePolyfill } from "event-source-polyfill";

export const sendNotification = async (title: string, content: string) => {
  const registration = await navigator.serviceWorker.getRegistration();
  if (registration !== undefined) {
    if ("showNotification" in registration) {
      registration.showNotification(title, {
        body: content,
      });
    }
  }
};

export function SseConnect(token: string) {
  const sse = new EventSourcePolyfill(
    `${process.env.NEXT_PUBLIC_SOME_NOTI_URL}/noti/subscribe`,
    {
      headers: {
        access_token: token,
      },
    }
  );
  sse.onopen = function () {};
  sse.onerror = function (error) {
    sse.close();
  };
  sse.onmessage = (event) => {
    const parseMsg = JSON.parse(event.data);
    if (parseMsg.type === "SNS") {
      sendNotification("SNS 공유 요청", parseMsg.content);
    } else if (parseMsg.type === "INVITE") {
      sendNotification("새로운 앨범 초대", parseMsg.content);
    }
  };
}
export async function notificationPermission() {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
  } else if (permission === "denied") {
    Notification.requestPermission();
  }
}
