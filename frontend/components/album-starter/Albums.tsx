import React from "react";
import Album from "./Album";
import ItemBlock from "@/components/common/ItemBlock";
import styles from "@/styles/home.module.scss";

interface AlbumType {
  id: number;
  album_name: string;
  album_created_date: string;
  thumbnail_photo_url: string;
  members: number[];
}

interface Props {
  albums: AlbumType[];
  isActiveFriends: Set<Number>;
  selectAlbums(ids: number[]): void;
}

const Albums = ({
  albums,
  selectAlbums,
  isActiveFriends,
}: Props): JSX.Element => {
  return (
    <ItemBlock width="100%" height="" radius="20px">
      {albums ? (
        <div className="flex flex-col w-full h-32 box-border px-2">
          <div
            className={`flex justify-start gap-4 overflow-scroll ${styles.cards}`}
          >
            {albums.map((album) => (
              <Album
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
