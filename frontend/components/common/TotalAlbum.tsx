import styles from "@/styles/home.module.scss";
import { useState } from "react";
import { totalAlbumsApi } from "@/pages/api/dummyapi";
import SearchIcon from "@/public/icons/MagnifyingGlass.svg";
import HeartIcon from "@/public/icons/Heart.svg";
import { useRouter } from "next/router";

function TotalAlbum() {
  const [flag, setFlag] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [touchPosition, setTouchPosition] = useState<number>();
  const [touchStart, setTouchStart] = useState<number>(0);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  return (
    <section
      style={{ top: `${touchPosition}` + "px" }}
      className={`${styles.total_album} ${
        !flag && (isClicked ? styles.click_total_album : styles.no_click)
      } bg-white dark:bg-dark-block`}
    >
      <div
        onClick={() => {
          setIsClicked(true);
        }}
        onTouchStart={(e) => {
          setTouchStart(e.changedTouches[0].pageY);
        }}
        onTouchMove={(e) => {
          setTouchPosition(e.changedTouches[0].pageY);
          setFlag(true);
        }}
        onTouchEnd={(e) => {
          setFlag(false);
          touchStart - e.changedTouches[0].pageY > 0
            ? setIsClicked(true)
            : setIsClicked(false);
        }}
        className="flex justify-between items-center w-full"
        style={{ padding: "4.103vw" }}
      >
        <div
          className={`font-bold ${
            isSearch ? styles.search : styles.no_search
          } ${styles.search_box}`}
          style={{ fontSize: "5.128vw" }}
        >
          <div></div>
          <span>전체 앨범</span>
        </div>
        <SearchIcon
          onClick={() => {
            setIsSearch(!isSearch);
          }}
          stroke="black"
        />
      </div>
      <TotalAlbumItems />
    </section>
  );
}

interface TotalAlbumType {
  id: number;
  img: string;
  name: string;
  createdTime: string;
  isLike: boolean;
}

function TotalAlbumItems() {
  const router = useRouter();
  const [albums, setAlbums] = useState<TotalAlbumType[]>(totalAlbumsApi.data);

  const totalAlbums: React.ReactNode = totalAlbumsApi ? (
    albums.map((album: TotalAlbumType) => (
      <div
        onClick={() => router.push(`/album/${album.id}`)}
        className={`flex flex-col items-end justify-between bg-center bg-cover ${styles.total_item}`}
        style={{
          backgroundImage: "url(" + album.img + ")",
          padding: "2.051vw",
          borderRadius: "3.077vw",
        }}
      >
        <HeartIcon
          fill={album.isLike ? "red" : "none"}
          stroke={album.isLike ? "red" : "white"}
          width="6.154vw"
          height="6.154vw"
        />
        <div className="flex flex-col items-end text-white text-left">
          <span>{album.name}</span>
          <span>{album.createdTime}</span>
        </div>
      </div>
    ))
  ) : (
    <span>없음</span>
  );

  return (
    <section className=" overflow-scroll">
      <div className="grid grid-cols-2" style={{ gap: "6.154vw" }}>
        {totalAlbums}
      </div>
    </section>
  );
}

export default TotalAlbum;
