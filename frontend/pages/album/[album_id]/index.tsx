// 컴포넌트
import Photos from "@/components/pages/album/Photos";
import Categories from "@/components/pages/album/Categories";
import Members from "@/components/pages/album/Members";
import NavBar from "@/components/pages/album/NavBar";
import TabBar from "@/components/pages/album/TabBar";

// 라이브러리
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// API
import {
  albumInfo as albumInfoData,
  photos as PhotosData,
} from "@/pages/api/albumDummyApi";

// CSS
import styles from "@/styles/album.module.scss";

function AlbumDetail() {
  const router = useRouter();
  const [albumInfo, setAlbumInfo] = useState(albumInfoData.data);
  const [photos, setPhotos] = useState(PhotosData.data);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const [selectedPhotos, setSelectedPhotos] = useState<Set<number>>(new Set());
  const [isTotal, setIsTotal] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      // TODO : API 보내기 추가
    };
  }, [albumInfo]);

  useEffect(() => {
    isTotal
      ? setSelectedPhotos(new Set(albumInfo.totalId))
      : setSelectedPhotos(new Set());
    !isSelect && setSelectedPhotos(new Set());
    console.log(1);
  }, [isTotal, isSelect]);

  // useEffect(() => {
  //   selectedPhotos.size === albumInfo.total && setIsTotal(true);
  //   console.log(2);
  //   console.log("S", selectedPhotos.size);
  //   console.log("T", albumInfo.total);
  //   console.log(selectedPhotos);
  // }, [selectedPhotos]);

  return (
    <section>
      <NavBar
        title={albumInfo.name}
        isSelect={isSelect}
        setIsSelect={setIsSelect}
        isTotal={isTotal}
        setIsTotal={setIsTotal}
      />
      <div className={`${styles.container}`}>
        <Members members={albumInfo.members} albumId={albumInfo.id} />
        <Categories
          categories={albumInfo.categories}
          selectedId={selectedCategory}
          setSelectedId={setSelectedCategory}
        />
        <Photos
          photos={photos}
          isSelect={isSelect}
          selectedCategory={selectedCategory}
          selectedPhotos={selectedPhotos}
          setSelectedPhotos={setSelectedPhotos}
        />
        <div className={`${styles.total_count}`}>
          <span>
            {isSelect
              ? `${selectedPhotos.size}장의 사진이 선택됨`
              : `${albumInfo.total}장의 사진`}
          </span>
        </div>
      </div>
      <TabBar
        albumInfo={albumInfo}
        setAlbumInfo={setAlbumInfo}
        isSelect={isSelect}
      />
    </section>
  );
}

export default AlbumDetail;
