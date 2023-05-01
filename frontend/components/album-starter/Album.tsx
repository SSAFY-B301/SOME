import React from "react";

interface AlbumType {
  id: number;
  name: string;
  date: string;
  thumbNail: string;
  userIds: number[];
}

interface Props {
  album: AlbumType;
  isActiveFriends: Set<Number>;
  selectAlbum(ids: number[]): void;
  removeAlbums(ids: number[]): void;
}

const Album = ({
  album,
  selectAlbum,
  isActiveFriends,
  removeAlbums,
}: Props): JSX.Element => {
  const select = () => {
    selectAlbum(album.userIds);
  };

  return (
    <div
      className="w-28 h-28 rounded-xl bg-center bg-cover "
      style={{ backgroundImage: "url(" + album.thumbNail + ")" }}
      onClick={select}
    >
      <div className="w-28 h-28 flex flex-col justify-end items-center">
        <span className="text-2xl text-white text-center">{album.name}</span>
        <span className="text-white text-center" style={{ fontSize: "8px" }}>
          {album.date}
        </span>
      </div>
    </div>
  );
};

export default Album;
