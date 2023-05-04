// 라이브러리
import React, { useEffect } from "react";
import { useRouter } from "next/router";

// CSS
import styles from "@/styles/home.module.scss";

// 리덕스
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";

export default function Home() {
  //로그인 상태인지 확인하고, 로그인 안 되어 있으면 로그인 페이지로 이동
  const router = useRouter();

  useEffect(() => {
    let timeout;
    
    const isLogin = window.localStorage.getItem("access_token") === null ? false : true;
    
    if (!isLogin) {
      timeout = setTimeout(() => router.push("login"), 3000);
      
    } 
    else {
      const storageAccessToken = window.localStorage.getItem("access_token");
      if (storageAccessToken) {
        const parseAccessToken = JSON.parse(storageAccessToken);
        console.log("Token : " + parseAccessToken.access_token);
      }
      timeout = setTimeout(() => router.push("boy-home"), 3000);
    }
    return () => {};
  }, []);

  return (
    <div
      className={`bg-white dark:bg-dark-bg-home flex items-center content-center touch-none ${styles.no_scroll}`}
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="flex-col items-center content-center mx-auto" style={{width : "200px", height : "200px"}}>
        <img src="/images/splash.png" alt="" />
        <p className="text-5xl text-center">SOME</p>
        <p className="mt-4 text-center">함께 만들어가는 앨범</p>
      </div>
    </div>
  );
}
