import React from "react";
import Album from "./Album";
import ItemBlock from "@/components/common/ItemBlock";
import styles from "@/styles/home.module.scss";

interface AlbumType {
  id: number;
  name: string;
  date: string;
  thumbNail: string;
  userIds: number[];
}

interface Props {
  albums: AlbumType[];
  isActiveFriends: Set<Number>;
  selectAlbums(ids: number[]): void;
  removeAlbums(ids: number[]): void;
}

const Albums = ({
  albums,
  selectAlbums,
  isActiveFriends,
  removeAlbums,
}: Props): JSX.Element => {
  return (
    <ItemBlock width="100%" height="" radius="20px">
      <div className="flex flex-col w-full h-full box-border px-2">
        <div
          className={`flex justify-start gap-4 overflow-scroll ${styles.cards}`}
        >
          {albums.map((album) => (
            <Album
              album={album}
              isActiveFriends={isActiveFriends}
              selectAlbum={selectAlbums}
              removeAlbums={removeAlbums}
            />
          ))}
        </div>
      </div>
    </ItemBlock>
  );
};

export default Albums;
