import { useState } from "react";
import styles from "styles/album.module.scss";

interface PreviewType {
  previewPhotos: previewPhotoType[];
  photoLength: number | undefined;
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>;
}
interface previewPhotoType {
  id: number;
  img: string;
}
function Preview({ previewPhotos, photoLength, setIsPreview }: PreviewType) {
  const [viewId, setViewId] = useState<number>(0);

  const changeIsPreview = () => {
    setIsPreview(false);
  };
  return (
    <section className={`${styles.preview}`}>
      {/* 네브바 */}
      <nav>
        <p onClick={changeIsPreview}>취소</p>
        <p>{`${viewId + 1}/${photoLength}`}</p>
        <p>확인</p>
      </nav>

      {/* 사진 보기 */}
      <div
        className={`bg-cover bg-center ${styles.view_photo}`}
        style={{ backgroundImage: `url(${previewPhotos[viewId].img})` }}
      ></div>

      {/* 사진 목록 */}
      <div className={`${styles.photos_container}`}>
        <div className={`${styles.photo_box}`}>
          {previewPhotos.map((photo) => (
            <div
              key={photo.id}
              className={`bg-cover bg-center ${styles.photo_list}`}
              style={{ backgroundImage: `url(${photo.img})` }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NavBar() {
  return <></>;
}

function ViewPhoto() {
  return <></>;
}

function Photos() {
  return <></>;
}

function Footer() {
  return <></>;
}

export default Preview;
