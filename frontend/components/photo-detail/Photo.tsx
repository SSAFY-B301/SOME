import React, { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface Props {
  imgSrc: string;
  clickImg(): void;
  showConcentrationMode: boolean;
  // onTouchEnd(e: React.TouchEvent): void;
  // onTouchStart(e: React.TouchEvent): void;
}

const Photo = ({
  imgSrc,
  clickImg,
  showConcentrationMode,
}: // onTouchEnd,
// onTouchStart,
Props): JSX.Element => {
  const [scale, setScale] = useState<number>(1);

  const onZoomHandler = (state: any) => {
    setScale(state.state.scale);
  };

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
          initialScale={scale}
          minScale={1}
          maxScale={5}
          disablePadding={true}
          panning={scale == 1 ? { disabled: true } : { disabled: false }}
          doubleClick={{ disabled: true }}
          onZoomStop={(state) => onZoomHandler(state)}
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
