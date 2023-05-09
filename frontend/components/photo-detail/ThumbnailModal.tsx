import React from "react";

interface Props {
  clickThumbnail(): void;
  clickPutThumbnail(): void;
}

/**
 * 썸네일 변경 모달 창
 */

const ThumbnailModal = ({
  clickThumbnail,
  clickPutThumbnail,
}: Props): JSX.Element => {
  return (
    <div
      className="fixed left-0 top-0 w-screen h-screen z-20 bg-black/50 flex justify-center items-center"
      onClick={clickThumbnail}
    >
      <div className="w-11/12 h-full flex flex-col justify-end items-center">
        <div className="w-full h-36 bg-white rounded-xl flex flex-col justify-center items-center">
          <div className="w-full h-1/2 border-b-2 flex justify-center items-center text-gray-400">
            대표 이미지가 변경됩니다.
          </div>
          <button className="w-full h-1/2 flex justify-center items-center text-2xl font-bold text-blue-500">
            변경하기
          </button>
        </div>
        <button
          className="w-full h-16 bg-white rounded-xl flex justify-center items-center box-border mt-2 mb-8 text-2xl font-bold"
          onClick={clickThumbnail}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default ThumbnailModal;
