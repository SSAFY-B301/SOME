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
import { SseConnect, notificationPermission } from "@/features/sse";
import { useTheme } from "next-themes";

import Logo from "public/icons/Splash.svg";

export default function Home() {
  //로그인 상태인지 확인하고, 로그인 안 되어 있으면 로그인 페이지로 이동
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { getUserInfo } = userQuery();

  const userAgent = useSelector(
    (state: StateType) => state.userAgent.userAgent
  );
  CheckDevice();

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    notificationPermission();
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
      const parseToken = JSON.parse(
        window.localStorage.getItem("access_token") || "{}"
      ).access_token;
      SseConnect(parseToken);
      setTimeout(() => router.push("/boy-home"), 20000);
    }
    return () => {};
  }, [getUserInfo]);

  return (
    <div
      className={`bg-white dark:bg-dark-bg-home flex items-center content-center touch-none ${styles.no_scroll}`}
      style={{ width: "100vw", height: "100vh" }}
    >
      <div
        className="flex-col justify-center items-center content-center mx-auto relative"
        style={{ width: "200px", height: "200px" }}
      >
        <Logo className="absolute" style={{ top: "-8px" }} />
      </div>
    </div>
  );
}
