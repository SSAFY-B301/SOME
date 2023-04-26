import NavBar from "@/components/common/Nav";
import React, { useEffect } from "react";
import TabBar from "@/components/common/TabBar";
import TotalAlbum from "@/components/common/TotalAlbum";
import { CurrentAlbum, FavoriteAlbum } from "@/components/common/Albums";
import styles from "@/styles/home.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/router";

export default function Home() {
  //로그인 상태인지 확인하고, 로그인 안 되어 있으면 로그인 페이지로 이동
  const {isLogin} = useSelector((state:RootState) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (!isLogin) {
      router.push("login")
    }
    return () => {
    }
  }, [])
  
  return (
    <div
      className={`bg-bg-home dark:bg-dark-bg-home relative touch-none ${styles.no_scroll}`}
      style={{ width: "100vw", height: "100vh" }}
    >
      <NavBar />
      <section
        className="flex flex-col items-center"
        style={{ rowGap: "3.077vw" }}
      >
        <CurrentAlbum />
        <FavoriteAlbum />
      </section>
      <div className={`${styles.footer}`}>
        <TotalAlbum />
        <TabBar plusBtnUrl={"/album-starter/SetAlbumNamePage"} />
      </div>
    </div>
  );
}
