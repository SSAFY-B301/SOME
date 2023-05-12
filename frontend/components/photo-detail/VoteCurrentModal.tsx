import React from "react";
import { getPhoto } from "@/pages/api/photoDetailApi";

interface Props {
  clickVote(): void;
  requestSns(): void;
  photoId: number;
}

const VoteCurrentModal = ({
  clickVote,
  requestSns,
  photoId,
}: Props): JSX.Element => {
  const {
    noReplyFriends: noReplyFriends,
    declineFriends: declineFriends,
    acceptFriends: acceptFriends,
  } = getPhoto(photoId);

  return (
    <div
      className="fixed left-0 top-0 w-screen h-screen z-20 bg-black/50 flex justify-center items-center"
      onClick={clickVote}
    >
      <div className="w-11/12 h-full flex flex-col justify-end items-center">
        <div className="w-full h-56 bg-white dark:bg-dark-block rounded-xl flex flex-col justify-center items-center box-border p-2">
          <div className="w-full h-4 flex justify-center items-center">
            투표 현황
          </div>
          <div className="w-full h-full box-border p-4 flex flex-col justify-between items-start text-gray-400 dark:text-white">
            <span className="text-black dark:text-white">
              찬성: {acceptFriends.length}
            </span>
            <span className="text-black dark:text-white">
              반대: {declineFriends.length}
            </span>
            <span className="text-black dark:text-white">
              미응답: {noReplyFriends.length}
            </span>
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
            className="w-full h-16 bg-white dark:bg-dark-block rounded-xl flex justify-center items-center box-border mt-2 mb-8 text-2xl font-bold"
            onClick={clickVote}
          >
            취소
          </button>
        )}
      </div>
    </div>
  );
};

export default VoteCurrentModal;
