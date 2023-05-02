import React from "react";

interface Props {
  imgSrc : string,
  clickImg(): void;
  showConcentrationMode: boolean;
}

const Photo = ({ imgSrc, clickImg, showConcentrationMode }: Props): JSX.Element => {
  return (
    <div
      className={
        showConcentrationMode
          ? "absolute w-screen h-screen z-30 flex justify-center items-center bg-black"
          : "absolute w-screen h-screen z-10 flex justify-center items-center"
      }
      onClick={clickImg}
    >
      <div className="w-screen h-screen">
        <div
          className="w-full h-full bg-center bg-no-repeat bg-contain"
          style={{
            backgroundImage:
              "url(" +
              imgSrc +
              ")",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Photo;
