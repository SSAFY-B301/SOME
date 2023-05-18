import { useMutationPhoto } from "@/pages/api/photoDetailApi";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  clickDelete(): void;
  photoId: number;
}

/**
 * 사진 삭제 모달 창
 */

const DeleteModal = ({ clickDelete, photoId }: Props): JSX.Element => {
  const { deleteMutation } = useMutationPhoto(photoId);
  /**
   * 사진 삭제 기능 추가
   */
  function photoDelete() {
    deleteMutation(photoId);
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 z-20 flex items-center justify-center w-screen h-screen bg-black/50"
        onClick={clickDelete}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="flex flex-col items-center justify-end w-11/12 h-full"
          initial={{ position: "fixed", opacity: 0, bottom: "-208px" }}
          animate={{ position: "fixed", opacity: 1, bottom: "0px" }}
          exit={{ position: "fixed", opacity: 0, bottom: "-208px" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center justify-center w-full opacity-90 bg-white dark:bg-dark-block h-24 rounded-xl"
          >
            <div className="flex items-center justify-center w-full text-gray-400 dark:text-white border-b-2 h-3/6 text-sm">
              사진이 앨범에서 삭제됩니다.
            </div>
            <button
              onClick={() => photoDelete()}
              className="flex items-center justify-center w-full text-lg font-bold h-4/6 text-rose-500"
            >
              삭제
            </button>
          </div>
          <button
            className="box-border flex items-center justify-center w-full h-14 mt-2 mb-8 text-lg font-bold opacity-90 bg-white dark:bg-dark-block rounded-xl"
            onClick={clickDelete}
          >
            취소
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteModal;
