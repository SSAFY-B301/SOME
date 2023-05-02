import React from "react";

interface AlbumType {
  id: number;
  album_name: string;
  album_created_date: string;
  thumbnail_photo_url: string;
  members: number[];
}

interface Props {
  album: AlbumType;
  isActiveFriends: Set<Number>;
  selectAlbum(ids: number[]): void;
}

const Album = ({ album, selectAlbum, isActiveFriends }: Props): JSX.Element => {
  const select = () => {
    selectAlbum(album.members);
  };

  return (
    <div
      className="w-28 h-28 rounded-xl bg-center bg-cover "
      style={{ backgroundImage: "url(" + album.thumbnail_photo_url + ")" }}
      onClick={select}
    >
      <div className="w-28 h-28 flex flex-col justify-end items-center">
        <span className="text-2xl text-white text-center">
          {album.album_name}
        </span>
        <span className="text-white text-center" style={{ fontSize: "8px" }}>
          {album.album_created_date}
        </span>
      </div>
    </div>
  );
};

export default Album;
