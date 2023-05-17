import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  clickDownload(): void;
  downloadPhoto(): void;
}

/**
 * 사진 다운로드 모달 창
 */

const DownloadModal = ({
  clickDownload,
  downloadPhoto,
}: Props): JSX.Element => {
  /**
   * 사진 다운로드 기능 추가
   */

  return (
    <AnimatePresence>
      <motion.div
        className="fixed left-0 top-0 w-screen h-screen z-20 bg-black/50 flex justify-center items-center"
        onClick={clickDownload}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-11/12 h-full flex flex-col justify-end items-center"
          initial={{ position: "fixed", opacity: 0, bottom: "-208px" }}
          animate={{ position: "fixed", opacity: 1, bottom: "0px" }}
          exit={{ position: "fixed", opacity: 0, bottom: "-208px" }}
        >
          <div className="w-full h-24 bg-white opacity-90 dark:bg-dark-block rounded-xl flex flex-col justify-center items-center">
            <div className="w-full h-3/6 border-b-2 flex justify-center items-center text-gray-400 dark:text-white text-sm">
              사진을 다운로드 합니다.
            </div>
            <button
              className="w-full h-4/6 flex justify-center items-center text-lg font-bold text-blue-500"
              onClick={downloadPhoto}
            >
              확인
            </button>
          </div>
          <button
            className="w-full h-14 bg-white dark:bg-dark-block opacity-90 rounded-xl flex justify-center items-center box-border mt-2 mb-8 text-lg font-bold"
            onClick={clickDownload}
          >
            취소
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DownloadModal;
