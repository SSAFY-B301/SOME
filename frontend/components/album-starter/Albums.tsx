import React, { useState } from "react";
import ItemBlock from "@/components/common/ItemBlock";
import styles from "@/styles/home.module.scss";
import { favoriteAlbumsApi } from "@/pages/api/homeDummyApi";

interface FavoriteAlbumType {
  id: number;
  img: string;
  name: string;
  createdTime: string;
  isLike: boolean;
}

const FavoriteAlbum = () => {
  const Albums = favoriteAlbumsApi.data;

  /**
   * 즐겨찾는 앨범 리스트
   */
  const favorites: React.ReactNode = Albums ? (
    Albums.map((favoriteAlbum: FavoriteAlbumType) => (
      <div
        className="w-28 h-28 rounded-xl bg-center bg-cover "
        style={{ backgroundImage: "url(" + favoriteAlbum.img + ")" }}
      >
        <div className="w-28 h-28 flex flex-col justify-end items-center">
          <span className="text-2xl text-white text-center">
            {favoriteAlbum.name}
          </span>
          <span className="text-white text-center" style={{ fontSize: "8px" }}>
            {favoriteAlbum.createdTime}
          </span>
        </div>
      </div>
    ))
  ) : (
    <span>아직 앨범이 없어요.</span>
  );
  return (
    <ItemBlock width="100%" height="" radius="20px">
      <div className="flex flex-col w-full h-full box-border px-2">
        <div
          className={`flex justify-start gap-4 overflow-scroll ${styles.cards}`}
        >
          {favorites}
        </div>
      </div>
    </ItemBlock>
  );
};

export default FavoriteAlbum;
