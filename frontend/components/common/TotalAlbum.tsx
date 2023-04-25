import styles from "@/styles/total.module.scss";
import { useEffect, useState } from "react";
import { totalAlbumsApi } from "@/pages/api/totalDummyApi";
import SearchIcon from "@/public/icons/MagnifyingGlass.svg";
import HeartIcon from "@/public/icons/Heart.svg";
import { useRouter } from "next/router";

function TotalAlbum() {
  const [isTotal, setIsTotal] = useState<boolean>(false);
  const [isMove, setIsMove] = useState<boolean>(false);
  const [touchPosition, setTouchPosition] = useState<number>(0);

  return (
    <section
      style={{ top: `${touchPosition}` + "px" }}
      className={`${styles.total_album} ${
        !isMove && (isTotal ? styles.click_total_album : styles.no_click)
      } bg-white dark:bg-dark-block`}
    >
      <Header
        setIsTotal={setIsTotal}
        setIsMove={setIsMove}
        setTouchPosition={setTouchPosition}
        isTotal={isTotal}
      />
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

/**
 * 전체 앨범 리스트
 * @returns
 */
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

interface HeaderType {
  setIsTotal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMove: React.Dispatch<React.SetStateAction<boolean>>;
  setTouchPosition: React.Dispatch<React.SetStateAction<number>>;
  isTotal: boolean;
}

/**
 * 전체 앨범 검색 부분
 * @param props
 * @returns
 */
function Header({
  setIsTotal,
  setIsMove,
  setTouchPosition,
  isTotal,
}: HeaderType) {
  const [touchStart, setTouchStart] = useState<number>(0);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [flag, setFlag] = useState<boolean>(false);
  useEffect(() => {
    !isTotal && setIsSearch(false);
  }, [isTotal]);

  return (
    <div
      onClick={() => {
        setIsTotal(true);
      }}
      onTouchStart={(e) => {
        setTouchStart(e.changedTouches[0].pageY);
      }}
      onTouchMove={(e) => {
        setTouchPosition(e.changedTouches[0].pageY);
        setIsMove(true);
      }}
      onTouchEnd={(e) => {
        setIsMove(false);
        touchStart - e.changedTouches[0].pageY >= 0
          ? setIsTotal(true)
          : setIsTotal(false);
      }}
      className="flex justify-between items-center w-full"
      style={{ padding: "4.103vw" }}
    >
      <div
        className={`font-bold ${
          flag && (isSearch ? styles.search : styles.no_search)
        } ${styles.search_box}`}
        style={{ fontSize: "5.128vw" }}
      >
        <div>{isSearch && <input type="text" />}</div>
        <span>전체 앨범</span>
      </div>
      <SearchIcon
        onClick={() => {
          isTotal && setFlag(true);
          setIsSearch(!isSearch);
        }}
        stroke="black"
      />
    </div>
  );
}

export default TotalAlbum;
