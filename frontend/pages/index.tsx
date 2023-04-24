import NavBar from "@/components/common/Nav";
import React from "react";
import TabBar from "@/components/common/TabBar";
import TotalAlbum from "@/components/common/TotalAlbum";
import { CurrentAlbum, FavoriteAlbum } from "@/components/common/Albums";
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
        <TabBar />
      </div>
    </div>
  );
}
