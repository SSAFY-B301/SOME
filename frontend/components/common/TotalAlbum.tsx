// 라이브러리
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

// API
import { Mutations, useGetTotal } from "@/pages/api/albumApi";

// CSS
import styles from "styles/total.module.scss";

// 아이콘
import HeartIcon from "public/icons/Heart.svg";
import UpIcon from "public/icons/CaretUp.svg";

// 타입
import { TotalAlbumType } from "types/AlbumTypes";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/types/StateType";
import { setIsMove, setIsTotal, setMoveEnd } from "@/features/totalSlice";
import { CommonLoading } from "./Loading";
import { setALbumIdState, setInit } from "@/features/albumStatusSlice";

function TotalAlbum() {
  const [touchPosition, setTouchPosition] = useState<number>(0);
  const { getTotal, getTotalIsLoading } = useGetTotal();

  const dispatch = useDispatch();

  const isMove = useSelector((state: StateType) => state.total.isMove);
  const isTotal = useSelector((state: StateType) => state.total.isTotal);
  const moveEnd = useSelector((state: StateType) => state.total.moveEnd);

  return (
    <section
      onTransitionEnd={() => dispatch(setMoveEnd(true))}
      style={{ top: `${touchPosition}` + "px" }}
      className={`${styles.total_album} ${
        !isMove && (isTotal ? styles.click_total_album : styles.no_click)
      } bg-white dark:bg-dark-block`}
    >
      <div className={`${styles.up} ${isTotal ? styles.upx : styles.upo}`}>
        <UpIcon width={"24px"} height={"24px"} stroke={"black"} />
      </div>
      <Header setTouchPosition={setTouchPosition} />
      {/* // TODO : 트랜지션 end 잡아서 내려갈때 로딩 X, 데이터 없을 때 표시 */}
      {isMove || getTotalIsLoading || !isTotal || !moveEnd ? (
        <>
          <CommonLoading />
        </>
      ) : (
        <TotalAlbumItems />
      )}
    </section>
  );
}

/**
 * 전체 앨범 리스트
 * @returns
 */
function TotalAlbumItems() {
  const router = useRouter();
  const { getTotal, getTotalIsLoading } = useGetTotal();

  const { mutate } = Mutations().usePutFav("total");

  const default_profile = [
    "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1683319586943-766e45c00e3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3M3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1683406164037-5c97ea978964?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1661956602926-db6b25f75947?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
  ];

  const dispatch = useDispatch();
  const goToAlbum = (id: number) => {
    dispatch(setInit());
    dispatch(setALbumIdState({ albumId: id }));
    router.push(`/album/${id}`);
  };

  const totalAlbums: React.ReactNode = getTotal ? (
    getTotal.map((album: TotalAlbumType) => (
      <div key={album.album_id} className="relative">
        <div
          onClick={() => goToAlbum(album.album_id)}
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
          style={{
            position: "absolute",
            top: "0px",
            left: "122px",
            margin: "8px",
          }}
          width="6.154vw"
          height="6.154vw"
        />
      </div>
    ))
  ) : (
    <div
      className="flex flex-col justify-center items-center gap-4"
      style={{ width: "91.794vw", height: "153.846vw" }}
    >
      <div
        className="flex flex-col justify-end items-center"
        style={{ height: "76.923vw" }}
      >
        <span>아직 앨범이 없습니다</span>
        <span>새로운 앨범을 생성하세요!</span>
      </div>
      <div
        className="flex items-end"
        style={{ height: "76.923vw", paddingBottom: "2.051vw" }}
      >
        <span className={styles.down}></span>
      </div>
    </div>
  );

  return (
    <section className=" overflow-scroll">
      <div
        className="grid grid-cols-2"
        style={{
          gap: "6.154vw",
          marginBottom: "41.026vw",
        }}
      >
        {totalAlbums}
      </div>
    </section>
  );
}

interface HeaderType {
  setTouchPosition: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * 전체 앨범 검색 부분
 * @param props
 * @returns
 */
function Header({ setTouchPosition }: HeaderType) {
  const [touchStart, setTouchStart] = useState<number>(0);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [flag, setFlag] = useState<boolean>(false);

  const isTotal = useSelector((state: StateType) => state.total.isTotal);

  useEffect(() => {
    !isTotal && setIsSearch(false);
  }, [isTotal]);
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(setIsTotal(true));
      }}
      onTouchStart={(e) => {
        setTouchStart(e.changedTouches[0].pageY);
      }}
      onTouchMove={(e) => {
        setTouchPosition(e.changedTouches[0].pageY);
        dispatch(setIsMove(true));
        dispatch(setMoveEnd(false));
      }}
      onTouchEnd={(e) => {
        dispatch(setIsMove(false));
        touchStart - e.changedTouches[0].pageY >= 0
          ? dispatch(setIsTotal(true))
          : dispatch(setIsTotal(false));
        !isTotal && dispatch(setMoveEnd(false));
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
        {/* <div>{isSearch && <input type="text" />}</div> */}
        <span>전체 앨범</span>
      </div>

      {/* <SearchIcon
        onClick={() => {
          isTotal && setFlag(true);
          setIsSearch(!isSearch);
        }}
        className="stroke-black dark:stroke-white"
      /> */}
    </div>
  );
}

export default TotalAlbum;
