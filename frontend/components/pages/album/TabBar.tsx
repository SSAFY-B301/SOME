// 라이브러리
import React, { useRef } from "react";
import { useRouter } from "next/router";

// API
import { Mutations, useGetDetail } from "@/pages/api/albumApi";

//CSS
import styles from "styles/album.module.scss";

// 아이콘
import HeartIcon from "public/icons/Heart.svg";
import DotsIcon from "public/icons/DotsThreeOutline.svg";
import DownloadIcon from "public/icons/DownloadSimple.svg";
import TrashIcon from "public/icons/Trash.svg";
import UploadIcon from "public/icons/UploadSimple.svg";

// 인터페이스
interface TabBarType {
  isSelect: boolean;
  isAlerts: boolean[];
  setIsAlerts: React.Dispatch<React.SetStateAction<boolean[]>>;
  selectedPhotos: Set<number>;
}

/**
 * 하단 탭바 컴포넌트
 * @param isSelect 선택 여부
 * @param isAlerts
 * @param setIsAlerts
 * @returns
 */
function TabBar(props: TabBarType) {
  const router = useRouter();
  const albumId: number = Number(router.query.album_id);
  const { getDetail } = useGetDetail(albumId);

  /**
   * 앨범 좋아요 수정
   */
  const { usePutFav } = Mutations();
  const { mutate: putFavMutate } = usePutFav("album", albumId);

  const clickLike = () => {
    putFavMutate(albumId);
  };

  const openAlert = (idx: number) => {
    props.isAlerts[idx] = true;
    props.setIsAlerts([...props.isAlerts]);
  };

  const share = (selectedPhotos: Set<number>) => {};

  return (
    <section className={`${styles.tab_bar} bg-white dark:bg-dark-block`}>
      {props.isSelect ? (
        <>
          <UploadIcon onClick={() => share()} stroke={"black"} />
          <DownloadIcon onClick={() => openAlert(1)} stroke={"black"} />
          <TrashIcon onClick={() => openAlert(0)} stroke={"black"} />
        </>
      ) : (
        <>
          <HeartIcon
            onClick={clickLike}
            width={"8.205vw"}
            height={"8.205vw"}
            stroke={
              getDetail
                ? getDetail.isAlbumFav
                  ? "none"
                  : "#B1B8C0"
                : "#B1B8C0"
            }
            fill={getDetail ? (getDetail.isAlbumFav ? "red" : "none") : "none"}
          />
          <DotsIcon
            onClick={() => openAlert(3)}
            width={"8.205vw"}
            height={"8.205vw"}
            stroke={"#061C3D"}
          />
        </>
      )}
    </section>
  );
}

export default TabBar;
