import React, { useState, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import styles from "@/pages/album/[album_id]/[photo_id]/photo.module.scss";

/**
 * react-zoom-pan-pinch 사용할 지 말 지 고민 중
 */

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
   * 드래그 모션 state
   */
  // const [touchedX, setTouchedX] = useState(0);
  // const [touchedY, setTouchedY] = useState(0);
  // const [startPointX, setStartPointX] = useState(0);
  // const [startPointY, setStartPointY] = useState(0);

  // const moveScreenStart = (e: React.TouchEvent) => {
  //   if (isZoom) {
  //     setStartPointX(e.targetTouches[0].clientX);
  //     setStartPointY(e.targetTouches[0].clientY);

  //     console.log("드래그 시작");
  //   }
  // };

  // const moveScreen = (e: React.TouchEvent) => {
  //   if (isZoom) {
  //     setTouchedX(touchedX + e.targetTouches[0].clientX - startPointX);
  //     setTouchedY(touchedY + e.targetTouches[0].clientY - startPointY);
  //     console.log("드래그 중");
  //     console.log(touchedX);
  //     console.log(touchedY);
  //   }
  // };

  // const moveScreenEnd = (e: React.TouchEvent) => {
  //   if (isZoom) {
  //     console.log("드래그 끝");
  //   }
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
        {/* <div
          className={`absolute w-full h-full bg-center bg-no-repeat bg-contain`}
          style={{
            backgroundImage: "url(" + imgSrc + ")",
            //   width: `${100 * ratio}%`,
            //   height: `${100 * ratio}%`,
            //   transform: `scale(${ratio})`,
            //   transformOrigin: `${touchedX}px ${touchedY}px`,
          }}
          // onTouchStart={moveScreenStart}
          // onTouchMove={moveScreen}
          // onTouchEnd={moveScreenEnd}
        ></div> */}

        <div className="w-screen h-screen flex justify-center items-center">
          <TransformWrapper
            initialScale={1}
            minScale={1}
            maxScale={5}
            disablePadding={true}
          >
            <TransformComponent>
              <img src={`${imgSrc}`} />
            </TransformComponent>
          </TransformWrapper>
        </div>
      </div>
    </div>
  );
};

export default Photo;
