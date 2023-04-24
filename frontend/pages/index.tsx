import NavBar from "@/components/Nav";
import React from "react";
import TabBar from "@/components/TabBar";
import TotalAlbum from "@/components/TotalAlbum";
import { CurrentAlbum, FavoriteAlbum } from "@/components/Albums";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-bg-home dark:bg-dark-bg-home relative touch-none">
      <NavBar />
      <section className="flex flex-col items-center gap-y-3">
        <CurrentAlbum />
        <FavoriteAlbum />
      </section>
      <TotalAlbum />
      <TabBar />
    </div>
  );
}
