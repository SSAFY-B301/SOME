import Photo from "components/common/Photo";
import styles from "styles/album.module.scss";
import NewPhoto from "./NewPhoto";
import React from "react";
import { useRouter } from "next/router";
interface PhotosType {
  photos: PhotoType[];
  isSelect: boolean;
  selectedCategory: number;
  selectedPhotos: Set<number>;
  setSelectedPhotos: React.Dispatch<React.SetStateAction<Set<number>>>;
  selectMembers: Set<number>;
}

interface PhotoType {
  id: number;
  img: string;
  user: number;
  category: number;
  createdTime: string;
  setPreviewPhoto: React.Dispatch<React.SetStateAction<any>>;
}

function Photos({
  photos,
  isSelect,
  selectedCategory,
  selectedPhotos,
  setSelectedPhotos,
  selectMembers,
  setPreviewPhoto,
}: PhotosType) {
  const router = useRouter();

  // 사진 선택 상태 바꾸기
  const changeSelect = (id: number) => {
    selectedPhotos.has(id) ? selectedPhotos.delete(id) : selectedPhotos.add(id);
    setSelectedPhotos(new Set(selectedPhotos));
  };

  const goPhoto = (id: number) => {
    router.push(`/photo/${id}`);
  };

  return (
    <section className={`${styles.photos} grid grid-cols-4`}>
      {photos.map(
        (photo) =>
          (selectedCategory === 0 || selectedCategory === photo.category) &&
          selectMembers.has(photo.user) && (
            <div
              onClick={() =>
                isSelect ? changeSelect(photo.id) : goPhoto(photo.id)
              }
            >
              <Photo
                key={photo.id}
                width={"22.564vw"}
                height={"22.564vw"}
                selectedPhotos={selectedPhotos}
                photoId={photo.id}
                img={photo.img}
              />
            </div>
          )
      )}
      {!isSelect && <NewPhoto setPreviewPhoto={setPreviewPhoto} />}
    </section>
  );
}

export default Photos;
