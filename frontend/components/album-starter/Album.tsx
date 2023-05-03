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
  console.log(`${album.album_name} ${album.id}`);

  return (
    <div
      className="w-28 h-28 rounded-xl bg-center bg-cover border-2"
      style={{ backgroundImage: "url(" + album.thumbnail_photo_url + ")" }}
      onClick={select}
    >
      <div className="w-28 h-28 flex justify-center items-center">
        <div className="w-24 h-24 flex flex-col justify-end items-center">
          <span className="w-full text-base text-black text-center truncate">
            {album.album_name}
          </span>
          <span
            className="w-full text-black text-center "
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
