import Photo from "components/common/Photo";
import styles from "styles/album.module.scss";
import NewPhoto from "./NewPhoto";
import React from "react";
import Link from "next/link";
interface PhotosType {
  photos: PhotoType[];
  isSelect: boolean;
  selectedCategory: number;
  selectedPhotos: Set<number>;
  setSelectedPhotos: React.Dispatch<React.SetStateAction<Set<number>>>;
}

interface PhotoType {
  id: number;
  img: string;
  user: number;
  category: number;
  createdTime: string;
}

function Photos({
  photos,
  isSelect,
  selectedCategory,
  selectedPhotos,
  setSelectedPhotos,
}: PhotosType) {
  const addCheckPhoto = (id: number) => {
    selectedPhotos.has(id) ? selectedPhotos.delete(id) : selectedPhotos.add(id);
    setSelectedPhotos(new Set(selectedPhotos));
  };

  return (
    <section className={`${styles.photos} grid grid-cols-4`}>
      {photos.map(
        (photo) =>
          (selectedCategory === 0 || selectedCategory === photo.category) && (
            <div onClick={() => isSelect && addCheckPhoto(photo.id)}>
              <Link
                href={{
                  pathname: `/photo/${photo.id}`,
                  query: { id: photo.id },
                }}
              >
                <Photo
                  key={photo.id}
                  width={"22.564vw"}
                  height={"22.564vw"}
                  selectedPhotos={selectedPhotos}
                  photoId={photo.id}
                  img={photo.img}
                />
              </Link>
            </div>
          )
      )}
      <NewPhoto />
    </section>
  );
}

export default Photos;
