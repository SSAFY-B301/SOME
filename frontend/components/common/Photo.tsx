import Image from "next/image";
import CheckIcon from "public/icons/Check.svg";
import styles from "styles/album.module.scss";

interface PhotoType {
  width: string;
  height: string;
  img: string;
  selectedPhotos: Set<number>;
  photoId: number;
}

/**
 * 사진 컴포넌트
 * @param width: string
 * @param height: string
 * @param img: string
 * @returns
 */
function Photo(props: PhotoType) {
  return (
    <div
      className={`${styles.photo} justify-end items-end relative`}
      style={{
        width: props.width,
        height: props.height,
      }}
    >
      <Image
        src={props.img}
        alt="photo"
        style={{
          objectFit: "cover",
        }}
        loading="lazy"
        fill
      />

      {props.selectedPhotos.has(props.photoId) && (
        <div className={`${styles.select_check}`}>
          <CheckIcon width={"3.077vw"} height={"3.077vw"} fill={"white"} />
        </div>
      )}
    </div>
  );
}

export default Photo;
