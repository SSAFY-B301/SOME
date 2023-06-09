import { default as ImageTag } from "next/image";
import React, { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface Props {
  imgSrc: string;
  clickImg(): void;
  showConcentrationMode: boolean;
}

const Photo = ({
  imgSrc,
  clickImg,
  showConcentrationMode,
}: Props): JSX.Element => {
  const [scale, setScale] = useState<number>(1);

  const onZoomHandler = (state: any) => {
    setScale(state.state.scale);
  };

  const img = new Image();
  img.src = imgSrc;

  return (
    <div
      className={
        showConcentrationMode
          ? "absolute w-screen h-screen z-30 flex justify-center items-center bg-black"
          : "absolute w-screen h-screen z-10 flex justify-center items-center"
      }
      onClick={clickImg}
    >
      <TransformWrapper
        initialScale={scale}
        minScale={1}
        maxScale={5}
        disablePadding={true}
        centerOnInit={true}
        panning={scale == 1 ? { disabled: true } : { disabled: false }}
        onZoomStop={(state) => onZoomHandler(state)}
      >
        <TransformComponent
          wrapperStyle={{
            width: "100vw",
            height: "100vh",
          }}
        >
          <div className="relative" style={{ width: "100vw", height: "70vh" }}>
            <ImageTag
              src={imgSrc}
              alt="photo"
              // width={img.width}
              // height={img.height}
              style={{ objectFit: "contain" }}
              fill
            />
          </div>
          {/* <img src={`${imgSrc}`} /> */}
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default Photo;
