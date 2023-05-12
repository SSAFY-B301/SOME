import React from "react";
import PhotoFeatures from "./PhotoFeatures";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface Props {
  imgSrc: string;
  photoId: number;
  clickImg(): void;
  showConcentrationMode: boolean;
  isZoom: boolean;
  ratio: number;
  // onTouchEnd(e: React.TouchEvent): void;
  // onTouchStart(e: React.TouchEvent): void;
}

const Photo = ({
  imgSrc,
  photoId,
  clickImg,
  showConcentrationMode,
  isZoom,
  ratio,
}: // onTouchEnd,
// onTouchStart,
Props): JSX.Element => {
  console.log(photoId);

  return (
    <div
      className={
        showConcentrationMode
          ? "absolute w-screen h-screen z-30 flex justify-center items-center bg-black"
          : "absolute w-screen h-screen z-10 flex justify-center items-center"
      }
      onClick={clickImg}
      // onTouchStart={onTouchStart}
      // onTouchEnd={onTouchEnd}
    >
      <div className="w-screen h-screen flex justify-center items-center overflow-hidden">
        <TransformWrapper
          initialScale={1}
          minScale={1}
          maxScale={5}
          disablePadding={true}
          centerOnInit={true}
          // panning={isZoom ? { disabled: false } : { disabled: true }}
          doubleClick={{ disabled: true }}
        >
          <TransformComponent>
            <img src={`${imgSrc}`} />
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
};

export default Photo;
