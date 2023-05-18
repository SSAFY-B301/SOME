import React from "react";
import Album from "./Album";
import styles from "@/styles/home.module.scss";
import { LoadingInviteAlbum } from "../../common/Loading";

interface AlbumType {
  album_id: number;
  album_name: string;
  album_created_date: string;
  thumbnail_photo_url: string;
  members: string[];
}

interface Props {
  albums: AlbumType[];
  isActiveFriends: Set<Number>;
  selectAlbums(ids: string[]): void;
}

const Albums = ({
  albums,
  selectAlbums,
  isActiveFriends,
}: Props): JSX.Element => {
  return albums ? (
    albums.length > 0 ? (
      <div className="w-full h-32 box-border p-2 mb-2 flex flex-col justify-center">
        <div
          className={`flex justify-start gap-4 overflow-x-scroll overflow-y-hidden ${styles.cards}`}
        >
          {albums.map((album) => (
            <Album
              key={album.album_id}
              album={album}
              isActiveFriends={isActiveFriends}
              selectAlbum={selectAlbums}
            />
          ))}
        </div>
      </div>
    ) : (
      <div className="w-full flex justify-center items-center box-border mb-4">
        친구랑 공유 중인 앨범이 없어요...
      </div>
    )
  ) : (
    <div className="w-full h-32 box-border p-2 mb-2 flex flex-col justify-center">
      <div
        className={`flex justify-start gap-4 overflow-x-scroll overflow-y-hidden ${styles.cards}`}
      >
        <LoadingInviteAlbum />
        <LoadingInviteAlbum />
      </div>
    </div>
  );
};

export default Albums;
