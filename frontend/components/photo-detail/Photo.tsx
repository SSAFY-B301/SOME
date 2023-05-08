import React, { useState, useEffect } from "react";
import styles from "@/pages/album/[album_id]/[photo_id]/photo.module.scss";

interface Props {
  imgSrc: string;
  clickImg(): void;
  showConcentrationMode: boolean;
  isZoom: boolean;
  ratio: number;
  onTouchEnd(e: React.TouchEvent): void;
  onTouchStart(e: React.TouchEvent): void;
}

const Photo = ({
  imgSrc,
  clickImg,
  showConcentrationMode,
  isZoom,
  ratio,
  onTouchEnd,
  onTouchStart,
}: Props): JSX.Element => {
  /**
   * state 세팅
   */
  const [doubleTap, setDoubleTap] = useState<string>(styles.defaultScale);

  useEffect(() => {
    if (isZoom) {
      setDoubleTap(styles.doubleTapScale);
    } else {
      setDoubleTap(styles.defaultScale);
    }
  });

  let posX: number;
  let posY: number;

  const moveScreenStart = (e: React.DragEvent) => {
    const img = new Image();
    e.dataTransfer.setDragImage(img, 0, 0);

    posX = e.clientX;
    posY = e.clientY;
  };

  // const moveScreen = (e: React.DragEvent) => {
  //   const limitX = e.target.offsetLeft + (e.clientX - posX) <= 0;
  //   const limitY = e.target.offsetTop + (e.clientY - posY) <= 0;

  //   e.target.style.left = limitX
  //     ? `${e.target.offsetLeft + (e.clientX - posX)}px`
  //     : "0px";
  //   e.target.style.top = limitY
  //     ? `${e.target.offsetTop + (e.clientY - posY)}px`
  //     : "0px";

  //   posX = limitX ? e.clientX : 0;
  //   posY = limitY ? e.clientY : 0;
  // };

  // const moveScreenEnd = (e: React.DragEvent) => {
  //   const limitX = e.target.offsetLeft + (e.clientX - posX) <= 0;
  //   const limitY = e.target.offsetTop + (e.clientY - posY) <= 0;

  //   e.target.style.left = limitX
  //     ? `${e.target.offsetLeft + (e.clientX - posX)}px`
  //     : "0px";
  //   e.target.style.top = limitY
  //     ? `${e.target.offsetTop + (e.clientY - posY)}px`
  //     : "0px";

  //   setScreen({ top: e.target.style.top, left: e.target.style.left });
  // };

  return (
    <div
      className={
        showConcentrationMode
          ? "absolute w-screen h-screen z-30 flex justify-center items-center bg-black"
          : "absolute w-screen h-screen z-10 flex justify-center items-center"
      }
      onClick={clickImg}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative w-screen h-screen overflow-hidden top-0 left-0">
        <div
          className={`absolute bg-center bg-no-repeat bg-contain origin-center ${doubleTap}`}
          style={{
            backgroundImage: "url(" + imgSrc + ")",
            width: `${100 * ratio}%`,
            height: `${100 * ratio}%`,
            transform: `scale(${ratio})`,
          }}
          onDragStart={moveScreenStart}
          // onDrag={moveScreen}
          // onDragEnd={moveScreenEnd}
          draggable="true"
        ></div>
      </div>
    </div>
  );
};

export default Photo;
