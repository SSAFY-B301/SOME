import React from "react";

interface Props {
  clickImg(): void;
  showConcentrationMode: boolean;
}

const Photo = ({ clickImg, showConcentrationMode }: Props): JSX.Element => {
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
          className="w-full h-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(" +
              "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fCVFQyU4MiVBQyVFQiU5RSU4Q3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" +
              ")",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Photo;
