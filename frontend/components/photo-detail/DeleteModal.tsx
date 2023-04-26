import React from "react";

interface Props {
  clickDelete(): void;
}

/**
 * 사진 삭제 모달 창
 */

const DeleteModal = ({ clickDelete }: Props): JSX.Element => {
  /**
   * 사진 삭제 기능 추가
   */

  return (
    <div
      className="fixed left-0 top-0 w-screen h-screen bg-black/50 flex justify-center items-center"
      onClick={clickDelete}
    >
      <div className="w-11/12 h-full flex flex-col justify-end items-center">
        <div className="w-full h-36 bg-white rounded-xl flex flex-col justify-center items-center">
          <div className="w-full h-1/2 border-b-2 flex justify-center items-center text-gray-400">
            사진이 앨범에서 삭제됩니다.
          </div>
          <button className="w-full h-1/2 flex justify-center items-center text-2xl font-bold text-rose-500">
            삭제
          </button>
        </div>
        <button
          className="w-full h-16 bg-white rounded-xl flex justify-center items-center box-border mt-2 mb-8 text-2xl font-bold"
          onClick={clickDelete}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
