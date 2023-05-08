// 라이브러리
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

// API
import { Mutations, useGetTotal } from "@/pages/api/albumApi";

// CSS
import styles from "styles/total.module.scss";

// 아이콘
import SearchIcon from "public/icons/MagnifyingGlass.svg";
import HeartIcon from "public/icons/Heart.svg";

// 타입
import { TotalAlbumType } from "types/AlbumTypes";
import { LoadingTotal } from "./Loading";

function TotalAlbum() {
  const [isTotal, setIsTotal] = useState<boolean>(false);
  const [isMove, setIsMove] = useState<boolean>(false);
  const [touchPosition, setTouchPosition] = useState<number>(0);
  const [moveEnd, setMoveEnd] = useState(true);

  return (
    <section
      onTransitionEnd={() => setMoveEnd(true)}
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
        setMoveEnd={setMoveEnd}
      />
      <TotalAlbumItems isTotal={isTotal} moveEnd={moveEnd} />
    </section>
  );
}

interface TotalAlbumItemsType {
  isTotal: boolean;
  moveEnd: boolean;
}

/**
 * 전체 앨범 리스트
 * @returns
 */
function TotalAlbumItems(props: TotalAlbumItemsType) {
  const router = useRouter();
  const { getTotal, getTotalIsLoading } = useGetTotal();

  const { mutate } = Mutations().usePutFav("total");

  const default_profile = [
    "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1683319586943-766e45c00e3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3M3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1683406164037-5c97ea978964?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1661956602926-db6b25f75947?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
  ];

  const totalAlbums: React.ReactNode =
    getTotalIsLoading || !props.isTotal || !props.moveEnd ? (
      <>
        {[...Array(5)].map((_, i) => (
          <LoadingTotal key={i} />
        ))}
      </>
    ) : getTotal ? (
      getTotal.map((album: TotalAlbumType) => (
        <div key={album.album_id} className="relative">
          <div
            onClick={() => router.push(`/album/${album.album_id}`)}
            className={`flex flex-col items-end justify-end bg-center bg-cover relative ${styles.total_item}`}
            style={{
              backgroundImage: `url(${
                album.thumbnail_photo_url
                  ? album.thumbnail_photo_url
                  : default_profile[album.album_id % 4]
              })`,
              padding: "2.051vw",
              borderRadius: "3.077vw",
            }}
          >
            <div className="flex flex-col items-end text-white text-left">
              <span>{album.album_name}</span>
              <span>
                {album.album_created_date.slice(0, 10).replaceAll("-", ".")}
              </span>
            </div>
          </div>
          <HeartIcon
            onClick={() => mutate(album.album_id)}
            fill={album.isAlbumFav ? "red" : "none"}
            stroke={album.isAlbumFav ? "red" : "white"}
            style={{ position: "absolute", top: "16px", left: "122px" }}
            width="6.154vw"
            height="6.154vw"
          />
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
  setMoveEnd: React.Dispatch<React.SetStateAction<boolean>>;
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
  setMoveEnd,
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
        setMoveEnd(false);
      }}
      onTouchEnd={(e) => {
        setIsMove(false);
        touchStart - e.changedTouches[0].pageY >= 0
          ? setIsTotal(true)
          : setIsTotal(false);
        setMoveEnd(false);
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
        className="stroke-black dark:stroke-white"
      />
    </div>
  );
}

export default TotalAlbum;
