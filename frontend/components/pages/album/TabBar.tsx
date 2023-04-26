// 라이브러리
import React from "react";

//CSS
import styles from "@/styles/album.module.scss";

// 아이콘
import HeartIcon from "@/public/icons/Heart.svg";
import DotsIcon from "@/public/icons/DotsThreeOutline.svg";

interface TabBarType {
  albumInfo: AlbumInfoType;
  setAlbumInfo: React.Dispatch<React.SetStateAction<AlbumInfoType>>;
}
interface AlbumInfoType {
  id: number;
  name: string;
  members: MemberType[];
  categories: number[];
  total: number;
  isLike: boolean;
  createdTime: string;
}

interface MemberType {
  id: number;
  name: string;
  img: string;
}

function TabBar({ albumInfo, setAlbumInfo }: TabBarType) {
  const clickLike = () => {
    albumInfo = {
      ...albumInfo,
      isLike: !albumInfo.isLike,
    };
    setAlbumInfo(albumInfo);
  };
  return (
    <section className={`${styles.tab_bar}`}>
      <HeartIcon
        onClick={clickLike}
        width={"8.205vw"}
        height={"8.205vw"}
        stroke={albumInfo.isLike ? "none" : "#B1B8C0"}
        fill={albumInfo.isLike ? "red" : "none"}
      />
      <DotsIcon width={"8.205vw"} height={"8.205vw"} stroke={"#061C3D"} />
    </section>
  );
}

export default TabBar;
