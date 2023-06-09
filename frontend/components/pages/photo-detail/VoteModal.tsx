import React from "react";
import { getPhoto } from "@/pages/api/photoDetailApi";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  clickVote(photoId: number): void;
  requestSns(): void;
  photoId: number;
}

/**
 * 공유 투표 모달 창
 */

const VoteModal = ({ clickVote, requestSns, photoId }: Props): JSX.Element => {
  const {
    isSnsRequest: isSnsRequest,
    noReplyFriends: noReplyFriends,
    declineFriends: declineFriends,
    acceptFriends: acceptFriends,
  } = getPhoto(photoId);

  return isSnsRequest ? (
    <AnimatePresence>
      <motion.div
        className="fixed left-0 top-0 w-screen h-screen z-20 bg-black/50 flex justify-center items-center"
        onClick={() => clickVote(photoId)}
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
          <div className="w-full h-96 opacity-95 bg-white dark:bg-dark-block rounded-xl flex flex-col justify-center items-center box-border p-2">
            <div className="w-full h-full box-border p-4 flex flex-col justify-between items-start text-gray-400 dark:text-white">
              <span className="w-full flex justify-center items-center">
                투표 현황
              </span>
              <div className="w-full h-24 flex flex-col justify-start">
                <span className="text-black dark:text-white">
                  찬성: {acceptFriends.length}
                </span>
                <div className="w-full flex overflow-hidden overflow-x-scroll">
                  {acceptFriends.map(
                    (friend: any): JSX.Element => (
                      <div className={`w-14 h-20 box-border`}>
                        <div
                          className={`w-14 h-full flex flex-col items-center`}
                        >
                          <div className={`w-14 h-14 relative`}>
                            <img
                              src={
                                friend.user_image
                                  ? friend.user_image
                                  : "/images/default_thumbnail.png"
                              }
                              alt="img"
                              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 dark:border-0 rounded-full"
                            />
                          </div>
                          <span className="w-14 text-xs truncate flex justify-center">
                            {friend.user_name}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="w-full h-24 flex flex-col justify-start">
                <span className="text-black dark:text-white">
                  반대: {declineFriends.length}
                </span>
                <div className="w-full flex overflow-hidden overflow-x-scroll">
                  {declineFriends.map(
                    (friend: any): JSX.Element => (
                      <div className={`w-14 h-20 box-border`}>
                        <div
                          className={`w-14 h-full flex flex-col items-center`}
                        >
                          <div className={`w-14 h-14 relative`}>
                            <img
                              src={
                                friend.user_image
                                  ? friend.user_image
                                  : "/images/default_thumbnail.png"
                              }
                              alt="img"
                              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 dark:border-0 rounded-full"
                            />
                          </div>
                          <span className="w-14 text-xs truncate flex justify-center">
                            {friend.user_name}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="w-full h-24 flex flex-col justify-start">
                <span className="text-black dark:text-white">
                  미응답: {noReplyFriends.length}
                </span>
                <div className="w-full flex overflow-hidden overflow-x-scroll">
                  {noReplyFriends.map(
                    (friend: any): JSX.Element => (
                      <div className={`w-14 h-20 box-border`}>
                        <div
                          className={`w-14 h-full flex flex-col items-center`}
                        >
                          <div className={`w-14 h-14 relative`}>
                            <img
                              src={
                                friend.user_image
                                  ? friend.user_image
                                  : "/images/default_thumbnail.png"
                              }
                              alt="img"
                              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 dark:border-0 rounded-full"
                            />
                          </div>
                          <span className="w-14 text-xs truncate flex justify-center">
                            {friend.user_name}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          {noReplyFriends.length == 0 ? (
            <button
              className="w-full h-16 bg-white dark:bg-dark-block rounded-xl flex justify-center items-center box-border mt-2 mb-8 text-2xl font-bold text-blue-500"
              onClick={requestSns}
            >
              재투표
            </button>
          ) : (
            <button
              className="w-full h-14 opacity-95 bg-white dark:bg-dark-block rounded-xl flex justify-center items-center box-border mt-2 mb-8 text-2xl font-bold"
              onClick={() => clickVote(photoId)}
            >
              취소
            </button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  ) : (
    <AnimatePresence>
      <motion.div
        className="fixed left-0 top-0 w-screen h-screen z-20 bg-black/50 flex justify-center items-center"
        onClick={() => clickVote(photoId)}
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
              공유 요청 알림이 보내집니다.
            </div>
            <button
              className="w-full h-4/6 flex justify-center items-center text-lg font-bold text-blue-500"
              onClick={requestSns}
            >
              알림 보내기
            </button>
          </div>
          <button
            className="w-full h-14 bg-white dark:bg-dark-block opacity-90 rounded-xl flex justify-center items-center box-border mt-2 mb-8 text-lg font-bold"
            onClick={() => clickVote(photoId)}
          >
            취소
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VoteModal;
