import Photo from "@/components/common/Photo";
import styles from "@/styles/album.module.scss";

interface PhotosType {
  photos: PhotoType[];
}

interface PhotoType {
  id: number;
  img: string;
  user: number;
  category: number;
  createdTime: string;
}

function Photos({ photos }: PhotosType) {
  return (
    <section className={`${styles.photos} grid grid-cols-4`}>
      {photos.map((photo) => (
        <Photo
          key={photo.id}
          width={"22.564vw"}
          height={"22.564vw"}
          img={photo.img}
        />
      ))}
    </section>
  );
}

export default Photos;
