// 라이브러리
import React from "react";

// 컴포넌트
import NavBar from "@/components/common/Nav";
import TabBar from "@/components/common/TabBar";
import CurrentAlbum from "@/components/common/CurrentAlbum";
import { FavoriteAlbum } from "@/components/common/Albums";
import TotalAlbum from "@/components/common/TotalAlbum";

// CSS
import styles from "@/styles/home.module.scss";

export default function Home() {
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
        <TabBar plusBtnUrl={"/album/create"} />
      </div>
    </div>
  );
}
