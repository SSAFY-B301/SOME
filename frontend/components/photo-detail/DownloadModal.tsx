import React from "react";

interface Props {
  clickDownload(): void;
}

/**
 * 사진 다운로드 모달 창
 */

const DownloadModal = ({ clickDownload }: Props): JSX.Element => {
  /**
   * 사진 다운로드 기능 추가
   */

  return (
    <div
      className="fixed left-0 top-0 w-screen h-screen z-20 bg-black/50 flex justify-center items-center"
      onClick={clickDownload}
    >
      <div className="w-11/12 h-full flex flex-col justify-end items-center">
        <div className="w-full h-36 bg-white rounded-xl flex flex-col justify-center items-center">
          <div className="w-full h-1/2 border-b-2 flex justify-center items-center text-gray-400">
            사진을 다운로드 합니다.
          </div>
          <button className="w-full h-1/2 flex justify-center items-center text-2xl font-bold text-blue-500">
            확인
          </button>
        </div>
        <button
          className="w-full h-16 bg-white rounded-xl flex justify-center items-center box-border mt-2 mb-8 text-2xl font-bold"
          onClick={clickDownload}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default DownloadModal;
