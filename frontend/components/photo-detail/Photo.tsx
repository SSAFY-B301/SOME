import React, { useState, useEffect } from "react";
import styles from "@/pages/album/[album_id]/[photo_id]/photo.module.scss";

interface Props {
  imgSrc: string;
  clickImg(): void;
  showConcentrationMode: boolean;
  isZoom: boolean;
}

const Photo = ({
  imgSrc,
  clickImg,
  showConcentrationMode,
  isZoom,
}: Props): JSX.Element => {
  const [doubleTap, setDoubleTap] = useState<string>(styles.defaultScale);

  useEffect(() => {
    if (isZoom) {
      setDoubleTap(styles.doubleTapScale);
    } else {
      setDoubleTap(styles.defaultScale);
    }
  });

  return (
    <div
      className={
        showConcentrationMode
          ? "absolute w-screen h-screen z-30 flex justify-center items-center bg-black"
          : "absolute w-screen h-screen z-10 flex justify-center items-center"
      }
      onClick={clickImg}
    >
      <div
        className="relative overflow-hidden"
        style={{ width: "100vw", height: "100vh" }}
      >
        <div
          className={`absolute w-full h-full bg-center bg-no-repeat bg-contain ${doubleTap}`}
          style={{
            backgroundImage: "url(" + imgSrc + ")",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Photo;
