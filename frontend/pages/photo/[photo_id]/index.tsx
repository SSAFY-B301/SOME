import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Photo,
  PhotoFeatures,
  Footer,
  DownloadModal,
  DeleteModal,
  VoteModal,
} from "@/components/photo-detail";
import BackButtonIcon from "@/public/icons/CaretLeft.svg";
import styles from "./photo.module.scss";

const PHOTO = {
  img: "https://images.unsplash.com/photo-1619964550581-a344c6f0c1a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dHJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  date: "2023년 04월 26일",
};

const USER = {
  profileImg:
    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  name: "남사친",
};

const PhotoDetail = (): JSX.Element => {
  const router = useRouter();

  const [showDownLoadModal, setDownLoadShowModal] = useState<boolean>(false);
  const [showDeleteModal, setDeleteModal] = useState<boolean>(false);
  const [showVoteModal, setVoteModal] = useState<boolean>(false);
  const [showConcentrationMode, setConcentrationMode] =
    useState<boolean>(false);

  /**
   * 다운로드 모달창 생성
   */
  const clickDownload = () => {
    showDownLoadModal
      ? setDownLoadShowModal(false)
      : setDownLoadShowModal(true);
  };

  /**
   * 삭제 모달창 생성
   */
  const clickDelete = () => {
    showDeleteModal ? setDeleteModal(false) : setDeleteModal(true);
  };

  /**
   * 공유 요청 모달창 생성
   */
  const clickVote = () => {
    showVoteModal ? setVoteModal(false) : setVoteModal(true);
  };

  /**
   * 집중 모드 모달창 생성
   */
  const clickImg = () => {
    showConcentrationMode
      ? setConcentrationMode(false)
      : setConcentrationMode(true);
  };

  /**
   * 공유 요청 알림을 통해서 들어왔을 때 승인 모달 생성 필요
   */

  return (
    <div className="w-screen h-screen bg-white flex flex-col items-center">
      <div className="w-full h-16 z-20 flex justify-center items-center border-b-2">
        <div className="w-11/12 h-full relative">
          <div onClick={() => router.back()}>
            <BackButtonIcon
              className="absolute top-1/2 -translate-y-1/2 left-0 text-black text-lg"
              stroke={`black`}
            />
          </div>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-2xl">
            앨범
          </span>
        </div>
      </div>
      <div className="w-full h-20 z-20 flex justify-center items-center">
        <PhotoFeatures user={USER} photo={PHOTO} />
      </div>
      <Photo
        clickImg={clickImg}
        showConcentrationMode={showConcentrationMode}
      />
      <div
        className={`w-full h-24 fixed bottom-0 border-t-2 z-20 rounded-t-2xl flex justify-center items-center ${styles.footer}`}
      >
        <Footer
          clickDownload={clickDownload}
          clickDelete={clickDelete}
          clickVote={clickVote}
        />
      </div>
      {showDownLoadModal && <DownloadModal clickDownload={clickDownload} />}
      {showDeleteModal && <DeleteModal clickDelete={clickDelete} />}
      {showVoteModal && <VoteModal clickVote={clickVote} />}
    </div>
  );
};

export default PhotoDetail;
