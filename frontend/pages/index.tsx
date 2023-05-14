// 라이브러리
import React, { useEffect } from "react";
import { useRouter } from "next/router";

// CSS
import styles from "@/styles/home.module.scss";

// 리덕스
import { userQuery } from "./api/userApi";
import { CheckDevice } from "@/components/common/CheckDevice";
import { useSelector } from "react-redux";
import { StateType } from "@/types/StateType";

export default function Home() {
  //로그인 상태인지 확인하고, 로그인 안 되어 있으면 로그인 페이지로 이동
  const router = useRouter();
  
  const { getUserInfo } = userQuery();
  
  const userAgent = useSelector(
    (state: StateType) => state.userAgent.userAgent
  );
  CheckDevice();
  
  useEffect(() => {
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      const notification = new Notification("Hi there!");
    } else if (Notification.permission !== "denied") {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const notification = new Notification("Hi there!");
        }
      });
    }

    let timeout;
    const isLogin =
      window.localStorage.getItem("access_token") === null ? false : true;

    if (!isLogin) {
      timeout = setTimeout(
        () => userAgent !== "Desktop" && router.push("login"),
        2000
      );
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (getUserInfo !== undefined) {
      setTimeout(() => router.push("/boy-home"), 2000);
    }
    return () => {};
  }, [getUserInfo]);

  return (
    <div
      className={`bg-white dark:bg-dark-bg-home flex items-center content-center touch-none ${styles.no_scroll}`}
      style={{ width: "100vw", height: "100vh" }}
    >
      <div
        className="flex-col items-center content-center mx-auto"
        style={{ width: "200px", height: "200px" }}
      >
        <img src="/images/splash.png" alt="" />
        <p className="text-5xl text-center">SOME</p>
        <p className="mt-4 text-center">함께 만들어가는 앨범</p>
      </div>
    </div>
  );
}
