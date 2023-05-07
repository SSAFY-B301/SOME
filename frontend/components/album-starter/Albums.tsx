import React from "react";
import Album from "./Album";
import ItemBlock from "@/components/common/ItemBlock";
import styles from "@/styles/home.module.scss";

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
  return (
    <ItemBlock width="100%" height="" radius="20px">
      {albums && albums.length > 0 ? (
        <div className="flex flex-col w-full h-32 box-border px-2">
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
        <div></div>
      )}
    </ItemBlock>
  );
};

export default Albums;
