import React, { useState } from "react";
import styles from "@/styles/inviteFriends.module.scss";
import defaultImages from "components/common/DefaultImages";
import Image from "next/image";
interface AlbumType {
  album_id: number;
  album_name: string;
  album_created_date: string;
  thumbnail_photo_url: string | null;
  members: string[];
}

interface Props {
  album: AlbumType;
  isActiveFriends: Set<Number>;
  selectAlbum(ids: string[]): void;
}

const Album = ({ album, selectAlbum, isActiveFriends }: Props): JSX.Element => {
  const select = () => {
    selectAlbum(album.members);
  };

  return (
    <div className="relative w-28 h-28 rounded-xl border-2" onClick={select}>
      <Image
        src={
          album.thumbnail_photo_url
            ? album.thumbnail_photo_url
            : defaultImages[album.album_id % 8]
        }
        alt="invite"
        style={{ objectFit: "cover", borderRadius: "3.077vw" }}
        fill
      />

      <div className="w-28 h-28 flex justify-center items-center">
        <div className="z-20 w-24 h-24 flex flex-col justify-end items-center">
          <span
            className={`w-full text-base text-white text-center truncate ${styles.albumText}`}
          >
            {album.album_name}
          </span>
          <span
            className={`w-full text-white text-center ${styles.albumText}`}
            style={{ fontSize: "8px" }}
          >
            {album.album_created_date.split("T", 1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Album;
