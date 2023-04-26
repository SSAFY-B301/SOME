// 컴포넌트
import Photos from "@/components/pages/album/Photos";
import Categories from "@/components/pages/album/Categories";
import Members from "@/components/pages/album/Members";
import NavBar from "@/components/pages/album/NavBar";
import TabBar from "@/components/pages/album/TabBar";

// 라이브러리
import { useRouter } from "next/router";

// API
import {
  albumInfo as albumInfoData,
  photos as PhotosData,
} from "@/pages/api/albumDummyApi";
import { useState } from "react";

function AlbumDetail() {
  const router = useRouter();
  const [albumInfo, setAlbumData] = useState(albumInfoData.data);
  const [photos, setPhotos] = useState(PhotosData.data);

  const [selectedCategory, setSelectedCategory] = useState<string>("0");

  return (
    <>
      <NavBar title={albumInfo.name} />
      <Members members={albumInfo.members} albumId={albumInfo.id} />
      <Categories categories={albumInfo.categories} />
      <Photos photos={photos} />
      <TabBar />
    </>
  );
}

export default AlbumDetail;
