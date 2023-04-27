import React from "react";

interface Props {
  clickImg(): void;
}

const ConcentrationModal = ({ clickImg }: Props): JSX.Element => {
  return (
    <div
      className="fixed left-0 top-0 w-screen h-screen z-30 bg-black flex justify-center items-center"
      onClick={clickImg}
    >
      <div className="w-full h-full flex flex-col justify-center items-center">
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

export default ConcentrationModal;
