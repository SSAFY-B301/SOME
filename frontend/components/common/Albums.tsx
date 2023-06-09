// 라이브러리
import { useRouter } from "next/router";

// 컴포넌트
import ItemBlock from "components/common/ItemBlock";
import defaultImages from "components/common/DefaultImages";

// API
import { useGetFavorite, Mutations } from "@/pages/api/albumApi";

// CSS
import styles from "styles/home.module.scss";

// 아이콘
import HeartIcon from "public/icons/Heart.svg";
import PlusIcon from "public/icons/Plus.svg";

// 타입
import { FavoriteAlbumType } from "@/types/AlbumTypes";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setALbumIdState, setInit } from "@/features/albumStatusSlice";
import Image from "next/image";

/**
 * 즐겨찾는 앨범
 */
function FavoriteAlbum() {
  const router = useRouter();

  const { getFavorite, getFavoriteIsLoading } = useGetFavorite();

  const { mutate } = Mutations().usePutFav("favorite");

  /**
   * 즐겨찾기 토글
   * @param id
   */
  const clickedHeart = (id: number) => {
    // TODO : 즐겨찾기 API 연결

    mutate(id);
  };

  const dispatch = useDispatch();
  const goToAlbum = (id: number) => {
    dispatch(setInit());
    dispatch(setALbumIdState({ albumId: id }));
    router.push(`/album/${id}`);
  };

  /**
   * 즐겨찾는 앨범 리스트
   */
  const favorites: React.ReactNode = getFavoriteIsLoading ? (
    <></>
  ) : getFavorite && getFavorite.length > 0 ? (
    getFavorite.map((favoriteAlbum: FavoriteAlbumType, index) => (
      <div key={favoriteAlbum.album_id} className={`${styles.card}`}>
        <div
          onClick={() => goToAlbum(favoriteAlbum.album_id)}
          className="relative"
          style={{
            width: "73.846vw",
            height: "98.462vw",
            borderRadius: "3.077vw",
          }}
        >
          <Image
            className={styles.image}
            src={
              favoriteAlbum.thumbnail_photo_url
                ? favoriteAlbum.thumbnail_photo_url
                : defaultImages[favoriteAlbum.album_id % 8]
            }
            alt="fav"
            style={{ objectFit: "cover", borderRadius: "3.077vw" }}
            loading={index < 5 ? "eager" : "lazy"}
            priority={index < 5 ? true : false}
            sizes="73.846vw"
            fill
          />
          <div
            className="relative flex flex-col "
            style={{
              maxWidth: "fit-content",
              minWidth: "18.462vw",
              top: "14.359vw",
              left: "4.103vw",
            }}
          >
            <span
              className="text-white text-end"
              style={{ fontSize: "7.692vw" }}
            >
              {favoriteAlbum.album_name}
            </span>
            <span
              className="text-white text-end"
              style={{ fontSize: "3.59vw" }}
            >
              {favoriteAlbum.album_created_date
                .slice(0, 10)
                .replaceAll("-", ".")}
            </span>
          </div>
        </div>
        {/* <div
          onClick={() => goToAlbum(favoriteAlbum.album_id)}
          className="pt-10 bg-center bg-cover"
          style={{
            width: "73.846vw",
            height: "98.462vw",
            borderRadius: "3.077vw",
            backgroundImage: `url(${
              favoriteAlbum.thumbnail_photo_url
                ? favoriteAlbum.thumbnail_photo_url
                : default_profile[favoriteAlbum.album_id % 4]
            })`,
          }}
        >
          <div
            className="relative flex flex-col "
            style={{
              maxWidth: "fit-content",
              minWidth: "18.462vw",
              top: "6.154vw",
              left: "4.103vw",
            }}
          >
            <span
              className="text-white text-end"
              style={{ fontSize: "7.692vw" }}
            >
              {favoriteAlbum.album_name}
            </span>
            <span
              className="text-white text-end"
              style={{ fontSize: "3.59vw" }}
            >
              {favoriteAlbum.album_created_date
                .slice(0, 10)
                .replaceAll("-", ".")}
            </span>
          </div>
        </div> */}
        <div className="relative" style={{ top: "-97.436vw" }}>
          <div className="relative flex justify-end gap-2 top-4 right-4">
            <HeartIcon
              onClick={() => clickedHeart(favoriteAlbum.album_id)}
              fill={"red"}
              stroke={"red"}
              width="6.154vw"
              height="6.154vw"
            />
          </div>
        </div>
      </div>
    ))
  ) : (
    [...Array(1)].map((_, i) => (
      <Link href={"/album/create"} key={i}>
        <div
          className={`w-72 h-96 rounded-xl grow flex-shrink-0 flex flex-col justify-center items-center gap-4 text-xl ${styles.card}`}
          style={{ backgroundColor: "#B1B8C0" }}
        >
          <div
            className={`flex justify-center items-center rounded-full border-4 border-white`}
            style={{ width: "16.41vw", height: "16.41vw" }}
          >
            <PlusIcon />
          </div>
          <div>
            <span className={`text-white`}>앨범 생성하러 가기</span>
          </div>
        </div>
      </Link>
    ))
  );
  return (
    <ItemBlock width="92.308vw" height="" radius="5.128vw">
      <div
        className="flex flex-col w-full h-full"
        style={{ gap: "4.103vw", padding: "16px 0px" }}
      >
        <div
          className={`flex justify-between ${styles.title_box}`}
          style={{ margin: "0px 4.103vw" }}
        >
          <h1 className="font-bold" style={{ fontSize: "5.128vw" }}>
            즐겨찾는 앨범
          </h1>
          {/* <RightIcon stroke="#B1B8C0" width="5.128vw" height="5.128vw" /> */}
        </div>
        <div
          className={`flex ${
            getFavorite?.length === 1 || getFavorite?.length === 0
              ? "justify-center"
              : "justify-start"
          } overflow-scroll ${styles.cards}`}
          style={{ gap: "4.103vw" }}
        >
          {favorites}
          <div className={`${styles.mask}`}></div>
        </div>
      </div>
    </ItemBlock>
  );
}

export { FavoriteAlbum };
