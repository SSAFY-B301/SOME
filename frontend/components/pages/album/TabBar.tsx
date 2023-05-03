// 라이브러리
import React from "react";
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
}

/**
 * 하단 탭바 컴포넌트
 * @param albumInfo 사진 정보 Object
 * @param setAlbumInfo 사진 정보 Object의 Setter 함수
 * @param isSelect 선택 여부
 * @returns
 */
function TabBar({ isSelect }: TabBarType) {
  const router = useRouter();
  const albumId: number = Number(router.query.album_id);
  const { getDetail } = useGetDetail(albumId);

  /**
   * 앨범 좋아요 수정
   */
  const { usePutFav } = Mutations();
  const { mutate } = usePutFav(albumId);

  const clickLike = () => {
    mutate(albumId);
  };
  return (
    <section className={`${styles.tab_bar}`}>
      {isSelect ? (
        <>
          <UploadIcon />
          <DownloadIcon />
          <TrashIcon />
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
          <DotsIcon width={"8.205vw"} height={"8.205vw"} stroke={"#061C3D"} />
        </>
      )}
    </section>
  );
}

export default TabBar;
