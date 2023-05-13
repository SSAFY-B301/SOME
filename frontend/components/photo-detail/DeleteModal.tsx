import { useMutationPhoto } from "@/pages/api/photoDetailApi";
import React from "react";

interface Props {
  clickDelete(): void;
}

/**
 * 사진 삭제 모달 창
 */

const DeleteModal = ({ clickDelete }: Props): JSX.Element => {
  const { deleteMutation } = useMutationPhoto();
  /**
   * 사진 삭제 기능 추가
   */
  function photoDelete() {
    deleteMutation();
  }

  return (
    <div
      className="fixed top-0 left-0 z-20 flex items-center justify-center w-screen h-screen bg-black/50"
      onClick={clickDelete}
    >
      <div className="flex flex-col items-center justify-end w-11/12 h-full">
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col items-center justify-center w-full bg-white dark:bg-dark-block h-36 rounded-xl"
        >
          <div className="flex items-center justify-center w-full text-gray-400 dark:text-white border-b-2 h-1/2">
            사진이 앨범에서 삭제됩니다.
          </div>
          <button
            // onClick={photoDelete}
            className="flex items-center justify-center w-full text-2xl font-bold h-1/2 text-rose-500"
          >
            삭제
          </button>
        </div>
        <button
          className="box-border flex items-center justify-center w-full h-16 mt-2 mb-8 text-2xl font-bold bg-white dark:bg-dark-block rounded-xl"
          onClick={clickDelete}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
